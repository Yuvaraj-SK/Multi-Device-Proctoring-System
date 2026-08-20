# Milestone 3 - Interview Management System

**Status:** 📋 PLANNING PHASE  
**Milestone Start:** Ready to Begin  
**Duration:** Estimated 4-6 hours  

---

## 📋 Overview

Milestone 3 focuses on building the core Interview Management system. This includes:
- Creating the Interview data model in MongoDB
- Building backend API endpoints for interview CRUD operations
- Implementing interview routes and authorization
- Creating frontend components for interview display and management
- Integrating with role-based dashboards

---

## 🎯 Milestone 3 Objectives

### Phase 1: Backend Interview Model & Database (1 hour)
**Goal:** Create Interview schema and database structure

**Tasks:**
1. Create `server/models/Interview.js` with schema:
   - `interviewId` - Unique identifier
   - `recruiterId` - Reference to User (recruiter)
   - `candidateId` - Reference to User (candidate)
   - `jobTitle` - String (e.g., "Senior Developer")
   - `startTime` - Date/Time (ISO format)
   - `endTime` - Date/Time (ISO format)
   - `duration` - Number (minutes)
   - `status` - Enum: ['scheduled', 'in-progress', 'completed', 'cancelled']
   - `videoUrl` - String (stored video location)
   - `notes` - String (recruiter's interview notes)
   - `riskScore` - Number (0-100, AI-generated)
   - `createdAt`, `updatedAt` - Auto timestamps

2. Add MongoDB indexes for:
   - `recruiterId` (for recruiter's interview list)
   - `candidateId` (for candidate's interview list)
   - `status` (for filtering by status)

### Phase 2: Backend API Endpoints (1.5 hours)
**Goal:** Create RESTful API for interview management

**Tasks:**
1. Create `server/controllers/interviewController.js`:
   - `createInterview()` - POST /api/interviews (recruiter only)
   - `getInterviewById()` - GET /api/interviews/:id
   - `getRecruiterInterviews()` - GET /api/interviews/recruiter/mine (all recruiter's interviews)
   - `getCandidateInterviews()` - GET /api/interviews/candidate/mine (all candidate's interviews)
   - `updateInterview()` - PUT /api/interviews/:id (recruiter only)
   - `cancelInterview()` - PUT /api/interviews/:id/cancel
   - `completeInterview()` - PUT /api/interviews/:id/complete

2. Create `server/routes/interviewRoutes.js`:
   - Mount all interview endpoints
   - Apply `authMiddleware` to all routes (require login)
   - Apply `roleMiddleware` for recruiter-only operations

3. Implement authorization checks:
   - Only recruiter who created interview can update/delete
   - Only involved parties (recruiter/candidate) can view interview details

### Phase 3: Frontend Interview Service (30 mins)
**Goal:** Create API wrapper functions for frontend

**Tasks:**
1. Update `client/src/services/authservice.js`:
   - `createInterview(interviewData)` - POST /interviews
   - `getRecruiterInterviews()` - GET /interviews/recruiter/mine
   - `getCandidateInterviews()` - GET /interviews/candidate/mine
   - `getInterviewById(id)` - GET /interviews/:id
   - `updateInterview(id, data)` - PUT /interviews/:id
   - `cancelInterview(id)` - PUT /interviews/:id/cancel
   - `completeInterview(id)` - PUT /interviews/:id/complete

### Phase 4: Frontend Dashboard Components (1.5 hours)
**Goal:** Build interview management UIs

**Tasks:**
1. Create `client/src/pages/recruiter/Dashboard.jsx`:
   - Display list of all recruiter's interviews
   - Show interview status badges (scheduled, in-progress, completed, cancelled)
   - Add "Create Interview" button → opens form
   - Interview list shows: candidate name, job title, start time, status
   - Action buttons: Edit, Cancel, View Details
   - Filter by status option

2. Create `client/src/pages/candidate/Dashboard.jsx`:
   - Display list of all candidate's scheduled interviews
   - Show next upcoming interview prominently
   - Interview list shows: recruiter name, job title, start time
   - Action buttons: Accept, Decline, View Details, "Join Interview"

3. Create `client/src/components/InterviewForm.jsx`:
   - Form to create/edit interview
   - Fields: candidate email, job title, start time, end time
   - Date/time pickers for start and end times
   - Submit creates interview on backend
   - On success, redirect to recruiter dashboard

4. Create `client/src/components/InterviewDetails.jsx`:
   - Modal/page showing full interview details
   - Display all interview information
   - Show risk score if completed
   - Show video link if available

### Phase 5: Integration & Polish (30 mins)
**Goal:** Connect everything and test end-to-end

**Tasks:**
1. Update `client/src/context/AuthContext.jsx`:
   - Add interview-related state if needed
   - Keep auth state focused on user authentication only

2. Test complete flow:
   - Recruiter login → Create interview → See in list
   - Candidate login → See scheduled interviews
   - Status transitions: scheduled → in-progress → completed

3. Error handling:
   - Show user-friendly messages for API errors
   - Handle validation errors from backend

---

## 📊 Database Schema

### Interview Model
```javascript
{
  _id: ObjectId,
  interviewId: "INT-001-2025",           // Unique identifier
  recruiterId: ObjectId,                  // Reference to User
  candidateId: ObjectId,                  // Reference to User
  jobTitle: "Senior React Developer",
  startTime: "2025-01-25T10:00:00Z",
  endTime: "2025-01-25T11:00:00Z",
  duration: 60,                           // minutes
  status: "scheduled",                    // enum
  videoUrl: null,                         // filled when recorded
  notes: "",
  riskScore: null,                        // filled after interview
  createdAt: "2025-01-20T12:00:00Z",
  updatedAt: "2025-01-20T12:00:00Z"
}
```

### API Endpoints

| Method | Endpoint | Role | Purpose |
|--------|----------|------|---------|
| POST | `/api/interviews` | Recruiter | Create interview |
| GET | `/api/interviews/:id` | Both | Get interview details |
| GET | `/api/interviews/recruiter/mine` | Recruiter | List recruiter's interviews |
| GET | `/api/interviews/candidate/mine` | Candidate | List candidate's interviews |
| PUT | `/api/interviews/:id` | Recruiter | Update interview |
| PUT | `/api/interviews/:id/cancel` | Both | Cancel interview |
| PUT | `/api/interviews/:id/complete` | Recruiter | Mark as complete |

---

## 🔄 User Flows

### Recruiter Flow
```
1. Recruiter logs in → Recruiter Dashboard
2. See list of all scheduled interviews
3. Click "Create Interview" → Interview Form
4. Enter candidate email, job title, schedule time
5. Submit → Interview created
6. Interview appears in dashboard list
7. As interview time approaches → Status updates
8. During interview → Mark as "in-progress"
9. After interview → Mark as "completed" + add notes
```

### Candidate Flow
```
1. Candidate logs in → Candidate Dashboard
2. See list of scheduled interviews
3. See next upcoming interview highlighted
4. Click interview → View Details
5. Confirm attendance or decline
6. At interview time → Can join interview
7. After interview → See completed status
```

---

## ✨ Key Features

✅ **Interview Scheduling**
- Schedule interviews with specific dates/times
- Set interview duration
- Associate with specific candidates

✅ **Status Tracking**
- Scheduled → In Progress → Completed
- Ability to cancel interviews
- Status visible to both parties

✅ **Role-Based Access**
- Recruiters create and manage interviews
- Candidates view their scheduled interviews
- Only involved parties can see interview details

✅ **Dashboard Views**
- Recruiter: See all their scheduled interviews
- Candidate: See interviews they're invited to
- Filter by status (upcoming, completed, etc.)

✅ **Interview Details**
- Full information display
- Notes field for recruiter observations
- Risk score once completed
- Video recording link once available

---

## 📁 Files to Create/Update

### Backend
- [x] `server/models/Interview.js` - Create new
- [x] `server/controllers/interviewController.js` - Create new
- [x] `server/routes/interviewRoutes.js` - Create new
- [x] `server/app.js` - Update (mount interview routes)

### Frontend
- [x] `client/src/services/interviewService.js` - Create new (or add to authservice.js)
- [x] `client/src/pages/recruiter/Dashboard.jsx` - Update (from placeholder)
- [x] `client/src/pages/candidate/Dashboard.jsx` - Update (from placeholder)
- [x] `client/src/components/InterviewForm.jsx` - Create new
- [x] `client/src/components/InterviewDetails.jsx` - Create new

---

## 🚀 Implementation Order

**Recommended sequence for maximum efficiency:**

1. **Backend First** (Phase 1 & 2)
   - Create Interview model
   - Create controllers with business logic
   - Create routes with authorization
   - Test with Postman

2. **Frontend Service** (Phase 3)
   - Add interview API wrapper functions
   - Test with Postman before using in components

3. **Frontend UI** (Phase 4)
   - Build recruiter dashboard
   - Build candidate dashboard
   - Build interview form
   - Build interview details view

4. **Integration & Testing** (Phase 5)
   - End-to-end testing
   - Error handling
   - Polish UI

---

## 🧪 Testing Checklist

### Backend Testing (Postman)
- [ ] Create interview as recruiter → Returns 201 with interview ID
- [ ] Get recruiter's interviews → Returns list
- [ ] Get candidate's interviews → Returns list
- [ ] Update interview as recruiter → Returns 200
- [ ] Try update as non-recruiter → Returns 403 Forbidden
- [ ] Cancel interview → Returns 200
- [ ] Complete interview → Returns 200

### Frontend Testing
- [ ] Recruiter can create interview
- [ ] Interview appears in recruiter dashboard
- [ ] Candidate can see interview in their dashboard
- [ ] Interview status updates correctly
- [ ] Error messages show for invalid operations
- [ ] Logout and login preserves interview data

---

## 📝 Notes

- Interview IDs can be auto-generated (e.g., "INT-" + timestamp + random)
- Consider timezone handling for international teams
- Risk score will be populated by AI service in Phase 7
- Video recording will be handled in Phase 6
- Consider pagination for large interview lists
- Add search/filter capability for dashboards

---

## ⏭️ What Comes After M3

- **Milestone 4** - Interview Recording & Storage (integrate video)
- **Milestone 5** - Live Interview Features (video call, screen share)
- **Milestone 6** - AI Risk Detection Integration (process video, generate scores)
- **Milestone 7** - Analytics & Reporting

---

**Ready to begin Milestone 3 implementation** ✅
