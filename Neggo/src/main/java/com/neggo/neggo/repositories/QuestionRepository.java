package com.neggo.neggo.repositories;

import com.neggo.neggo.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Long> {
}
