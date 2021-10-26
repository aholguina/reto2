function consultar() {

    $.ajax (
               {
                        url          : "https://g7f24b339c6f755-dbretouno.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/costume/costume",
                        type         : 'GET',
                        dataType     : 'json',
                        // success      :  function(json){
                        //                     $("#idDivConsulta").empty();
                        //                     for (i=0 ; i < json.items.length; i++){
                        //                         $("#idDivConsulta").append(json.items[i].codigo + json.items[i].nombre + " ");
                        //                     }
                        //                     console.log(json)
                        //                 },

                        success      :  function(json){

                                            $("#idDivConsulta").empty();
                                            $("#idDivConsulta").append("<table>");
                                            $("#idDivConsulta").append("<caption>Inventario de Disfraces</caption>");
                                            $("#idDivConsulta").append("<tr><th>Codigo</th><th>Marca</th><th>Modelo</th><th>Categoria</th><th>Nombre</th></tr>");
                                            for (i=0; i < json.items.length; i++){
                                                $("#idDivConsulta").append("<tr>");
                                                //$("#idDivConsulta").append("<td>" + json.items[i].id + "</td>");
                                                $("#idDivConsulta").append("<td>" + json.items[i].brand + "</td>");
                                                $("#idDivConsulta").append("<td>" + json.items[i].model + "</td>");
                                                $("#idDivConsulta").append("<td>" + json.items[i].category_id + "</td>");
                                                $("#idDivConsulta").append("<td>" + json.items[i].name + "</td>");
                                                $("#idDivConsulta").append('<td><button onclick="borrar('+json.items[i].id+')"> Borrar</button></td>');
                                                $("#idDivConsulta").append('<td><button onclick="consultarItems('+json.items[i].id+')"> Cargar</button></td>');
                                                $("#idDivConsulta").append("</tr>");
                                            }
                                            $("#idDivConsulta").append("</table>");

                                            console.log(json)
                                        },
                        error        :   function(xhr,status){
                                            console.log(xhr)
                                        }

               }

           );

}

function Ingresar() {
    var planeta;

    planeta = { id:         $("#idCodigo").val(), 
                brand:      $("#idBrand").val(),
                model:      $("#idModel").val(),
                category_id:$("#idCategory").val(),
                name:       $("#idName").val()
            }
    
    var dataToSend= JSON.stringify(planeta)
    // JSON java Script Object Notation

    $.ajax (
        {
            dataType: 'json',
            data: planeta,
            //url          : 'https://g23bfb99f5036e6-bdpais.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/planeta/planeta',
            url          : "https://g7f24b339c6f755-dbretouno.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/costume/costume",
                            //https://g7f24b339c6f755-dbretouno.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/costume/costume
            type         : 'POST',
            //data         :  planeta,

            success:  function(response){
                               console.log(response);
                            },
            error       :   function(xhr,status){
                            console.log( xhr);

                            }


        }
    );



}

function borrar(idDisfraz) {
  
    
    var dataToSend= JSON.stringify(planeta)
    // JSON java Script Object Notation
    var elemento,planeta,datosEnvio;
    elemento={
        id: idDisfraz
    }

    //planeta      = {codigo : 2};
    var datosEnvio   = JSON.stringify(elemento);

    $.ajax (
        {
            dataType     :  'json',
            data         :  datosEnvio,
            url          : "https://g7f24b339c6f755-dbretouno.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/costume/costume",
            type         : 'DELETE',
            contentType  : 'application/json',

            success      :  function(response){
                                console.log(response);

                            },
            error       :   function(xhr,status){
                                console.log(xhr);

                            }
        }
    );
}

function actualizar() {

    planeta      = {codigo : 14, nombre: 'PLANETA X'};
    datosEnvio   = JSON.stringify(planeta);


    $.ajax (
                {

                    url          : 'https://g23bfb99f5036e6-bdpais.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/planeta/planeta',
                    type         : 'PUT',
                    data         :  datosEnvio,
                    contentType  : 'application/json',

                    success      :  function(response){
                                        console.log(response);
                                    },
                    error       :   function(xhr,status){
                                        console.log( xhr);

                                    }

                }
            );


}

function consultarId() {

    var codigo =$("#idCodigo").val();

    $.ajax (
                {

                    url          : 'https://g23bfb99f5036e6-bdpais.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/planeta/planeta/' + codigo ,
                    type         : 'GET',
                    dataType     : 'json',

                    success      :  function(json){
                                        $("#idDivConsulta").empty();
                                        for (i=0; i < json.items.length; i++){
                                            $("#idDivConsulta").append(json.items[i].codigo + json.items[i].nombre + " ");
                                        }
                                        console.log(json)
                                    },
                    error       :   function(xhr,status){
                                        console.log(xhr)
                                    },



                }
            );


}
function consultarItems(idItem) {

    $.ajax (
               {
                        dataType     : 'json',
                        url          : "https://g7f24b339c6f755-dbretouno.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/costume/costume/" + idItem,
                                       //https://g7f24b339c6f755-dbretouno.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/costume/costume
                        type         : 'GET',
                        contentType  : 'application/json',

                        success:function(response){
                            console.log(response);
                            var item=response.items[0];

                            $("#idCodigo").val(item.id); 
                            $("#idBrand").val(item.brand);
                            $("#idModel").val(item.model);
                            $("#idCategory").val(item.category_id);
                            $("#idName").val(item.name);
                        },
                        
                        // success      :  function(json){
                        //                     $("#idDivConsulta").empty();
                        //                     for (i=0 ; i < json.items.length; i++){
                        //                         $("#idDivConsulta").append(json.items[i].codigo + json.items[i].nombre + " ");
                        //                     }
                        //                     console.log(json)
                        //                 },

                        //success      :  function(json){

                          //                  $("#idDivConsulta").empty();
                            //                $("#idDivConsulta").append("<table>");
                              //              $("#idDivConsulta").append("<caption>Inventario de Disfraces</caption>");
                                //            $("#idDivConsulta").append("<tr><th>Codigo</th><th>Marca</th><th>Modelo</th><th>Categoria</th><th>Nombre</th></tr>");
                                  //          for (i=0; i < json.items.length; i++){
                                    //            $("#idDivConsulta").append("<tr>");
                                      //          //$("#idDivConsulta").append("<td>" + json.items[i].id + "</td>");
                                        //        $("#idDivConsulta").append("<td>" + json.items[i].brand + "</td>");
                                          //      $("#idDivConsulta").append("<td>" + json.items[i].model + "</td>");
                                            //    $("#idDivConsulta").append("<td>" + json.items[i].category_id + "</td>");
                                              //  $("#idDivConsulta").append("<td>" + json.items[i].name + "</td>");
                                              //  $("#idDivConsulta").append('<td><button onclick="borrar('+json.items[i].id+')"> Borrar</button></td>');
                                              //  $("#idDivConsulta").append("</tr>");
                                           // }
                                           // $("#idDivConsulta").append("</table>");

                                           // console.log(json)
                                       // },
                        error        :   function(jqXHR,testStatus, errorThrown){
                                            //console.log(jqXHR)
                                        }

               }

           );

}
function actualizarItem() {
    var planeta;

    planeta = { id:         $("#idCodigo").val(), 
                brand:      $("#idBrand").val(),
                model:      $("#idModel").val(),
                category_id:$("#idCategory").val(),
                name:       $("#idName").val()
            }
    
    var dataToSend= JSON.stringify(planeta)
    // JSON java Script Object Notation

    $.ajax (
        {
            dataType: 'json',
            data: dataToSend,
            contentType  : 'application/json',
            //url          : 'https://g23bfb99f5036e6-bdpais.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/planeta/planeta',
            url          : "https://g7f24b339c6f755-dbretouno.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/costume/costume",
                            //https://g7f24b339c6f755-dbretouno.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/costume/costume
            type         : 'PUT',
            //data         :  planeta,

            success:  function(response){
                               console.log(response);
                            },
            error       :   function(xhr,status){
                            console.log( xhr);

                            }


        }
    );



}
