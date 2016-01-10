/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package servletapp;

import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Eduardo Pecino Soriano
 */
public class creapersona extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("application/json");
        try (PrintWriter out = response.getWriter()) {
            /* TODO output your page here. You may use following sample code. */
          String object = request.getParameter("ob"); 
           if (object.equals("usuario")) {
                String operation = request.getParameter("op"); 
                if (operation != "" && operation != null && operation.equals("form")) {
                    out.print("{\"status\":200,\"message\": {\"id\":1,\"nombre\":\"edu\",\"apellido1\":\"alumno\",\"apellido2\":\"daw\"}}");
                } else if(operation.equals("list")){
                    out.print("{\"status\":200,\"message\": [{\"id\":1,\"nombre\":\"edu\",\"apellido1\":\"alumno\",\"apellido2\":\"daw\"},{\"id\":2,\"nombre\":\"pepe\",\"apellido1\":\"goteras\",\"apellido2\":\"caen\"},{\"id\":3,\"nombre\":\"aitor\",\"apellido1\":\"tilla\",\"apellido2\":\"patata\"},"
                            +"{\"id\":4,\"nombre\":\"maria\",\"apellido1\":\"delmonte\",\"apellido2\":\"acaballo\"},{\"id\":5,\"nombre\":\"juan\",\"apellido1\":\"chu\",\"apellido2\":\"tri\"},{\"id\":6,\"nombre\":\"felix\",\"apellido1\":\"gato\",\"apellido2\":\"botas\"}]}");
                }else {
                    out.print("{\"status\":500,\"message\":\" Operación no autorizada\"}"); 
                }
            }//End 
          
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
