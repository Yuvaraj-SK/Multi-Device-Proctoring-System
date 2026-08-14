import mediapipe as mp

print("MediaPipe Version:", mp.__version__)
print("MediaPipe Location:", mp.__file__)

print("Has solutions:", hasattr(mp, "solutions"))

print(dir(mp))