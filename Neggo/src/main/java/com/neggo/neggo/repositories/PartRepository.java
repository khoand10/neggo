package com.neggo.neggo.repositories;

import com.neggo.neggo.model.Lession;
import com.neggo.neggo.model.Part;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PartRepository extends JpaRepository<Part, Long> {
    List<Part> findBylessionID(Long id);
    @Query("SELECT t FROM Part t WHERE t.id = ?1")
    Part findByID(Long id);
}
