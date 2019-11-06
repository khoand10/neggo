package com.neggo.neggo.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "answers")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Answer implements Serializable {
    private static final long serialVersionUID = -297553281792804396L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String content;
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name = "question_id", foreignKey = @ForeignKey(name = "FK_answer_question_id"))
    @JsonBackReference
    private Question question;
}
