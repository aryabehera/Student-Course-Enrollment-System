import { useState } from 'react';
import { courseAPI } from '../services/api';
import EnrollStudent from './EnrollStudent';
import '../styles/CourseManagement.css';

const CourseManagement = () => {
  const [courseName, setCourseName] = useState('');
  const [courseDetails, setCourseDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCourseDetails = async () => {
    if (!courseName) return;
    
    try {
      setLoading(true);
      setError(null);
      const response = await courseAPI.getCourse(courseName);
      setCourseDetails(response.data);
    } catch (err) {
      setError('Course not found');
      setCourseDetails(null);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = async () => {
    if (!window.confirm(`Are you sure you want to delete ${courseName}?`)) return;
    
    try {
      await courseAPI.deleteCourse(courseName);
      alert('Course deleted successfully');
      setCourseDetails(null);
      setCourseName('');
    } catch (err) {
      alert('Failed to delete course');
    }
  };

  return (
    <div className="course-management-container">
      <h2>Course Management</h2>
      
      <div className="search-section">
        <input
          type="text"
          placeholder="Enter course name"
          value={courseName}
          onChange={(e) => setCourseName(e.target.value)}
          className="search-input"
        />
        <button onClick={fetchCourseDetails} disabled={loading} className="search-btn">
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {courseDetails && (
        <div className="course-details">
          <div className="details-header">
            <h3>{courseDetails.course_name}</h3>
            <button onClick={handleDeleteCourse} className="delete-btn">
              Delete Course
            </button>
          </div>
          
          <div className="details-content">
            <p><strong>Instructor:</strong> {courseDetails.instructor_name}</p>
            <p><strong>Instructor ID:</strong> {courseDetails.instructor_id}</p>
            <p><strong>Instructor Email:</strong> {courseDetails.instructor_email}</p>
            <p><strong>Duration:</strong> {courseDetails.duration} hours</p>
          </div>

          <div className="enrollments-section">
            <h4>Enrolled Students ({courseDetails.enrollments?.length || 0})</h4>
            {courseDetails.enrollments?.length > 0 ? (
              <ul className="student-list">
                {courseDetails.enrollments.map((enrollment) => (
                  <li key={enrollment.student_id}>
                    {enrollment.student_name} (ID: {enrollment.student_id}) - 
                    <span className={`status ${enrollment.status.toLowerCase()}`}>
                      {enrollment.status}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No students enrolled yet</p>
            )}
          </div>

          <EnrollStudent 
            courseName={courseName} 
            onEnrollmentSuccess={fetchCourseDetails}
          />
        </div>
      )}
    </div>
  );
};

export default CourseManagement;
