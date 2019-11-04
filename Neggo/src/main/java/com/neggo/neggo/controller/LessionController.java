package com.neggo.neggo.controller;

import com.neggo.neggo.controller.handle.LessionForm;
import com.neggo.neggo.model.Lession;
import com.neggo.neggo.model.Module;
import com.neggo.neggo.service.LessionService;
import com.neggo.neggo.service.ModuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/lessions")
@CrossOrigin(origins = "*")
public class LessionController {

    @Autowired
    private LessionService lessionService;
    @Autowired
    private ModuleService moduleService;

    @RequestMapping
    public ResponseEntity<List<Lession>> listLession() {
        List<Lession> lessions = lessionService.getAll();
        return new ResponseEntity<>(lessions, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Lession> createLession(@Valid @RequestBody LessionForm lessionForm) {
        Module module = moduleService.findByID(lessionForm.getModuleID());
        Lession lession = new Lession();
        lession.setName(lessionForm.getName());
        lession.setModule(module);
        lessionService.create(lession);
        return new ResponseEntity<>(lession, HttpStatus.OK);
    }

}
