package com.neggo.neggo.controller.func;

import com.neggo.neggo.controller.handle.SubmitForm;
import com.neggo.neggo.model.AnswerCorrect;
import com.neggo.neggo.model.Question;

import java.util.List;
import java.util.Set;

public class Func {
    public static boolean handeSubmit(Question question, SubmitForm submitForm) {
        List<AnswerCorrect> answerCorrects = question.getAnswerCorrects();
        if (question.isMulti()) {
            for (int i = 0; i < answerCorrects.size(); i++) {
                AnswerCorrect ac = answerCorrects.get(i);
                if (submitForm.getAnswers().contains(ac.getId())) {
                    return false;
                }
            }
            return true;
        } else {
            System.out.println("rs id "+ answerCorrects.get(0).getAnswerCorrect());
            if (submitForm.getAnswers().get(0) == answerCorrects.get(0).getAnswerCorrect()) {
                return true;
            }
            return false;
        }
    }
}
