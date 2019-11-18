package com.neggo.neggo.controller;

import com.neggo.neggo.controller.error.AnswerResponse;
import com.neggo.neggo.controller.func.Func;
import com.neggo.neggo.controller.handle.SubmitForm;
import com.neggo.neggo.model.Question;
import com.neggo.neggo.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/questions")
@CrossOrigin(origins = "*")
public class QuestionController {
    @Autowired
    private QuestionService questionService;

    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public ResponseEntity<AnswerResponse> handleSubmit(@PathVariable Long id, @RequestBody SubmitForm submitForm) {
        Question question = questionService.findByID(id);
        AnswerResponse answerResponse = new AnswerResponse();
        boolean rs = Func.handeSubmit(question, submitForm);
        answerResponse.setCorrect(rs);
        return new ResponseEntity<>(answerResponse, HttpStatus.OK);
    }

}
