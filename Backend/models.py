from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Course(Base):
    __tablename__ = "courses"

    course_name = Column(String, primary_key=True, index=True)
    instructor_id = Column(Integer, index=True)
    instructor_name = Column(String, index=True)
    duration = Column(Integer)

    enrollments = relationship("Enrollment", back_populates="course", foreign_keys="Enrollment.course_id")

class Enrollment(Base):
    __tablename__ = "enrollments"
    
    student_id = Column(Integer, primary_key=True, index=True)
    student_name = Column(String, index=True)
    course_id = Column(String, ForeignKey("courses.course_name"), primary_key=True)
    status = Column(String, default="Enrolled")

    course = relationship("Course", back_populates="enrollments", foreign_keys=[course_id])