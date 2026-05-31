import 'package:flutter/material.dart';
import '../models/vgs_data.dart';
import 'painters/runway_painter.dart';

class VgsVisualizer extends StatelessWidget {
  final VgsData vgsData;

  const VgsVisualizer({super.key, required this.vgsData});

  @override
  Widget build(BuildContext context) {
    return LayoutBuilder(
      builder: (context, constraints) {
        // We set a base aspect ratio of 1300 / 450 as per the original React app
        const double baseWidth = 1300.0;
        const double baseHeight = 450.0;

        return Container(
          width: double.infinity,
          height: baseHeight, // Give it a fixed nominal height, let it scale horizontally
          decoration: const BoxDecoration(
            color: Color(0xFFD2B48C), // "tan" color from OutputVisuals.js
          ),
          child: InteractiveViewer(
            minScale: 0.5,
            maxScale: 4.0,
            constrained: false, // Allows panning beyond viewport if needed
            child: SizedBox(
              width: baseWidth,
              height: baseHeight,
              child: CustomPaint(
                painter: RunwayPainter(vgsData: vgsData),
                size: const Size(baseWidth, baseHeight),
              ),
            ),
          ),
        );
      },
    );
  }
}
