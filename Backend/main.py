from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from routers import courses, enrollment

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Student Course Enrollment System"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(courses.router)
app.include_router(enrollment.router)

@app.get("/")
def read_root():
    return {
        "message": "Welcome to Student Course Enrollment System API",
        "docs": "/docs"
    }
