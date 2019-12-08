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
    private Long id;
    private String name;
    private boolean type;
    private String content;
    private int slot;
    private Long lessionID;
}