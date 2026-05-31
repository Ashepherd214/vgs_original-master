import 'dart:math';

import 'aircraft.dart';
import 'runway.dart';

enum CalcChoice {
  zeroCal,
  realCal,
  zeroTCH,
  realTCH,
}

enum MeasurementUnit {
  imperial,
  metric,
}

class VgsData {
  final Aircraft? aircraft;
  final Runway? runway;
  
  final num xrvr;
  final CalcChoice calcChoice;
  final MeasurementUnit units;

  // Computed Values
  final double xcutoff;
  final double zeg;
  final double zag;
  final double xanteye;
  final double obseg;
  final double gndrvr;
  final double fov;
  
  final double xaxreal;
  final double xax0;

  final double xthres0;
  final double xthresreal;
  final double xeyethres0;
  final double xeyethresreal;
  
  final double xahead0;
  final double xaheadreal;
  final double xbeyond0;
  final double xbeyondreal;

  final double gsxOffsetTCH;
  final double xeyethres0TCH;
  final double xahead0TCH;
  final double xbeyond0TCH;

  final double xeyethresrealTCH;
  final double xaheadrealTCH;
  final double xbeyondrealTCH;

  VgsData._({
    required this.aircraft,
    required this.runway,
    required this.xrvr,
    required this.calcChoice,
    required this.units,
    required this.xcutoff,
    required this.zeg,
    required this.zag,
    required this.xanteye,
    required this.obseg,
    required this.gndrvr,
    required this.fov,
    required this.xaxreal,
    required this.xax0,
    required this.xthres0,
    required this.xthresreal,
    required this.xeyethres0,
    required this.xeyethresreal,
    required this.xahead0,
    required this.xaheadreal,
    required this.xbeyond0,
    required this.xbeyondreal,
    required this.gsxOffsetTCH,
    required this.xeyethres0TCH,
    required this.xahead0TCH,
    required this.xbeyond0TCH,
    required this.xeyethresrealTCH,
    required this.xaheadrealTCH,
    required this.xbeyondrealTCH,
  });

  factory VgsData.calculate({
    Aircraft? aircraft,
    Runway? runway,
    num xrvr = 1200,
    CalcChoice calcChoice = CalcChoice.realCal,
    MeasurementUnit units = MeasurementUnit.imperial,
  }) {
    if (aircraft == null || runway == null) {
      return VgsData._empty(
        aircraft: aircraft,
        runway: runway,
        xrvr: xrvr,
        calcChoice: calcChoice,
        units: units,
      );
    }

    final radToDeg = pi / 180;
    
    // Fallbacks to 0 for missing values to prevent crashes during partial data
    final lookdown = aircraft.lookdown?.toDouble() ?? 0.0;
    final pitch = aircraft.pitch?.toDouble() ?? 0.0;
    
    final dh = runway.dh?.toDouble() ?? 0.0;
    final ze = aircraft.ze?.toDouble() ?? 0.0;
    final xe = aircraft.xe?.toDouble() ?? 0.0;
    final za = aircraft.za?.toDouble() ?? 0.0;
    final xa = aircraft.xa?.toDouble() ?? 0.0;
    
    final gsx = runway.gsOffsetX?.toDouble() ?? 0.0;
    final gsy = runway.gsOffsetY?.toDouble() ?? 0.0;
    final glideSlope = runway.glideSlope?.toDouble() ?? 3.0;
    final tch = runway.tch?.toDouble() ?? 0.0;

    final xcutoff = lookdown - pitch;

    final zeg = dh +
        ze * cos(pitch * radToDeg) +
        xe * sin(pitch * radToDeg);

    final zag = dh +
        za * cos(pitch * radToDeg) +
        xa * sin(pitch * radToDeg);

    final xanteye = (xa - xe) * cos(pitch * radToDeg) +
        (ze - za) * sin(pitch * radToDeg);

    // Prevent divide by zero
    final tanXcutoff = tan(xcutoff * radToDeg);
    final obseg = tanXcutoff != 0 ? zeg / tanXcutoff : 0.0;

    // To prevent NaN if zeg > xrvr
    final gndrvr = sqrt(max(0.0, pow(xrvr, 2) - pow(zeg, 2)));
    final fov = gndrvr - obseg;

    final tanGlideSlope = tan(radToDeg * glideSlope);
    
    final xaxrealVal = tanGlideSlope != 0 
      ? sqrt(max(0.0, pow(zag / tanGlideSlope, 2) - pow(gsy, 2)))
      : 0.0;
      
    final xax0Val = tanGlideSlope != 0 ? zag / tanGlideSlope : 0.0;

    final xthres0 = xax0Val - gsx;
    final xthresreal = xaxrealVal - gsx;
    final xeyethres0 = xthres0 + xanteye;
    final xeyethresreal = xthresreal + xanteye;
    final xahead0 = xthres0 - obseg;
    final xbeyond0 = fov - xahead0.abs();
    final xaheadreal = xthresreal - obseg;
    final xbeyondreal = fov - xaheadreal.abs();

    final gsxOffsetTCH = tanGlideSlope != 0 ? tch / tanGlideSlope : 0.0;

    final xeyethres0TCH = xax0Val - gsxOffsetTCH + xanteye;
    final xahead0TCH = xeyethres0TCH - obseg;
    final xbeyond0TCH = fov - xahead0TCH;

    final xeyethresrealTCH = xaxrealVal - gsxOffsetTCH + xanteye;
    final xaheadrealTCH = xeyethresrealTCH - obseg;
    final xbeyondrealTCH = fov - xaheadrealTCH;

    return VgsData._(
      aircraft: aircraft,
      runway: runway,
      xrvr: xrvr,
      calcChoice: calcChoice,
      units: units,
      xcutoff: xcutoff,
      zeg: zeg,
      zag: zag,
      xanteye: xanteye,
      obseg: obseg,
      gndrvr: gndrvr,
      fov: fov,
      xaxreal: xaxrealVal,
      xax0: xax0Val,
      xthres0: xthres0,
      xthresreal: xthresreal,
      xeyethres0: xeyethres0,
      xeyethresreal: xeyethresreal,
      xahead0: xahead0,
      xaheadreal: xaheadreal,
      xbeyond0: xbeyond0,
      xbeyondreal: xbeyondreal,
      gsxOffsetTCH: gsxOffsetTCH,
      xeyethres0TCH: xeyethres0TCH,
      xahead0TCH: xahead0TCH,
      xbeyond0TCH: xbeyond0TCH,
      xeyethresrealTCH: xeyethresrealTCH,
      xaheadrealTCH: xaheadrealTCH,
      xbeyondrealTCH: xbeyondrealTCH,
    );
  }

  factory VgsData._empty({
    Aircraft? aircraft,
    Runway? runway,
    num xrvr = 1200,
    CalcChoice calcChoice = CalcChoice.realCal,
    MeasurementUnit units = MeasurementUnit.imperial,
  }) {
    return VgsData._(
      aircraft: aircraft,
      runway: runway,
      xrvr: xrvr,
      calcChoice: calcChoice,
      units: units,
      xcutoff: 0.0,
      zeg: 0.0,
      zag: 0.0,
      xanteye: 0.0,
      obseg: 0.0,
      gndrvr: 0.0,
      fov: 0.0,
      xaxreal: 0.0,
      xax0: 0.0,
      xthres0: 0.0,
      xthresreal: 0.0,
      xeyethres0: 0.0,
      xeyethresreal: 0.0,
      xahead0: 0.0,
      xaheadreal: 0.0,
      xbeyond0: 0.0,
      xbeyondreal: 0.0,
      gsxOffsetTCH: 0.0,
      xeyethres0TCH: 0.0,
      xahead0TCH: 0.0,
      xbeyond0TCH: 0.0,
      xeyethresrealTCH: 0.0,
      xaheadrealTCH: 0.0,
      xbeyondrealTCH: 0.0,
    );
  }

  double get currentXahead {
    switch (calcChoice) {
      case CalcChoice.zeroCal:
        return xahead0;
      case CalcChoice.realCal:
        return xaheadreal;
      case CalcChoice.zeroTCH:
        return xahead0TCH;
      case CalcChoice.realTCH:
        return xaheadrealTCH;
    }
  }

  double get currentXbeyond {
    switch (calcChoice) {
      case CalcChoice.zeroCal:
        return xbeyond0;
      case CalcChoice.realCal:
        return xbeyondreal;
      case CalcChoice.zeroTCH:
        return xbeyond0TCH;
      case CalcChoice.realTCH:
        return xbeyondrealTCH;
    }
  }

  VgsData copyWith({
    Aircraft? aircraft,
    Runway? runway,
    num? xrvr,
    CalcChoice? calcChoice,
    MeasurementUnit? units,
  }) {
    return VgsData.calculate(
      aircraft: aircraft ?? this.aircraft,
      runway: runway ?? this.runway,
      xrvr: xrvr ?? this.xrvr,
      calcChoice: calcChoice ?? this.calcChoice,
      units: units ?? this.units,
    );
  }
}
