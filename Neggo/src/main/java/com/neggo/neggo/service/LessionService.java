package com.neggo.neggo.service;

import com.neggo.neggo.model.Lession;

import java.util.List;

public interface LessionService {
    List<Lession> getAll();
    void create(Lession lession);
    Lession findByID(Long id);
    List<Lession> findByModuleID(Long id);
}
