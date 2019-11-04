package com.neggo.neggo.service.impl;

import com.neggo.neggo.model.Module;
import com.neggo.neggo.repositories.ModuleRepository;
import com.neggo.neggo.service.ModuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ModuleServiceImpl implements ModuleService {

    @Autowired
    private ModuleRepository moduleRepository;

    @Override
    public void createModule(Module module) {
        moduleRepository.save(module);
    }

    @Override
    public Module findByID(Long id) {
        return moduleRepository.findByModuleID(id);
    }

    @Override
    public List<Module> findAll() {
        return moduleRepository.findAll();
    }
}
