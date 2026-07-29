import cv2
import mediapipe as mp
import time
import os
import sys

# Allow imports from project root
PROJECT_ROOT = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
sys.path.append(PROJECT_ROOT)

from detection.risk.riskScore import RiskScore
from utils.logger import log

# Initialize MediaPipe
mp_face_detection = mp.solutions.face_detection
mp_drawing = mp.solutions.drawing_utils

# Initialize Risk Score
risk = RiskScore()

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

        # Flip the frame
        frame = cv2.flip(frame, 1)

        # Convert BGR to RGB
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)

        # Detect Faces
        results = face_detection.process(rgb_frame)

        face_count = 0

        if results.detections:

            face_count = len(results.detections)

            for detection in results.detections:
                mp_drawing.draw_detection(frame, detection)

        # -------------------------
        # AI Decision Logic
        # -------------------------

        if face_count == 0:

            status = "NO FACE DETECTED"
            color = (0, 0, 255)

            risk.add_risk(20)

            log("Candidate Left Camera")

        elif face_count == 1:

            status = "NORMAL"
            color = (0, 255, 0)

        else:

            status = "MULTIPLE PERSONS DETECTED"
            color = (0, 0, 255)

            risk.add_risk(40)

            log("Multiple Persons Detected")

        # -------------------------
        # FPS
        # -------------------------

        current_time = time.time()

        fps = 1 / (current_time - previous_time) if previous_time != 0 else 0

        previous_time = current_time

        # -------------------------
        # Background Panel
        # -------------------------

        cv2.rectangle(frame, (10, 10), (550, 170), (40, 40, 40), -1)

        # Status
        cv2.putText(
            frame,
            f"STATUS : {status}",
            (20, 40),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.7,
            color,
            2
        )

        # Face Count
        cv2.putText(
            frame,
            f"FACE COUNT : {face_count}",
            (20, 75),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.7,
            (255, 255, 255),
            2
        )

        # Risk Score
        cv2.putText(
            frame,
            f"RISK SCORE : {risk.get_score()} %",
            (20, 110),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.7,
            (0, 255, 255),
            2
        )

        # FPS
        cv2.putText(
            frame,
            f"FPS : {int(fps)}",
            (20, 145),
            cv2.FONT_HERSHEY_SIMPLEX,
            0.7,
            (255, 255, 0),
            2
        )

        cv2.imshow("AI Proctoring - Multiple Face Detection", frame)

        if cv2.waitKey(1) & 0xFF == ord("q"):
            break

cap.release()
cv2.destroyAllWindows()