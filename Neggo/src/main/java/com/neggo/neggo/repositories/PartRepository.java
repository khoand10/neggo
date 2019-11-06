package com.neggo.neggo.repositories;

import com.neggo.neggo.model.Part;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PartRepository extends JpaRepository<Part, Long> {
}
