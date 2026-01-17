import { useState, useEffect } from 'react';
import { courseAPI } from '../services/api';
import '../styles/CourseList.css';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await courseAPI.getAllCourses();
      setCourses(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch courses');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading courses...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="course-list-container">
      <h2>Available Courses</h2>
      {courses.length === 0 ? (
        <p>No courses available</p>
      ) : (
        <div className="course-grid">
          {courses.map((course) => (
            <div key={course.course_name} className="course-card">
              <h3>{course.course_name}</h3>
              <p><strong>Instructor:</strong> {course.instructor_name}</p>
              <p><strong>Instructor ID:</strong> {course.instructor_id}</p>
              <p><strong>Duration:</strong> {course.duration} hours</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CourseList;
