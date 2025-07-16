powershell -Command "Compress-Archive -Path 'android/output/*' -DestinationPath 'android/index.android.bundle.zip'"
powershell -Command "Compress-Archive -Path 'android/sourcemap.js' -DestinationPath 'android/sourcemap.zip'"
rmdir /s /q android\output
del /f android\sourcemap.js