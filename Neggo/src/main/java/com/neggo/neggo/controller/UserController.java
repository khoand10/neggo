package com.neggo.neggo.controller;

import com.neggo.neggo.controller.error.ApiError;
import com.neggo.neggo.model.User;
import com.neggo.neggo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @RequestMapping(value = "", method = RequestMethod.POST)
    public ResponseEntity<Object> createUser(@Valid @RequestBody User user) {
        boolean exists = userRepository.existsEmail(user.getEmail());
        if (exists) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiError("Email already exist"));
        }
        userRepository.save(user);
        return ResponseEntity.ok(user);
    }

    @RequestMapping("/{userID}")
    public ResponseEntity<Object> getUser(@PathVariable(value = "userID") Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiError("Can not find user with id: "+id));
        }
        return ResponseEntity.ok(user);
    }

    @RequestMapping
    public ResponseEntity<List<User>> listUser() {
        List<User> users = userRepository.findAll();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }
}
