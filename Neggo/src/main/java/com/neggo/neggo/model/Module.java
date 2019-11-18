package com.neggo.neggo.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "modules")
@Getter@Setter@NoArgsConstructor@AllArgsConstructor
public class Module implements Serializable {
    private static final long serialVersionUID = -297553281792804396L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private int order;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name = "course_id", foreignKey = @ForeignKey(name = "FK_module_course_id"))
    @JsonBackReference
    private Course course;

    @OneToMany(mappedBy = "module", fetch = FetchType.LAZY)
    private Set<Lession> lessions = new HashSet<>();
}
