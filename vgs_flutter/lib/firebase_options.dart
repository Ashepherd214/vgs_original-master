import 'package:firebase_core/firebase_core.dart' show FirebaseOptions;
import 'package:flutter/foundation.dart'
    show defaultTargetPlatform, kIsWeb, TargetPlatform;

/// Default [FirebaseOptions] for use with your Firebase apps.
///
/// Example:
/// ```dart
/// import 'firebase_options.dart';
/// // ...
/// await Firebase.initializeApp(
///   options: DefaultFirebaseOptions.currentPlatform,
/// );
/// ```
class DefaultFirebaseOptions {
  static FirebaseOptions get currentPlatform {
    if (kIsWeb) {
      return web;
    }
    switch (defaultTargetPlatform) {
      case TargetPlatform.android:
      case TargetPlatform.iOS:
      case TargetPlatform.macOS:
      case TargetPlatform.windows:
      case TargetPlatform.linux:
        // We only have the web configuration from the React app.
        // If native apps are needed, please run `flutterfire configure`.
        return web;
      case TargetPlatform.fuchsia:
        throw UnsupportedError(
          'DefaultFirebaseOptions are not supported for this platform.',
        );
    }
  }

  static const FirebaseOptions web = FirebaseOptions(
    apiKey: 'AIzaSyBbeV0UBT98Q_2XT9H_XLhNV7bG72kJnq4',
    authDomain: 'rsi-vgs.firebaseapp.com',
    projectId: 'rsi-vgs',
    storageBucket: 'rsi-vgs.appspot.com',
    messagingSenderId: '294305445462',
    appId: '1:294305445462:web:fafc6a1df04bdc7b38adf7',
    measurementId: 'G-J8ZDDB5LGS',
  );
}
