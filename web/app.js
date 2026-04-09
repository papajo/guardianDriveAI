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

let camera = null;
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
let streamActive = false;
let drawConnectors = null;
let drawLandmarks = null;
let FACEMESH_TESSELATION = null;

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      return resolve();
    }
    const script = document.createElement('script');
    script.src = src;
    script.onload = resolve;
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.head.appendChild(script);
  });
}

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

function normalize(value, min, max) {
  return Math.max(0, Math.min(1, (value - min) / (max - min)));
}

function distance(a, b) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

function eyeAspectRatio(upper, lower, left, right) {
  const vertical = distance(upper, lower);
  const horizontal = distance(left, right);
  return vertical / horizontal;
}

function computeHeadTurn(landmarks) {
  const leftEye = landmarks[33];
  const rightEye = landmarks[263];
  const noseTip = landmarks[1];
  const eyeMidX = (leftEye.x + rightEye.x) / 2;
  return noseTip.x - eyeMidX;
}

function computeEyeClosure(landmarks) {
  const leftUpper = landmarks[159];
  const leftLower = landmarks[145];
  const rightUpper = landmarks[386];
  const rightLower = landmarks[374];
  const leftLeft = landmarks[130];
  const leftRight = landmarks[243];
  const rightLeft = landmarks[362];
  const rightRight = landmarks[463];

  const leftEAR = eyeAspectRatio(leftUpper, leftLower, leftLeft, leftRight);
  const rightEAR = eyeAspectRatio(rightUpper, rightLower, rightLeft, rightRight);
  return (leftEAR + rightEAR) / 2;
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
  audioState.textContent = level > 0.15 ? 'loud' : 'quiet'; // More sensitive
  const soundAlert = level > 0.3; // Lower threshold for testing
  aggressiveSoundDetected = soundAlert;
  if (soundAlert) {
    updateAlert('audio_alert');
  }
}

function onResults(results) {
  if (!results.multiFaceLandmarks || results.multiFaceLandmarks.length === 0) {
    setStatus('No face detected');
    drowsinessState.textContent = 'no face';
    distractionState.textContent = 'no face';
    return;
  }

  const landmarks = results.multiFaceLandmarks[0];
  const ear = computeEyeClosure(landmarks);
  const lookTurn = computeHeadTurn(landmarks);
  const faceClosed = ear < 0.25; // More sensitive threshold
  const now = performance.now();

  if (faceClosed) {
    if (!lastEyesClosedAt) lastEyesClosedAt = now;
    if (now - lastEyesClosedAt >= 1500) { // Shorter time for testing
      drowsy = true;
      drowsinessState.textContent = 'drowsy';
      updateAlert('drowsiness_alert');
    }
  } else {
    if (lastEyesClosedAt && now - lastEyesClosedAt < 300) {
      blinkHistory.push(now);
    }
    lastEyesClosedAt = null;
    if (computeBlinkRate() < 8) { // Lower threshold for testing
      drowsy = true;
      drowsinessState.textContent = 'drowsy';
      updateAlert('low_blink_rate');
    } else {
      drowsy = false;
      drowsinessState.textContent = 'safe';
    }
  }

  const turnedAway = Math.abs(lookTurn) > 0.015; // More sensitive
  if (turnedAway) {
    if (!lastDistractionAt) lastDistractionAt = now;
    if (now - lastDistractionAt >= 2000) { // Shorter time for testing
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

  canvasElement.width = videoElement.videoWidth;
  canvasElement.height = videoElement.videoHeight;
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(results.image, 0, 0, canvasElement.width, canvasElement.height);
  if (drawConnectors && FACEMESH_TESSELATION) {
    drawConnectors(canvasCtx, landmarks, FACEMESH_TESSELATION, {
      color: '#ffffff20',
      lineWidth: 1,
    });
  }
  if (drawLandmarks) {
    drawLandmarks(canvasCtx, landmarks, {
      color: '#ff5f57',
      lineWidth: 1,
    });
  }
  canvasCtx.restore();
}

async function startMonitor() {
  setStatus('Starting...');
  try {
    await Promise.all([
      loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4.1657299874/face_mesh.js'),
      loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/camera_utils@0.3.1675466862/camera_utils.js'),
      loadScript('https://cdn.jsdelivr.net/npm/@mediapipe/drawing_utils@0.3.1675466124/drawing_utils.js'),
    ]);

    if (typeof window.FaceMesh === 'undefined' || typeof window.Camera === 'undefined' || typeof window.drawConnectors === 'undefined' || typeof window.drawLandmarks === 'undefined') {
      throw new Error('MediaPipe modules did not load correctly');
    }

    FACEMESH_TESSELATION = window.FACEMESH_TESSELATION ?? FACEMESH_TESSELATION;
    drawConnectors = window.drawConnectors;
    drawLandmarks = window.drawLandmarks;

    const faceMesh = new window.FaceMesh({
      locateFile: (file) => {
        console.log('Loading WASM file:', file);
        return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh@0.4.1657299874/${file}`;
      }
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.7,
      minTrackingConfidence: 0.7,
    });

    faceMesh.onResults(onResults);

    camera = new window.Camera(videoElement, {
      onFrame: async () => {
        try {
          await faceMesh.send({ image: videoElement });
        } catch (error) {
          console.warn('Frame processing error:', error);
        }
      },
      width: 640,
      height: 480,
    });

    camera.start();

    audioStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    audioSource = audioContext.createMediaStreamSource(audioStream);
    audioSource.connect(analyser);

    streamActive = true;
    console.error('Monitor startup failed:', error);
    setStatus('Error: ' + error.message);

    // Provide helpful error messages
    if (error.message.includes('WebAssembly') || error.message.includes('SIMD')) {
      setStatus('Error: WebAssembly/SIMD not supported. Try Chrome or Firefox.');
    } else if (error.message.includes('MediaPipe')) {
      setStatus('Error: MediaPipe failed to load. Check console for details.');
    } else if (error.message.includes('getUserMedia')) {
      setStatus('Error: Camera/microphone permission denied.');
    }
    setStatus('Monitoring active');
    audioState.textContent = 'quiet';

    const audioLoop = () => {
      if (!streamActive) return;
      analyzeAudio();
      requestAnimationFrame(audioLoop);
    };
    audioLoop();
  } catch (error) {
    setStatus('Error starting monitor');
    console.error('Monitor startup failed:', error);
  }
}

function stopMonitor() {
  streamActive = false;
  if (camera) {
    camera.stop();
    camera = null;
  }
  if (audioStream) {
    audioStream.getTracks().forEach((track) => track.stop());
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
