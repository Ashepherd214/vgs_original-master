import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:screenshot/screenshot.dart';

import '../../models/vgs_data.dart';
import '../../providers/vgs_provider.dart';
import '../../widgets/vgs_visualizer.dart';

class OutputTab extends ConsumerWidget {
  final ScreenshotController screenshotController;

  const OutputTab({super.key, required this.screenshotController});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final vgsData = ref.watch(vgsProvider);

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16.0),
      child: Screenshot(
        controller: screenshotController,
        child: Container(
          color: Theme.of(context).scaffoldBackgroundColor,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text('Aircraft: ${vgsData.aircraft?.id ?? "Unknown"}', style: const TextStyle(fontWeight: FontWeight.bold)),
                      Text('Runway: ${vgsData.runway?.icao ?? "Unknown"}', style: const TextStyle(fontWeight: FontWeight.bold)),
                    ],
                  ),
                  Column(
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      Text('Units in: ${vgsData.units == MeasurementUnit.imperial ? 'Imperial' : 'Metric'}'),
                      ElevatedButton(
                        onPressed: () {
                          ref.read(vgsProvider.notifier).toggleUnits();
                        },
                        child: const Text('Change Units'),
                      ),
                    ],
                  ),
                ],
              ),
              const Divider(height: 32),
              
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceAround,
                children: [
                  Text('xAhead: ${vgsData.currentXahead.toStringAsFixed(2)}', style: const TextStyle(fontSize: 16)),
                  Text('xBeyond: ${vgsData.currentXbeyond.toStringAsFixed(2)}', style: const TextStyle(fontSize: 16)),
                  Text('FOV: ${vgsData.fov.toStringAsFixed(2)}', style: const TextStyle(fontSize: 16)),
                ],
              ),
              const SizedBox(height: 16),
              
              Wrap(
                spacing: 8.0,
                runSpacing: 8.0,
                alignment: WrapAlignment.center,
                children: [
                  _buildCalcChoiceButton(ref, vgsData, CalcChoice.zeroCal, '0 Offset: Calc TCH'),
                  _buildCalcChoiceButton(ref, vgsData, CalcChoice.realCal, 'real Offset: Calc TCH'),
                  _buildCalcChoiceButton(ref, vgsData, CalcChoice.zeroTCH, '0 Offset: Pub TCH'),
                  _buildCalcChoiceButton(ref, vgsData, CalcChoice.realTCH, 'real Offset: Pub TCH'),
                ],
              ),
              
              const SizedBox(height: 32),
              // Graphical Output Visuals
              VgsVisualizer(vgsData: vgsData),
              const SizedBox(height: 32),
              
              // Brief Parameters Summary
              Card(
                child: Padding(
                  padding: const EdgeInsets.all(16.0),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text('Key Parameters Summary', style: TextStyle(fontWeight: FontWeight.bold, fontSize: 18)),
                      const SizedBox(height: 8),
                      Text('Decision Height: ${vgsData.runway?.dh?.toStringAsFixed(2) ?? "0.00"}'),
                      Text('Pilot eye above ground (zeg): ${vgsData.zeg.toStringAsFixed(2)}'),
                      Text('GS antenna above ground (zag): ${vgsData.zag.toStringAsFixed(2)}'),
                      Text('Slant RVR (xrvr): ${vgsData.xrvr.toStringAsFixed(2)}'),
                      Text('Effective ground RVR (gndrvr): ${vgsData.gndrvr.toStringAsFixed(2)}'),
                      Text('Threshold crossing height (TCH): ${vgsData.runway?.tch?.toStringAsFixed(2) ?? "0.00"}'),
                    ],
                  ),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildCalcChoiceButton(WidgetRef ref, VgsData currentData, CalcChoice choice, String label) {
    final isSelected = currentData.calcChoice == choice;
    return ElevatedButton(
      style: ElevatedButton.styleFrom(
        backgroundColor: isSelected ? Colors.blue.shade800 : Colors.blue,
        foregroundColor: Colors.white,
      ),
      onPressed: () {
        ref.read(vgsProvider.notifier).setCalcChoice(choice);
      },
      child: Text(label),
    );
  }
}
