package com.neggo.neggo.controller.handle;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class LessionForm {
    private Long id;
    private String name;
    private int slot;
    private Long moduleID;
}
