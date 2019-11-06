package com.neggo.neggo.service.impl;

import com.neggo.neggo.model.Answer;
import com.neggo.neggo.repositories.AnswerRepository;
import com.neggo.neggo.service.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AnswerServiceImpl implements AnswerService {

    @Autowired
    private AnswerRepository answerRepository;

    @Override
    public Answer create(Answer answer) {
        return answerRepository.save(answer);
    }
}
