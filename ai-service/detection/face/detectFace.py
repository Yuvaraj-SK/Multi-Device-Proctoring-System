import cv2
import mediapipe as mp
import time

# Initialize MediaPipe
mp_face_detection = mp.solutions.face_detection
mp_drawing = mp.solutions.drawing_utils

# Open Webcam
cap = cv2.VideoCapture(0)

previous_time = 0

with mp_face_detection.FaceDetection(
    model_selection=0,
    min_detection_confidence=0.6
) as face_detection:

    while True:

        success, frame = cap.read()

        if not success:
            break

        # Flip camera
        frame = cv2.flip(frame, 1)

        # Convert BGR → RGB
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        # Detect Faces
        results = face_detection.process(rgb_frame)

        face_count = 0

        if results.detections:

            face_count = len(results.detections)

            for detection in results.detections:
                mp_drawing.draw_detection(frame, detection)

        # --------------------------
        # Decide Status
        # --------------------------

        if face_count == 0:
            status = "NO FACE DETECTED"
            color = (0, 0, 255)       # Red

        elif face_count == 1:
            status = "FACE DETECTED"
            color = (0, 255, 0)       # Green

        else:
            status = "MULTIPLE FACES DETECTED"
            color = (0, 0, 255)       # Red

        # --------------------------
        # FPS
        # --------------------------

        current_time = time.time()

        fps = 1 / (current_time - previous_time) if previous_time != 0 else 0

        previous_time = current_time

        # --------------------------
        # Draw Background Rectangle
        # --------------------------

        cv2.rectangle(frame, (10, 10), (500, 130), (40, 40, 40), -1)

        # --------------------------
        # Status
        # --------------------------

        cv2.putText(
            frame,
            status,
            (20, 45),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.8,
            color,
            2
        )

        # --------------------------
        # Face Count
        # --------------------------

        cv2.putText(
            frame,
            f"Face Count : {face_count}",
            (20, 80),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.7,
            (255, 255, 255),
            2
        )

        # --------------------------
        # FPS
        # --------------------------

        cv2.putText(
            frame,
            f"FPS : {int(fps)}",
            (20, 115),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.7,
            (0, 255, 255),
            2
        )

        # --------------------------
        # Window
        # --------------------------

        cv2.imshow("Multi-Device AI Proctoring - Face Detection", frame)

        # Quit
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

cap.release()
cv2.destroyAllWindows()