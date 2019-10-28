package com.neggo.neggo.controller;

import com.neggo.neggo.controller.error.ApiError;
import com.neggo.neggo.controller.handle.Login;
import com.neggo.neggo.model.User;
import com.neggo.neggo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/login")
@CrossOrigin(origins = "*")
public class LoginController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<String> getUser() {
        return ResponseEntity.ok("{'test':'OKE'}");
    }

    @PostMapping
    public ResponseEntity<Object> doLogin(@RequestBody Login login) {
        User result = userRepository.findByEmailAndPassword(login.getEmail(), login.getPassword());
        if (result == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ApiError("Invalid email or password"));
        }
        return ResponseEntity.ok(result);
    }
}
