import api from "./api";

// ==================== Interview API Functions ====================

// Create new interview
export const createInterview = async (interviewData) => {
  const response = await api.post("/interviews", interviewData);
  return response.data;
};

// Get interview by ID
export const getInterviewById = async (id) => {
  const response = await api.get(`/interviews/${id}`);
  return response.data;
};

// Get recruiter's interviews
export const getRecruiterInterviews = async (status = null) => {
  let url = "/interviews/recruiter/mine";
  if (status) {
    url += `?status=${status}`;
  }
  const response = await api.get(url);
  return response.data;
};

// Get candidate's interviews
export const getCandidateInterviews = async (status = null) => {
  let url = "/interviews/candidate/mine";
  if (status) {
    url += `?status=${status}`;
  }
  const response = await api.get(url);
  return response.data;
};

// Validate a recruiter-generated candidate join link.
export const validateJoinInterview = async (joinToken) => {
  const response = await api.get(`/interviews/join/${encodeURIComponent(joinToken)}`);
  return response.data;
};

// Update interview
export const updateInterview = async (id, interviewData) => {
  const response = await api.put(`/interviews/${id}`, interviewData);
  return response.data;
};

// Cancel interview
export const cancelInterview = async (id, cancelReason = null) => {
  const response = await api.put(`/interviews/${id}/cancel`, { cancelReason });
  return response.data;
};

// Start interview (mark as in-progress)
export const startInterview = async (id) => {
  const response = await api.put(`/interviews/${id}/start`);
  return response.data;
};

// Complete interview
export const completeInterview = async (id, completionData) => {
  const response = await api.put(`/interviews/${id}/complete`, completionData);
  return response.data;
};
