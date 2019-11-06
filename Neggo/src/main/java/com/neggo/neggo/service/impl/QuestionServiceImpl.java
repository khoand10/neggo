package com.neggo.neggo.service.impl;

import com.neggo.neggo.model.Question;
import com.neggo.neggo.repositories.QuestionRepository;
import com.neggo.neggo.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Override
    public Question create(Question question) {
        return questionRepository.save(question);
    }
}
