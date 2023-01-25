package com.widgetapp;

import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.widget.RemoteViews;
import android.content.SharedPreferences;

import org.json.JSONException;
import org.json.JSONObject;

import java.lang.reflect.Field;
import java.util.Map;

/**
 * Implementation of App Widget functionality.
 */
public class MyWidget extends AppWidgetProvider {

    private static final String TAG = "MyWidget";
    private static int current_layout = R.layout.my_widget;

    static void updateAppWidget(Context context, AppWidgetManager appWidgetManager, int appWidgetId) {

        //try {
        SharedPreferences sharedPref = context.getSharedPreferences("DATA", Context.MODE_PRIVATE);
        RemoteViews views = new RemoteViews(context.getPackageName(), current_layout);
        for (Map.Entry<String,?> entry : sharedPref.getAll().entrySet()) {
            int resID = getResId(entry.getKey(), R.id.class);
            views.setTextViewText(resID, entry.getValue().toString());
        }

        Log.v(TAG, "Text set");

        Intent intent = new Intent(context, MainActivity.class);
        PendingIntent pendingIntent = PendingIntent.getActivity(context, 0, intent,
                PendingIntent.FLAG_IMMUTABLE);
        views.setOnClickPendingIntent(R.id.PlayButton, pendingIntent);
        Log.v(TAG, "Intent set");

        appWidgetManager.updateAppWidget(appWidgetId, views);
        //} catch (JSONException e) {
        //    e.printStackTrace();
        //}
    }

    @Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        // There may be multiple widgets active, so update all of them
        for (int appWidgetId : appWidgetIds) {
            updateAppWidget(context, appWidgetManager, appWidgetId);
        }
    }

    @Override
    public void onEnabled(Context context) {
// Enter relevant functionality for when the first widget is created
    }

    @Override
    public void onDisabled(Context context) {
// Enter relevant functionality for when the last widget is disabled
    }

    @Override
    public void onReceive(Context context, Intent intent) {
        super.onReceive(context, intent);
        String action = intent.getAction();
        Log.v(TAG, "Action received = " + action);
    }

    public static int getResId(String resName, Class<?> c) {

        try {
            Field idField = c.getDeclaredField(resName);
            return idField.getInt(idField);
        } catch (Exception e) {
            e.printStackTrace();
            return -1;
        }
    }

    @Override
    public void onAppWidgetOptionsChanged(Context context, AppWidgetManager appWidgetManager,
                                          int appWidgetId, Bundle bundle) {
        int minWidth = bundle.getInt(AppWidgetManager.OPTION_APPWIDGET_MIN_WIDTH);
        //int maxWidth = bundle.getInt(AppWidgetManager.OPTION_APPWIDGET_MAX_WIDTH);
        int minHeight = bundle.getInt(AppWidgetManager.OPTION_APPWIDGET_MIN_HEIGHT);
        //int maxHeight = bundle.getInt(AppWidgetManager.OPTION_APPWIDGET_MAX_HEIGHT);

        // First find out rows and columns based on width provided.
        int rows = getCellsForSize(minHeight);
        int columns = getCellsForSize(minWidth);
        Log.d(TAG, "rows = " + rows + ", columns = " + columns);

        //if(minWidth == 209 && maxWidth == 398 && minHeight == 115 && maxHeight == 212){
        if (columns == 3 && rows == 2) {
            current_layout = R.layout.my_widget3x2;
        }
        //else if (((minWidth == 360 && maxWidth == 674) || (minWidth == 285 && maxWidth == 536))
        //        && minHeight == 115 && maxHeight == 212){
        else if ((columns == 5 || columns == 4) && rows == 2) {
            current_layout = R.layout.my_widget5x2;
        }
        //else if (minWidth == 209 && maxWidth == 398 && minHeight == 181 && maxHeight == 326){
        else if (columns == 3 && rows == 3) {
            current_layout = R.layout.my_widget3x3;
        }
        else current_layout = R.layout.my_widget;
        updateAppWidget(context, appWidgetManager, appWidgetId);
    }

    /**
     * Returns number of cells needed for given size of the widget.
     *
     * @param size Widget size in dp.
     * @return Size in number of cells.
     */
    private static int getCellsForSize(int size) {
        int n = 2;
        while (70 * n - 30 < size) {
            ++n;
        }
        return n - 1;
    }

    /*@Override
    public void onUpdate(Context context, AppWidgetManager appWidgetManager, int[] appWidgetIds) {
        super.onUpdate(context, appWidgetManager, appWidgetIds);

        for (int appWidgetId : appWidgetIds) {
            Bundle options=appWidgetManager.getAppWidgetOptions(appWidgetId);

            onAppWidgetOptionsChanged(context, appWidgetManager, appWidgetId,
                    options);
        }
    }

    @Override
    public void onAppWidgetOptionsChanged(Context context, AppWidgetManager mgr, int appWidgetId,
                                          Bundle newOptions) {
        RemoteViews updateViews= new RemoteViews(context.getPackageName(), R.layout.my_widget);
        String msg= String.format(Locale.getDefault(),
                        "[%d-%d] x [%d-%d]",
                        newOptions.getInt(AppWidgetManager.OPTION_APPWIDGET_MIN_WIDTH),
                        newOptions.getInt(AppWidgetManager.OPTION_APPWIDGET_MAX_WIDTH),
                        newOptions.getInt(AppWidgetManager.OPTION_APPWIDGET_MIN_HEIGHT),
                        newOptions.getInt(AppWidgetManager.OPTION_APPWIDGET_MAX_HEIGHT));

        updateViews.setTextViewText(R.id.mode1_text, msg);

        mgr.updateAppWidget(appWidgetId, updateViews);
    }*/

}
