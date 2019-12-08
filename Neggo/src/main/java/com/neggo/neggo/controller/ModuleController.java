package com.neggo.neggo.controller;

import com.neggo.neggo.controller.error.ApiError;
import com.neggo.neggo.controller.error.ModuleResponse;
import com.neggo.neggo.controller.handle.ModuleForm;
import com.neggo.neggo.model.Course;
import com.neggo.neggo.model.Module;
import com.neggo.neggo.service.CourseService;
import com.neggo.neggo.service.ModuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<ModuleResponse> createModule(@Valid @RequestBody ModuleForm moduleForm) {
        Course course = courseService.getByID(moduleForm.getCourseID());
        Module module = new Module();
        module.setName(moduleForm.getName());
        module.setCourse(course);
        module.setSlot(moduleForm.getSlot());
        Module newModule = moduleService.createModule(module);
        ModuleResponse moduleResponse = new ModuleResponse(newModule.getId(), newModule.getName(), newModule.getCourse().getId(), newModule.getSlot());
        return new ResponseEntity<>(moduleResponse, HttpStatus.OK);
    }

    @RequestMapping(value = "", method = RequestMethod.PUT)
    public ResponseEntity<ModuleResponse> updateModule(@Valid @RequestBody ModuleForm moduleForm) {
        Course course = courseService.getByID(moduleForm.getCourseID());
        Module module = new Module();
        module.setName(moduleForm.getName());
        module.setCourse(course);
        module.setSlot(moduleForm.getSlot());
        module.setId(moduleForm.getId());
        Module newModule = moduleService.createModule(module);
        ModuleResponse moduleResponse = new ModuleResponse(newModule.getId(), newModule.getName(), newModule.getCourse().getId(), newModule.getSlot());
        return new ResponseEntity<>(moduleResponse, HttpStatus.OK);
    }

    @RequestMapping
    public ResponseEntity<List<Module>> listModules() {
        List<Module> modules = moduleService.findAll();
        return ResponseEntity.ok(modules);
    }

    @RequestMapping(value = "/{moduleID}", method = RequestMethod.DELETE)
    public ResponseEntity<ApiError> deleteModule(@PathVariable(value = "moduleID") Long id) {
        moduleService.delete(id);
        return new ResponseEntity<>(new ApiError("success"), HttpStatus.OK);
    }
}
