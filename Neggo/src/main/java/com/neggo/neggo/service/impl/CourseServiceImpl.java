package com.neggo.neggo.service.impl;

import com.neggo.neggo.model.Course;
import com.neggo.neggo.repositories.CourseRepository;
import com.neggo.neggo.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Override
    public List<Course> getAll() {
        return courseRepository.findAll();
    }

    @Override
    public Course create(Course course) {
        return courseRepository.save(course);
    }

    @Override
    public Course getByID(Long id) {
        return courseRepository.findByCourseID(id);
    }

    @Override
    public List<Course> findCourseActive() {
        return courseRepository.findCourseActive();
    }
}
