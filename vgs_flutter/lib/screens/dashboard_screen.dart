import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import '../models/aircraft.dart';
import '../models/runway.dart';
import '../widgets/manage_aircrafts.dart';
import '../widgets/manage_runways.dart';
import '../widgets/navigation_bar.dart';

class DashboardScreen extends StatefulWidget {
  const DashboardScreen({super.key});

  @override
  State<DashboardScreen> createState() => _DashboardScreenState();
}

class _DashboardScreenState extends State<DashboardScreen> {
  Aircraft? _selectedAircraft;
  Runway? _selectedRunway;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Dashboard')),
      drawer: const CustomNavigationBar(),
      body: SingleChildScrollView(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              ManageAircrafts(
                onAircraftSelected: (aircraft) {
                  setState(() {
                    _selectedAircraft = aircraft;
                  });
                },
              ),
              const SizedBox(height: 32),
              ManageRunways(
                onRunwaySelected: (runway) {
                  setState(() {
                    _selectedRunway = runway;
                  });
                },
              ),
              const SizedBox(height: 32),
              ElevatedButton(
                style: ElevatedButton.styleFrom(
                  padding: const EdgeInsets.symmetric(vertical: 16),
                ),
                onPressed: () {
                  context.push('/vgs', extra: {
                    'aircraft': _selectedAircraft,
                    'runway': _selectedRunway,
                  });
                },
                child: const Text('Calculate VGS', style: TextStyle(fontSize: 20)),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
