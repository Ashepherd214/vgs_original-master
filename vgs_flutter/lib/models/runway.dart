class Runway {
  final String id;
  final String? icao;
  final String? approachLights;
  final num? dh;
  final num? edgeSpacing;
  final num? gsOffsetX;
  final num? gsOffsetY;
  final num? glideSlope;
  final num? tch;
  final num? width;
  final bool? units;

  Runway({
    required this.id,
    this.icao,
    this.approachLights,
    this.dh,
    this.edgeSpacing,
    this.gsOffsetX,
    this.gsOffsetY,
    this.glideSlope,
    this.tch,
    this.width,
    this.units,
  });

  factory Runway.fromMap(String id, Map<String, dynamic> data) {
    return Runway(
      id: id,
      icao: data['ICAO']?.toString(),
      approachLights: data['ApproachLights']?.toString(),
      dh: data['DH'] as num?,
      edgeSpacing: data['EdgeSpacing'] as num?,
      gsOffsetX: data['GSOffsetX'] as num?,
      gsOffsetY: data['GSOffsetY'] as num?,
      glideSlope: data['GlideSlope'] as num?,
      tch: data['TCH'] as num?,
      width: data['Width'] as num?,
      units: data['Units'] is bool ? data['Units'] as bool : (data['Units'] == 'true' || data['Units'] == true),
    );
  }

  Map<String, dynamic> toMap() {
    return {
      'ICAO': icao,
      'ApproachLights': approachLights,
      'DH': dh,
      'EdgeSpacing': edgeSpacing,
      'GSOffsetX': gsOffsetX,
      'GSOffsetY': gsOffsetY,
      'GlideSlope': glideSlope,
      'TCH': tch,
      'Width': width,
      'Units': units,
    };
  }
}
