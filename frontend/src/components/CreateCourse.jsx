import { useState } from 'react';
import { courseAPI } from '../services/api';
import '../styles/CreateCourse.css';

const CreateCourse = ({ onCourseCreated }) => {
  const [formData, setFormData] = useState({
    course_name: '',
    instructor_id: '',
    instructor_name: '',
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
        instructor_id: parseInt(formData.instructor_id),
        duration: parseInt(formData.duration)
      });
      setSuccess(true);
      setFormData({
        course_name: '',
        instructor_id: '',
        instructor_name: '',
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
          <label>Instructor ID:</label>
          <input
            type="number"
            name="instructor_id"
            value={formData.instructor_id}
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
