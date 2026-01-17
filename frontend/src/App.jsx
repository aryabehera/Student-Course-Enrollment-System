import { useState } from 'react';
import CourseList from './components/CourseList';
import CreateCourse from './components/CreateCourse';
import CourseManagement from './components/CourseManagement';
import StudentEnrollments from './components/StudentEnrollments';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('courses');
  const [studentId, setStudentId] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCourseCreated = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Student Course Enrollment System</h1>
      </header>

      <nav className="navigation">
        <button 
          className={activeTab === 'courses' ? 'active' : ''}
          onClick={() => setActiveTab('courses')}
        >
          All Courses
        </button>
        <button 
          className={activeTab === 'create' ? 'active' : ''}
          onClick={() => setActiveTab('create')}
        >
          Create Course
        </button>
        <button 
          className={activeTab === 'manage' ? 'active' : ''}
          onClick={() => setActiveTab('manage')}
        >
          Manage Course
        </button>
        <button 
          className={activeTab === 'student' ? 'active' : ''}
          onClick={() => setActiveTab('student')}
        >
          Student View
        </button>
      </nav>

      <main className="main-content">
        {activeTab === 'courses' && (
          <CourseList key={refreshKey} />
        )}
        
        {activeTab === 'create' && (
          <CreateCourse onCourseCreated={handleCourseCreated} />
        )}
        
        {activeTab === 'manage' && (
          <CourseManagement />
        )}
        
        {activeTab === 'student' && (
          <div className="student-section">
            <div className="student-id-input">
              <label>Enter Student ID:</label>
              <input
                type="number"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="Enter your student ID"
              />
            </div>
            <StudentEnrollments studentId={parseInt(studentId)} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
