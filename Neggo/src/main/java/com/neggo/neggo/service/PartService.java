package com.neggo.neggo.service;

import com.neggo.neggo.controller.handle.PartForm;
import com.neggo.neggo.model.Part;

public interface PartService {
    Part create(PartForm part);
}
