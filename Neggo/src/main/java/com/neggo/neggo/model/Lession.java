package com.neggo.neggo.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "lessions")
@Setter@Getter
@NoArgsConstructor
@AllArgsConstructor
public class Lession implements Serializable {
    private static final long serialVersionUID = -297553281792804396L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private int slot;

//    @OneToMany(mappedBy = "lession", fetch = FetchType.LAZY)
//    private Set<Part> parts = new HashSet<>();

//    @ManyToOne(fetch=FetchType.LAZY)
//    @JoinColumn(name = "module_id", foreignKey = @ForeignKey(name = "FK_lession_module_id"))
//    @JsonBackReference
//    private Module module;

    @Column(name = "module_id")
    private Long moduleID;
}
