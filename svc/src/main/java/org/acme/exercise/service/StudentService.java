package org.acme.exercise.service;

import org.acme.exercise.entity.CorsoEntity;
import org.acme.exercise.entity.StudentEntity;

import javax.enterprise.context.ApplicationScoped;
import javax.ws.rs.BadRequestException;
import javax.ws.rs.NotFoundException;
import java.util.List;

@ApplicationScoped
public class StudentService {

    private final CorsoService corsoService;

    public StudentService(CorsoService corsoService) {
        this.corsoService = corsoService;
    }

    public StudentEntity getStudentByMatricola( String matricola) {
        StudentEntity student = null;

        try{
            Integer.parseInt(matricola);
        }catch (Exception e){
            throw new BadRequestException();
        }

        student = StudentEntity.find("matricola", matricola).firstResult();
        if ( student == null) {
            throw new BadRequestException();
        }

        return student;
    }

    public StudentEntity uploadNewStudent( int id, String matricola, String nome, String cognome) {
        StudentEntity student = new StudentEntity();

        try{
            Integer.parseInt(matricola);
        }catch (Exception e){
            throw new BadRequestException();
        }

        //Matricola già esistente
        if (StudentEntity.find("matricola", matricola).firstResult() != null) {
            throw new BadRequestException();
        }

        if (nome == null || nome.equals("") || cognome == null || cognome.equals("")) {
            throw new BadRequestException();
        } else {
            student.setId(id);
            student.setNome(nome);
            student.setCognome(cognome);
            student.setMatricola(matricola);
            student.persist();
        }
        return student;
    }

    public StudentEntity updateStudent(int id, StudentEntity student) {
        StudentEntity entity = StudentEntity.findById(id);

        try{
            Integer.parseInt(student.getMatricola());
        }catch (Exception e){
            throw new BadRequestException();
        }

        if (student.getNome() == null || student.getNome().equals("") || student.getCognome() == null || student.getCognome().equals("")) {
            throw new BadRequestException();
        }

        entity.setNome(student.getNome());
        entity.setCognome(student.getCognome());
        entity.setMatricola(student.getMatricola());
        return entity;
    }

    public void deleteStudent(int id) {
        //Ottengo lista corsi
        List<CorsoEntity> listaCorsi = corsoService.getCorsi();
        StudentEntity student = StudentEntity.findById(id);

        //Rimuovi student dai corsi a cui è iscritto prima
        listaCorsi.forEach(corso -> {
            corso.getStudentsSet().remove(student);
        });

        if (student != null) {
            student.delete();
        } else {
            throw new NotFoundException();
        }
    }
}

