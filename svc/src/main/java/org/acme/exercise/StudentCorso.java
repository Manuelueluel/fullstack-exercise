package org.acme.exercise;

import org.acme.exercise.entity.CorsoEntity;
import org.acme.exercise.entity.StudentEntity;

public class StudentCorso {

    private StudentEntity student;

    private CorsoEntity corso;

    public StudentEntity getStudent() {
        return student;
    }

    public void setStudent(StudentEntity student) {
        this.student = student;
    }

    public CorsoEntity getCorso() {
        return corso;
    }

    public void setCorso(CorsoEntity corso) {
        this.corso = corso;
    }
}
