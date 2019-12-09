package com.neggo.neggo.controller;

import com.neggo.neggo.controller.handle.ChangeStatusForm;
import com.neggo.neggo.model.Course;
import com.neggo.neggo.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "*")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @RequestMapping
    public ResponseEntity<List<Course>> listCourses() {
        List<Course> courses = courseService.getAll();
        return new ResponseEntity<>(courses, HttpStatus.OK);
    }

    @GetMapping(value = "/active")
    public ResponseEntity<List<Course>> listCoursesActive() {
        List<Course> courses = courseService.findCourseActive();
        return new ResponseEntity<>(courses, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Course> createCourse(@Valid @RequestBody Course course) {
        courseService.create(course);
        return new ResponseEntity<>(course, HttpStatus.OK);
    }

    @PostMapping(value = "/change-status")
    public ResponseEntity<Course>changeStatusCourses(@Valid @RequestBody ChangeStatusForm changeStatusForm) {
        Course course = courseService.getByID(changeStatusForm.getCourseID());
        course.setActive(changeStatusForm.isActive());
        Course newCourse = courseService.create(course);
        return new ResponseEntity<>(course, HttpStatus.OK);
    }
}
