package com.guardianai.drive

import android.app.Activity
import android.content.Intent
import android.net.Uri
import android.os.Build
import android.os.Bundle
import android.os.PowerManager
import android.provider.Settings
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity

private const val REQUEST_OVERLAY_PERMISSION = 1000

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        findViewById<Button>(R.id.buttonStart).setOnClickListener {
            ensureOverlayPermission()
        }

        findViewById<Button>(R.id.buttonStop).setOnClickListener {
            stopMonitoring()
        }

        findViewById<TextView>(R.id.textStatus).text = "Ready to start monitoring."
    }

    private fun ensureOverlayPermission() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M && !Settings.canDrawOverlays(this)) {
            Toast.makeText(this, "Overlay permission is required to show the driver monitor UI.", Toast.LENGTH_LONG).show()
            val intent = Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION, Uri.parse("package:$packageName"))
            startActivityForResult(intent, REQUEST_OVERLAY_PERMISSION)
            return
        }

        requestBatteryOptimizationException()
        startMonitoring()
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        if (requestCode == REQUEST_OVERLAY_PERMISSION) {
            if (Build.VERSION.SDK_INT < Build.VERSION_CODES.M || Settings.canDrawOverlays(this)) {
                requestBatteryOptimizationException()
                startMonitoring()
            } else {
                Toast.makeText(this, "Overlay permission not granted. The service cannot display alerts above other apps.", Toast.LENGTH_LONG).show()
            }
        }
    }

    private fun startMonitoring() {
        val intent = Intent(this, GuardianForegroundService::class.java)
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            startForegroundService(intent)
        } else {
            startService(intent)
        }
        findViewById<TextView>(R.id.textStatus).text = "Monitoring active. Guardian AI service is running."
    }

    private fun stopMonitoring() {
        val intent = Intent(this, GuardianForegroundService::class.java)
        stopService(intent)
        findViewById<TextView>(R.id.textStatus).text = "Monitoring stopped."
    }

    private fun requestBatteryOptimizationException() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            val powerManager = getSystemService(POWER_SERVICE) as PowerManager
            if (!powerManager.isIgnoringBatteryOptimizations(packageName)) {
                val intent = Intent(Settings.ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS)
                intent.data = Uri.parse("package:$packageName")
                startActivity(intent)
            }
        }
    }
}
