package org.acme.exercise.entity;

import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;

import java.util.HashSet;
import java.util.Objects;
import java.util.Set;


import static javax.persistence.GenerationType.SEQUENCE;

@Entity
public class CorsoEntity extends PanacheEntityBase {

    @ManyToMany(cascade = {CascadeType.ALL})
    @JoinTable(
            name = "corso_student",
            joinColumns = {@JoinColumn(name = "corso_id")},
            inverseJoinColumns = {@JoinColumn(name = "studentd_id")}
    )
    Set<StudentEntity> studentsSet = new HashSet<>();

    @Id
    @GeneratedValue(strategy=SEQUENCE, generator="CUST_SEQ")
    private int id;

     @NotBlank
    private String name;

    @NotBlank
    private String professor;


    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getProfessor() {
        return professor;
    }

    public void setProfessor(String professor) {
        this.professor = professor;
    }

    public Set<StudentEntity> getStudentsSet() {
        return studentsSet;
    }

    public void setStudentsSet(Set<StudentEntity> studentsSet) {
        this.studentsSet = studentsSet;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        CorsoEntity that = (CorsoEntity) o;
        return id == that.id && name.equals(that.name) && professor.equals(that.professor);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, name, professor);
    }
}
