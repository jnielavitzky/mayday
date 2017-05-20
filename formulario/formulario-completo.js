$(document).ready(function () {
    //Initialize tooltips
     $('.nav-tabs > li a[title]').tooltip();
    
    //Wizard
    $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {

        var $target = $(e.target);
    
        if ($target.parent().hasClass('disabled')) {
            return false;
        }
    });

    $(".prev-step").click(function (e) {

        var $active = $('.wizard .nav-tabs li.active');
        prevTab($active);
    });
});

function nextTab(elem) {
    $(elem).next().find('a[data-toggle="tab"]').click();
}
function prevTab(elem) {
    $(elem).prev().find('a[data-toggle="tab"]').click();
}

$(document).ready(function() {
    var max_fields      = 5; //maximum input boxes allowed
    var wrapper         = $(".input-fields-wrap"); //Fields wrapper
    var add_button      = $(".add-field-button"); //Add button ID
    
    var x = 1; //initlal text box count
    $(add_button).click(function(e){ //on add input button click
        e.preventDefault();
        if(x < max_fields){ //max input box allowed
            x++; //text box increment
            $(wrapper).append('<div><input type="text" name="mytext[]" class="fill-in phone"/><a href="#" class="remove-field">&nbsp;Quitar telefono</a></div>'); //add input box
        }
    });
    
    $(wrapper).on("click",".remove-field", function(e){ //user click on remove text
        e.preventDefault(); $(this).parent('div').remove(); x--;
    });
});


$(document).ready(function(){
    var form = $("#my-form");
    form.validate({
        ignore:":hidden",
        rules:{
            nombre: {
                required:true,
                minlength:2, 
                maxlength:41, 
                digits:false,
                letters_space:true 
            }, 
            apellido: {
                required:true,
                minlength:2, 
                maxlength:41, 
                digits:false,
                letters_space:true,
                notEqualTo: "#nombre"
            },
            seleccion_doc:{
                required:true
            },
            documento:{ //solo DNI para pasaporte ^[A-Z0-9<]{9}[0-9]{1}[A-Z]{3}[0-9]{7}[A-Z]{1}[0-9]{7}[A-Z0-9<]{14}[0-9]{2}$
                required:true,
                only_numbers:true,
                min:11500001,
                max:56000000
            },
            fecha_dia:{
                required:true,        
            },
            fecha_mes:{
                required:true, 
                febrero:true 
            },
            fecha_año:{
                required:true, 
                febrero_biciesto:true    
            },
            tarjeta:{
                required:true, 
                creditcard:true
            },
            vencimiento_mes:{
                required:true,     
            },
            vencimiento_año:{
                required:true, 
                vencimiento:true
            },
            nombre_pago:{
                required:true,
                minlength:2, 
                maxlength:41, 
                digits:false,
                letters_space:true,
                notEqualTo: "#apellido-p"
            },
            apellido_pago:{
                required:true,
                minlength:2, 
                maxlength:41, 
                digits:false,
                letters_space:true
            },
            cuotas:{
                required:true, 
            },
            nro_documento:{
                required:true,
                only_numbers:true,
                min:11500001,
                max:56000000
            },
            pais:{
                required:true
            },
            estado:{
                required:true, 
                letters_space:true
            },
            ciudad:{
                required:true,
                letters_space:true 
            },
            calle:{
                required:true
            },
            número_casa:{
                required:true
            },
            cp:{
                required:true, 
                only_numbers:true
            },
            correo_electronico:{
                required:true
            },
            codigo_de_seguridad:{
                required:true,
                //amex_master_visa:true, 
                minlength:3, 
                maxlength:4, 
                only_numbers:true,
                letters_space:false 
            }
            // tel:{
            //     required:true
            // }
        },
        messages:{
            nombre:{
                required: "Por favor, ingrese nombre del pasajero",
                minlength: "El nombre del pasajero debe tener como minimo 2 caracteres. Por favor, reingrese el nombre del pasajero",
                maxlength: "El nombre del pasajero debe tener como maximo 41 caracteres. Por faovr, reingrese el nombre del pasajero",
                digits: "El nombre del pasajero no puede tener numeros. Por favor, reingrese el nombre del pasajero",
                letters_space:"El nombre del pasajero solo puede contener letras y espacios. Por favor, reingrese el nombre del pasajero"
            },
            apellido:{
                required: "Por favor, ingrese apellido del pasajero",
                minlength: "El apellido del pasajero debe tener como minimo 2 caracteres. Por favor, reingrese el apellido del pasajero",
                maxlength: "El apellido del pasajero debe tener como maximo 41 caracteres. Por faovr, reingrese el apellido del pasajero",
                digits: "El apellido del pasajero no puede tener numeros. Por favor, reingrese el apellido del pasajero",
                letters_space:"El apellido del pasajero solo puede contener letras y espacios. Por favor, reingrese el apellido del pasajero",
                notEqualTo:"El nombre y apellido del pasajero no pueden ser iguales. Por favor, chequee los datos del pasajero"
            },
            seleccion_doc:{
                required:"Por favor, seleccione una opcion"
            },
            documento:{
                required:"Por favor, ingrese numero de identificacion del pasajero",
                only_numbers:"El numero de identifiacion solo puede contener digits. Por favor, reingrese el numero de identificacion del pasajero",
                min:"El numero de identificacion del pasajero no puede ser menor a 11500001. Por favor, reingrese el numero de identificacion del pasajero",
                max:"El numero de identiifacion del pasajero no puede ser mayor a 56000000. Por favor, reingrese el numero de identifiacion del pasajero"
            },
            fecha_dia:{
                required:"Por favor, ingrese dia del nacimiento del pasajero",
            },
            fecha_mes:{
                required:"Por favor, ingrese mes del nacimiento del pasajero"
            },
            fecha_año:{
                required:"Por favor, ingrese año de nacimiento del pasajero",
            },
            tarjeta:{
                required:"Por favor, ingrese el numero de tarjeta de credito con el que desea efectuar la compra"
            },
            vencimiento_mes:{
                required:"Por favor, ingrese mes de vencimiento de la tarjeta"
            },
            vencimiento_año:{
                required:"Por favor, ingrese año de vencimiento de la tarjeta"
            },
            nombre_pago:{
                required: "Por favor, ingrese nombre del titular de la tarjeta",
                minlength: "El nombre del titular de la tarjeta debe tener como minimo 2 caracteres. Por favor, reingrese el nombre del titular de la tarjeta",
                maxlength: "El nombre del titular de la tarjeta debe tener como maximo 41 caracteres. Por faovr, reingrese el nombre del titular de la tarjeta",
                digits: "El nombre del titular de la tarjeta no puede tener numeros. Por favor, reingrese el nombre del titular de la tarjeta",
                letters_space:"El nombre del titular de la tarjeta solo puede contener letras y espacios. Por favor, reingrese el nombre del titular de la tarjeta",
                notEqualTo:"El nombre y apellido del titular de la tarjeta no pueden ser iguales. Por favor, chequee los datos del titular de la tarjeta"
            },
            apellido_pago:{
                required: "Por favor, ingrese apellido del titular de la tarjeta",
                minlength: "El apellido del titular de la tarjeta debe tener como minimo 2 caracteres. Por favor, reingrese el apellido del titular de la tarjeta",
                maxlength: "El apellido del titular de la tarejta debe tener como maximo 41 caracteres. Por faovr, reingrese el apellido del titular de la tarejta",
                digits: "El apellido del titular de la tarejta no puede tener numeros. Por favor, reingrese el apellido del titular de la tarejta",
                letters_space:"El apellido del titular de la tarejta solo puede contener letras y espacios. Por favor, reingrese el apellido del titular de la tarejta"
            },
            cuotas:{
                required:"Por favor, ingrese la cantidad de cuotas"
            },
            nro_documento:{
                required:"Por favor, ingrese su DNI",
                only_numbers:"El DNI solo puede contener numeros. Por favor, reingrese el DNI del titular de la tarjeta",
                min:"El DNI del titular de la tarjeta no puede ser menor a 11500001. Por favor, reingrese el DNI del titular de la tarjeta",
                max:"El DNI del titular de la tarjeta no puede ser mayor a 56000000. Por favor, reingrese el DNI del titular de la tarjeta"
            },
            pais:{
                required:"Por favor, ingrese el pais en donde recibe la factura"
            },
            estado:{
                required:"Por favor, ingrese el estado o provincia en donde recibe la factura de la tarjeta"
            },
            ciudad:{
                required:"Por favor, ingrese la ciudad en donde recibe la factura de la tarjeta"
            },
            calle:{
                required:"Por favor, ingrese la calle en donde recibe la factura de la tarjeta"
            },
            número_casa:{
                required:"Por favor, ingrese el numero del domicilio en donde recibe la factura de la tarjeta"
            },
            cp:{
                required:"Por favor, ingrese codigo posta de la ciudad en donde recibe la factura de la tarjeta", 
                only_numbers:"El codigo posta solo contiene numeros. Por favor, reingrese el codigo postal"
            },
            correo_electronico:{
                required: "Por favor, ingrese un mail"
            },
            codigo_de_seguridad:{
                required:"Por favor, ingrese el codigo de seguridad de su tarjeta de credito",
                minlength:"El codigo de seguridad de su tarjeta de credito no puede tener menos de 3 digitos. Por favor, reingrese el codigo de seguridad",
                only_numbers:"El codigo de seguridad de su tarjeta de credito solo puede contener numeros. Por favor, reingrese el codigo de seguridad",
                letters_space:"El codigo de seguridad de su tarjeta de credito solo puede contener numeros. Por favor, reingrese el codigo de seguridad"
            }
            // tel:{
            //     required:"Por favor, ingrese un numero de telefono"
            // }
        }
    });

    $(".next-step").click(function(){

        if(form.valid()==true){
            var current_fs; 
            var next_fs; 
            if($("#formulario-pasajero").is(":visible")){
                current_fs=$("#formulario-pasajero");
                next_fs=$("#formulario-pago");
            }else if($("#formulario-pago").is(":visible")){
                current_fs=$("#formulario-pago");
                next_fs=$("#formulario-contacto");                 
            }else if($("#formulario-contacto").is(":visible")){
                current_fs=$("#formulario-contacto");
                next_fs=$("#formulario-completo");                  
            }
            var $active = $('.wizard .nav-tabs li.active');
            $active.next().removeClass('disabled');
            nextTab($active);

            current_fs.hide(); 
            next_fs.show(); 
        }

        if($("#formulario-completo").is(":visible")){
            $("#pasajero-resumen").text($("#apellido").val() + " " + $("#nombre").val());
            $("#nacimiento-resumen").text($("#dia").val()+"/"+$("#mes").val()+"/"+$("#año").val());
            $("#identificacion-resumen").text($("#nro-documento-pasajero").val());
            $("#tarjeta-nro-resumen").text($("#fill-in-tarjeta").val());
            $("#tarjeta-vencimiento-resumen").text($("#vencimiento-mes").val()+"/"+$("#vencimiento-año").val());
            $("#tarjeta-nombre-resumen").text($("#apellido-p").val()+ " " + $("#nombre-p").val());
            $("#tarjeta-dni-resumen").text($("#documento-p").val());
            $("#pais-resumen").text($("#pais").val());
            $("#provincia-resumen").text($("#provincia").val());
            $("#ciudad-resumen").text($("#ciudad").val());
            $("#codigo-postal-resumen").text($("#cp").val());
            $("#calle-resumen").text($("#calle").val());
            $("#numero-casa-resumen").text($("#numero-casa").val());
            if($("#piso-casa").val()==""){
                $("#numero-piso-resumen").text("-");
            }else{
                 $("#numero-piso-resumen").text($("#piso-casa").val());
            }
            if($("#dpto-casa").val()==""){
                $("#numero-dpto-resumen").text("-");
            }else{
                 $("#numero-dpto-resumen").text($("#piso-casa").val());
            }
            console.log("./ticket_test.html")
            $("#ticket-resumen").load("./ticket_test.html");
        }
    });

    $("form").submit(function(e) {
        return false;
    });

    var $submit=$("#confirmar").hide(),
        $cbs = $('input[name=acepto]').click(function() {
            $submit.toggle($cbs.is(":checked"));
        });

        $("#confirmar").click(function(){
            alert('Su compra a finalizado');
        });

    $(".prev-step").click(function(){
        if($("#formulario-pago").is(":visible")){
            current_fs=$("#formulario-pago");
            next_fs=$("#formulario-pasajero");
        }else if($("#formulario-contacto").is(":visible")){
            current_fs=$("#formulario-contacto");
            next_fs=$("#formulario-pago");
        }else if($("#formulario-completo").is(":visible")){
            current_fs=$("#formulario-completo");
            next_fs=$("#formulario-contacto");
        }
        current_fs.hide(); 
        next_fs.show(); 
    });

    jQuery.validator.addMethod("letters_space",function(value, element){
        if(/^[a-zA-Z\s]*$/.test(value)){
            return true; 
        }else{
            return false; 
        }
    }, "Su nombre solo puede contener letras y espacios. Por favor, ingrese su nombre");

    jQuery.validator.addMethod("notEqualTo", function(value, element, param){
        return this.optional(element) || !$.validator.methods.equalTo.call(this, value, element, param);
    }, "Su nombre y apellido no pueden ser iguales. Por favor, ingrese sus datos correctamente");

    jQuery.validator.addMethod("only_numbers", function(value, element){
        if(/^\d+$/.test(value)){
            return true; 
        }else{
            return false; 
        }
    });

    jQuery.validator.addMethod("creditcard", function(value, element){
        if ( this.optional( element ) ) {
            return "dependency-mismatch";
        }

        // Accept only spaces, digits and dashes
        if ( /[^0-9 \-]+/.test( value ) ) {
            return false;
        }

        var nCheck = 0,
            nDigit = 0,
            bEven = false,
            n, cDigit;

        value = value.replace( /\D/g, "" );

        // Basing min and max length on
        // https://developer.ean.com/general_info/Valid_Credit_Card_Types
        if ( value.length < 13 || value.length > 19 ) {
            return false;
        }

        for ( n = value.length - 1; n >= 0; n-- ) {
            cDigit = value.charAt( n );
            nDigit = parseInt( cDigit, 10 );
            if ( bEven ) {
                if ( ( nDigit *= 2 ) > 9 ) {
                    nDigit -= 9;
                }
            }

            nCheck += nDigit;
            bEven = !bEven;
        }

        return ( nCheck % 10 ) === 0;
    }, "El número de tarjeta es invalido. Por favor, reingrese el número de tarjeta de credito");

    jQuery.validator.addMethod("febrero_biciesto", function(value, element){
        if($("#mes").val() == "Febrero"){
                if($("#dia").val()=="29" && $("#año").val()%4!=0){
                    return false; 
                }else{
                    return true; 
                } 
        }
        return true; 
    }, "El año no es biciesto, dia de nacimiento invalido. Por favor, reingrese mes o dia de nacimiento del pasajero");

    jQuery.validator.addMethod("febrero", function(value, element){
        if($("#mes").val()=="Febrero"){
            if($("#dia").val()>29){
                return false; 
            }
        }return true; 
    }, "Fecha de nacimiento invalida. Por favor, reigrese fecha de nacimiento del pasajero"); 

    jQuery.validator.addMethod("vencimiento", function(value, element){
        if($("#vencimiento-mes").val()=="01" || $("#vencimiento-mes").val()=="02" || $("#vencimiento-mes").val()=="03" || $("#vencimiento-mes").val()=="04" || $("#vencimiento-mes").val()=="05"){
            if($("#vencimiento-año").val()=="2017"){
                return false; 
            }
        }return true; 
    }, "Fecha de vencimiento invalida, la tarjeta se encuentra vencida. Por favor, chquee los datos o utilice otra tarjeta");

    jQuery.validator.addMethod("amex_master_visa", function(value, element){

        var firstChar = $("#fill-in-tarjeta").val().substr(0, 1);
        var codigo = $("#codigo_de_seguridad").value().length;
        if(firstChar=="3" && codigo!=4){ //es amex
            return false; 
        }else if((firstChar=="4" || firstChar=="5") && codigo!=3){ //es master o vista
            return false; 
        }
        return true; 
    }, "Codigo de seguridad incorrecto. Por favor, reingrese el codigo de seguridad de su tarjeta de credito");


}); 



 //according menu
// $(document).ready(function(){
//     //Add Inactive Class To All Accordion Headers
//     $('.accordion-header').toggleClass('inactive-header');
    
//     //Set The Accordion Content Width
//     var contentwidth = $('.accordion-header').width();
//     $('.accordion-content').css({});
    
//     //Open The First Accordion Section When Page Loads
//     $('.accordion-header').first().toggleClass('active-header').toggleClass('inactive-header');
//     $('.accordion-content').first().slideDown().toggleClass('open-content');
    
//     // The Accordion Effect
//     $('.accordion-header').click(function () {
//         if($(this).is('.inactive-header')) {
//             $('.active-header').toggleClass('active-header').toggleClass('inactive-header').next().slideToggle().toggleClass('open-content');
//             $(this).toggleClass('active-header').toggleClass('inactive-header');
//             $(this).next().slideToggle().toggleClass('open-content');
//         }
        
//         else {
//             $(this).toggleClass('active-header').toggleClass('inactive-header');
//             $(this).next().slideToggle().toggleClass('open-content');
//         }
//     });
//     return false;     
// });

//$("#phone").intlTelInput(); 

//Si llega a surgir algun error que no maneje, el error se va a mostrar en español

$.extend($.validator.messages, {
    required: "Este campo es obligatorio.",
    remote: "Por favor, complete este campo.",
    email: "Por favor, escriba una dirección de correo válida.",
    url: "Por favor, escriba una URL válida.",
    date: "Por favor, escriba una fecha válida.",
    dateISO: "Por favor, escriba una fecha (ISO) válida.",
    number: "Por favor, escriba un número entero válido.",
    digits: "Por favor, escriba sólo dígitos.",
    creditcard: "Por favor, escriba un número de tarjeta válido.",
    equalTo: "Por favor, escriba el mismo valor de nuevo.",
    extension: "Por favor, escriba un valor con una extensión aceptada.",
    maxlength: $.validator.format("Por favor, no escriba más de {0} caracteres."),
    minlength: $.validator.format("Por favor, no escriba menos de {0} caracteres."),
    rangelength: $.validator.format("Por favor, escriba un valor entre {0} y {1} caracteres."),
    range: $.validator.format("Por favor, escriba un valor entre {0} y {1}."),
    max: $.validator.format("Por favor, escriba un valor menor o igual a {0}."),
    min: $.validator.format("Por favor, escriba un valor mayor o igual a {0}."),
    nifES: "Por favor, escriba un NIF válido.",
    nieES: "Por favor, escriba un NIE válido.",
    cifES: "Por favor, escriba un CIF válido."
});