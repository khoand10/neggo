package com.neggo.neggo.repositories;

import com.neggo.neggo.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course, Long> {
    @Query("SELECT t FROM Course t WHERE t.id = ?1")
    Course findByCourseID(Long id);
    @Query("SELECT t FROM Course t WHERE t.active = true")
    List<Course> findCourseActive();

}
