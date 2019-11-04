package com.neggo.neggo.repositories;

import com.neggo.neggo.model.Module;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface ModuleRepository extends JpaRepository<Module, Long> {
    @Query("SELECT t FROM Module t WHERE t.id = ?1")
    Module findByModuleID(Long id);
}
