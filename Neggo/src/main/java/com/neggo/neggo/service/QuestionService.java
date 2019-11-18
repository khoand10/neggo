package com.neggo.neggo.service;

import com.neggo.neggo.model.Question;

public interface QuestionService {
    Question create(Question question);
    Question findByID(long id);
}
