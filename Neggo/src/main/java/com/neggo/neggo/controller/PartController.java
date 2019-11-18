package com.neggo.neggo.controller;

import com.neggo.neggo.controller.handle.PartForm;
import com.neggo.neggo.model.Lession;
import com.neggo.neggo.model.Part;
import com.neggo.neggo.service.LessionService;
import com.neggo.neggo.service.PartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/parts")
@CrossOrigin(origins = "*")
public class PartController {
    @Autowired
    private PartService partService;
    @Autowired
    private LessionService lessionService;

    @PostMapping
    public ResponseEntity<Part> createPart(@Valid @RequestBody PartForm partForm) {
//        Part part = new Part();
//        if (partForm.isType() == false) {
//            part.setName(partForm.getName());
//            part.setContent(partForm.getContent());
//            part.setType(partForm.isType());
//            part.setLession(lessionService.findByID(partForm.getLessionID()));
//            partService.create(part);
//        } else {
//
//        }
        Part part = partService.create(partForm);
        return new ResponseEntity<>(part, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<List<Part>> listPartByLession(@PathVariable Long id) {
        List<Part> parts = partService.findByLessionID(id);
        return new ResponseEntity<>(parts, HttpStatus.OK);
    }

}
