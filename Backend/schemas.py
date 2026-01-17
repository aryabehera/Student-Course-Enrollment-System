from pydantic import BaseModel
from typing import List, Optional


# Course Schemas
class CourseBase(BaseModel):
    course_name: str
    instructor_id: int
    instructor_name: str
    duration: int


class CourseCreate(CourseBase):
    pass


class CourseUpdate(BaseModel):
    instructor_id: Optional[int] = None
    instructor_name: Optional[str] = None
    duration: Optional[int] = None


class Course(CourseBase):
    class Config:
        from_attributes = True


# Enrollment Schemas
class EnrollmentBase(BaseModel):
    student_id: int
    student_name: str
    course: str


class EnrollmentCreate(BaseModel):
    student_id: int
    student_name: str


class EnrollmentUpdate(BaseModel):
    status: str  # "Enrolled" or "Dropped"


class Enrollment(EnrollmentBase):
    status: str
    
    class Config:
        from_attributes = True


# Response schemas with relationships
class CourseWithEnrollments(Course):
    enrollments: List[Enrollment] = []
    
    class Config:
        from_attributes = True


class EnrollmentWithCourse(Enrollment):
    course_rel: Course
    
    class Config:
        from_attributes = True

