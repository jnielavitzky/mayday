var pasajeros = 1//getPassengers();
var mifecha; 

$(document).ready(function() {
    //Initialize tooltips
    $('.nav-tabs > li a[title]').tooltip();

    //Wizard
    $('a[data-toggle="tab"]').on('show.bs.tab', function(e) {

        var $target = $(e.target);

        if ($target.parent().hasClass('disabled')) {
            return false;
        }
    });

    //Initialize popover
    $('[data-toggle="popover"]').popover();

    $('#descuentos').popover({
        title: "<h4>Descuentos semanales</h4>",
        content: "<img src='./images/descuentos.svg' alt='Descuentos'' id='descuentos_detalle'>",
        html: true,
        placement: "left",
        trigger: 'hover'
    });

    $('.duda').popover({
        title: "<h4>Encuentra el código de seguridad de tu tarjeta de crédito</h4>",
        content: "<div><h5>Visa, MasterCard, Discover, China UnionPay, JCB y Diners Club</h5>" +
        "<p>Encontrarás el código de tres dígitos en el reverso de la tarjeta, después del número.</p>" +
        "<p><img alt='3 números' src='./images/credit-card-3-number-security-code.png' width='240' data-hires='true' data-hires-status='replaced'></p></div>" +
        "<div><h4>American Express</h4><p>Encontrarás el código de cuatro dígitos en el anverso de la tarjeta, encima del número.</p>" +
        "<p><img alt='4 números' src='./images/credit-card-4-number-security-code.png' width='240' data-hires='true' data-hires-status='replaced'></p></div>",
        html: true,
        placement: "left",
        trigger: 'hover'
    });
});

function getPassengers() {

    var ida_url = sessionStorage.getItem("map");
    console.log(ida_url)

    adults = parseInt(getUrlParameter(ida_url, "adults"));
    children = parseInt(getUrlParameter(ida_url, "children"));
    infants = parseInt(getUrlParameter(ida_url, "infants"));

    return adults + children + infants;
};

function getUrlParameter(url, sParam) {
    var sPageURL = url,
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

function nextTab(elem) {
    $(elem).next().find('a[data-toggle="tab"]').click();
}

function prevTab(elem) {
    $(elem).prev().find('a[data-toggle="tab"]').click();
}

$(document).ready(function() {
    var max_fields = 5; //maximum input boxes allowed
    var wrapper = $(".input-fields-wrap"); //Fields wrapper
    var add_button = $(".add-field-button"); //Add button ID

    var x = 1; //initial text box count
    $(add_button).click(function(e) { //on add input button click
        e.preventDefault();
        if (x < max_fields) { //max input box allowed
            x++; //text box increment
            $(wrapper).append('<div><input type="text" name="mytext[]" class="fill-in phone"/><a href="#" class="remove-field">&nbsp;Quitar telefono</a></div>'); //add input box
        }
    });

    $(wrapper).on("click", ".remove-field", function(e) { //user click on remove text
        e.preventDefault();
        $(this).parent('div').remove();
        x--;
    });
});

$(document).ready(function() {

    var form = $("#my-form");
    form.validate({
        ignore: ":hidden",
        rules: {
            tarjeta: {
                required: true,
                creditcard: true
            },
            vencimiento_mes: {
                required: true,
            },
            vencimiento_año: {
                required: true,
                vencimiento: true
            },
            nombre_pago: {
                required: true,
                minlength: 2,
                maxlength: 41,
                digits: false,
                letters_space: true,
                notEqualTo: "#apellido-p"
            },
            apellido_pago: {
                required: true,
                minlength: 2,
                maxlength: 41,
                digits: false,
                letters_space: true
            },
            cuotas: {
                required: true,
            },
            nro_documento: {
                required: true,
                only_numbers: true,
                min: 11500001,
                max: 56000000
            },
            pais: {
                required: true
            },
            estado: {
                required: true,
                letters_space: true
            },
            ciudad: {
                required: true,
                letters_space: true
            },
            calle: {
                required: true
            },
            número_casa: {
                required: true
            },
            cp: {
                required: true,
                only_numbers: true
            },
            correo_electronico: {
                required: true
            },
            codigo_de_seguridad: {
                required: true,
                    //amex_master_visa:true, 
                    minlength: 3,
                    maxlength: 4,
                    only_numbers: true,
                    letters_space: false
                }
                // tel:{
                //     required:true
                // }
            },
            messages: {
                tarjeta: {
                    required: "Por favor, ingrese el número de tarjeta de crédito con el que desea efectuar la compra"
                },
                vencimiento_mes: {
                    required: "Por favor, ingrese mes de vencimiento de la tarjeta"
                },
                vencimiento_año: {
                    required: "Por favor, ingrese año de vencimiento de la tarjeta"
                },
                nombre_pago: {
                    required: "Por favor, ingrese nombre del titular de la tarjeta",
                    minlength: "El nombre del titular de la tarjeta debe tener como mínimo 2 caracteres. Por favor, reingrese el nombre del titular de la tarjeta",
                    maxlength: "El nombre del titular de la tarjeta debe tener como máximo 41 caracteres. Por favor, reingrese el nombre del titular de la tarjeta",
                    digits: "El nombre del titular de la tarjeta no puede tener números. Por favor, reingrese el nombre del titular de la tarjeta",
                    letters_space: "El nombre del titular de la tarjeta sólo puede contener letras y espacios. Por favor, reingrese el nombre del titular de la tarjeta",
                    notEqualTo: "El nombre y apellido del titular de la tarjeta no pueden ser iguales. Por favor, chequee los datos del titular de la tarjeta"
                },
                apellido_pago: {
                    required: "Por favor, ingrese apellido del titular de la tarjeta",
                    minlength: "El apellido del titular de la tarjeta debe tener como mínimo 2 caracteres. Por favor, reingrese el apellido del titular de la tarjeta",
                    maxlength: "El apellido del titular de la tarjeta debe tener como máximo 41 caracteres. Por favor, reingrese el apellido del titular de la tarejta",
                    digits: "El apellido del titular de la tarjeta no puede tener números. Por favor, reingrese el apellido del titular de la tarejta",
                    letters_space: "El apellido del titular de la tarjeta solo puede contener letras y espacios. Por favor, reingrese el apellido del titular de la tarejta"
                },
                cuotas: {
                    required: "Por favor, ingrese la cantidad de cuotas"
                },
                nro_documento: {
                    required: "Por favor, ingrese su DNI",
                    only_numbers: "El DNI sólo puede contener números. Por favor, reingrese el DNI del titular de la tarjeta",
                    min: "El DNI del titular de la tarjeta no puede ser menor a 11500001. Por favor, reingrese el DNI del titular de la tarjeta",
                    max: "El DNI del titular de la tarjeta no puede ser mayor a 56000000. Por favor, reingrese el DNI del titular de la tarjeta"
                },
                pais: {
                    required: "Por favor, ingrese el país en donde recibe la factura"
                },
                estado: {
                    required: "Por favor, ingrese el estado o provincia en donde recibe la factura de la tarjeta"
                },
                ciudad: {
                    required: "Por favor, ingrese la ciudad en donde recibe la factura de la tarjeta"
                },
                calle: {
                    required: "Por favor, ingrese la calle en donde recibe la factura de la tarjeta"
                },
                número_casa: {
                    required: "Por favor, ingrese el numero del domicilio en donde recibe la factura de la tarjeta"
                },
                cp: {
                    required: "Por favor, ingrese el código postal de la ciudad en donde recibe la factura de la tarjeta",
                    only_numbers: "El código postal solo contiene números. Por favor, reingrese el código postal"
                },
                correo_electronico: {
                    required: "Por favor, ingrese un mail"
                },
                codigo_de_seguridad: {
                    required: "Por favor, ingrese el código de seguridad de su tarjeta de crédito",
                    minlength: "El código de seguridad de su tarjeta de crédito no puede tener menos de 3 digitos. Por favor, reingrese el código de seguridad",
                    only_numbers: "El código de seguridad de su tarjeta de crédito sólo puede contener números. Por favor, reingrese el código de seguridad",
                    letters_space: "El código de seguridad de su tarjeta de crédito sólo puede contener números. Por favor, reingrese el código de seguridad"
                }
                // tel:{
                //     required:"Por favor, ingrese un numero de telefono"
                // }
            }
    });

$(".next-step").click(function() {

    if (form.valid() == true) {
        var current_fs;
        var next_fs;
        if ($("#formulario-pasajero").is(":visible")) {
            current_fs = $("#formulario-pasajero");
            next_fs = $("#formulario-pago");

        } else if ($("#formulario-pago").is(":visible")) {
            current_fs = $("#formulario-pago");
            next_fs = $("#formulario-contacto");
        } else if ($("#formulario-contacto").is(":visible")) {
            current_fs = $("#formulario-contacto");
            next_fs = $("#formulario-completo");
        }

        var $active = $('.wizard .nav-tabs li.active');
        $active.next().removeClass('disabled');
        nextTab($active);

        current_fs.hide();
        next_fs.show();
    }

    if ($("#formulario-completo").is(":visible")) {
        setSummary();
    }

});

$(".prev-step").click(function() {
    if ($("#formulario-pago").is(":visible")) {
        current_fs = $("#formulario-pago");
        next_fs = $("#formulario-pasajero");
    } else if ($("#formulario-contacto").is(":visible")) {
        current_fs = $("#formulario-contacto");
        next_fs = $("#formulario-pago");
    } else if ($("#formulario-completo").is(":visible")) {
        current_fs = $("#formulario-completo");
        next_fs = $("#formulario-contacto");
    }
    var $active = $('.wizard .nav-tabs li.active');
    prevTab($active);
    
    current_fs.hide();
    next_fs.show();
});

for (i = 0; i < pasajeros; i++) {
    $(".informacion-pasajero").append('<div class="row">' +
        '<h3 class="subtitulo-representacion">Información del Pasajero ' + (i+1) + '</h3>' +
        '<div class="col-md-6" class="form-group">' +
        '<label for="nombre' + i + '" class="datos">Nombre<span class="obligatorio">*</span></label>' +
        '<br>' +
        '<input type="text" name="nombre' + i + '" class="fill-in" autofocus id="nombre' + i + '" autocomplete>' +
        '<div id="id-error" class="error-nombre">' +
        '<label for="nombre' + i + '" class="error error-gral" generated="true"></label>' +
        '</div>' +
        '</div>' +
        '<div class="col-md-6">' +
        '<label class="datos">Apellido<span class="obligatorio">*</span></label>' +
        '<br>' +
        '<input type="text" name="apellido' + i + '" class="fill-in" autocomplete id="apellido' + i + '">' +
        '<label id="appellido' + i + '-error" class="error error-gral" for="apellido' + i + '"></label>' +
        '</div>' +
        '</div>' +
        '<div class="row">' +
        '<div class="col-md-6">' +
        '<label class="datos">Tipo y número de documento<span class="obligatorio">*</span></label>' +
        '<br>' +
        '<select class="seleccion" name="seleccion_doc' + i + '">' +
        '<option value="DNI">DNI</option>' +
        '<option value="Pasaprote">Pasaprote</option>' +
        '</select>' +
        '<input type="text" name="documento' + i + '" class="fill-in-short" id="nro-documento-pasajero' + i + '">' +
        '<label id="nro-documento-pasajero' + i + '-error" class="error error-gral" for="nro-documento-pasajero' + i + '"></label>' +
        '</div>' +
        '<div class="col-md-6">' +
        '<label class="datos">Fecha de Nacimiento<span class="obligatorio">*</span></label>' +
        '<br>' +
        '<select class="seleccion" name="fecha_dia' + i + '" id="dia' + i + '">' +
        '<option value="">Día</option>' +
        '<option value="01">01</option>' +
        '<option value="02">02</option>' +
        '<option value="03">03</option>' +
        '<option value="04">04</option>' +
        '<option value="05">05</option>' +
        '<option value="06">06</option>' +
        '<option value="07">07</option>' +
        '<option value="08">08</option>' +
        '<option value="09">09</option>' +
        '<option value="10">10</option>' +
        '<option value="11">11</option>' +
        '<option value="12">12</option>' +
        '<option value="13">13</option>' +
        '<option value="14">14</option>' +
        '<option value="15">15</option>' +
        '<option value="16">16</option>' +
        '<option value="17">17</option>' +
        '<option value="18">18</option>' +
        '<option value="19">19</option>' +
        '<option value="20">20</option>' +
        '<option value="21">21</option>' +
        '<option value="22">22</option>' +
        '<option value="23">23</option>' +
        '<option value="24">24</option>' +
        '<option value="25">25</option>' +
        '<option value="26">26</option>' +
        '<option value="27">27</option>' +
        '<option value="28">28</option>' +
        '<option value="29">29</option>' +
        '<option value="30">30</option>' +
        '<option value="31">31</option>' +
        '</select>' +
        '<select class="seleccion no-left-margin" id="mes' + i + '" name="fecha_mes' + i + '">' +
        '<option value="">Mes</option>' +
        '<option value="01">Enero</option>' +
        '<option value="02">Febrero</option>' +
        '<option value="03">Marzo</option>' +
        '<option value="04">Abril</option>' +
        '<option value="05">Mayo</option>' +
        '<option value="06">Junio</option>' +
        '<option value="07">Julio</option>' +
        '<option value="08">Agosto</option>' +
        '<option value="09">Septiembre</option>' +
        '<option value="10">Octubre</option>' +
        '<option value="11">Noviembre</option>' +
        '<option value="12">Diciembre</option>' +
        '</select>' +
        '<select class="seleccion no-left-margin" id="año' + i + '" name="fecha_año' + i + '">' +
        '<option value="">Año</option>' +
        '<option value="1951">1951</option>' +
        '<option value="1952">1952</option>' +
        '<option value="1953">1953</option>' +
        '<option value="1954">1954</option>' +
        '<option value="1955">1955</option>' +
        '<option value="1956">1956</option>' +
        '<option value="1957">1957</option>' +
        '<option value="1958">1958</option>' +
        '<option value="1959">1959</option>' +
        '<option value="1960">1960</option>' +
        '<option value="1961">1961</option>' +
        '<option value="1962">1962</option>' +
        '<option value="1963">1963</option>' +
        '<option value="1964">1964</option>' +
        '<option value="1965">1965</option>' +
        '<option value="1966">1966</option>' +
        '<option value="1967">1967</option>' +
        '<option value="1968">1968</option>' +
        '<option value="1969">1969</option>' +
        '<option value="1970">1970</option>' +
        '<option value="1971">1971</option>' +
        '<option value="1972">1972</option>' +
        '<option value="1973">1973</option>' +
        '<option value="1974">1974</option>' +
        '<option value="1975">1975</option>' +
        '<option value="1976">1976</option>' +
        '<option value="1977">1977</option>' +
        '<option value="1978">1978</option>' +
        '<option value="1979">1979</option>' +
        '<option value="1980">1980</option>' +
        '<option value="1981">1981</option>' +
        '<option value="1982">1982</option>' +
        '<option value="1983">1983</option>' +
        '<option value="1984">1984</option>' +
        '<option value="1985">1985</option>' +
        '<option value="1986">1986</option>' +
        '<option value="1987">1987</option>' +
        '<option value="1988">1988</option>' +
        '<option value="1989">1989</option>' +
        '<option value="1990">1990</option>' +
        '<option value="1991">1991</option>' +
        '<option value="1992">1992</option>' +
        '<option value="1993">1993</option>' +
        '<option value="1994">1994</option>' +
        '<option value="1995">1995</option>' +
        '<option value="1996">1996</option>' +
        '<option value="1997">1997</option>' +
        '<option value="1998">1998</option>' +
        '<option value="1999">1999</option>' +
        '<option value="2000">2000</option>' +
        '<option value="2001">2001</option>' +
        '<option value="2002">2002</option>' +
        '<option value="2003">2003</option>' +
        '<option value="2004">2004</option>' +
        '<option value="2005">2005</option>' +
        '<option value="2006">2006</option>' +
        '<option value="2007">2007</option>' +
        '<option value="2008">2008</option>' +
        '<option value="2009">2009</option>' +
        '<option value="2010">2010</option>' +
        '<option value="2011">2011</option>' +
        '<option value="2012">2012</option>' +
        '<option value="2013">2013</option>' +
        '<option value="2014">2014</option>' +
        '<option value="2015">2015</option>' +
        '<option value="2016">2016</option>' +
        '<option value="2017">2017</option>' +
        '</select>' +
        '<br>' +
        '<div class="row">' +
        '<label id="dia' + i + '-error" class="error error-dia-mes-año" for="dia' + i + '" ></label>' +
        '<br>' +
        '<label id="mes' + i + '-error" class="error error-dia-mes-año" for="mes' + i + '" ></label>' +
        '<br>' +
        '<label id="año' + i + '-error" class="error error-dia-mes-año" for="año' + i + '" ></label>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<br>');
        $('input[name="nombre' + i + '"]').rules("add",{
            required: true,
            minlength: 2,
            maxlength: 41,
            digits: false,
            letters_space: true,
            messages:{
                    required: "Por favor, ingrese nombre del pasajero",
                    minlength: "El nombre del pasajero debe tener como mínimo 2 caracteres. Por favor, reingrese el nombre del pasajero",
                    maxlength: "El nombre del pasajero debe tener como máximo 41 caracteres. Por faovr, reingrese el nombre del pasajero",
                    digits: "El nombre del pasajero no puede tener números. Por favor, reingrese el nombre del pasajero",
                    letters_space: "El nombre del pasajero solo puede contener letras y espacios. Por favor, reingrese el nombre del pasajero"
                }           
        });
        $('input[name="apellido' + i + '"]').rules("add",{
            required: true,
            minlength: 2,
            maxlength: 41,
            digits: false,
            letters_space: true,
            notEqualTo: $("#nombre" + i),
            messages:{
                    required: "Por favor, ingrese apellido del pasajero",
                    minlength: "El apellido del pasajero debe tener como mínimo 2 caracteres. Por favor, reingrese el apellido del pasajero",
                    maxlength: "El apellido del pasajero debe tener como máximo 41 caracteres. Por favor, reingrese el apellido del pasajero",
                    digits: "El apellido del pasajero no puede tener números. Por favor, reingrese el apellido del pasajero",
                    letters_space: "El apellido del pasajero solo puede contener letras y espacios. Por favor, reingrese el apellido del pasajero",
                    notEqualTo: "El nombre y apellido del pasajero no pueden ser iguales. Por favor, chequee los datos del pasajero"
                }
        });
        $('select[name="seleccion_doc' + i + '"]').rules("add",{
            required:true,
            messages:{
                required: "Por favor, seleccione una opcion"
            }
        });
        $('input[name="documento' + i + '"]').rules("add",{
            required: true,
            only_numbers: true,
            min: 11500001,
            max: 56000000,
            messages:{
                    required: "Por favor, ingrese número de identificación del pasajero",
                    only_numbers: "El número de identifiación solo puede contener digits. Por favor, reingrese el número de identificación del pasajero",
                    min: "El número de identificación del pasajero no puede ser menor a 11500001. Por favor, reingrese el número de identificación del pasajero",
                    max: "El número de identiifación del pasajero no puede ser mayor a 56000000. Por favor, reingrese el número de identificación del pasajero"
            }
        });
        $('select[name="fecha_dia' + i + '"]').rules("add",{
            required:true,
            messages:{
                required: "Por favor, ingrese día del nacimiento del pasajero"
            }
        });
        $('select[name="fecha_mes' + i + '"]').rules("add",{
            required:true,
            mes_valido:true, 
            messages:{
                required: "Por favor, ingrese mes del nacimiento del pasajero"
            }
        });
        $('select[name="fecha_año' + i + '"]').rules("add",{
            required:true, 
            //febrero_biciesto:true,
            messages:{
                required: "Por favor, ingrese año de nacimiento del pasajero"
            }  
        });
        
}


$("form").submit(function(e) {
    return false;
});

var $submit = $("#confirmar").hide(),
$cbs = $('input[name=acepto]').click(function() {
    $submit.toggle($cbs.is(":checked"));
});

$("#confirmar").click(function() {
    alert('Su compra a finalizado');
});

jQuery.validator.addMethod("letters_space", function(value, element) {
    if (/^[a-zA-Z\s]*$/.test(value)) {
        return true;
    } else {
        return false;
    }
}, "Su nombre sólo puede contener letras y espacios. Por favor, ingrese su nombre");

jQuery.validator.addMethod("notEqualTo", function(value, element, param) {
    return this.optional(element) || !$.validator.methods.equalTo.call(this, value, element, param);
}, "Su nombre y apellido no pueden ser iguales. Por favor, ingrese sus datos correctamente");

jQuery.validator.addMethod("only_numbers", function(value, element) {
    if (/^\d+$/.test(value)) {
        return true;
    } else {
        return false;
    }
});

jQuery.validator.addMethod("creditcard", function(value, element) {
    if (this.optional(element)) {
        return "dependency-mismatch";
    }

        // Accept only spaces, digits and dashes
        if (/[^0-9 \-]+/.test(value)) {
            return false;
        }

        var nCheck = 0,
        nDigit = 0,
        bEven = false,
        n, cDigit;

        value = value.replace(/\D/g, "");

        // Basing min and max length on
        // https://developer.ean.com/general_info/Valid_Credit_Card_Types
        if (value.length < 13 || value.length > 19) {
            return false;
        }

        for (n = value.length - 1; n >= 0; n--) {
            cDigit = value.charAt(n);
            nDigit = parseInt(cDigit, 10);
            if (bEven) {
                if ((nDigit *= 2) > 9) {
                    nDigit -= 9;
                }
            }

            nCheck += nDigit;
            bEven = !bEven;
        }

        return (nCheck % 10) === 0;
    }, "El número de tarjeta es inválido. Por favor, reingrese el número de tarjeta de crédito");

    jQuery.validator.addMethod("febrero_biciesto", function(value, element) {
        if ($("#mes").val() == "Febrero") {
            if ($("#dia").val() == "29" && $("#año").val() % 4 != 0) {
                return false;
            } else {
                return true;
            }
        }
        return true;
    }, "El año no es biciesto, dia de nacimiento inválido. Por favor, reingrese mes o dia de nacimiento del pasajero");

jQuery.validator.addMethod("mes_valido", function(value, element){
    for(i=0; i<pasajeros; i++){
        if(($('select[name="fecha_dia' + i + '"]').val()!="") && ($('select[name="fecha_mes' + i + '"]').val()!="") && ($('select[name="fecha_año' + i + '"]').val()!="")){
            var fecha = ($('select[name="fecha_dia' + i + '"]').val()) + '-' + ($('select[name="fecha_mes' + i + '"]').val()) + '-' + ($('select[name="fecha_año' + i + '"]').val());
            var mifecha=moment(fecha, "DD-MM-YYYY");
        }
         if(!mifecha.isValid()){
            return false; 
        }
    } return true; 
}, "Los datos ingresados son inconsistentes. Recuerde que Febrero solo tiene 28 dias excepto en años biciestos. Por favor, chequee y cambie los datos necesarios");

jQuery.validator.addMethod("vencimiento", function(value, element) {
    if ($("#vencimiento-mes").val() == "01" || $("#vencimiento-mes").val() == "02" || $("#vencimiento-mes").val() == "03" || $("#vencimiento-mes").val() == "04" || $("#vencimiento-mes").val() == "05") {
        if ($("#vencimiento-año").val() == "2017") {
            return false;
        }
    }
    return true;
}, "Fecha de vencimiento invalida, la tarjeta se encuentra vencida. Por favor, chquee los datos o utilice otra tarjeta");

jQuery.validator.addMethod("amex_master_visa", function(value, element) {

    var firstChar = $("#fill-in-tarjeta").val().substr(0, 1);
    var codigo = $("#codigo_de_seguridad").value().length;
        if (firstChar == "3" && codigo != 4) { //es amex
            return false;
        } else if ((firstChar == "4" || firstChar == "5") && codigo != 3) { //es master o visa
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

function setSummary(){
    for (i = 0; i < pasajeros; i++) {
        $(".pasajeros-resumen").append('<div class="row">' +
            '<div class="col-md-12">' +
            '<span class="subtitulos-resumen">Pasajero/a</span>' +
            '<span class="datos-resumen" id="pasajero-resumen' + i + '"></span>' +
            '</div>' +
            '</div>' +
            '<div class="row">' +
            '<div class="col-md-6">' +
            '<span class="subtitulos-resumen">Fecha de Nacimiento</span>' +
            '<span class="datos-resumen" id="nacimiento-resumen' + i + '"></span>' +
            '</div>' +
            '<div class="col-md-6">' +
            '<span class="subtitulos-resumen">Número de Identificación</span>' +
            '<span class="datos-resumen" id="identificacion-resumen' + i + '"></span>' +
            '</div>' +
            '</div>' + '<br>');

        $("#pasajero-resumen" + i).text($("#apellido" + i).val() + ", " + $("#nombre" + i).val());
        $("#nacimiento-resumen" + i).text($("#dia" + i).val() + "/" + $("#mes" + i).val() + "/" + $("#año" + i).val());
        $("#identificacion-resumen" + i).text($("#nro-documento-pasajero" + i).val());
        $("#tarjeta-nro-resumen").text($("#fill-in-tarjeta").val());
        $("#tarjeta-vencimiento-resumen").text($("#vencimiento-mes").val() + "/" + $("#vencimiento-año").val());
        $("#tarjeta-nombre-resumen").text($("#apellido-p").val() + " " + $("#nombre-p").val());
        $("#tarjeta-dni-resumen").text($("#documento-p").val());
        $("#pais-resumen").text($("#pais").val());
        $("#provincia-resumen").text($("#provincia").val());
        $("#ciudad-resumen").text($("#ciudad").val());
        $("#codigo-postal-resumen").text($("#cp").val());
        $("#calle-resumen").text($("#calle").val());
        $("#numero-casa-resumen").text($("#numero-casa").val());
        if ($("#piso-casa").val() == "") {
            $("#numero-piso-resumen").text("-");
        } else {
            $("#numero-piso-resumen").text($("#piso-casa").val());
        }
        if ($("#dpto-casa").val() == "") {
            $("#numero-dpto-resumen").text("-");
        } else {
            $("#numero-dpto-resumen").text($("#piso-casa").val());
        }
        $("#ticket-resumen").load("./ticket_test.html");
    }
}
