# Multi-Device AI Proctoring System - Implementation Plan

**Project Status**: Phase 2 - Foundation Complete, Ready for Phase 3
**Last Updated**: 2026-08-18
**Current Milestone**: Getting the application running end-to-end

---

## 1. Current System Status

### ✅ COMPLETE
- **Repository Structure**: Organized per specification
- **Backend Server**: Express.js running on `http://localhost:5000`
- **Frontend Development**: Vite dev server running on `http://localhost:5173`
- **AI Service**: Flask app running on `http://localhost:5001`
- **Database**: MongoDB Atlas connection verified and working
- **Authentication Backend**:
  - User model with name, email, password, role, timestamps
  - `/api/auth/register` - User registration with password hashing
  - `/api/auth/login` - User login with JWT token generation
  - `/api/users/profile` - Get profile (protected route)
  - JWT middleware for token verification
  - Role authorization middleware
  - 7-day token expiration configured

### ⚠️ IN PROGRESS / NEEDS WORK
- **Frontend Forms**: Login/Register pages need state management and form handling
- **Frontend-Backend Integration**: API communication not yet tested end-to-end
- **AI Service**: Only has health endpoint, needs detection endpoints
- **Interview Management**: Models, controllers, and routes not yet implemented

---

## 2. Phase Breakdown & Roadmap

### Phase 1 - Foundation ✅ COMPLETE
- [x] Repository structure
- [x] Frontend project (React + Vite)
- [x] Backend project (Node + Express)
- [x] AI service project (Python + Flask)
- [x] Environment configuration

### Phase 2 - Authentication ✅ MOSTLY COMPLETE
- [x] User model
- [x] Register endpoint
- [x] Login endpoint
- [x] JWT generation
- [x] Protected routes middleware
- [x] Role authorization middleware
- [ ] **NEXT**: Complete frontend auth forms
- [ ] **NEXT**: Test end-to-end auth flow

### Phase 3 - Interview Management (NEXT)
- [ ] Interview model (MongoDB schema)
- [ ] Create interview endpoint
- [ ] Schedule interview endpoint
- [ ] List interviews endpoint
- [ ] Join interview endpoint
- [ ] Interview status management

### Phase 4 - Frontend UI
- [ ] Recruiter dashboard layout
- [ ] Candidate dashboard layout
- [ ] Interview scheduling page
- [ ] Waiting room
- [ ] Interview room UI

### Phase 5 - Real-Time Layer
- [ ] Socket.io setup
- [ ] Interview room events
- [ ] Live notifications
- [ ] Mobile device pairing signals

### Phase 6 - Secondary Device
- [ ] QR/code pairing mechanism
- [ ] Mobile browser camera access
- [ ] WebRTC/socket streaming
- [ ] Connection status display

### Phase 7 - AI Detection
- [ ] Face detection module
- [ ] Multiple-face detection
- [ ] Phone detection (YOLO)
- [ ] Head pose estimation
- [ ] Eye tracking
- [ ] Audio detection (optional)

### Phase 8 - AI Integration
- [ ] Backend → Python API communication
- [ ] Detection results processing
- [ ] Violation storage in MongoDB
- [ ] Real-time warning system

### Phase 9 - Reports
- [ ] Risk score calculation
- [ ] Violation summary generation
- [ ] Report PDF generation
- [ ] Report download functionality

### Phase 10 - Testing
- [ ] Unit tests for utilities
- [ ] Integration tests for APIs
- [ ] End-to-end workflow testing
- [ ] Security testing

### Phase 11 - Deployment
- [ ] Production environment setup
- [ ] HTTPS configuration
- [ ] Cloud deployment (AWS/Azure)
- [ ] CI/CD pipeline

---

## 3. Immediate Next Milestone: Complete Authentication Flow (Today)

### Goal
Make the complete auth workflow functional:
```
User registers → Login → Get profile → Logout
```

### Tasks

#### 3.1 Frontend Auth Forms Implementation
**File**: `client/src/pages/auth/login.jsx` and `client/src/pages/auth/register.jsx`

**Requirements**:
- Form state management (useState)
- Input validation
- API calls using authService
- Error handling and display
- Success redirects
- Loading states
- Save JWT to localStorage

**Success Criteria**:
- Can type in form fields
- Can submit and see responses
- JWT stored on successful login
- Redirects to appropriate dashboard
- Errors displayed to user

#### 3.2 Frontend User Hook (Authentication)
**File**: `client/src/hooks/useAuth.js`

**Requirements**:
- Consume AuthContext
- Return user, login, logout functions
- Check token validity on mount
- Auto-logout on expired token

#### 3.3 Protected Routes in Frontend
**File**: `client/src/routes/AppRoutes.jsx`

**Requirements**:
- Redirect non-authenticated users to login
- Redirect to appropriate dashboard by role
- Check token before rendering protected components

#### 3.4 API Service Enhancements
**File**: `client/src/services/authservice.js`

**Requirements**:
- Handle response errors
- Extract and store JWT
- Support logout clearing

#### 3.5 Backend Profile Endpoint
**File**: `server/controllers/userController.js` - Already implemented ✅

#### 3.6 Test with Postman
**Endpoints to test**:
```
POST /api/auth/register
POST /api/auth/login
GET  /api/users/profile (with Bearer token)
```

---

## 4. Implementation Strategy

### Current Week
- **Day 1 (Today)**:
  - [x] Get all services running
  - [ ] Complete frontend auth forms
  - [ ] Test auth flow with Postman
  - [ ] Verify frontend-backend connectivity

- **Day 2**:
  - [ ] Fix any auth issues
  - [ ] Create Interview model
  - [ ] Implement interview CRUD endpoints

- **Day 3-4**:
  - [ ] Implement Socket.io basics
  - [ ] Test real-time communication
  - [ ] Create basic recruiter/candidate dashboards

---

## 5. Testing Checklist

### Postman Tests (Backend)
- [ ] Register new recruiter
- [ ] Register new candidate
- [ ] Login with correct credentials
- [ ] Login with wrong password (should fail)
- [ ] Login with non-existent email (should fail)
- [ ] Get profile with valid token
- [ ] Get profile without token (should fail)
- [ ] Get profile with invalid token (should fail)

### Frontend Tests
- [ ] Register form renders
- [ ] Login form renders
- [ ] Can enter email and password
- [ ] Submit register creates account
- [ ] Submit login shows error on failure
- [ ] Redirect to dashboard on success
- [ ] JWT stored in localStorage
- [ ] Can logout and return to login

### Integration Tests
- [ ] Vite dev server starts without errors
- [ ] Express backend starts and connects to MongoDB
- [ ] Flask AI service starts
- [ ] Frontend can reach backend API
- [ ] Backend returns proper responses
- [ ] No console errors in browser

---

## 6. File Structure Reference

```
Multi-Device-Proctoring-System/
├── client/                          # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   └── AuthForm.jsx         # Reusable form component
│   │   ├── pages/
│   │   │   ├── auth/
│   │   │   │   ├── login.jsx        # Login page (NEEDS WORK)
│   │   │   │   └── register.jsx     # Register page (NEEDS WORK)
│   │   │   ├── recruiter/
│   │   │   │   └── Dashboard.jsx    # Recruiter dashboard (NEXT)
│   │   │   └── candidate/
│   │   │       └── Dashboard.jsx    # Candidate dashboard (NEXT)
│   │   ├── context/
│   │   │   └── AuthContext.jsx      # Auth state management ✅
│   │   ├── hooks/
│   │   │   ├── useAuth.js           # Auth hook (NEEDS WORK)
│   │   ├── routes/
│   │   │   └── AppRoutes.jsx        # Route definitions ✅
│   │   ├── services/
│   │   │   ├── api.js               # Axios instance ✅
│   │   │   └── authservice.js       # Auth API calls ✅
│   │   ├── App.jsx                  # Main component ✅
│   │   └── main.jsx                 # Entry point ✅
│   ├── .env                         # Environment config ✅
│   ├── package.json                 # Dependencies ✅
│   └── vite.config.js               # Vite config ✅
│
├── server/                          # Express Backend
│   ├── config/
│   │   └── db.js                    # MongoDB connection ✅
│   ├── controllers/
│   │   ├── authController.js        # Auth endpoints ✅
│   │   ├── userController.js        # User endpoints ✅
│   │   └── interviewController.js   # Interview endpoints (NEXT)
│   ├── middleware/
│   │   ├── authMiddleware.js        # JWT verification ✅
│   │   └── roleMiddleware.js        # Role authorization ✅
│   ├── models/
│   │   ├── User.js                  # User schema ✅
│   │   └── Interview.js             # Interview schema (NEXT)
│   ├── routes/
│   │   ├── authRoutes.js            # Auth routes ✅
│   │   ├── userRoutes.js            # User routes ✅
│   │   └── interviewRoutes.js       # Interview routes (NEXT)
│   ├── services/                    # Business logic layer (FUTURE)
│   ├── utils/
│   │   └── jwt.js                   # JWT utilities ✅
│   ├── app.js                       # Express app ✅
│   ├── server.js                    # Server entry ✅
│   ├── .env                         # Environment config ✅
│   └── package.json                 # Dependencies ✅
│
├── ai-service/                      # Python Flask AI
│   ├── detection/
│   │   ├── face/
│   │   │   └── detectFace.py        # Face detection (FUTURE)
│   │   ├── multipleFace/
│   │   ├── phone/
│   │   ├── eye/
│   │   ├── headpose/
│   │   ├── audio/
│   │   └── risk/
│   │       └── riskScore.py         # Risk calculation (FUTURE)
│   ├── models/                      # ML models storage
│   ├── utils/
│   │   └── logger.py                # Logging utility
│   ├── app.py                       # Flask app ✅
│   ├── requirements.txt             # Python dependencies ✅
│   └── test_camera.py               # Camera test script
│
├── docs/                            # Documentation
│   ├── API.md                       # API documentation (NEXT)
│   ├── ARCHITECTURE.md              # System architecture (NEXT)
│   ├── DATABASE.md                  # Database schema (NEXT)
│   └── DEVELOPMENT_LOG.md           # Development progress log
│
├── IMPLEMENTATION_PLAN.md           # This file
└── README.md                        # Project overview ✅
```

---

## 7. Environment Configuration

### Server `.env` ✅ READY
```
PORT=5000
MONGODB_URI=mongodb+srv://Admin:MDPS00@cluster0.divraxx.mongodb.net/?appName=Cluster0
JWT_SECRET=mySuperSecretKey123456789
AI_SERVICE_URL=http://localhost:8000
CLIENT_URL=http://localhost:5173
```

### Client `.env` ✅ READY
```
VITE_API_URL=http://localhost:5000/api
```

---

## 8. Key Engineering Decisions

1. **JWT Token Storage**: LocalStorage (consider security implications for production)
2. **Role-Based Access**: Enforced on backend middleware, not trusted from client
3. **Password Hashing**: bcrypt with 10 salt rounds
4. **API Response Format**: Consistent JSON with `success`, `message`, `data` fields
5. **CORS**: Enabled for localhost development (restrict in production)
6. **Axios Interceptors**: Automatically attach JWT to protected requests
7. **Error Handling**: Graceful error messages without exposing sensitive data

---

## 9. Known Issues & Limitations

1. **JWT stored in localStorage** - Not ideal for production (use httpOnly cookies)
2. **Passwords visible in console during development** - Add request logging middleware
3. **AI service detection endpoints not implemented** - Will add in Phase 7
4. **No input validation** - Add server-side validation with sanitization
5. **No rate limiting** - Will add for production
6. **MONGODB_URI with credentials in .env** - Use connection string in secure vault for production

---

## 10. Success Metrics for This Milestone

- [x] All three services start without errors
- [x] MongoDB connection verified
- [ ] User can register through frontend
- [ ] User can login through frontend
- [ ] JWT token generated and stored
- [ ] Protected endpoint returns user data with valid token
- [ ] Frontend-backend communication working
- [ ] No console errors or warnings

---

## 11. Next Steps After This Milestone

1. **Interview Management** (Phase 3):
   - Create Interview model
   - Implement CRUD endpoints
   - Add recruiter-only authorization checks

2. **Frontend Dashboards** (Phase 4):
   - Layout dashboard components
   - Fetch and display data
   - Add interview scheduling form

3. **Socket.io Real-Time** (Phase 5):
   - Setup Socket.io server
   - Implement room joining
   - Test real-time events

4. **Mobile Integration** (Phase 6):
   - QR code generation
   - Mobile device pairing
   - Camera stream capture

5. **AI Integration** (Phase 7-8):
   - Implement detection endpoints
   - Process detection results
   - Store violations

---

## 12. Resources & Documentation

- **React Router**: https://reactrouter.com/
- **Axios**: https://axios-http.com/
- **Express.js**: https://expressjs.com/
- **MongoDB/Mongoose**: https://mongoosejs.com/
- **JWT**: https://jwt.io/
- **Flask**: https://flask.palletsprojects.com/

---

**Generated**: 2026-08-18
**Next Review**: After frontend auth forms are complete
