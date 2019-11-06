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
@Table(name = "questions")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Question implements Serializable {
    private static final long serialVersionUID = -297553281792804396L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private Long[] answerCorrects;

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name = "part_id", foreignKey = @ForeignKey(name = "FK_question_part_id"))
    @JsonBackReference
    private Part part;

    @OneToMany(mappedBy = "question", fetch = FetchType.LAZY)
    private Set<Answer> answers = new HashSet<>();
}
