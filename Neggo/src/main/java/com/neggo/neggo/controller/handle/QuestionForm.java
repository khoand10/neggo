package com.neggo.neggo.controller.handle;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class QuestionForm {
    private String name;
    private List<AnswerForm> answerForms = new ArrayList<>();
}
