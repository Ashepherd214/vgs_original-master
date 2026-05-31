import 'package:flutter/foundation.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import '../models/aircraft.dart';
import '../models/runway.dart';

class FirestoreService {
  final FirebaseFirestore _firestore = FirebaseFirestore.instance;

  /// Equivalent to generateUserDocument in React
  Future<void> generateUserDocument({
    required String uid,
    required String firstName,
    required String lastName,
    required String email,
  }) async {
    debugPrint("Info for generating user doc: $uid $firstName $lastName $email");
    try {
      final userRef = _firestore.collection('users').doc(uid);
      await userRef.set({
        'firstName': firstName,
        'lastName': lastName,
        'email': email,
      }, SetOptions(merge: true));
    } catch (e) {
      debugPrint("Error creating user document: $e");
    }
  }

  /// Equivalent to getUserDocument in React
  Future<Map<String, dynamic>?> getUserDocument(String uid) async {
    try {
      final userRef = _firestore.collection('users').doc(uid);
      final snapshot = await userRef.get();
      if (snapshot.exists) {
        return {
          'uid': uid,
          ...?snapshot.data(),
        };
      }
      return null;
    } catch (e) {
      debugPrint("Error fetching user: $e");
      return null;
    }
  }

  // Aircraft operations
  Stream<List<Aircraft>> getAircraftsStream() {
    return _firestore.collection('Aircrafts').snapshots().map((snapshot) {
      return snapshot.docs.map((doc) => Aircraft.fromMap(doc.id, doc.data())).toList();
    });
  }

  Future<void> addAircraft(Aircraft aircraft) async {
    await _firestore.collection('Aircrafts').doc(aircraft.id).set(aircraft.toMap());
  }

  Future<void> deleteAircraft(String id) async {
    await _firestore.collection('Aircrafts').doc(id).delete();
  }

  // Runway operations
  Stream<List<Runway>> getRunwaysStream() {
    return _firestore.collection('Runways').snapshots().map((snapshot) {
      return snapshot.docs.map((doc) => Runway.fromMap(doc.id, doc.data())).toList();
    });
  }

  Future<void> addRunway(Runway runway) async {
    await _firestore.collection('Runways').doc(runway.id).set(runway.toMap());
  }

  Future<void> deleteRunway(String id) async {
    await _firestore.collection('Runways').doc(id).delete();
  }
}
