package com.neggo.neggo.repositories;

import com.neggo.neggo.model.Lession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LessionRepository extends JpaRepository<Lession, Long> {
    @Query("SELECT t FROM Lession t WHERE t.id = ?1")
    Lession findByLessionID(Long id);
//    List<Lession> findBymoduleID(Long id);
}
