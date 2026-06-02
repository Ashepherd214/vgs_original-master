import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:screenshot/screenshot.dart';

import '../../providers/vgs_provider.dart';

class ParametersTab extends ConsumerWidget {
  final ScreenshotController screenshotController;

  const ParametersTab({super.key, required this.screenshotController});

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
              Center(
                child: SizedBox(
                  height: 250,
                  child: Image.asset(
                    'assets/img/Outputs Variable chart.png',
                    fit: BoxFit.contain,
                    errorBuilder: (context, error, stackTrace) => const Center(child: Text('Chart image not found')),
                  ),
                ),
              ),
              const SizedBox(height: 32),
              
              Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('Decision Height: ${vgsData.runway?.dh?.toStringAsFixed(2) ?? "0.00"}'),
                        const SizedBox(height: 8),
                        Text('Pilot\'s eye above ground (zeg): ${vgsData.zeg.toStringAsFixed(2)}'),
                        Text('Ground Segment antenna above ground (zag): ${vgsData.zag.toStringAsFixed(2)}'),
                        const SizedBox(height: 8),
                        Text('Horizontal distance of eye to ground segment (xanteye): ${vgsData.xanteye.toStringAsFixed(2)}'),
                        Text('Obscured Segment (obseg): ${vgsData.obseg.toStringAsFixed(2)}'),
                        const SizedBox(height: 8),
                        Text('Aircraft ground segment to Threshold (xthres): ${vgsData.xthresreal.toStringAsFixed(2)}'),
                        Text('Eyepoint to threshold (xeyethres): ${vgsData.xeyethresreal.toStringAsFixed(2)}'),
                        const SizedBox(height: 8),
                        Text('Slant RVR (xrvr): ${vgsData.xrvr}'),
                      ],
                    ),
                  ),
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('Effective ground RVR (gndrvr): ${vgsData.gndrvr.toStringAsFixed(2)}'),
                        const SizedBox(height: 8),
                        Text('Threshold crossing height (TCH): ${vgsData.runway?.tch?.toStringAsFixed(2) ?? "0.00"}'),
                        const SizedBox(height: 8),
                        Text('Field of view (FOV): ${vgsData.fov.toStringAsFixed(2)}'),
                        const SizedBox(height: 8),
                        Text('Transmitter antenna horizontal offset (xax): ${vgsData.xaxreal.toStringAsFixed(2)}'),
                        Text('Cutoff angle (xcutoff): ${vgsData.xcutoff.toStringAsFixed(2)}'),
                        const SizedBox(height: 8),
                        Text('Visible before threshold (xahead): ${vgsData.currentXahead.toStringAsFixed(2)}'),
                        Text('Visible after threshold (xbeyond): ${vgsData.currentXbeyond.toStringAsFixed(2)}'),
                      ],
                    ),
                  ),
                ],
              )
            ],
          ),
        ),
      ),
    );
  }
}
