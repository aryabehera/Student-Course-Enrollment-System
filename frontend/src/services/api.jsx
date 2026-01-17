import axios from 'axios';

const API_BASE_URL = 'http://localhost:8001';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Course APIs (Instructor)
export const courseAPI = {
  // Get all courses
  getAllCourses: () => api.get('/courses/'),
  
  // Get course by name with enrollments
  getCourse: (courseName) => api.get(`/courses/${courseName}`),
  
  // Create a new course
  createCourse: (courseData) => api.post('/courses/', courseData),
  
  // Update course
  updateCourse: (courseName, courseData) => api.put(`/courses/${courseName}`, courseData),
  
  // Delete course
  deleteCourse: (courseName) => api.delete(`/courses/${courseName}`),
  
  // Enroll student in course
  enrollStudent: (courseName, studentData) => api.post(`/courses/${courseName}/enroll`, studentData),
};

// Enrollment APIs 
export const enrollmentAPI = {
  getStudentEnrollments: (studentId) => api.get(`/enrollments/student/${studentId}`),
  
  // Update enrollment status (drop/re-enroll)
  updateEnrollmentStatus: (studentId, courseName, statusData) => 
    api.patch(`/enrollments/student/${studentId}/course/${courseName}`, statusData),
};

export default api;
