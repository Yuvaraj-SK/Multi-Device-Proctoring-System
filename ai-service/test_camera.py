import cv2

camera = cv2.VideoCapture(0)

if not camera.isOpened():
    print("❌ Could not open camera")
    exit()

print("✅ Camera Opened")

while True:
    success, frame = camera.read()

    if not success:
        break

    cv2.imshow("AI Camera Test", frame)

    if cv2.waitKey(1) & 0xFF == ord("q"):
        break

camera.release()
cv2.destroyAllWindows()