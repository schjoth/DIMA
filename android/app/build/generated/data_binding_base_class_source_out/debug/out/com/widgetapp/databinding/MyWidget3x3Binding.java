// Generated by view binder compiler. Do not edit!
package com.widgetapp.databinding;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageButton;
import android.widget.RelativeLayout;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.viewbinding.ViewBinding;
import androidx.viewbinding.ViewBindings;
import com.widgetapp.R;
import java.lang.NullPointerException;
import java.lang.Override;
import java.lang.String;

public final class MyWidget3x3Binding implements ViewBinding {
  @NonNull
  private final RelativeLayout rootView;

  @NonNull
  public final TextView AppName;

  @NonNull
  public final ImageButton PlayButton;

  @NonNull
  public final TextView top1Mode;

  @NonNull
  public final TextView top1Score;

  @NonNull
  public final TextView top2Mode;

  @NonNull
  public final TextView top2Score;

  @NonNull
  public final TextView top3Mode;

  @NonNull
  public final TextView top3Score;

  @NonNull
  public final RelativeLayout topLayout;

  private MyWidget3x3Binding(@NonNull RelativeLayout rootView, @NonNull TextView AppName,
      @NonNull ImageButton PlayButton, @NonNull TextView top1Mode, @NonNull TextView top1Score,
      @NonNull TextView top2Mode, @NonNull TextView top2Score, @NonNull TextView top3Mode,
      @NonNull TextView top3Score, @NonNull RelativeLayout topLayout) {
    this.rootView = rootView;
    this.AppName = AppName;
    this.PlayButton = PlayButton;
    this.top1Mode = top1Mode;
    this.top1Score = top1Score;
    this.top2Mode = top2Mode;
    this.top2Score = top2Score;
    this.top3Mode = top3Mode;
    this.top3Score = top3Score;
    this.topLayout = topLayout;
  }

  @Override
  @NonNull
  public RelativeLayout getRoot() {
    return rootView;
  }

  @NonNull
  public static MyWidget3x3Binding inflate(@NonNull LayoutInflater inflater) {
    return inflate(inflater, null, false);
  }

  @NonNull
  public static MyWidget3x3Binding inflate(@NonNull LayoutInflater inflater,
      @Nullable ViewGroup parent, boolean attachToParent) {
    View root = inflater.inflate(R.layout.my_widget3x3, parent, false);
    if (attachToParent) {
      parent.addView(root);
    }
    return bind(root);
  }

  @NonNull
  public static MyWidget3x3Binding bind(@NonNull View rootView) {
    // The body of this method is generated in a way you would not otherwise write.
    // This is done to optimize the compiled bytecode for size and performance.
    int id;
    missingId: {
      id = R.id.AppName;
      TextView AppName = ViewBindings.findChildViewById(rootView, id);
      if (AppName == null) {
        break missingId;
      }

      id = R.id.PlayButton;
      ImageButton PlayButton = ViewBindings.findChildViewById(rootView, id);
      if (PlayButton == null) {
        break missingId;
      }

      id = R.id.top1_mode;
      TextView top1Mode = ViewBindings.findChildViewById(rootView, id);
      if (top1Mode == null) {
        break missingId;
      }

      id = R.id.top1_score;
      TextView top1Score = ViewBindings.findChildViewById(rootView, id);
      if (top1Score == null) {
        break missingId;
      }

      id = R.id.top2_mode;
      TextView top2Mode = ViewBindings.findChildViewById(rootView, id);
      if (top2Mode == null) {
        break missingId;
      }

      id = R.id.top2_score;
      TextView top2Score = ViewBindings.findChildViewById(rootView, id);
      if (top2Score == null) {
        break missingId;
      }

      id = R.id.top3_mode;
      TextView top3Mode = ViewBindings.findChildViewById(rootView, id);
      if (top3Mode == null) {
        break missingId;
      }

      id = R.id.top3_score;
      TextView top3Score = ViewBindings.findChildViewById(rootView, id);
      if (top3Score == null) {
        break missingId;
      }

      RelativeLayout topLayout = (RelativeLayout) rootView;

      return new MyWidget3x3Binding((RelativeLayout) rootView, AppName, PlayButton, top1Mode,
          top1Score, top2Mode, top2Score, top3Mode, top3Score, topLayout);
    }
    String missingId = rootView.getResources().getResourceName(id);
    throw new NullPointerException("Missing required view with ID: ".concat(missingId));
  }
}
