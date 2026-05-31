import 'package:flutter/material.dart';
import '../models/runway.dart';
import '../services/firestore_service.dart';

class ManageRunways extends StatefulWidget {
  final ValueChanged<Runway?> onRunwaySelected;

  const ManageRunways({super.key, required this.onRunwaySelected});

  @override
  State<ManageRunways> createState() => _ManageRunwaysState();
}

class _ManageRunwaysState extends State<ManageRunways> {
  final FirestoreService _firestoreService = FirestoreService();
  Runway? _selectedRunway;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        const Text(
          'Runway Table',
          style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 16),
        StreamBuilder<List<Runway>>(
          stream: _firestoreService.getRunwaysStream(),
          builder: (context, snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return const Center(child: CircularProgressIndicator());
            }
            if (snapshot.hasError) {
              return Center(child: Text('Error: ${snapshot.error}'));
            }

            final runways = snapshot.data ?? [];

            return SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: DataTable(
                showCheckboxColumn: false,
                columns: const [
                  DataColumn(label: Text('Runway Name')),
                  DataColumn(label: Text('ICAO')),
                  DataColumn(label: Text('Lights')),
                  DataColumn(label: Text('DH')),
                  DataColumn(label: Text('Edge Spacing')),
                  DataColumn(label: Text('GSOffsetX')),
                  DataColumn(label: Text('GSOffsetY')),
                  DataColumn(label: Text('Glide Slope')),
                  DataColumn(label: Text('TCH')),
                  DataColumn(label: Text('Width')),
                  DataColumn(label: Text('Metric?')),
                ],
                rows: runways.map((runway) {
                  final isSelected = _selectedRunway?.id == runway.id;
                  return DataRow(
                    selected: isSelected,
                    onSelectChanged: (selected) {
                      setState(() {
                        if (selected == true) {
                          _selectedRunway = runway;
                        } else {
                          _selectedRunway = null;
                        }
                        widget.onRunwaySelected(_selectedRunway);
                      });
                    },
                    cells: [
                      DataCell(Text(runway.id)),
                      DataCell(Text(runway.icao ?? '')),
                      DataCell(Text(runway.approachLights ?? '')),
                      DataCell(Text(runway.dh?.toString() ?? '')),
                      DataCell(Text(runway.edgeSpacing?.toString() ?? '')),
                      DataCell(Text(runway.gsOffsetX?.toString() ?? '')),
                      DataCell(Text(runway.gsOffsetY?.toString() ?? '')),
                      DataCell(Text(runway.glideSlope?.toString() ?? '')),
                      DataCell(Text(runway.tch?.toString() ?? '')),
                      DataCell(Text(runway.width?.toString() ?? '')),
                      DataCell(Text(runway.units?.toString() ?? '')),
                    ],
                  );
                }).toList(),
              ),
            );
          },
        ),
        const SizedBox(height: 16),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            ElevatedButton(
              onPressed: () {
                // TODO: Add Runway Modal
              },
              child: const Text('Add Runway'),
            ),
            ElevatedButton(
              onPressed: _selectedRunway != null
                  ? () {
                      // TODO: Edit Runway Modal
                    }
                  : null,
              child: const Text('Edit Runway'),
            ),
            ElevatedButton(
              style: ElevatedButton.styleFrom(backgroundColor: Colors.red),
              onPressed: _selectedRunway != null
                  ? () async {
                      await _firestoreService.deleteRunway(_selectedRunway!.id);
                      setState(() {
                        _selectedRunway = null;
                        widget.onRunwaySelected(null);
                      });
                    }
                  : null,
              child: const Text('Delete Runway', style: TextStyle(color: Colors.white)),
            ),
          ],
        ),
      ],
    );
  }
}
