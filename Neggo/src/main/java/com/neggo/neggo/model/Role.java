package com.neggo.neggo.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Getter @Setter @NoArgsConstructor
@Entity
@Table(name = "roles")
public class Role implements Serializable {
    private static final long serialVersionUID = -297553281792804396L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private String role;
//    @JsonBackReference("roles_users")
//    @OneToMany(mappedBy = "role")
//    private List<User> users;
    public Role(String name, String role) {
        this.name = name;
        this.role = role;
    }
}
