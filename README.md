# 🎓 Multi-Device AI Proctoring System for Detecting Malpractice in Online Interviews

> Final Year Major Project

---

# 📖 Project Overview

The **Multi-Device AI Proctoring System** is a web-based platform designed to conduct secure online interviews while monitoring candidates for malpractice using Artificial Intelligence.

Unlike traditional online interview platforms, this system requires the candidate to use **two devices**:

1. **Primary Device (Laptop/Desktop)**
   - Interview Platform
   - Webcam
   - Microphone
   - Screen Sharing

2. **Secondary Device (Mobile Phone)**
   - Additional camera angle
   - Room monitoring
   - Candidate movement monitoring

The AI continuously analyzes both video streams and detects suspicious activities such as:

- Multiple people in the room
- Mobile phone usage
- Candidate leaving the camera
- Looking away frequently
- Head pose abnormalities
- Multiple voices
- Screen switching
- Tab switching
- Other malpractice events

After the interview, the recruiter receives a complete AI-generated report with a malpractice score and violation history.

---

# 🎯 Project Objectives

- Conduct secure online interviews.
- Monitor candidates using multiple devices.
- Detect malpractice using AI.
- Generate detailed interview reports.
- Reduce manual supervision.

---

# 🏗️ System Architecture

```
Recruiter
    │
React Frontend
    │
REST API + Socket.io
    │
Node.js Backend
    │
 ┌──────────────┐
 │              │
MongoDB     Python AI
                │
      OpenCV + MediaPipe + YOLO
                │
      Primary Camera
      Secondary Camera
```

---

# 💻 Technology Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- React Router
- Axios
- Socket.io Client

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Socket.io
- Multer
- PDFKit

---

## AI

- Python
- Flask
- OpenCV
- MediaPipe
- YOLOv8
- NumPy

---

## Database

- MongoDB Atlas

---

## Version Control

- Git
- GitHub

---

# 📁 Project Structure

```
Multi-Device-Proctoring-System
│
├── client/
│
├── server/
│
├── ai-service/
│
├── docs/
│
├── report/
│
├── README.md
│
└── .gitignore
```

---

# 👥 Team Members

| Member | Responsibility |
|---------|---------------|
| Yuvaraj | Backend |
| Prajwal | Frontend |
| Mohan | AI |

---

# 👨‍💻 Yuvaraj (Backend)

## Folder

```
server/
```

## Responsibilities

### Authentication

- Register API
- Login API
- JWT Authentication
- Password Encryption

---

### Database

- MongoDB Connection
- User Model
- Interview Model
- Violation Model
- Report Model

---

### REST APIs

- Authentication APIs
- Interview APIs
- Report APIs
- Candidate APIs

---

### Socket.io

- Live Interview Communication
- Mobile Connection
- Real-time Violations

---

### AI Integration

- Connect with Flask APIs
- Receive AI detections
- Store violations
- Generate risk score

---

### Report

- Generate Interview Report
- Generate PDF
- Store reports

---

# 👨‍🎨 Prajwal (Frontend)

## Folder

```
client/
```

## Responsibilities

### Authentication UI

- Login
- Register

---

### Recruiter

- Dashboard
- Schedule Interview
- Candidate List
- Reports

---

### Candidate

- Dashboard
- Waiting Room
- Interview Room

---

### Mobile Interface

- QR Connection
- Camera Screen
- Connected Screen

---

### Components

- Navbar
- Sidebar
- Buttons
- Timer
- Webcam
- Warning Popup
- Loading Screen

---

### API Integration

Connect frontend with backend APIs.

---

# 🤖 Mohan (AI)

## Folder

```
ai-service/
```

## Responsibilities

### Face Detection

- Single Face
- Face Missing

---

### Multiple Face Detection

- Detect multiple people

---

### Phone Detection

- Mobile Phone Detection

---

### Eye Tracking

- Eye Movement
- Looking Away

---

### Head Pose

- Left
- Right
- Up
- Down

---

### Audio Detection

- Multiple Voices
- Loud Noise

---

### Risk Score

Generate AI Risk Score based on all detected violations.

---

# 📅 Development Timeline

## Phase 1

Project Setup

- GitHub
- Folder Structure
- React
- Node
- Python

---

## Phase 2

Authentication

- Login
- Register
- JWT

---

## Phase 3

Dashboard

- Recruiter
- Candidate

---

## Phase 4

Interview Module

- Webcam
- Microphone
- Screen Share
- Timer

---

## Phase 5

AI

- Face Detection
- Phone Detection
- Eye Tracking
- Head Pose
- Multiple Faces
- Audio Detection

---

## Phase 6

Reports

- AI Score
- PDF
- History

---

# 🌳 Git Workflow

## Branches

```
main

backend-dev

frontend-dev

ai-dev
```

---

## Rules

### Yuvaraj

Works only inside

```
server/
```

---

### Prajwal

Works only inside

```
client/
```

---

### Mohan

Works only inside

```
ai-service/
```

---

Nobody modifies another member's code unless discussed during integration.

---

# 🚀 Setup Instructions

## Clone Repository

```bash
git clone <repository-url>
```

---

## Frontend

```bash
cd client

npm install

npm run dev
```

---

## Backend

```bash
cd server

npm install

npm run dev
```

---

## AI

```bash
cd ai-service

python -m venv venv

# Windows
venv\Scripts\activate

# Linux/macOS
source venv/bin/activate

pip install -r requirements.txt

python app.py
```

---

# 📌 Current Status

| Module | Status |
|----------|---------|
| Repository Setup | ✅ |
| Frontend Setup | ✅ |
| Backend Setup | ✅ |
| AI Setup | ✅ |
| Authentication | ⏳ |
| Dashboard | ⏳ |
| Interview Module | ⏳ |
| AI Detection | ⏳ |
| Reports | ⏳ |

---

# 📜 Development Rules

1. Commit frequently with meaningful messages.
2. Work only inside your assigned folder.
3. Push changes to your own branch.
4. Test before merging.
5. Document new APIs in `docs/API.md`.
6. Discuss architecture changes before implementing them.

---

# 📚 Future Features

- Live video interview
- Multi-device synchronization
- QR code pairing
- AI violation detection
- Live alerts
- Automatic report generation
- Interview recording
- Recruiter analytics dashboard

---

# 📄 License

This project is developed as a **Final Year Academic Project**.

It is intended for educational and research purposes.


docs/
│
├── API.md                  ← Backend endpoints (maintained by you)
├── DATABASE.md             ← MongoDB collections & schema (maintained by you)
├── AI_API.md               ← Flask AI endpoints (maintained by Mohan)
├── FRONTEND_ROUTES.md      ← React pages & navigation (maintained by Prajwal)
├── DEVELOPMENT_LOG.md      ← Daily progress updates (everyone)
├── ARCHITECTURE.md         ← Overall system design (everyone)
└── MEETING_NOTES.md        ← Team decisions (everyone)


# 📁 Complete Project Structure

```text
Multi-Device-Proctoring-System/
│
├── client/                               # Frontend (Prajwal)
│   │
│   ├── public/
│   │
│   ├── src/
│   │   │
│   │   ├── assets/
│   │   │   ├── images/
│   │   │   ├── icons/
│   │   │   └── logo/
│   │   │
│   │   ├── components/
│   │   │   │
│   │   │   ├── common/
│   │   │   │      Button.jsx
│   │   │   │      Input.jsx
│   │   │   │      Loader.jsx
│   │   │   │      Modal.jsx
│   │   │   │
│   │   │   ├── recruiter/
│   │   │   │      Navbar.jsx
│   │   │   │      Sidebar.jsx
│   │   │   │      CandidateCard.jsx
│   │   │   │      ReportCard.jsx
│   │   │   │
│   │   │   ├── candidate/
│   │   │   │      Webcam.jsx
│   │   │   │      Timer.jsx
│   │   │   │      WarningPopup.jsx
│   │   │   │      InterviewControls.jsx
│   │   │   │
│   │   │   └── mobile/
│   │   │          QRScanner.jsx
│   │   │          MobileCamera.jsx
│   │   │          MobileStatus.jsx
│   │   │
│   │   ├── pages/
│   │   │   │
│   │   │   ├── auth/
│   │   │   │      Login.jsx
│   │   │   │      Register.jsx
│   │   │   │
│   │   │   ├── recruiter/
│   │   │   │      Dashboard.jsx
│   │   │   │      ScheduleInterview.jsx
│   │   │   │      Reports.jsx
│   │   │   │      Profile.jsx
│   │   │   │
│   │   │   ├── candidate/
│   │   │   │      Dashboard.jsx
│   │   │   │      WaitingRoom.jsx
│   │   │   │      InterviewRoom.jsx
│   │   │   │      Result.jsx
│   │   │   │
│   │   │   ├── mobile/
│   │   │   │      ConnectPhone.jsx
│   │   │   │      CameraView.jsx
│   │   │   │      Connected.jsx
│   │   │   │
│   │   │   └── Home.jsx
│   │   │
│   │   ├── context/
│   │   │      AuthContext.jsx
│   │   │
│   │   ├── hooks/
│   │   │      useAuth.js
│   │   │
│   │   ├── routes/
│   │   │      ProtectedRoute.jsx
│   │   │
│   │   ├── services/
│   │   │      api.js
│   │   │      authService.js
│   │   │      interviewService.js
│   │   │      reportService.js
│   │   │
│   │   ├── utils/
│   │   │      constants.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── vite.config.js
│   └── .env
│
│
├── server/                               # Backend (Yuvaraj)
│   │
│   ├── config/
│   │      db.js
│   │      env.js
│   │
│   ├── controllers/
│   │      authController.js
│   │      interviewController.js
│   │      reportController.js
│   │      userController.js
│   │
│   ├── middleware/
│   │      authMiddleware.js
│   │      errorMiddleware.js
│   │      uploadMiddleware.js
│   │
│   ├── models/
│   │      User.js
│   │      Interview.js
│   │      Violation.js
│   │      Report.js
│   │
│   ├── routes/
│   │      authRoutes.js
│   │      interviewRoutes.js
│   │      reportRoutes.js
│   │      userRoutes.js
│   │
│   ├── services/
│   │      aiService.js
│   │      pdfService.js
│   │
│   ├── socket/
│   │      socket.js
│   │
│   ├── uploads/
│   │   ├── recordings/
│   │   └── reports/
│   │
│   ├── utils/
│   │      jwt.js
│   │      logger.js
│   │
│   ├── app.js
│   ├── server.js
│   ├── .env
│   └── package.json
│
│
├── ai-service/                           # AI (Mohan)
│   │
│   ├── api/
│   │      routes.py
│   │
│   ├── detection/
│   │   │
│   │   ├── face/
│   │   │      detectFace.py
│   │   │
│   │   ├── multipleFace/
│   │   │      detectMultipleFace.py
│   │   │
│   │   ├── phone/
│   │   │      detectPhone.py
│   │   │
│   │   ├── eye/
│   │   │      eyeTracking.py
│   │   │
│   │   ├── headpose/
│   │   │      headPose.py
│   │   │
│   │   ├── audio/
│   │   │      audioDetection.py
│   │   │
│   │   └── risk/
│   │          riskCalculator.py
│   │
│   ├── models/
│   │      yolov8.pt
│   │      phone.pt
│   │
│   ├── utils/
│   │      helper.py
│   │
│   ├── app.py
│   ├── requirements.txt
│   └── README.md
│
│
├── docs/
│   │
│   ├── API.md
│   ├── AI_API.md
│   ├── DATABASE.md
│   ├── ARCHITECTURE.md
│   ├── FRONTEND_ROUTES.md
│   ├── DEVELOPMENT_LOG.md
│   ├── MEETING_NOTES.md
│   │
│   └── diagrams/
│          Architecture.png
│          ERDiagram.png
│          Workflow.png
│          UseCase.png
│
│
├── report/
│   │
│   ├── screenshots/
│   ├── ppt/
│   ├── demo-video/
│   └── final-report.pdf
│
│
├── .gitignore
├── README.md
└── LICENSE (optional)
```