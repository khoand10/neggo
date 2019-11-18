package com.neggo.neggo.repositories;

import com.neggo.neggo.model.Part;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PartRepository extends JpaRepository<Part, Long> {
    List<Part> findBylessionID(Long id);
}
