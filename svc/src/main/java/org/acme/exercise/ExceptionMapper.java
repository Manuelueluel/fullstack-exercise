package org.acme.exercise;

import javax.ws.rs.BadRequestException;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.core.Response;

public class ExceptionMapper implements javax.ws.rs.ext.ExceptionMapper<Exception> {
    @Override
    public Response toResponse(Exception e) {
        if (e instanceof BadRequestException)
            return Response.status(Response.Status.BAD_REQUEST).entity(e.getMessage()).build();
        else if (e instanceof NotFoundException)
            return Response.status(Response.Status.NOT_FOUND).build();
        return Response.serverError().entity(e.getMessage()).build();
    }
}
