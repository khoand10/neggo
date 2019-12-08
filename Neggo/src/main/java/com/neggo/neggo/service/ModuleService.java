package com.neggo.neggo.service;

import com.neggo.neggo.model.Module;

import java.util.List;

public interface ModuleService {
    Module createModule(Module module);
    Module findByID(Long id);
    List<Module> findAll();
    void delete(Long id);
}
