from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models import Course, Enrollment
from schemas import (
    CourseCreate, 
    Course as CourseSchema, 
    CourseUpdate,
    CourseWithEnrollments,
    EnrollmentCreate,
    Enrollment as EnrollmentSchema
)

router = APIRouter(
    prefix="/courses",
    tags=["Courses"]
)


# Create a new course (Instructor)
@router.post("/", response_model=CourseSchema, status_code=status.HTTP_201_CREATED)
def create_course(course: CourseCreate, db: Session = Depends(get_db)):
    """Create a new course"""
    db_course = db.query(Course).filter(Course.course_name == course.course_name).first()
    if db_course:
        raise HTTPException(status_code=400, detail="Course already exists")
    
    new_course = Course(**course.model_dump())
    db.add(new_course)
    db.commit()
    db.refresh(new_course)
    return new_course


# Get all courses
@router.get("/", response_model=List[CourseSchema])
def get_all_courses(db: Session = Depends(get_db)):
    """Get all courses"""
    return db.query(Course).all()


# Get a specific course with enrollments
@router.get("/{course_name}", response_model=CourseWithEnrollments)
def get_course(course_name: str, db: Session = Depends(get_db)):
    """Get course details with enrollments"""
    course = db.query(Course).filter(Course.course_name == course_name).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course


# Update a course (Instructor)
@router.put("/{course_name}", response_model=CourseSchema)
def update_course(course_name: str, course_update: CourseUpdate, db: Session = Depends(get_db)):
    """Update course details"""
    course = db.query(Course).filter(Course.course_name == course_name).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    if course_update.instructor_name is not None:
        course.instructor_name = course_update.instructor_name
    if course_update.instructor_email is not None:
        course.instructor_email = course_update.instructor_email
    if course_update.duration is not None:
        course.duration = course_update.duration
    
    db.commit()
    db.refresh(course)
    return course


# Delete a course (Instructor)
@router.delete("/{course_name}", status_code=status.HTTP_204_NO_CONTENT)
def delete_course(course_name: str, db: Session = Depends(get_db)):
    """Delete a course"""
    course = db.query(Course).filter(Course.course_name == course_name).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    db.query(Enrollment).filter(Enrollment.course == course_name).delete()
    db.delete(course)
    db.commit()
    return None


# Enroll a student in a course (Instructor)
@router.post("/{course_name}/enroll", response_model=EnrollmentSchema, status_code=status.HTTP_201_CREATED)
def enroll_student(course_name: str, enrollment: EnrollmentCreate, db: Session = Depends(get_db)):
    """Enroll a student in a course"""
    course = db.query(Course).filter(Course.course_name == course_name).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    
    # Check if student already enrolled
    existing = db.query(Enrollment).filter(
        Enrollment.student_id == enrollment.student_id,
        Enrollment.course == course_name
    ).first()
    
    if existing:
        raise HTTPException(status_code=400, detail="Student already enrolled")
    
    # Use course_name from URL instead of the one in request body
    new_enrollment = Enrollment(
        student_id=enrollment.student_id,
        student_name=enrollment.student_name,
        course=course_name,
        status="Enrolled"
    )
    db.add(new_enrollment)
    db.commit()
    db.refresh(new_enrollment)
    return new_enrollment
