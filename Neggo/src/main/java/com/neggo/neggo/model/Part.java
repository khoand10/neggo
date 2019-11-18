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
@Table(name = "parts")
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Part implements Serializable {
    private static final long serialVersionUID = -297553281792804396L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private int order;
    @Lob
    private String content;
    private boolean type;

//    @ManyToOne(fetch=FetchType.LAZY)
//    @JoinColumn(name = "lession_id", foreignKey = @ForeignKey(name = "FK_part_lession_id"))
//    @JsonBackReference
//    private Lession lession;

    @Column(name = "lession_id")
    private Long lessionID;

    @OneToMany(mappedBy = "part", fetch = FetchType.LAZY)
    private Set<Question> questions = new HashSet<>();
}
