package com.neggo.neggo.repositories;

import com.neggo.neggo.model.Module;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;

public interface ModuleRepository extends JpaRepository<Module, Long> {
    @Query("SELECT t FROM Module t WHERE t.id = ?1")
    Module findByModuleID(Long id);

    @Modifying
    @Query(value = "insert into Module (name,course_id, order) VALUES (?1,?2,?3)", nativeQuery = true)
    @Transactional
    int creaModule(String name, Long courseID, int order);
}
