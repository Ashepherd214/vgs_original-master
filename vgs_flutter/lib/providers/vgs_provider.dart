import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../models/aircraft.dart';
import '../models/runway.dart';
import '../models/vgs_data.dart';

class VgsNotifier extends Notifier<VgsData> {
  @override
  VgsData build() => VgsData.calculate();

  void setAircraft(Aircraft aircraft) {
    state = state.copyWith(aircraft: aircraft);
  }

  void setRunway(Runway runway) {
    state = state.copyWith(runway: runway);
  }

  void setXrvr(num xrvr) {
    state = state.copyWith(xrvr: xrvr);
  }

  void setCalcChoice(CalcChoice choice) {
    state = state.copyWith(calcChoice: choice);
  }

  void toggleUnits() {
    final newUnits = state.units == MeasurementUnit.imperial
        ? MeasurementUnit.metric
        : MeasurementUnit.imperial;
    state = state.copyWith(units: newUnits);
  }
}

final vgsProvider = NotifierProvider<VgsNotifier, VgsData>(() {
  return VgsNotifier();
});
