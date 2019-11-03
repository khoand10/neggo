package com.neggo.neggo.repositories;

import com.neggo.neggo.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CourseRepository extends JpaRepository<Course, Long> {
}
