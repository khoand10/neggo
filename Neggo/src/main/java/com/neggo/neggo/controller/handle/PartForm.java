package com.neggo.neggo.controller.handle;

import com.neggo.neggo.model.Question;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PartForm {
    private String name;
    private boolean type;
    private String content;
    private int order;
    private Long lessionID;
    private QuestionForm questionForm;
}