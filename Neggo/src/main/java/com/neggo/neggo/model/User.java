package com.neggo.neggo.model;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "users")
@Setter@Getter
@NoArgsConstructor
@AllArgsConstructor
public class User implements Serializable {
    private static final long serialVersionUID = -297553281792804396L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(unique = true)
    private String name;
    private String email;
    private String point;
    private String password;
    @Lob
    private String history;
//    @JsonBackReference("roles_users")
    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", point='" + point + '\'' +
                ", password='" + password + '\'' +
                ", role=" + role +
                '}';
    }
}
