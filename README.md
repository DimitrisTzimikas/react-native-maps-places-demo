A react native demo with use of react-native-google-place-picker & react-native-maps

To use: 
1) open git bash
2) write: ```git clone https://github.com/DimitrisTzimikas/react-native-maps-places-demo.git```
3) then ```cd react-native-maps-places-demo```
4) then ```npm install```

***

Configurations must be done also in the installed modules.

In project folder navigate to: ```node_modules/react-native-google-place-picker/android/build.gradle```

* Replace the existing code in file with this one: 

```
apply plugin: 'com.android.library'
android {
    compileSdkVersion 28
    buildToolsVersion "28.0.3"

    defaultConfig {
        minSdkVersion 21
        targetSdkVersion 28
        versionCode 1
        versionName "1.0"
        ndk {
            abiFilters "armeabi-v7a", "x86"
        }
    }
    lintOptions {
       warning 'InvalidPackage'
    }
}
dependencies {
    implementation 'com.facebook.react:react-native:0.57.8'
    implementation 'com.google.android.gms:play-services-places:+'
}
```
* Now go to ```node_modules/react-native-google-place-picker/android/src/main/java/com/reactlibrary/RNGooglePlacePickerPackage.java``` and replace again the existing code with this one
```
package com.reactlibrary;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.react.bridge.JavaScriptModule;

public class RNGooglePlacePickerPackage implements ReactPackage {
    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        return Arrays.<NativeModule>asList(new RNGooglePlacePickerModule(reactContext));
    }

    //@Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }
}
```

* Next ```node_modules/react-native-maps/lib/android/build.gradle```

Replace the code again

```
apply plugin: 'com.android.library'
apply from: 'gradle-maven-push.gradle'

def DEFAULT_COMPILE_SDK_VERSION               = 27
def DEFAULT_BUILD_TOOLS_VERSION               = "27.0.3"
def DEFAULT_TARGET_SDK_VERSION                = 27
def DEFAULT_GOOGLE_PLAY_SERVICES_VERSION      = "16.0.1"
def DEFAULT_GOOGLE_PLAY_SERVICES_MAPS_VERSION = "16.0.0"
def DEFAULT_ANDROID_MAPS_UTILS_VERSION        = "0.5+"

def safeExtGet(prop, fallback) {
    rootProject.ext.has(prop) ? rootProject.ext.get(prop) : fallback
}

android {
  compileSdkVersion safeExtGet('compileSdkVersion', DEFAULT_COMPILE_SDK_VERSION)
  buildToolsVersion safeExtGet('buildToolsVersion', DEFAULT_BUILD_TOOLS_VERSION)

  defaultConfig {
    minSdkVersion 21
    targetSdkVersion safeExtGet('targetSdkVersion', DEFAULT_TARGET_SDK_VERSION)
  }

  packagingOptions {
    exclude 'META-INF/LICENSE'
    exclude 'META-INF/DEPENDENCIES.txt'
    exclude 'META-INF/LICENSE.txt'
    exclude 'META-INF/NOTICE.txt'
    exclude 'META-INF/NOTICE'
    exclude 'META-INF/DEPENDENCIES'
    exclude 'META-INF/notice.txt'
    exclude 'META-INF/license.txt'
    exclude 'META-INF/dependencies.txt'
    exclude 'META-INF/LGPL2.1'
  }

  lintOptions {
    disable 'InvalidPackage'
  }

  compileOptions {
    sourceCompatibility JavaVersion.VERSION_1_7
    targetCompatibility JavaVersion.VERSION_1_7
  }
}

dependencies {
  def googlePlayServicesVersion = safeExtGet('googlePlayServicesVersion', DEFAULT_GOOGLE_PLAY_SERVICES_VERSION)
  // Variable lookup order : googlePlayServicesMapsVersion > googlePlayServicesVersion > DEFAULT_GOOGLE_PLAY_SERVICES_MAPS_VERSION
  def googlePlayServicesMapsVersion = safeExtGet('googlePlayServicesMapsVersion', safeExtGet('googlePlayServicesVersion', DEFAULT_GOOGLE_PLAY_SERVICES_MAPS_VERSION))
  def androidMapsUtilsVersion = safeExtGet('androidMapsUtilsVersion', DEFAULT_ANDROID_MAPS_UTILS_VERSION)

  compileOnly "com.facebook.react:react-native:0.57.8"
  implementation "com.google.android.gms:play-services-base:$googlePlayServicesVersion"
  implementation "com.google.android.gms:play-services-maps:$googlePlayServicesMapsVersion"
  implementation "com.google.maps.android:android-maps-utils:$androidMapsUtilsVersion"
}

```

The configuration is only for Android because I could't test it on Mac. 
If someone can PR the iOS config fill free to do so.
