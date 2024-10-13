package org.acme.exercise.service;

import javax.enterprise.context.ApplicationScoped;
import javax.ws.rs.BadRequestException;
import javax.ws.rs.NotFoundException;

import org.acme.exercise.entity.CorsoEntity;
import org.acme.exercise.StudentCorso;
import org.acme.exercise.entity.StudentEntity;

import java.util.Set;

@ApplicationScoped
public class IscrizioneService {

    private final CorsoService corsoService;
    private final StudentService studentService;

    public IscrizioneService(StudentService studentService, CorsoService corsoService) {
        this.studentService = studentService;
        this.corsoService = corsoService;
    }

    public Set<StudentEntity> getStudentiIscritti(int idCorso) {
        CorsoEntity corso = CorsoEntity.findById(idCorso);
        if (corso == null) {
            throw new BadRequestException();
        }

        return corso.getStudentsSet();
    }

    public StudentCorso iscriviStudente(StudentCorso studentCorso) {
        StudentEntity student = studentService.getStudentByMatricola(studentCorso.getStudent().getMatricola());
        CorsoEntity corso = corsoService.getCorsoByNome(studentCorso.getCorso().getName());

        if (corso.getStudentsSet().contains(student)) {
            throw new BadRequestException();
        }

        corso.getStudentsSet().add(student);
        return studentCorso;
    }

    public void deleteIscrizione(StudentEntity student, CorsoEntity corso) {
        if(!corso.getStudentsSet().remove(student)){
            throw new NotFoundException();
        }
    }
}
