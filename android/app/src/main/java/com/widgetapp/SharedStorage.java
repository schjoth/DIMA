package com.widgetapp;

//import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
//import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

//import android.app.Activity;
import android.appwidget.AppWidgetManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
//import android.util.Log;

import androidx.annotation.NonNull;

import java.util.Map;
import java.util.Objects;

public class SharedStorage extends ReactContextBaseJavaModule {
    ReactApplicationContext context;

    public SharedStorage(ReactApplicationContext reactContext) {
        super(reactContext);
        context = reactContext;
    }

    @NonNull
    @Override
    public String getName() {
        return "SharedStorage";
    }

    @ReactMethod
    public void set(String mode, String score) {
        SharedPreferences sharedPref = context.getSharedPreferences("DATA", Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = context.getSharedPreferences("DATA", Context.MODE_PRIVATE).edit();
        int intScore = Integer.parseInt(score);
        int i = 1, pos = 0;
        String savedScore = "", savedMode;

        // pos saves the position where the score has to be saved
        Map<String, ?> test = sharedPref.getAll();
        for (Map.Entry<String,?> entry : test.entrySet()) {
            if (Objects.equals(entry.getKey(), "top" + i + "_score")){
                if (intScore > Integer.parseInt(entry.getValue().toString())){
                    pos = i;
                    savedScore = entry.getValue().toString();
                    break;
                }
                i++;
            }
        }

        // if pos == 0, then it means that the score is lower than the previously saved scores, so return.
        if (pos == 0) return;

        // new value gets inserted into the correct position and the previous mode is saved
        savedMode = (String) test.get("top" + pos + "_mode");
        editor.putString("top" + pos + "_mode", mode);
        editor.putString("top" + pos + "_score", score);
        pos++;

        // for switches all the values downwards
        String tempMode, tempScore;
        for (int j = pos; j < 4; j++) {
            tempMode = (String) test.get("top" + j + "_mode");
            tempScore = (String) test.get("top" + j + "_score");
            editor.putString("top" + j + "_mode", savedMode);
            editor.putString("top" + j + "_score", savedScore);
            savedMode = tempMode;
            savedScore = tempScore;
        }

        editor.apply();
    }

    @ReactMethod
    public void updateWidget(){
        Intent intent = new Intent(Objects.requireNonNull(getCurrentActivity()).getApplicationContext(), MyWidget.class);
        intent.setAction(AppWidgetManager.ACTION_APPWIDGET_UPDATE);
        int[] ids = AppWidgetManager.getInstance(getCurrentActivity().getApplicationContext()).getAppWidgetIds(new ComponentName(getCurrentActivity().getApplicationContext(), MyWidget.class));
        intent.putExtra(AppWidgetManager.EXTRA_APPWIDGET_IDS, ids);
        getCurrentActivity().getApplicationContext().sendBroadcast(intent);
    }

    @ReactMethod
    public void initStorage(){
        SharedPreferences sharedPref = context.getSharedPreferences("DATA", Context.MODE_PRIVATE);
        SharedPreferences.Editor editor = context.getSharedPreferences("DATA", Context.MODE_PRIVATE).edit();
        Map<String, ?> test = sharedPref.getAll();
        for (Map.Entry<String,?> entry : test.entrySet()) {
            editor.remove(entry.getKey());
        }
        editor.putString("top1_mode", "No mode");
        editor.putString("top1_score", "0");
        editor.putString("top2_mode", "No mode");
        editor.putString("top2_score", "0");
        editor.putString("top3_mode", "No mode");
        editor.putString("top3_score", "0");
        editor.apply();
    }

    private static boolean isNumeric(String strNum) {
        if (strNum == null) {
            return false;
        }
        try {
            int d = Integer.parseInt(strNum);
        } catch (NumberFormatException nfe) {
            return false;
        }
        return true;
    }
}