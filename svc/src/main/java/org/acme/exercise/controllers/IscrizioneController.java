package org.acme.exercise.controllers;

import com.oracle.svm.core.annotate.Delete;
import org.acme.exercise.entity.CorsoEntity;
import org.acme.exercise.StudentCorso;
import org.acme.exercise.entity.StudentEntity;
import org.acme.exercise.service.IscrizioneService;

import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.util.Set;

@Path("/iscrizione")
public class IscrizioneController {

    private final IscrizioneService iscrizioneService;

    public IscrizioneController(IscrizioneService iscrizioneService) {
        this.iscrizioneService = iscrizioneService;
    }

    @GET
    @Path("{id}")
    @Produces("application/json")
    public Response getStudentiIscritti(@PathParam("id") int id) {
        Set<StudentEntity> studenti = iscrizioneService.getStudentiIscritti(id);
        return studenti != null ? Response.ok(studenti).build() : Response.status(Response.Status.NOT_FOUND).build();
    }

    @POST
    @Transactional
    public Response iscriviStudente(StudentCorso studentCorso) {
        return Response.ok(iscrizioneService.iscriviStudente(studentCorso)).build();
    }


    @DELETE
    @Path("{student_id}/{corso_id}")
    @Transactional
    public Response deleteIscrizione(@PathParam("student_id") int student_id, @PathParam("corso_id") int corso_id) {
        StudentEntity student = StudentEntity.findById(student_id);
        CorsoEntity corso = CorsoEntity.findById(corso_id);

        iscrizioneService.deleteIscrizione( student, corso);
        return Response.ok().build();
    }

}























