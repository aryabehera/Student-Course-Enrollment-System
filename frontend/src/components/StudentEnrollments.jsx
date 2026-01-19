import { useState, useEffect, useMemo } from 'react';
import { enrollmentAPI } from '../services/api';
import '../styles/StudentEnrollments.css';

const StudentEnrollments = ({ studentId }) => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [instructorFilter, setInstructorFilter] = useState('All');

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

  // Get unique instructor names for filter dropdown
  const instructorNames = useMemo(() => {
    const names = [...new Set(enrollments.map(e => e.course_rel.instructor_name))];
    return names.sort();
  }, [enrollments]);

  // Filter enrollments based on status and instructor
  const filteredEnrollments = useMemo(() => {
    return enrollments.filter(enrollment => {
      const matchesStatus = statusFilter === 'All' || enrollment.status === statusFilter;
      const matchesInstructor = instructorFilter === 'All' || 
                                enrollment.course_rel.instructor_name === instructorFilter;
      return matchesStatus && matchesInstructor;
    });
  }, [enrollments, statusFilter, instructorFilter]);

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
        <>
          <div className="filters-section">
            <div className="filter-group">
              <label htmlFor="status-filter">Filter by Status:</label>
              <select 
                id="status-filter"
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                className="filter-select"
              >
                <option value="All">All</option>
                <option value="Enrolled">Enrolled</option>
                <option value="Dropped">Dropped</option>
              </select>
            </div>

            <div className="filter-group">
              <label htmlFor="instructor-filter">Filter by Instructor:</label>
              <select 
                id="instructor-filter"
                value={instructorFilter} 
                onChange={(e) => setInstructorFilter(e.target.value)}
                className="filter-select"
              >
                <option value="All">All Instructors</option>
                {instructorNames.map(name => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
            </div>

            <div className="filter-info">
              Showing {filteredEnrollments.length} of {enrollments.length} courses
            </div>
          </div>

          <div className="enrollment-list">
            {filteredEnrollments.length === 0 ? (
              <p className="no-results">No courses match the selected filters</p>
            ) : (
              filteredEnrollments.map((enrollment) => (
                <div key={enrollment.course} className="enrollment-card">
                  <h3>{enrollment.course_rel.course_name}</h3>
                  <p><strong>Instructor:</strong> {enrollment.course_rel.instructor_name}</p>
                  <p><strong>Instructor Email:</strong> {enrollment.course_rel.instructor_email}</p>
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
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default StudentEnrollments;
