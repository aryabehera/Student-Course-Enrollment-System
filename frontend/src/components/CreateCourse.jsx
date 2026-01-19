import { useState } from 'react';
import { courseAPI } from '../services/api';
import '../styles/CreateCourse.css';

const CreateCourse = ({ onCourseCreated }) => {
  const [formData, setFormData] = useState({
    course_name: '',
    instructor_name: '',
    instructor_email: '',
    duration: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await courseAPI.createCourse({
        ...formData,
        duration: parseInt(formData.duration)
      });
      setSuccess(true);
      setFormData({
        course_name: '',
        instructor_name: '',
        instructor_email: '',
        duration: ''
      });
      if (onCourseCreated) onCourseCreated();
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to create course');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-course-container">
      <h2>Create New Course</h2>
      {success && <div className="success-message">Course created successfully!</div>}
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="course-form">
        <div className="form-group">
          <label>Course Name:</label>
          <input
            type="text"
            name="course_name"
            value={formData.course_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Instructor Name:</label>
          <input
            type="text"
            name="instructor_name"
            value={formData.instructor_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Instructor Email:</label>
          <input
            type="email"
            name="instructor_email"
            value={formData.instructor_email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Duration (hours):</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Creating...' : 'Create Course'}
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
