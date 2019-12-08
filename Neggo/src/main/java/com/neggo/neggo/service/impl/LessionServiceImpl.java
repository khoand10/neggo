package com.neggo.neggo.service.impl;

import com.neggo.neggo.model.Lession;
import com.neggo.neggo.repositories.LessionRepository;
import com.neggo.neggo.service.LessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LessionServiceImpl implements LessionService {

    @Autowired
    private LessionRepository lessionRepository;

    @Override
    public List<Lession> getAll() {
        return lessionRepository.findAll();
    }

    @Override
    public void create(Lession lession) {
        lessionRepository.save(lession);
    }

    @Override
    public Lession findByID(Long id) {
        return lessionRepository.findByLessionID(id);
    }

    @Override
    public List<Lession> findByModuleID(Long id) {
        return lessionRepository.findBymoduleID(id);
    }

    @Override
    public void delete(Long id) {
        lessionRepository.deleteById(id);
    }
}
