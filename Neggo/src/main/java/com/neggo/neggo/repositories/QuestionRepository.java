package com.neggo.neggo.repositories;

import com.neggo.neggo.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    @Query("SELECT t FROM Question t WHERE t.id = ?1")
    Question findByQuestionID(Long id);
}
