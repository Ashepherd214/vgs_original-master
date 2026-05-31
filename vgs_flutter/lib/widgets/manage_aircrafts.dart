import 'package:flutter/material.dart';
import '../models/aircraft.dart';
import '../services/firestore_service.dart';

class ManageAircrafts extends StatefulWidget {
  final ValueChanged<Aircraft?> onAircraftSelected;

  const ManageAircrafts({super.key, required this.onAircraftSelected});

  @override
  State<ManageAircrafts> createState() => _ManageAircraftsState();
}

class _ManageAircraftsState extends State<ManageAircrafts> {
  final FirestoreService _firestoreService = FirestoreService();
  Aircraft? _selectedAircraft;

  @override
  Widget build(BuildContext context) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        const Text(
          'Aircraft Table',
          style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 16),
        StreamBuilder<List<Aircraft>>(
          stream: _firestoreService.getAircraftsStream(),
          builder: (context, snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return const Center(child: CircularProgressIndicator());
            }
            if (snapshot.hasError) {
              return Center(child: Text('Error: ${snapshot.error}'));
            }

            final aircrafts = snapshot.data ?? [];

            return SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              child: DataTable(
                showCheckboxColumn: false,
                columns: const [
                  DataColumn(label: Text('Aircraft Name')),
                  DataColumn(label: Text('Xa')),
                  DataColumn(label: Text('Xe')),
                  DataColumn(label: Text('Za')),
                  DataColumn(label: Text('Ze')),
                  DataColumn(label: Text('CG')),
                  DataColumn(label: Text('Flaps')),
                  DataColumn(label: Text('Lookdown')),
                  DataColumn(label: Text('Pitch')),
                  DataColumn(label: Text('Speed')),
                  DataColumn(label: Text('Weight')),
                  DataColumn(label: Text('Metric?')),
                  DataColumn(label: Text('Type')),
                ],
                rows: aircrafts.map((aircraft) {
                  final isSelected = _selectedAircraft?.id == aircraft.id;
                  return DataRow(
                    selected: isSelected,
                    onSelectChanged: (selected) {
                      setState(() {
                        if (selected == true) {
                          _selectedAircraft = aircraft;
                        } else {
                          _selectedAircraft = null;
                        }
                        widget.onAircraftSelected(_selectedAircraft);
                      });
                    },
                    cells: [
                      DataCell(Text(aircraft.id)),
                      DataCell(Text(aircraft.xa?.toString() ?? '')),
                      DataCell(Text(aircraft.xe?.toString() ?? '')),
                      DataCell(Text(aircraft.za?.toString() ?? '')),
                      DataCell(Text(aircraft.ze?.toString() ?? '')),
                      DataCell(Text(aircraft.cg?.toString() ?? '')),
                      DataCell(Text(aircraft.flaps ?? '')),
                      DataCell(Text(aircraft.lookdown?.toString() ?? '')),
                      DataCell(Text(aircraft.pitch?.toString() ?? '')),
                      DataCell(Text(aircraft.speed?.toString() ?? '')),
                      DataCell(Text(aircraft.weight?.toString() ?? '')),
                      DataCell(Text(aircraft.unitsAir?.toString() ?? '')),
                      DataCell(Text(aircraft.airType ?? '')),
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
                // TODO: Add Aircraft Modal
              },
              child: const Text('Add Aircraft'),
            ),
            ElevatedButton(
              onPressed: _selectedAircraft != null
                  ? () {
                      // TODO: Edit Aircraft Modal
                    }
                  : null,
              child: const Text('Edit Aircraft'),
            ),
            ElevatedButton(
              style: ElevatedButton.styleFrom(backgroundColor: Colors.red),
              onPressed: _selectedAircraft != null
                  ? () async {
                      await _firestoreService.deleteAircraft(_selectedAircraft!.id);
                      setState(() {
                        _selectedAircraft = null;
                        widget.onAircraftSelected(null);
                      });
                    }
                  : null,
              child: const Text('Delete Aircraft', style: TextStyle(color: Colors.white)),
            ),
          ],
        ),
      ],
    );
  }
}
