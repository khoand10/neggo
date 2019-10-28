package com.neggo.neggo.controller;

import com.neggo.neggo.controller.handle.Login;
import com.neggo.neggo.model.Role;
import com.neggo.neggo.model.User;
import com.neggo.neggo.repositories.RoleRepository;
import com.neggo.neggo.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/login")
public class LoginController {

    @Autowired
    private RoleRepository roleRepository;
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<String> getUser() {
        return ResponseEntity.ok("{'name':'khoand12'}");
    }

    @PostMapping("/createrole")
    public ResponseEntity<Role> createRole(@Valid @RequestBody Role role) {
        roleRepository.save(role);
        return ResponseEntity.ok(role);
    }

    @PostMapping
    public ResponseEntity<Iterable<Role>> login(@RequestBody Login login) {
//        System.out.println("data"+ login.toString()+login.getEmail());
//        User result = userRepository.findUserByEmailAndPassword(login.getEmail(), login.getPassword());
//        List<User> ls = userRepository.findAll();
        Iterable<Role> ls = roleRepository.findAll();
        return ResponseEntity.ok(ls);
    }
}
