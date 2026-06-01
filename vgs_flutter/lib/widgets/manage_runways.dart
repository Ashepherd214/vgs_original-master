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
  late Stream<List<Runway>> _runwaysStream;

  @override
  void initState() {
    super.initState();
    _runwaysStream = _firestoreService.getRunwaysStream();
  }

  void _showRunwayModal({Runway? runway}) {
    final isEditing = runway != null;
    final formKey = GlobalKey<FormState>();

    String id = runway?.id ?? '';
    String icao = runway?.icao ?? '';
    String approachLights = runway?.approachLights ?? '';
    String dh = runway?.dh?.toString() ?? '';
    String edgeSpacing = runway?.edgeSpacing?.toString() ?? '';
    String gsOffsetX = runway?.gsOffsetX?.toString() ?? '';
    String gsOffsetY = runway?.gsOffsetY?.toString() ?? '';
    String glideSlope = runway?.glideSlope?.toString() ?? '';
    String tch = runway?.tch?.toString() ?? '';
    String width = runway?.width?.toString() ?? '';
    bool units = runway?.units ?? false;

    showDialog(
      context: context,
      builder: (context) {
        return StatefulBuilder(builder: (context, setModalState) {
          return AlertDialog(
            title: Text(isEditing ? 'Edit Runway' : 'Add Runway'),
            content: SingleChildScrollView(
              child: Form(
                key: formKey,
                child: Column(
                  mainAxisSize: MainAxisSize.min,
                  children: [
                    TextFormField(
                      initialValue: id,
                      decoration: const InputDecoration(labelText: 'Runway Name (ID)'),
                      readOnly: isEditing,
                      validator: (value) => value == null || value.isEmpty ? 'Required' : null,
                      onSaved: (value) => id = value!,
                    ),
                    TextFormField(
                      initialValue: icao,
                      decoration: const InputDecoration(labelText: 'ICAO'),
                      onSaved: (value) => icao = value ?? '',
                    ),
                    TextFormField(
                      initialValue: approachLights,
                      decoration: const InputDecoration(labelText: 'Approach Lights'),
                      onSaved: (value) => approachLights = value ?? '',
                    ),
                    TextFormField(
                      initialValue: dh,
                      decoration: const InputDecoration(labelText: 'DH'),
                      keyboardType: const TextInputType.numberWithOptions(decimal: true),
                      onSaved: (value) => dh = value ?? '',
                    ),
                    TextFormField(
                      initialValue: edgeSpacing,
                      decoration: const InputDecoration(labelText: 'Edge Spacing'),
                      keyboardType: const TextInputType.numberWithOptions(decimal: true),
                      onSaved: (value) => edgeSpacing = value ?? '',
                    ),
                    TextFormField(
                      initialValue: gsOffsetX,
                      decoration: const InputDecoration(labelText: 'GS Offset X'),
                      keyboardType: const TextInputType.numberWithOptions(decimal: true),
                      onSaved: (value) => gsOffsetX = value ?? '',
                    ),
                    TextFormField(
                      initialValue: gsOffsetY,
                      decoration: const InputDecoration(labelText: 'GS Offset Y'),
                      keyboardType: const TextInputType.numberWithOptions(decimal: true),
                      onSaved: (value) => gsOffsetY = value ?? '',
                    ),
                    TextFormField(
                      initialValue: glideSlope,
                      decoration: const InputDecoration(labelText: 'Glide Slope'),
                      keyboardType: const TextInputType.numberWithOptions(decimal: true),
                      onSaved: (value) => glideSlope = value ?? '',
                    ),
                    TextFormField(
                      initialValue: tch,
                      decoration: const InputDecoration(labelText: 'TCH'),
                      keyboardType: const TextInputType.numberWithOptions(decimal: true),
                      onSaved: (value) => tch = value ?? '',
                    ),
                    TextFormField(
                      initialValue: width,
                      decoration: const InputDecoration(labelText: 'Width'),
                      keyboardType: const TextInputType.numberWithOptions(decimal: true),
                      onSaved: (value) => width = value ?? '',
                    ),
                    SwitchListTile(
                      title: const Text('Metric Units?'),
                      value: units,
                      onChanged: (val) {
                        setModalState(() {
                          units = val;
                        });
                      },
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
                    final newRunway = Runway(
                      id: id,
                      icao: icao.isEmpty ? null : icao,
                      approachLights: approachLights.isEmpty ? null : approachLights,
                      dh: num.tryParse(dh),
                      edgeSpacing: num.tryParse(edgeSpacing),
                      gsOffsetX: num.tryParse(gsOffsetX),
                      gsOffsetY: num.tryParse(gsOffsetY),
                      glideSlope: num.tryParse(glideSlope),
                      tch: num.tryParse(tch),
                      width: num.tryParse(width),
                      units: units,
                    );
                    await _firestoreService.addRunway(newRunway);
                    if (context.mounted) {
                      Navigator.of(context).pop();
                      if (isEditing && _selectedRunway?.id == newRunway.id) {
                        setState(() {
                          _selectedRunway = newRunway;
                          widget.onRunwaySelected(_selectedRunway);
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
          'Runway Table',
          style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 16),
        StreamBuilder<List<Runway>>(
          stream: _runwaysStream,
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
              onPressed: () => _showRunwayModal(),
              child: const Text('Add Runway'),
            ),
            ElevatedButton(
              onPressed: _selectedRunway != null
                  ? () => _showRunwayModal(runway: _selectedRunway)
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
