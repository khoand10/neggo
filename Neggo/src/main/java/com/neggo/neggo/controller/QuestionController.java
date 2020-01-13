package com.neggo.neggo.controller;

import com.neggo.neggo.controller.error.AnswerResponse;
import com.neggo.neggo.controller.func.Func;
import com.neggo.neggo.controller.handle.QuestionForm;
import com.neggo.neggo.controller.handle.SubmitForm;
import com.neggo.neggo.model.Question;
import com.neggo.neggo.service.PartService;
import com.neggo.neggo.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin(origins = "*")
public class QuestionController {
    @Autowired
    private QuestionService questionService;
    @Autowired
    private PartService partService;

    @RequestMapping
    public ResponseEntity<List<Question>> listLession() {
        List<Question> questions = questionService.getAll();
        return new ResponseEntity<>(questions, HttpStatus.OK);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public ResponseEntity<AnswerResponse> handleSubmit(@PathVariable Long id, @RequestBody SubmitForm submitForm) {
        Question question = questionService.findByID(id);
        AnswerResponse answerResponse = new AnswerResponse();
        boolean rs = Func.handeSubmit(question, submitForm);
        answerResponse.setCorrect(rs);
        return new ResponseEntity<>(answerResponse, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Question> createQuestion(@Valid @RequestBody QuestionForm questionForm) {
        Question question = new Question();
        question.setName(questionForm.getName());
        question.setMulti(questionForm.isMulti());
        question.setPart(partService.findByID(questionForm.getPartID()));
        System.out.println("test >>> "+question.toString() + questionForm.isMulti());
        Question newQuestion = questionService.create(question);
        return new ResponseEntity<>(newQuestion, HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<Question> updateQuestion(@Valid @RequestBody QuestionForm questionForm) {
        System.out.println("update "+ questionForm.isMulti());
        Question question = new Question();
        question.setId(questionForm.getId());
        question.setName(questionForm.getName());
        question.setMulti(questionForm.isMulti());
        question.setPart(partService.findByID(questionForm.getPartID()));
        Question newQuestion = questionService.create(question);
        return new ResponseEntity<>(newQuestion, HttpStatus.OK);
    }
}
