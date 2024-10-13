package org.acme.exercise.controllers;


import org.acme.exercise.entity.StudentEntity;
import org.acme.exercise.service.StudentService;

import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/student")
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GET
    @Produces("application/json")
    public Response getAll() {
        List<StudentEntity> studentsList = StudentEntity.listAll();
        return studentsList != null ? Response.ok(studentsList).build() : Response.status(Response.Status.NOT_FOUND).build();
    }

    @GET
    @Path("{id}")
    @Produces("application/json")
    public Response getStudent(@PathParam("id") int id) {
        StudentEntity studentEntity = StudentEntity.findById(id);
        return studentEntity != null ? Response.ok(studentEntity).build() : Response.status(Response.Status.NOT_FOUND).build();
    }


    @GET
    @Path("getByMatricola")
    @Produces("application/json")
    public Response getSuggestions(@QueryParam("matricola") String matricola){
        List<StudentEntity> studentsList = StudentEntity.list("matricola LIKE ?1", "%"+matricola+"%");
        return studentsList != null ? Response.ok(studentsList).build() : Response.status(Response.Status.NOT_FOUND).build();
    }

    @POST
    @Transactional
    public Response newStudent(StudentEntity studentEntity) {
        StudentEntity student = studentService.uploadNewStudent(
                studentEntity.getId(),
                studentEntity.getMatricola(),
                studentEntity.getNome(),
                studentEntity.getCognome());
        return Response.ok(student).build();
    }

    @PUT
    @Path("{id}")
    @Transactional
    public Response updateStudent(@PathParam("id") int id, StudentEntity studentEntity) {
        StudentEntity student = studentService.updateStudent(id, studentEntity);
        return Response.ok(student).build();
    }

    @DELETE
    @Path("{id}")
    @Transactional
    public Response deleteStudent(@PathParam("id") int id) {
        studentService.deleteStudent(id);
        return Response.ok().build();
    }

}
