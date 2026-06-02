#include <flutter/dart_project.h>
#include <flutter/flutter_view_controller.h>
#include <windows.h>

#include "flutter_window.h"
#include "utils.h"

// Stubs for missing MSVC linker symbols (often encountered with Firebase plugins on Windows)
#if defined(_MSC_VER) && defined(_M_X64)
extern "C" {
  int _Avx2WmemEnabled = 0;

  unsigned __int64 __std_find_first_of_trivial_pos_1(const char* First1, unsigned __int64 Count1, const char* First2, unsigned __int64 Count2) {
    for (unsigned __int64 i = 0; i < Count1; ++i) {
      for (unsigned __int64 j = 0; j < Count2; ++j) {
        if (First1[i] == First2[j]) {
          return i;
        }
      }
    }
    return static_cast<unsigned __int64>(-1);
  }
}
#endif

int APIENTRY wWinMain(_In_ HINSTANCE instance, _In_opt_ HINSTANCE prev,
                      _In_ wchar_t *command_line, _In_ int show_command) {
  // Attach to console when present (e.g., 'flutter run') or create a
  // new console when running with a debugger.
  if (!::AttachConsole(ATTACH_PARENT_PROCESS) && ::IsDebuggerPresent()) {
    CreateAndAttachConsole();
  }

  // Initialize COM, so that it is available for use in the library and/or
  // plugins.
  ::CoInitializeEx(nullptr, COINIT_APARTMENTTHREADED);

  flutter::DartProject project(L"data");

  std::vector<std::string> command_line_arguments =
      GetCommandLineArguments();

  project.set_dart_entrypoint_arguments(std::move(command_line_arguments));

  FlutterWindow window(project);
  Win32Window::Point origin(10, 10);
  Win32Window::Size size(1280, 720);
  if (!window.Create(L"vgs_flutter", origin, size)) {
    return EXIT_FAILURE;
  }
  window.SetQuitOnClose(true);

  ::MSG msg;
  while (::GetMessage(&msg, nullptr, 0, 0)) {
    ::TranslateMessage(&msg);
    ::DispatchMessage(&msg);
  }

  ::CoUninitialize();
  return EXIT_SUCCESS;
}
