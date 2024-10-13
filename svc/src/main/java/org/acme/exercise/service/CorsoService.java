package org.acme.exercise.service;

import org.acme.exercise.entity.CorsoEntity;
import org.acme.exercise.entity.StudentEntity;

import javax.enterprise.context.ApplicationScoped;
import javax.ws.rs.BadRequestException;
import javax.ws.rs.NotFoundException;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@ApplicationScoped
public class CorsoService {

    public List<CorsoEntity> getCorsi() {
        return CorsoEntity.listAll();
    }

    public CorsoEntity getCorsoByNome(String nomeCorso) {
        CorsoEntity corso = CorsoEntity.find("name", nomeCorso).firstResult();

        if ( corso == null) {
            throw new NotFoundException();
        }

        return corso;
    }

    public CorsoEntity uploadNewCorso(int id, String nome, String professor) {
        CorsoEntity corso = new CorsoEntity();

        if (nome == null || nome.equals("") || professor == null || professor.equals("")) {
            throw new BadRequestException();
        }

        //Corso già esistente con tale nome
        if (CorsoEntity.find("name", nome).firstResult() != null) {
            throw new BadRequestException();
        }

        corso.setId(id);
        corso.setName(nome);
        corso.setProfessor(professor);
        corso.persist();
        return corso;
    }

    public CorsoEntity updateCorso(int id, CorsoEntity corso) {
        CorsoEntity entity = CorsoEntity.findById(id);

        if (entity == null) {
            throw new NotFoundException();
        }

        if (corso.getName() == null || corso.getName().equals("") || corso.getProfessor() == null || corso.getProfessor().equals("")) {
            throw new BadRequestException();
        }
        entity.setName(corso.getName());
        entity.setProfessor(corso.getProfessor());

        //aggiornando il corso, i studenti iscritti vengono trasferiti nel corso aggiornato? se sì
//        Set<StudentEntity> set = new HashSet<>();
//        set.addAll(entity.getStudentsSet());
//        entity.setStudentsSet(set);
        //altrimenti
        Set<StudentEntity> set = new HashSet<>();
        entity.setStudentsSet(set);
        return entity;
    }

    public void deleteCorso(int id) {
        CorsoEntity corso = CorsoEntity.findById(id);
        if (corso != null) {
            corso.getStudentsSet().clear();
            corso.delete();
        } else {
            throw new NotFoundException();
        }
    }

}
