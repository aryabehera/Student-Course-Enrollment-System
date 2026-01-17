import { useState, useEffect } from 'react';
import { enrollmentAPI } from '../services/api';
import '../styles/StudentEnrollments.css';

const StudentEnrollments = ({ studentId }) => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (studentId) {
      fetchEnrollments();
    }
  }, [studentId]);

  const fetchEnrollments = async () => {
    try {
      setLoading(true);
      const response = await enrollmentAPI.getStudentEnrollments(studentId);
      setEnrollments(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch enrollments');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDropCourse = async (courseName) => {
    try {
      await enrollmentAPI.updateEnrollmentStatus(studentId, courseName, {
        status: 'Dropped'
      });
      fetchEnrollments();
    } catch (err) {
      alert('Failed to drop course');
    }
  };

  const handleReEnroll = async (courseName) => {
    try {
      await enrollmentAPI.updateEnrollmentStatus(studentId, courseName, {
        status: 'Enrolled'
      });
      fetchEnrollments();
    } catch (err) {
      alert('Failed to re-enroll');
    }
  };

  if (!studentId) {
    return <div className="info-message">Please enter a student ID to view enrollments</div>;
  }

  if (loading) return <div className="loading">Loading enrollments...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="student-enrollments-container">
      <h2>My Enrollments (Student ID: {studentId})</h2>
      {enrollments.length === 0 ? (
        <p>No enrollments found</p>
      ) : (
        <div className="enrollment-list">
          {enrollments.map((enrollment) => (
            <div key={enrollment.course} className="enrollment-card">
              <h3>{enrollment.course_rel.course_name}</h3>
              <p><strong>Instructor:</strong> {enrollment.course_rel.instructor_name}</p>
              <p><strong>Duration:</strong> {enrollment.course_rel.duration} hours</p>
              <p><strong>Status:</strong> 
                <span className={`status ${enrollment.status.toLowerCase()}`}>
                  {enrollment.status}
                </span>
              </p>
              <div className="actions">
                {enrollment.status === 'Enrolled' ? (
                  <button 
                    onClick={() => handleDropCourse(enrollment.course)}
                    className="drop-btn"
                  >
                    Drop Course
                  </button>
                ) : (
                  <button 
                    onClick={() => handleReEnroll(enrollment.course)}
                    className="enroll-btn"
                  >
                    Re-enroll
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentEnrollments;
