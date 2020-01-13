package com.neggo.neggo.service;

import com.neggo.neggo.model.Question;

import java.util.List;

public interface QuestionService {
    Question create(Question question);
    Question findByID(long id);
    List<Question> getAll();
}
