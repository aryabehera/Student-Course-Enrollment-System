# Student Course Enrollment System

A full-stack web application for managing courses and student enrollments. Built with FastAPI backend and React frontend.

## 📋 Overview

This system allows instructors to manage courses and enroll students, while students can view their enrollments and manage their course status (enrolled/dropped).

## 🏗️ Architecture

### Backend (FastAPI + SQLAlchemy)
- **Framework**: FastAPI
- **Database**: SQLite
- **ORM**: SQLAlchemy
- **Port**: 8001

### Frontend (React + Vite)
- **Framework**: React 19
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **Port**: 5173

## 📂 Project Structure

```
Student-Course-Enrollment-System/
├── Backend/
│   ├── routers/
│   │   ├── courses.py          # Course CRUD & enrollment endpoints
│   │   └── enrollment.py       # Student enrollment endpoints
│   ├── database.py             # Database configuration
│   ├── models.py               # SQLAlchemy models
│   ├── schemas.py              # Pydantic schemas
│   ├── main.py                 # FastAPI app entry point
│   └── requirements.txt        # Python dependencies
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── CourseList.jsx          # Display all courses
    │   │   ├── CreateCourse.jsx        # Create new course form
    │   │   ├── CourseManagement.jsx    # Manage course details
    │   │   ├── EnrollStudent.jsx       # Enroll student form
    │   │   └── StudentEnrollments.jsx  # Student enrollment view
    │   ├── services/
    │   │   └── api.jsx                 # API service layer
    │   ├── styles/                     # CSS files
    │   ├── App.jsx                     # Main React component
    │   └── main.jsx                    # React entry point
    └── package.json
```

## 💾 Database Schema

### Courses Table
| Field            | Type    | Description                |
|------------------|---------|----------------------------|
| course_name      | String  | Primary key, course name   |
| instructor_id    | Integer | Instructor identifier      |
| instructor_name  | String  | Instructor name            |
| duration         | Integer | Course duration in hours   |

### Enrollments Table
| Field        | Type    | Description                      |
|--------------|---------|----------------------------------|
| student_id   | Integer | Primary key, student identifier  |
| student_name | String  | Student name                     |
| course       | String  | Foreign key to courses           |
| status       | String  | "Enrolled" or "Dropped"          |

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn

### Backend Setup

1. Navigate to Backend directory:
```bash
cd Backend
```

2. Create virtual environment:
```bash
python -m venv venv
```

3. Activate virtual environment:
```bash
# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

5. Run the server:
```bash
uvicorn main:app --reload --port 8001
```

Backend will be available at: `http://localhost:8001`
API Documentation: `http://localhost:8001/docs`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run development server:
```bash
npm run dev
```

Frontend will be available at: `http://localhost:5173`

## 📡 API Endpoints

### Course Management (Instructor)

#### Get All Courses
```http
GET /courses/
```

#### Get Course by Name
```http
GET /courses/{course_name}
```

#### Create Course
```http
POST /courses/
Content-Type: application/json

{
  "course_name": "Python Programming",
  "instructor_id": 1,
  "instructor_name": "John Doe",
  "duration": 40
}
```

#### Update Course
```http
PUT /courses/{course_name}
Content-Type: application/json

{
  "instructor_id": 1,
  "instructor_name": "John Doe",
  "duration": 45
}
```

#### Delete Course
```http
DELETE /courses/{course_name}
```

#### Enroll Student
```http
POST /courses/{course_name}/enroll
Content-Type: application/json

{
  "student_id": 101,
  "student_name": "Jane Smith"
}
```

### Student Enrollment

#### Get Student Enrollments
```http
GET /enrollments/student/{student_id}
```

#### Update Enrollment Status
```http
PATCH /enrollments/student/{student_id}/course/{course_name}
Content-Type: application/json

{
  "status": "Dropped"
}
```

## 🎨 Features

### Instructor Features
- ✅ Create new courses
- ✅ View all courses
- ✅ Update course details
- ✅ Delete courses
- ✅ Enroll students in courses
- ✅ View enrolled students per course

### Student Features
- ✅ View all enrolled courses
- ✅ See course details (instructor, duration)
- ✅ Drop courses (change status to "Dropped")
- ✅ Re-enroll in dropped courses

## 🛠️ Technologies Used

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - SQL toolkit and ORM
- **Pydantic** - Data validation
- **Uvicorn** - ASGI server
- **SQLite** - Lightweight database

### Frontend
- **React** - UI library
- **Vite** - Build tool
- **Axios** - HTTP client
- **CSS3** - Styling

## 🎯 Key Design Decisions

1. **Two-table design**: Simple and efficient with courses and enrollments
2. **Composite primary key**: `(student_id, course)` in enrollments prevents duplicate enrollments
3. **Status field**: Allows soft deletion (dropping courses) while maintaining history
4. **RESTful API**: Clean, predictable endpoint structure
5. **Component-based frontend**: Modular, reusable React components

## 🔒 CORS Configuration

The backend is configured to allow all origins for development. For production, update the CORS settings in `main.py`:

```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Specify allowed origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 📝 Development Notes

- Database file (`course_enrollment.db`) is auto-created on first run
- API documentation is auto-generated at `/docs` endpoint
- Frontend uses green theme for main UI, blue for action buttons
- All times are in hours (duration field)

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👤 Author

**Arya Behera**
- GitHub: [@aryabehera](https://github.com/aryabehera)

##  Acknowledgments

- FastAPI documentation
- React documentation
- Vite documentation

 ## ER Diagram :
 <?plantuml 1.2026.1beta5?><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" contentStyleType="text/css" data-diagram-type="CLASS" height="348px" preserveAspectRatio="none" style="width:364px;height:348px;background:#FFFFFF;" version="1.1" viewBox="0 0 364 348" width="364px" zoomAndPan="magnify"><defs/><g><!--class Course--><g class="entity" data-qualified-name="Course" data-source-line="3" id="ent0002"><rect fill="#F1F1F1" height="121.4531" rx="2.5" ry="2.5" style="stroke:#181818;stroke-width:0.5;" width="202.668" x="81.05" y="7"/><ellipse cx="153.6955" cy="27.1328" fill="#ADD1B2" rx="11" ry="11" style="stroke:#181818;stroke-width:1;"/><path d="M156.6643,32.7734 Q156.0861,33.0703 155.4455,33.2109 Q154.8049,33.3672 154.1018,33.3672 Q151.6018,33.3672 150.2736,31.7266 Q148.9611,30.0703 148.9611,26.9453 Q148.9611,23.8203 150.2736,22.1641 Q151.6018,20.5078 154.1018,20.5078 Q154.8049,20.5078 155.4455,20.6641 Q156.1018,20.8203 156.6643,21.1172 L156.6643,23.8359 Q156.0393,23.2578 155.4455,22.9922 Q154.8518,22.7109 154.2268,22.7109 Q152.883,22.7109 152.1955,23.7891 Q151.508,24.8516 151.508,26.9453 Q151.508,29.0391 152.1955,30.1172 Q152.883,31.1797 154.2268,31.1797 Q154.8518,31.1797 155.4455,30.9141 Q156.0393,30.6328 156.6643,30.0547 L156.6643,32.7734 Z " fill="#000000"/><text fill="#000000" font-family="sans-serif" font-size="12" font-style="italic" lengthAdjust="spacing" textLength="49.7168" x="173.7756" y="23.1387">&#171;Entity&#187;</text><text fill="#000000" font-family="sans-serif" font-size="14" lengthAdjust="spacing" textLength="48.877" x="174.1955" y="38.9639">Course</text><line style="stroke:#181818;stroke-width:0.5;" x1="82.05" x2="282.718" y1="47.2656" y2="47.2656"/><text fill="#000000" font-family="sans-serif" font-size="14" lengthAdjust="spacing" textLength="190.668" x="87.05" y="64.2607">+String course_name &#171;PK&#187;</text><text fill="#000000" font-family="sans-serif" font-size="14" lengthAdjust="spacing" textLength="154" x="87.05" y="80.5576">+Integer instructor_id</text><text fill="#000000" font-family="sans-serif" font-size="14" lengthAdjust="spacing" textLength="172.3477" x="87.05" y="96.8545">+String instructor_name</text><text fill="#000000" font-family="sans-serif" font-size="14" lengthAdjust="spacing" textLength="125.4531" x="87.05" y="113.1514">+Integer duration</text><line style="stroke:#181818;stroke-width:0.5;" x1="82.05" x2="282.718" y1="120.4531" y2="120.4531"/></g><!--class Enrollment--><g class="entity" data-qualified-name="Enrollment" data-source-line="10" id="ent0003"><rect fill="#F1F1F1" height="121.4531" rx="2.5" ry="2.5" style="stroke:#181818;stroke-width:0.5;" width="350.7754" x="7" y="220.46"/><ellipse cx="139.9214" cy="240.5928" fill="#ADD1B2" rx="11" ry="11" style="stroke:#181818;stroke-width:1;"/><path d="M142.8901,246.2334 Q142.312,246.5303 141.6714,246.6709 Q141.0308,246.8272 140.3276,246.8272 Q137.8276,246.8272 136.4995,245.1866 Q135.187,243.5303 135.187,240.4053 Q135.187,237.2803 136.4995,235.6241 Q137.8276,233.9678 140.3276,233.9678 Q141.0308,233.9678 141.6714,234.1241 Q142.3276,234.2803 142.8901,234.5772 L142.8901,237.2959 Q142.2651,236.7178 141.6714,236.4522 Q141.0776,236.1709 140.4526,236.1709 Q139.1089,236.1709 138.4214,237.2491 Q137.7339,238.3116 137.7339,240.4053 Q137.7339,242.4991 138.4214,243.5772 Q139.1089,244.6397 140.4526,244.6397 Q141.0776,244.6397 141.6714,244.3741 Q142.2651,244.0928 142.8901,243.5147 L142.8901,246.2334 Z " fill="#000000"/><text fill="#000000" font-family="sans-serif" font-size="12" font-style="italic" lengthAdjust="spacing" textLength="49.7168" x="173.7793" y="236.5987">&#171;Entity&#187;</text><text fill="#000000" font-family="sans-serif" font-size="14" lengthAdjust="spacing" textLength="76.4326" x="160.4214" y="252.4239">Enrollment</text><line style="stroke:#181818;stroke-width:0.5;" x1="8" x2="356.7754" y1="260.7256" y2="260.7256"/><text fill="#000000" font-family="sans-serif" font-size="14" lengthAdjust="spacing" textLength="179.04" x="13" y="277.7207">+Integer student_id &#171;PK&#187;</text><text fill="#000000" font-family="sans-serif" font-size="14" lengthAdjust="spacing" textLength="338.7754" x="13" y="294.0176">+String course &#171;PK&#187; &#171;FK: Course.course_name&#187;</text><text fill="#000000" font-family="sans-serif" font-size="14" lengthAdjust="spacing" textLength="158.1836" x="13" y="310.3145">+String student_name</text><text fill="#000000" font-family="sans-serif" font-size="14" lengthAdjust="spacing" textLength="191.8096" x="13" y="326.6114">+String status = "Enrolled"</text><line style="stroke:#181818;stroke-width:0.5;" x1="8" x2="356.7754" y1="333.9131" y2="333.9131"/></g><!--reverse link Course to Enrollment--><g class="link" data-entity-1="ent0002" data-entity-2="ent0003" data-link-type="aggregation" data-source-line="17" id="lnk4"><path codeLine="17" d="M182.39,140.76 C182.39,169.33 182.39,191.41 182.39,220" fill="none" id="Course-backto-Enrollment" style="stroke:#181818;stroke-width:1;"/><polygon fill="none" points="182.39,128.76,178.39,134.76,182.39,140.76,186.39,134.76,182.39,128.76" style="stroke:#181818;stroke-width:1;"/><text fill="#000000" font-family="sans-serif" font-size="13" lengthAdjust="spacing" textLength="77.5303" x="224.4149" y="171.5269">enrollments</text><text fill="#000000" font-family="sans-serif" font-size="13" lengthAdjust="spacing" textLength="159.5801" x="183.39" y="186.6597">(course_name &#8594; course)</text><text fill="#000000" font-family="sans-serif" font-size="13" lengthAdjust="spacing" textLength="8.271" x="173.968" y="148.33">1</text><text fill="#000000" font-family="sans-serif" font-size="13" lengthAdjust="spacing" textLength="23.0356" x="158.1344" y="209.5616">0..*</text></g><?plantuml-src PP1D2i8m44RtFSMGbJ-qw5PgGQH2wKPmAqXiGmcs4qac2nMt7i0ZUXBRsfOKLo7vvcNUZBb8l7BDAyXARio6ICkp9P5a2W_oBc3XUMq2MsMr4H26CPAaMnJ1mmEOmw4ci82iZK_8gwPcdqPHcoP8eX0Q91hIDYEbJp9tEITes16KMyr9AlIUlKICMfLb9P3-HNhAaCthWhgFApBIx8BwsAMhRhB0cM3Cz1yEViCx9sjW3Uod9NBMc7QBOai6olU1BO9Wnbpp5OZXOeuuSLVtURqxn-aN?></g></svg>
