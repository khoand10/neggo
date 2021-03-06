package com.neggo.neggo.service;

import com.neggo.neggo.controller.handle.PartForm;
import com.neggo.neggo.model.Part;

import java.util.List;

public interface PartService {
    Part create(Part part);
    List<Part> findByLessionID(Long id);
    Part findByID(Long id);
    List<Part> findAll();
}
