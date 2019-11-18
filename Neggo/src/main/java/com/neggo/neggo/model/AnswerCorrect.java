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
@Table(name = "answer_correct")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class AnswerCorrect implements Serializable {
    private static final long serialVersionUID = -297553281792804396L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Long answerCorrect;
    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name = "question_id", foreignKey = @ForeignKey(name = "FK_answer_correct_question_id"))
    @JsonBackReference
    private Question question;

    @Override
    public String toString() {
        return "AnswerCorrect{" +
                "id=" + id +
                ", answerCorrect=" + answerCorrect +
                ", question=" + question +
                '}';
    }
}
