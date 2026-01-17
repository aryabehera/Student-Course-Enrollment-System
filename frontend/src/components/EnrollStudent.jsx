import { useState } from 'react';
import { courseAPI } from '../services/api';
import '../styles/EnrollStudent.css';

const EnrollStudent = ({ courseName, onEnrollmentSuccess }) => {
  const [formData, setFormData] = useState({
    student_id: '',
    student_name: ''
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
      await courseAPI.enrollStudent(courseName, {
        student_id: parseInt(formData.student_id),
        student_name: formData.student_name
      });
      setSuccess(true);
      setFormData({ student_id: '', student_name: '' });
      if (onEnrollmentSuccess) onEnrollmentSuccess();
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to enroll student');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="enroll-student-container">
      <h3>Enroll Student in {courseName}</h3>
      {success && <div className="success-message">Student enrolled successfully!</div>}
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="enroll-form">
        <div className="form-group">
          <label>Student ID:</label>
          <input
            type="number"
            name="student_id"
            value={formData.student_id}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Student Name:</label>
          <input
            type="text"
            name="student_name"
            value={formData.student_name}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Enrolling...' : 'Enroll Student'}
        </button>
      </form>
    </div>
  );
};

export default EnrollStudent;
