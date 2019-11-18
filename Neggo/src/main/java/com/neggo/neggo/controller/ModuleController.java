package com.neggo.neggo.controller;

import com.neggo.neggo.controller.handle.ModuleForm;
import com.neggo.neggo.model.Course;
import com.neggo.neggo.model.Module;
import com.neggo.neggo.repositories.ModuleRepository;
import com.neggo.neggo.service.CourseService;
import com.neggo.neggo.service.ModuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/modules")
@CrossOrigin(origins = "*")
public class ModuleController {

    @Autowired
    private ModuleService moduleService;
    @Autowired
    private CourseService courseService;

    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity<Object> createUser(@Valid @RequestBody ModuleForm moduleForm) {
        Course course = courseService.getByID(moduleForm.getCourseID());
        Module module = new Module();
        module.setName(moduleForm.getName());
        module.setCourse(course);
        module.setOrder(moduleForm.getOrder());
        moduleService.createModule(module);
        return ResponseEntity.ok(module);
    }

    @RequestMapping
    public ResponseEntity<List<Module>> listModules() {
        List<Module> modules = moduleService.findAll();
        return ResponseEntity.ok(modules);
    }

}
