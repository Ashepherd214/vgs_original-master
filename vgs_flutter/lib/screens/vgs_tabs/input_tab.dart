import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../../providers/vgs_provider.dart';

class InputTab extends ConsumerWidget {
  const InputTab({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final vgsData = ref.watch(vgsProvider);
    final aircraft = vgsData.aircraft;
    final runway = vgsData.runway;

    return SingleChildScrollView(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              Text('Aircraft:\n${aircraft?.id ?? "Unknown"}', textAlign: TextAlign.center, style: const TextStyle(fontWeight: FontWeight.bold)),
              Text('Runway:\n${runway?.icao ?? "Unknown"}', textAlign: TextAlign.center, style: const TextStyle(fontWeight: FontWeight.bold)),
            ],
          ),
          const SizedBox(height: 32),
          
          Center(
            child: SizedBox(
              height: 200,
              child: _buildAircraftImage(aircraft?.id),
            ),
          ),
          
          const SizedBox(height: 32),
          Text('ze: ${aircraft?.ze ?? "N/A"}'),
          Text('xe: ${aircraft?.xe ?? "N/A"}'),
          Text('za: ${aircraft?.za ?? "N/A"}'),
          Text('xa: ${aircraft?.xa ?? "N/A"}'),
          Text('pitch angle: ${aircraft?.pitch ?? "N/A"}'),
          Text('max lookdown: ${aircraft?.lookdown ?? "N/A"}'),
          
          const SizedBox(height: 32),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              _infoBox('Aircraft Weight', aircraft?.weight?.toString() ?? "N/A"),
              _infoBox('Aircraft Speed', aircraft?.speed?.toString() ?? "N/A"),
              _infoBox('%CG', aircraft?.cg?.toString() ?? "N/A"),
              _infoBox('Flaps Setting', aircraft?.flaps?.toString() ?? "N/A"),
            ],
          ),
        ],
      ),
    );
  }

  Widget _infoBox(String title, String value) {
    return Column(
      children: [
        Text(title, style: const TextStyle(fontWeight: FontWeight.bold)),
        Text(value),
      ],
    );
  }

  Widget _buildAircraftImage(String? aircraftId) {
    if (aircraftId == null) {
      return const Center(child: Text('No aircraft selected.'));
    }

    final idLower = aircraftId.toLowerCase();
    String assetPath;
    if (idLower.contains('heli') || idLower.contains('sikorsky')) {
      assetPath = 'assets/img/HeliSide.jpg';
    } else {
      assetPath = 'assets/img/PlaneSide.jpg';
    }

    return Image.asset(
      assetPath,
      fit: BoxFit.contain,
      errorBuilder: (context, error, stackTrace) => const Center(child: Text('Image not found')),
    );
  }
}
