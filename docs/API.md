# API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
Protected endpoints require Bearer token in Authorization header:
```
Authorization: Bearer <JWT_TOKEN>
```

Tokens expire after 7 days.

---

## Authentication Endpoints

### 1. Register User
**Endpoint**: `POST /api/auth/register`
**Access**: Public
**Description**: Register a new user account

#### Request Body
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "recruiter"
}
```

#### Parameters
- `name` (string, required): User's full name
- `email` (string, required): User's email (must be unique)
- `password` (string, required): User's password (min 6 characters)
- `role` (string, required): User's role - either "recruiter" or "candidate"

#### Response - Success (201)
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "recruiter"
  }
}
```

#### Response - Error (400 or 500)
```json
{
  "success": false,
  "message": "User already exists"
}
```

#### Postman Test
```
Method: POST
URL: http://localhost:5000/api/auth/register
Headers: Content-Type: application/json
Body (raw JSON):
{
  "name": "Test Recruiter",
  "email": "recruiter@test.com",
  "password": "password123",
  "role": "recruiter"
}
```

---

### 2. Login User
**Endpoint**: `POST /api/auth/login`
**Access**: Public
**Description**: Login and get JWT token

#### Request Body
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

#### Parameters
- `email` (string, required): User's email
- `password` (string, required): User's password

#### Response - Success (200)
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "recruiter"
  }
}
```

#### Response - Error (401)
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

#### Postman Test
```
Method: POST
URL: http://localhost:5000/api/auth/login
Headers: Content-Type: application/json
Body (raw JSON):
{
  "email": "recruiter@test.com",
  "password": "password123"
}
```

---

## User Endpoints

### 3. Get User Profile
**Endpoint**: `GET /api/users/profile`
**Access**: Protected (requires valid JWT)
**Description**: Get current user's profile information

#### Request Headers
```
Authorization: Bearer <JWT_TOKEN>
```

#### Response - Success (200)
```json
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "recruiter"
  }
}
```

#### Response - Error (401)
```json
{
  "success": false,
  "message": "Not authorized, no token"
}
```

#### Postman Test
```
Method: GET
URL: http://localhost:5000/api/users/profile
Headers: 
  - Content-Type: application/json
  - Authorization: Bearer <your_jwt_token_here>
```

---

### 4. Recruiter Test Route (Example)
**Endpoint**: `GET /api/users/recruiter-test`
**Access**: Protected (requires "recruiter" role)
**Description**: Test endpoint for recruiter-only access

#### Request Headers
```
Authorization: Bearer <JWT_TOKEN_FROM_RECRUITER>
```

#### Response - Success (200)
```json
{
  "success": true,
  "message": "Recruiter access granted"
}
```

#### Response - Error (403)
```json
{
  "success": false,
  "message": "Access denied"
}
```

#### Postman Test
```
Method: GET
URL: http://localhost:5000/api/users/recruiter-test
Headers: 
  - Authorization: Bearer <recruiter_jwt_token>
```

---

## HTTP Status Codes

| Code | Meaning | Condition |
|------|---------|-----------|
| 200 | OK | Request successful |
| 201 | Created | Resource created (e.g., user registered) |
| 400 | Bad Request | Missing/invalid parameters |
| 401 | Unauthorized | No token or invalid token |
| 403 | Forbidden | Insufficient permissions (e.g., not a recruiter) |
| 500 | Server Error | Internal server error |

---

## Testing Workflow in Postman

### Step 1: Register User
1. Create new request: `POST /api/auth/register`
2. Send register request with test data
3. Copy the returned JWT token

### Step 2: Login (Alternative)
1. Create new request: `POST /api/auth/login`
2. Use the email/password from registration
3. Copy the returned JWT token

### Step 3: Test Protected Endpoint
1. Create new request: `GET /api/users/profile`
2. Add header: `Authorization: Bearer <token_from_step_1>`
3. Send request
4. Verify you get back your user profile

### Step 4: Test Role Authorization
1. Create new request: `GET /api/users/recruiter-test`
2. If you registered as "recruiter", add header with your token
3. Should return success
4. Try with a "candidate" token - should get 403 error

---

## Error Handling

All error responses follow this format:
```json
{
  "success": false,
  "message": "Description of what went wrong"
}
```

Common error messages:
- "All fields are required" - Missing required parameter
- "User already exists" - Email already registered
- "Invalid email or password" - Wrong credentials on login
- "Not authorized, no token" - Missing Authorization header
- "Not authorized, invalid or expired token" - Invalid/expired JWT
- "Access denied" - User doesn't have required role

---

## Environment Variables

The API uses these environment variables (set in `.env`):

```
PORT=5000                          # Server port
MONGODB_URI=...                    # MongoDB connection string
JWT_SECRET=mySuperSecretKey...     # JWT signing secret
AI_SERVICE_URL=http://localhost:8000
CLIENT_URL=http://localhost:5173
```

---

## Next Endpoints (Not Yet Implemented)

Coming soon:
- `POST /api/interviews` - Create interview
- `GET /api/interviews` - List interviews
- `GET /api/interviews/:id` - Get interview details
- `PATCH /api/interviews/:id` - Update interview
- `DELETE /api/interviews/:id` - Delete interview
- `POST /api/interviews/:id/join` - Join interview
- `POST /api/ai/detect` - Send video frame for AI detection

---

**Last Updated**: 2026-08-18
**Status**: Basic auth endpoints ready for testing
