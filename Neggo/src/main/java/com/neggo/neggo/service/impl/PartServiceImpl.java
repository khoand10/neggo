package com.neggo.neggo.service.impl;

import com.neggo.neggo.controller.handle.PartForm;
import com.neggo.neggo.model.Answer;
import com.neggo.neggo.model.Part;
import com.neggo.neggo.model.Question;
import com.neggo.neggo.repositories.PartRepository;
import com.neggo.neggo.service.AnswerService;
import com.neggo.neggo.service.LessionService;
import com.neggo.neggo.service.PartService;
import com.neggo.neggo.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PartServiceImpl implements PartService {

    @Autowired
    private PartRepository partRepository;
    @Autowired
    private LessionService lessionService;
    @Autowired
    private AnswerService answerService;
    @Autowired
    private QuestionService questionService;

    @Override
    public Part create(PartForm partForm) {
        Part part = new Part();
        if (partForm.isType() == false) {
            part.setName(partForm.getName());
            part.setContent(partForm.getContent());
            part.setType(false);
            part.setLessionID(partForm.getLessionID());
            partRepository.save(part);
        } else {
            part.setType(true);
            // 1
            Part newPart = partRepository.save(part);
            Question question = new Question();
            question.setName(partForm.getQuestionForm().getName());
            question.setMulti(partForm.getQuestionForm().isMulti());
            question.setPart(newPart);
            // 2
            Question newQuestion = questionService.create(question);
            for (int i = 0; i < partForm.getQuestionForm().getAnswerForms().size(); i++) {
                Answer answer = new Answer();
                answer.setContent(partForm.getQuestionForm().getAnswerForms().get(i).getContent());
                answer.setQuestion(newQuestion);
                // 3
                answerService.create(answer);
            }
        }
        return part;
    }

    @Override
    public List<Part> findByLessionID(Long id) {
        return partRepository.findBylessionID(id);
    }

    @Override
    public List<Part> findAll() {
        return partRepository.findAll();
    }
}
