package com.neggo.neggo.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

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

    @ManyToOne(fetch=FetchType.LAZY)
    @JoinColumn(name = "part_id", foreignKey = @ForeignKey(name = "FK_module_part_id"))
    @JsonBackReference
    private Part part;
}
