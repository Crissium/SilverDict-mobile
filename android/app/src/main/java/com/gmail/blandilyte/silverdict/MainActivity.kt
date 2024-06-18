package com.gmail.blandilyte.silverdict

import android.content.Intent
import android.os.Bundle
import android.util.Log
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.bridge.Arguments
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.facebook.react.modules.core.DeviceEventManagerModule

class MainActivity : ReactActivity() {

	override fun getMainComponentName(): String = "SilverDict"

	override fun createReactActivityDelegate(): ReactActivityDelegate =
		DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)

	// Define PROCESS_TEXT intent action and send it to the React Native app
	override fun onCreate(savedInstanceState: Bundle?) {
		super.onCreate(savedInstanceState)
		handleIntent(intent)
	}

	override fun onNewIntent(intent: Intent?) {
		super.onNewIntent(intent)
		handleIntent(intent)
	}

	private fun handleIntent(intent: Intent?) {
		if (intent?.action == Intent.ACTION_PROCESS_TEXT) {
			val selectedText = intent.getCharSequenceExtra(Intent.EXTRA_PROCESS_TEXT)
			Log.d("MainActivity", "Selected text: $selectedText")

			if (reactInstanceManager.currentReactContext != null) {
				sendTextToReactNative(selectedText.toString())
			} else {
				Log.d("MainActivity", "ReactContext is null, polling")
				pollReactContextAndSendText(selectedText.toString())
			}
		}
	}

	private fun pollReactContextAndSendText(selectedText: String) {
		Thread {
			while (reactInstanceManager.currentReactContext == null) {
				Thread.sleep(50)
			}
			// The processing code is nested very deep inside the React Native part,
			// So sleep for a bit more.
			Thread.sleep(150)
			sendTextToReactNative(selectedText)
			Log.d("MainActivity", "ReactContext is no longer null, text sent")
		}.start()
	}

	private fun sendTextToReactNative(selectedText: String) {
		val params = Arguments.createMap()
		params.putString("selectedText", selectedText)

		reactInstanceManager.currentReactContext
			?.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
			?.emit("onTextSelected", params)
	}
}
