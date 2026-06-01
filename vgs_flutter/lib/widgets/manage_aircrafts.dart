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
  late Stream<List<Aircraft>> _aircraftsStream;

  @override
  void initState() {
    super.initState();
    _aircraftsStream = _firestoreService.getAircraftsStream();
  }

  void _showAircraftModal({Aircraft? aircraft}) {
    final isEditing = aircraft != null;
    final formKey = GlobalKey<FormState>();

    String id = aircraft?.id ?? '';
    String xa = aircraft?.xa?.toString() ?? '';
    String xe = aircraft?.xe?.toString() ?? '';
    String za = aircraft?.za?.toString() ?? '';
    String ze = aircraft?.ze?.toString() ?? '';
    String cg = aircraft?.cg?.toString() ?? '';
    String flaps = aircraft?.flaps ?? '';
    String lookdown = aircraft?.lookdown?.toString() ?? '';
    String pitch = aircraft?.pitch?.toString() ?? '';
    String speed = aircraft?.speed?.toString() ?? '';
    String weight = aircraft?.weight?.toString() ?? '';
    bool unitsAir = aircraft?.unitsAir ?? false;
    String airType = aircraft?.airType ?? '';

    showDialog(
      context: context,
      builder: (context) {
        return StatefulBuilder(builder: (context, setModalState) {
          return AlertDialog(
            title: Text(isEditing ? 'Edit Aircraft' : 'Add Aircraft'),
            content: SingleChildScrollView(
              child: Form(
                key: formKey,
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    TextFormField(
                      initialValue: id,
                      decoration: const InputDecoration(labelText: 'Aircraft Name (ID)'),
                      readOnly: isEditing,
                      validator: (value) => value == null || value.isEmpty ? 'Required' : null,
                      onSaved: (value) => id = value!,
                    ),
                    TextFormField(
                      initialValue: xa,
                      decoration: const InputDecoration(labelText: 'Xa'),
                      keyboardType: const TextInputType.numberWithOptions(decimal: true),
                      onSaved: (value) => xa = value ?? '',
                    ),
                    TextFormField(
                      initialValue: xe,
                      decoration: const InputDecoration(labelText: 'Xe'),
                      keyboardType: const TextInputType.numberWithOptions(decimal: true),
                      onSaved: (value) => xe = value ?? '',
                    ),
                    TextFormField(
                      initialValue: za,
                      decoration: const InputDecoration(labelText: 'Za'),
                      keyboardType: const TextInputType.numberWithOptions(decimal: true),
                      onSaved: (value) => za = value ?? '',
                    ),
                    TextFormField(
                      initialValue: ze,
                      decoration: const InputDecoration(labelText: 'Ze'),
                      keyboardType: const TextInputType.numberWithOptions(decimal: true),
                      onSaved: (value) => ze = value ?? '',
                    ),
                    TextFormField(
                      initialValue: cg,
                      decoration: const InputDecoration(labelText: 'CG'),
                      keyboardType: const TextInputType.numberWithOptions(decimal: true),
                      onSaved: (value) => cg = value ?? '',
                    ),
                    TextFormField(
                      initialValue: flaps,
                      decoration: const InputDecoration(labelText: 'Flaps'),
                      onSaved: (value) => flaps = value ?? '',
                    ),
                    TextFormField(
                      initialValue: lookdown,
                      decoration: const InputDecoration(labelText: 'Lookdown'),
                      keyboardType: const TextInputType.numberWithOptions(decimal: true),
                      onSaved: (value) => lookdown = value ?? '',
                    ),
                    TextFormField(
                      initialValue: pitch,
                      decoration: const InputDecoration(labelText: 'Pitch'),
                      keyboardType: const TextInputType.numberWithOptions(decimal: true),
                      onSaved: (value) => pitch = value ?? '',
                    ),
                    TextFormField(
                      initialValue: speed,
                      decoration: const InputDecoration(labelText: 'Speed'),
                      keyboardType: const TextInputType.numberWithOptions(decimal: true),
                      onSaved: (value) => speed = value ?? '',
                    ),
                    TextFormField(
                      initialValue: weight,
                      decoration: const InputDecoration(labelText: 'Weight'),
                      keyboardType: const TextInputType.numberWithOptions(decimal: true),
                      onSaved: (value) => weight = value ?? '',
                    ),
                    SwitchListTile(
                      title: const Text('Metric Units?'),
                      value: unitsAir,
                      onChanged: (val) {
                        setModalState(() {
                          unitsAir = val;
                        });
                      },
                    ),
                    TextFormField(
                      initialValue: airType,
                      decoration: const InputDecoration(labelText: 'Type'),
                      onSaved: (value) => airType = value ?? '',
                    ),
                  ],
                ),
              ),
            ),
            actions: [
              TextButton(
                onPressed: () => Navigator.of(context).pop(),
                child: const Text('Cancel'),
              ),
              ElevatedButton(
                onPressed: () async {
                  if (formKey.currentState!.validate()) {
                    formKey.currentState!.save();
                    final newAircraft = Aircraft(
                      id: id,
                      xa: num.tryParse(xa),
                      xe: num.tryParse(xe),
                      za: num.tryParse(za),
                      ze: num.tryParse(ze),
                      cg: num.tryParse(cg),
                      flaps: flaps.isEmpty ? null : flaps,
                      lookdown: num.tryParse(lookdown),
                      pitch: num.tryParse(pitch),
                      speed: num.tryParse(speed),
                      weight: num.tryParse(weight),
                      unitsAir: unitsAir,
                      airType: airType.isEmpty ? null : airType,
                    );
                    await _firestoreService.addAircraft(newAircraft);
                    if (context.mounted) {
                      Navigator.of(context).pop();
                      if (isEditing && _selectedAircraft?.id == newAircraft.id) {
                        setState(() {
                          _selectedAircraft = newAircraft;
                          widget.onAircraftSelected(_selectedAircraft);
                        });
                      }
                    }
                  }
                },
                child: const Text('Save'),
              ),
            ],
          );
        });
      },
    );
  }

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
          stream: _aircraftsStream,
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
              onPressed: () => _showAircraftModal(),
              child: const Text('Add Aircraft'),
            ),
            ElevatedButton(
              onPressed: _selectedAircraft != null
                  ? () => _showAircraftModal(aircraft: _selectedAircraft)
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
