import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import '../models/aircraft.dart';
import '../models/runway.dart';
import '../providers/vgs_provider.dart';
import '../widgets/navigation_bar.dart';
import 'vgs_tabs/output_tab.dart';
import 'vgs_tabs/input_tab.dart';
import 'vgs_tabs/parameters_tab.dart';

class VgsScreen extends ConsumerStatefulWidget {
  final Aircraft? aircraft;
  final Runway? runway;

  const VgsScreen({super.key, this.aircraft, this.runway});

  @override
  ConsumerState<VgsScreen> createState() => _VgsScreenState();
}

class _VgsScreenState extends ConsumerState<VgsScreen> {
  @override
  void initState() {
    super.initState();
    // Initialize the provider with the passed aircraft and runway on mount
    WidgetsBinding.instance.addPostFrameCallback((_) {
      if (widget.aircraft != null) {
        ref.read(vgsProvider.notifier).setAircraft(widget.aircraft!);
      }
      if (widget.runway != null) {
        ref.read(vgsProvider.notifier).setRunway(widget.runway!);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    if (widget.aircraft == null || widget.runway == null) {
      return Scaffold(
        appBar: AppBar(title: const Text('VGS Calculation')),
        drawer: const CustomNavigationBar(),
        body: const Center(
          child: Text('Please select an Aircraft and a Runway from the Dashboard.'),
        ),
      );
    }

    return DefaultTabController(
      length: 3,
      child: Scaffold(
        appBar: AppBar(
          title: const Text('VGS Calculation'),
          bottom: const TabBar(
            tabs: [
              Tab(text: 'Output'),
              Tab(text: 'Input'),
              Tab(text: 'Parameters'),
            ],
          ),
        ),
        drawer: const CustomNavigationBar(),
        body: const TabBarView(
          children: [
            OutputTab(),
            InputTab(),
            ParametersTab(),
          ],
        ),
      ),
    );
  }
}
