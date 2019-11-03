package com.neggo.neggo.service;

import com.neggo.neggo.model.Course;

import java.util.List;

public interface CourseService {
    List<Course> getAll();
    void create(Course course);
}
