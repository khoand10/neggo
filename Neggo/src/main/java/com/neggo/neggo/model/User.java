package com.neggo.neggo.model;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity
@Table(name = "users")
public class User implements Serializable {
    private static final long serialVersionUID = -297553281792804396L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String email;
    private String point;
    private String password;
    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

    public User(String name, String email, String password, Role role) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.role = role;
    }
}
