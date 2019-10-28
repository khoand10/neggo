package com.neggo.neggo.controller;

import com.neggo.neggo.model.User;
import com.neggo.neggo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity<User> createUser(@Valid @RequestBody User user) {
        userRepository.save(user);
        return ResponseEntity.ok(user);
    }
}
