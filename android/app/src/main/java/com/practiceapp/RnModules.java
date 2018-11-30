package com.practiceapp;

import android.widget.Toast;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by liuhui on 2018/11/30.
 */

public class RnModules extends ReactContextBaseJavaModule {

    private ReactApplicationContext reactApplicationContext;

    public RnModules(ReactApplicationContext reactApplicationContext) {
        super(reactApplicationContext);
        this.reactApplicationContext = reactApplicationContext;
    }

    @Override
    public String getName() {
        return "extra";
    }

    @ReactMethod
    public void Toast(String message) {
        Toast.makeText(reactApplicationContext, message, Toast.LENGTH_SHORT).show();
    }
}
