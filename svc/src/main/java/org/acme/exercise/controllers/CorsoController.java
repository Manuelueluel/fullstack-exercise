package org.acme.exercise.controllers;

import io.quarkus.logging.Log;
import org.acme.exercise.entity.CorsoEntity;
import org.acme.exercise.service.CorsoService;

import javax.transaction.Transactional;
import javax.ws.rs.*;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/corso")
public class CorsoController {

    private final CorsoService corsoService;

    public CorsoController(CorsoService corsoService) {
        this.corsoService = corsoService;
    }

    @GET
    @Produces("application/json")
    public Response getAll(){
        List<CorsoEntity> corsoList = CorsoEntity.listAll();
        return corsoList != null ? Response.ok(corsoList).build() : Response.status(Response.Status.NOT_FOUND).build();
    }

    @GET
    @Path("{id}")
    @Produces("application/json")
    public Response getCorso(@PathParam("id") int id) {
        CorsoEntity corsoEntity = CorsoEntity.findById(id);
        return corsoEntity != null ? Response.ok(corsoEntity).build() : Response.status(Response.Status.NOT_FOUND).build();
    }

    @POST
    @Transactional
    public Response newCorso(CorsoEntity corsoEntity) {
        CorsoEntity corso = corsoService.uploadNewCorso(
                corsoEntity.getId(),
                corsoEntity.getName(),
                corsoEntity.getProfessor());
        return Response.ok(corso).build();
    }

    @PUT
    @Path("{id}")
    @Transactional
    public Response updateCorso(@PathParam("id") int id, CorsoEntity corso) {
        CorsoEntity corsoEntity = corsoService.updateCorso(id, corso);
        return Response.ok(corsoEntity).build();
    }

    @DELETE
    @Path("{id}")
    @Transactional
    public Response deleteCorso(@PathParam("id") int id) {
        corsoService.deleteCorso(id);
        return Response.ok().build();
    }

}
