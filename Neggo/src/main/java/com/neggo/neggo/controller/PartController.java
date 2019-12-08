package com.neggo.neggo.controller;

import com.neggo.neggo.controller.handle.PartForm;
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
        Part part = new Part();
        part.setName(partForm.getName());
        part.setContent(partForm.getContent());
        part.setSlot(partForm.getSlot());
        part.setType(partForm.isType());
        part.setLessionID(partForm.getLessionID());
        Part newPart = partService.create(part);
        return new ResponseEntity<>(newPart, HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<Part> updatePart(@Valid @RequestBody PartForm partForm) {
        Part part = new Part();
        part.setId(partForm.getId());
        part.setName(partForm.getName());
        part.setContent(partForm.getContent());
        part.setSlot(partForm.getSlot());
        part.setType(partForm.isType());
        part.setLessionID(partForm.getLessionID());
        Part newPart = partService.create(part);
        return new ResponseEntity<>(newPart, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Part> listPartByLession(@PathVariable Long id) {
        Part part = partService.findByID(id);
        return new ResponseEntity<>(part, HttpStatus.OK);
    }

    @RequestMapping(value = "", method = RequestMethod.GET)
    public ResponseEntity<List<Part>> listPart() {
        List<Part> parts = partService.findAll();
        return new ResponseEntity<>(parts, HttpStatus.OK);
    }

}
