package org.acme.exercise.entity;


import io.quarkus.hibernate.orm.panache.PanacheEntityBase;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import java.util.HashSet;
import java.util.Set;

import static javax.persistence.GenerationType.SEQUENCE;


@Entity
public class StudentEntity extends PanacheEntityBase {


    @Id
    @GeneratedValue(strategy=SEQUENCE, generator="CUST_SEQ")
    private int id;

    @NotBlank
    private String matricola;

    @NotBlank
    private String nome;

    @NotBlank
    private String cognome;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getMatricola() {
        return matricola;
    }

    public void setMatricola(String matricola) {
        this.matricola = matricola;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getCognome() {
        return cognome;
    }

    public void setCognome(String cognome) {
        this.cognome = cognome;
    }

}
