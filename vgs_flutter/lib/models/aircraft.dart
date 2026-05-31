class Aircraft {
  final String id;
  final num? xa;
  final num? xe;
  final num? za;
  final num? ze;
  final num? cg;
  final String? flaps;
  final num? lookdown;
  final num? pitch;
  final num? speed;
  final num? weight;
  final bool? unitsAir; // True = metric, False = imperial, or string in react? React code had `unitsAir: doc.data().unitsAir`
  final String? airType;

  Aircraft({
    required this.id,
    this.xa,
    this.xe,
    this.za,
    this.ze,
    this.cg,
    this.flaps,
    this.lookdown,
    this.pitch,
    this.speed,
    this.weight,
    this.unitsAir,
    this.airType,
  });

  factory Aircraft.fromMap(String id, Map<String, dynamic> data) {
    return Aircraft(
      id: id,
      xa: data['Xa'] as num?,
      xe: data['Xe'] as num?,
      za: data['Za'] as num?,
      ze: data['Ze'] as num?,
      cg: data['cg'] as num?,
      flaps: data['flaps']?.toString(),
      lookdown: data['lookdown'] as num?,
      pitch: data['pitch'] as num?,
      speed: data['speed'] as num?,
      weight: data['weight'] as num?,
      unitsAir: data['unitsAir'] is bool ? data['unitsAir'] as bool : (data['unitsAir'] == 'true' || data['unitsAir'] == true),
      airType: data['airType']?.toString(),
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'Xa': xa,
      'Xe': xe,
      'Za': za,
      'Ze': ze,
      'cg': cg,
      'flaps': flaps,
      'lookdown': lookdown,
      'pitch': pitch,
      'speed': speed,
      'weight': weight,
      'unitsAir': unitsAir,
      'airType': airType,
    };
  }
}
