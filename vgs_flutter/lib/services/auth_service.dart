import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/foundation.dart';

class AuthService {
  final FirebaseAuth _auth = FirebaseAuth.instance;

  Stream<User?> get authStateChanges => _auth.authStateChanges();

  User? get currentUser => _auth.currentUser;

  /// Equivalent to `handleWindowsLogin` in React
  Future<UserCredential?> signInWithMicrosoft() async {
    try {
      final provider = MicrosoftAuthProvider();
      provider.addScope('email');
      provider.setCustomParameters({
        'login_hint': 'user@rsi-visuals.com',
        'tenant': 'bd0aab2b-3a48-43cf-afc5-8eb63fc1c519',
      });

      if (kIsWeb) {
        return await _auth.signInWithPopup(provider);
      } else {
        return await _auth.signInWithProvider(provider);
      }
    } catch (e) {
      debugPrint("Problem logging in: $e");
      return null;
    }
  }

  Future<void> signOut() async {
    await _auth.signOut();
  }
}
