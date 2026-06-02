import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:screenshot/screenshot.dart';
import 'package:printing/printing.dart';
import 'package:pdf/pdf.dart';
import 'package:pdf/widgets.dart' as pw;

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

class _VgsScreenState extends ConsumerState<VgsScreen> with SingleTickerProviderStateMixin {
  late TabController _tabController;
  final ScreenshotController _outputScreenshot = ScreenshotController();
  final ScreenshotController _inputScreenshot = ScreenshotController();
  final ScreenshotController _paramScreenshot = ScreenshotController();

  @override
  void initState() {
    super.initState();
    _tabController = TabController(length: 3, vsync: this);

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
  void dispose() {
    _tabController.dispose();
    super.dispose();
  }

  Future<void> _printCurrentTab() async {
    final activeIndex = _tabController.index;
    ScreenshotController activeController;
    
    if (activeIndex == 0) {
      activeController = _outputScreenshot;
    } else if (activeIndex == 1) {
      activeController = _inputScreenshot;
    } else {
      activeController = _paramScreenshot;
    }

    // Capture the widget as an image
    final imageBytes = await activeController.capture(delay: const Duration(milliseconds: 100));
    
    if (imageBytes != null && mounted) {
      await Printing.layoutPdf(
        onLayout: (PdfPageFormat format) async {
          final doc = pw.Document();
          final image = pw.MemoryImage(imageBytes);
          
          doc.addPage(
            pw.Page(
              pageFormat: format,
              build: (pw.Context context) {
                // Ensure the printed image is centered on the PDF page
                return pw.Center(
                  child: pw.Image(image),
                );
              },
            ),
          );
          return doc.save();
        },
      );
    }
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

    return Scaffold(
      appBar: AppBar(
        title: const Text('VGS Calculation'),
        actions: [
          IconButton(
            icon: const Icon(Icons.print),
            onPressed: _printCurrentTab,
            tooltip: 'Print Current Tab',
          ),
        ],
        bottom: TabBar(
          controller: _tabController,
          tabs: const [
            Tab(text: 'Output'),
            Tab(text: 'Input'),
            Tab(text: 'Parameters'),
          ],
        ),
      ),
      drawer: const CustomNavigationBar(),
      body: TabBarView(
        controller: _tabController,
        children: [
          OutputTab(screenshotController: _outputScreenshot),
          InputTab(screenshotController: _inputScreenshot),
          ParametersTab(screenshotController: _paramScreenshot),
        ],
      ),
    );
  }
}
