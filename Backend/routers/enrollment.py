from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models import Enrollment
from schemas import (
    Enrollment as EnrollmentSchema,
    EnrollmentWithCourse,
    EnrollmentUpdate
)

router = APIRouter(
    prefix="/enrollments",
    tags=["Enrollments"]
)


# Get all enrollments for a student
@router.get("/student/{student_id}", response_model=List[EnrollmentWithCourse])
def get_student_enrollments(student_id: int, db: Session = Depends(get_db)):
    """Get all courses a student is enrolled in"""
    enrollments = db.query(Enrollment).filter(Enrollment.student_id == student_id).all()
    return enrollments


# Update enrollment status (drop/re-enroll)
@router.patch("/student/{student_id}/course/{course_id}", response_model=EnrollmentSchema)
def update_enrollment_status(
    student_id: int, 
    course_id: str, 
    enrollment_update: EnrollmentUpdate, 
    db: Session = Depends(get_db)
):
    """Update enrollment status (Enrolled/Dropped)"""
    enrollment = db.query(Enrollment).filter(
        Enrollment.student_id == student_id,
        Enrollment.course_id == course_id
    ).first()
    
    if not enrollment:
        raise HTTPException(status_code=404, detail="Enrollment not found")
    
    if enrollment_update.status not in ["Enrolled", "Dropped"]:
        raise HTTPException(status_code=400, detail="Status must be 'Enrolled' or 'Dropped'")
    
    enrollment.status = enrollment_update.status
    db.commit()
    db.refresh(enrollment)
    return enrollment
