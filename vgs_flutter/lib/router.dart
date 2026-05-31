import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import '../providers/auth_provider.dart';
import '../screens/dashboard_screen.dart';
import '../screens/login_screen.dart';
import '../screens/vgs_screen.dart';

final routerProvider = Provider<GoRouter>((ref) {
  ref.watch(authStateProvider); // watch it so router rebuilds on auth change

  return GoRouter(
    initialLocation: '/dashboard',
    routes: [
      GoRoute(
        path: '/login',
        builder: (context, state) => const LoginScreen(),
      ),
      GoRoute(
        path: '/dashboard',
        builder: (context, state) => const DashboardScreen(),
      ),
      GoRoute(
        path: '/vgs',
        builder: (context, state) {
          final extra = state.extra as Map<String, dynamic>?;
          return VgsScreen(
            aircraft: extra?['aircraft'],
            runway: extra?['runway'],
          );
        },
      ),
    ],
    redirect: (context, state) {
      // For now, no strict auth block as React app seemed to bypass it in index.js.
      // Can be implemented later.
      return null;
    },
  );
});
