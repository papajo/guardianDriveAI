const videoElement = document.getElementById('inputVideo');
const canvasElement = document.getElementById('outputCanvas');
const canvasCtx = canvasElement.getContext('2d');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const statusText = document.getElementById('status');
const alertOverlay = document.getElementById('alertOverlay');
const drowsinessState = document.getElementById('drowsinessState');
const distractionState = document.getElementById('distractionState');
const audioState = document.getElementById('audioState');
const blinkRateText = document.getElementById('blinkRate');
const lastAlertText = document.getElementById('lastAlert');

let stream = null;
let audioStream = null;
let audioContext = null;
let analyser = null;
let audioSource = null;
let blinkHistory = [];
let lastEyesClosedAt = null;
let lastDistractionAt = null;
let lastAlertMessage = 'none';
let drowsy = false;
let distracted = false;
let aggressiveSoundDetected = false;
let isMonitoring = false;

function setStatus(text) {
  statusText.textContent = `Status: ${text}`;
}

function setAlertState(active) {
  alertOverlay.classList.toggle('active', active);
}

function updateAlert(alertType) {
  lastAlertMessage = alertType;
  lastAlertText.textContent = alertType;
  setAlertState(alertType !== 'none');
}

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function eyeAspectRatio(upper, lower, left, right) {
  const vertical = distance(upper, lower);
  const horizontal = distance(left, right);
  return vertical / horizontal;
}

function computeBlinkRate() {
  const now = performance.now();
  const oneMinuteAgo = now - 60_000;
  blinkHistory = blinkHistory.filter((ts) => ts > oneMinuteAgo);
  const rate = blinkHistory.length;
  blinkRateText.textContent = rate;
  return rate;
}

function analyzeAudio() {
  if (!analyser) return;
  const buffer = new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(buffer);
  const rms = Math.sqrt(buffer.reduce((sum, value) => sum + value * value, 0) / buffer.length) / 255;
  const level = Math.max(0, Math.min(1, rms));
  audioState.textContent = level > 0.15 ? 'loud' : 'quiet';
  const soundAlert = level > 0.3;
  aggressiveSoundDetected = soundAlert;
  if (soundAlert) {
    updateAlert('audio_alert');
  }
}

function computeEyeClosure(landmarks) {
  // face-api.js uses 68-point landmarks
  // Left eye: points 36-41, Right eye: points 42-47
  const leftEye = landmarks.slice(36, 42);
  const rightEye = landmarks.slice(42, 48);

  // Calculate EAR for left eye
  const leftUpper = leftEye[1]; // 37
  const leftLower = leftEye[5]; // 41
  const leftLeft = leftEye[0];   // 36
  const leftRight = leftEye[3];  // 39
  const leftEAR = eyeAspectRatio(leftUpper, leftLower, leftLeft, leftRight);

  // Calculate EAR for right eye
  const rightUpper = rightEye[1]; // 43
  const rightLower = rightEye[5]; // 47
  const rightLeft = rightEye[0];   // 42
  const rightRight = rightEye[3];  // 45
  const rightEAR = eyeAspectRatio(rightUpper, rightLower, rightLeft, rightRight);

  return (leftEAR + rightEAR) / 2;
}

function computeHeadTurn(landmarks) {
  // Use nose tip (point 30) and eye centers
  const noseTip = landmarks[30];
  const leftEye = landmarks[36];
  const rightEye = landmarks[45];
  const eyeMidX = (leftEye.x + rightEye.x) / 2;
  return noseTip.x - eyeMidX;
}

async function detectFaces() {
  if (!isMonitoring) return;

  try {
    const detections = await faceapi.detectAllFaces(videoElement, new faceapi.TinyFaceDetectorOptions({ scoreThreshold: 0.5 }))
      .withFaceLandmarks();

    if (detections.length === 0) {
      setStatus('No face detected');
      drowsinessState.textContent = 'no face';
      distractionState.textContent = 'no face';
      requestAnimationFrame(detectFaces);
      return;
    }

    const detection = detections[0];
    const landmarks = detection.landmarks.positions;
    const now = performance.now();

    // Calculate eye closure
    const ear = computeEyeClosure(landmarks);
    const faceClosed = ear < 0.25;

    if (faceClosed) {
      if (!lastEyesClosedAt) lastEyesClosedAt = now;
      if (now - lastEyesClosedAt >= 1500) {
        drowsy = true;
        drowsinessState.textContent = 'drowsy';
        updateAlert('drowsiness_alert');
      }
    } else {
      if (lastEyesClosedAt && now - lastEyesClosedAt < 300) {
        blinkHistory.push(now);
      }
      lastEyesClosedAt = null;
      if (computeBlinkRate() < 8) {
        drowsy = true;
        drowsinessState.textContent = 'drowsy';
        updateAlert('low_blink_rate');
      } else {
        drowsy = false;
        drowsinessState.textContent = 'safe';
      }
    }

    // Calculate head turn
    const lookTurn = computeHeadTurn(landmarks);
    const turnedAway = Math.abs(lookTurn) > 0.015;

    if (turnedAway) {
      if (!lastDistractionAt) lastDistractionAt = now;
      if (now - lastDistractionAt >= 2000) {
        distracted = true;
        distractionState.textContent = 'distracted';
        updateAlert('distraction_alert');
      }
    } else {
      lastDistractionAt = null;
      distracted = false;
      distractionState.textContent = 'safe';
    }

    if (!drowsy && !distracted && !aggressiveSoundDetected) {
      updateAlert('none');
    }

    setStatus('Face detected');

    // Draw on canvas
    canvasElement.width = videoElement.videoWidth;
    canvasElement.height = videoElement.videoHeight;
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    canvasCtx.drawImage(videoElement, 0, 0, canvasElement.width, canvasElement.height);

    // Draw face landmarks
    faceapi.draw.drawFaceLandmarks(canvasElement, detection.landmarks);

    canvasCtx.restore();

  } catch (error) {
    console.warn('Detection error:', error);
  }

  requestAnimationFrame(detectFaces);
}

async function startMonitor() {
  setStatus('Loading models...');
  try {
    // Load face-api.js models from the public GitHub/jsdelivr weights folder
    const modelUrl = 'https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js@master/weights';
    await faceapi.nets.tinyFaceDetector.loadFromUri(modelUrl);
    await faceapi.nets.faceLandmark68Net.loadFromUri(modelUrl);

    setStatus('Starting camera...');

    // Get camera stream
    stream = await navigator.mediaDevices.getUserMedia({
      video: { width: 640, height: 480, facingMode: 'user' },
      audio: false
    });

    videoElement.srcObject = stream;

    await new Promise((resolve) => {
      videoElement.onloadedmetadata = resolve;
    });

    // Get microphone stream
    audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    audioSource = audioContext.createMediaStreamSource(audioStream);
    audioSource.connect(analyser);

    isMonitoring = true;
    stopButton.disabled = false;
    startButton.disabled = true;
    setStatus('Monitoring active');
    audioState.textContent = 'quiet';

    const audioLoop = () => {
      if (!isMonitoring) return;
      analyzeAudio();
      requestAnimationFrame(audioLoop);
    };
    audioLoop();

    detectFaces();

  } catch (error) {
    console.error('Monitor startup failed:', error);
    setStatus('Error: ' + error.message);

    if (error.name === 'NotAllowedError') {
      setStatus('Error: Camera/microphone permission denied');
    } else if (error.name === 'NotFoundError') {
      setStatus('Error: Camera/microphone not found');
    }
  }
}

function stopMonitor() {
  isMonitoring = false;
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
    stream = null;
  }
  if (audioStream) {
    audioStream.getTracks().forEach(track => track.stop());
    audioStream = null;
  }
  if (audioContext) {
    audioContext.close();
    audioContext = null;
  }
  startButton.disabled = false;
  stopButton.disabled = true;
  setStatus('Stopped');
  updateAlert('none');
  drowsinessState.textContent = 'safe';
  distractionState.textContent = 'safe';
  audioState.textContent = 'quiet';
  blinkRateText.textContent = '0';
}

startButton.addEventListener('click', startMonitor);
stopButton.addEventListener('click', stopMonitor);