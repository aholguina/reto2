function Ingresar() {
    var datos;

    datos = { id:             $("#id").val(), 
                messagetext:    $("#idmessagetext").val()
            }
    
    var dataToSend= JSON.stringify(datos)
    // JSON java Script Object Notation

    $.ajax (
        {
            dataType: 'json',
            data: datos,
            url          : 'https://g7f24b339c6f755-dbretouno.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message',
            type         : 'POST',
            success:  function(response){
                //window.alert("el Mensaje fue guardado con exito");
                //window.location = "index.html";            
                console.log(response);
            },
            error       :   function(xhr,status){
                //window.alert("no pudo guardarse el mensaje, vuelve a intentarlo");
                //window.location = "introducirMensaje.html";
                console.log( xhr);
            }
        }
    );
}
function borrar(id) {

    $("#IdMessage").hide();
    $("#IdMessageText").hide();
    $("#1").hide();
    $("#2").hide();
    $("#3").hide();
    // $("#conteo").show();
    // $("#4").show();


    var data, datosEnvio;


    data = { id: id };
    datosEnvio = JSON.stringify(data);

    $.ajax(
        {

            url          : 'https://g7f24b339c6f755-dbretouno.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message',
            type: 'DELETE',
            data: datosEnvio,
            contentType: 'application/json',

            success: function (response) {
                window.alert("Mensaje borrado satisfactoriamente");
                consultar();
                conteo();
                console.log(response);

            },
            error: function (xhr, status) {
                window.alert("Ha ocurrido un error, vuelve a intentarlo");
                console.log(xhr);

            }
        }
    )
}


function consultar() {
    /*$("#IdMessage").hide();
    $("#IdMessageText").hide();
    $("#1").hide();
    $("#2").hide();
    $("#3").hide();
    $("#conteo").show();
    $("#4").show();*/

    $.ajax(
        {
            url: 'https://g7f24b339c6f755-dbretouno.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message',
            type: 'GET',
            dataType: 'json',
            success: function (json) {

                
                $("#idDivConsulta").empty();

                $("#idDivConsulta").append('<table id="tblConsulta" class="table table-bordered table-hover textColor" style="width: 100%"><tr style="font-weight: bold;background-color: #04aa6d;color: white;text-align: center;"><th class="bold">ID</th><th class="bold">MESSAGE</th><th class="bold">ELIMINAR</th><th class="bold">EDITAR</th></tr></table>');

                if (json.items.length<1){
                    $("#idDivConsulta").append('<h1>No hay registros para mostrar</h1>');
                }

                for (i = 0; i < json.items.length; i++) {
                    $("#idDivConsulta").append('<table id="tblConsulta" class="table table-bordered table-hover textColor" style="width: 100%"><tr><tr><td><div class="tabla"><a class="ver" href="javascript:;" onclick="consultarId('+json.items[i].id+')"> '+json.items[i].id+' </a></div></td><td><div class="tabla">'+json.items[i].messagetext+'</div></td><td><div class="tabla"><a type=button href="javascript:borrar('+json.items[i].id+')"> <img src="https://cdn.icon-icons.com/icons2/868/PNG/128/trash_bin_icon-icons.com_67981.png" width="20" height="20"> </a></div></td><td><div class="tabla"><a type=button href="javascript:modificar('+json.items[i].id+')"> <img src="https://image.flaticon.com/icons/png/512/104/104668.png" width="20" height="20"> </a></div></td></tr></table>');
                }


                console.log(json)
            },

            error: function (xhr, status) {
                console.log(xhr)
            }

        }
    );


}
function consultarId(id) {
    if (id < 0) {
        var id = $("#buscarMensaje").val();
    } else {
        id = id
    }

    $("#IdMessage").hide();
    $("#IdMessageText").hide();
    $("#1").hide();
    $("#2").hide();
    $("#3").hide();
    $("#conteo").hide();
    $("#4").hide();


    $.ajax(
        {

            url: 'https://g7f24b339c6f755-dbretouno.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message/' + id,
            type: 'GET',
            dataType: 'json',

            success: function (json) {
               
               if (json.items.length<1){
                    $("#idDivConsulta").append('<h1>No hay registros para mostrar</h1>');
                }
                else{
                    $("#idDivConsulta").empty();

                    $("#idDivConsulta").append("<br><br>");
                    $("#idDivConsulta").append('<h1>ID: <input type="text" class="bloquear"  id="txtId" readonly="readonly" placeholder="' + json.items[0].id + '"></h1>');
                    $("#idDivConsulta").append("<br>");
                    $("#idDivConsulta").append('<h3>MESSAGE: <input type="text" class="bloquear" id="IdMessage" readonly="readonly" value="' + json.items[0].messagetext + '"></h3>');
    
                    $("#idDivConsulta").append('<a type=button class="modificar" href="javascript:modificar(' + json.items[0].id + ')">Actualizar</a>');
                    $("#idDivConsulta").append('<br><br><br><br>');
                    $("#idDivConsulta").append('<a type=button class="borrar" href="javascript:borrar(' + json.items[0].id + ');">Eliminar</a>');
    
                }

                console.log(json)
            },
            error: function (xhr, status) {
                console.log(xhr)
            },
        }
    );
}

function actualizar() {

    $("#IdMessage").hide();
    $("#IdMessageText").hide();
    $("#1").hide();
    $("#2").hide();
    $("#3").hide();

    var id, messagetext;

    id = $("#IdMessage").val();
    messagetext = $("#IdMessageText").val();

    data = { id: id, messagetext: messagetext };
    datosEnvio = JSON.stringify(data);

    $.ajax(
        {

            url: 'https://g7f24b339c6f755-dbretouno.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message',
            type: 'PUT',
            data: datosEnvio,
            contentType: 'application/json',

            success: function (response) {
                window.alert("Mensaje actualizado satisfactoriamente");
                // window.location = "visualizarMensajes.html";
                console.log(response);
                consultar();
                conteo();
            },
            error: function (xhr, status) {
                window.alert("Ha ocurrido un error, vuelve a intentarlo");
                console.log(xhr);

            }

        }
    );


}

function modificar(_id) {


    $("#IdMessage").show();
    $("#IdMessageText").show();
    $("#1").show();
    $("#2").show();
    $("#3").show();

    $("#IdMessage").val(_id);

}
function consultarMio() {

    $.ajax (
               {
                        url          : 'https://g7f24b339c6f755-dbretouno.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message',
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
function inicio() {
    window.location = "index.html";
}

function conteo() {

    $.ajax(
        {
            url: 'https://g7f24b339c6f755-dbretouno.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message',
            type: 'GET',
            dataType: 'json',
            success: function (json) {

                var prueba = json.items.length;


                $("#conteo").val(prueba);
                $("#IdMessage").hide();
                $("#IdMessageText").hide();
                $("#1").hide();
                $("#2").hide();
                $("#3").hide();

                console.log(json)
            },

            error: function (xhr, status) {
                console.log(xhr)
            }

        }
    );


}