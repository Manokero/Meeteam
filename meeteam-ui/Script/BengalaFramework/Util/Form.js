BengalaFramework.Register({
    "Name" : "Formulary Tool",
    "Author" : "Pablo Ferreira",
    "Description" : "Formulary Parsing and making tool.",
    "Version" : {
        "Number" : 1.0,
        "Branch" : "STABLE"
    },
    "Type" : "Util",
    "SignName" : "BengalaFramework.Util.Form",
    "Dependencies" : [],
    "Framework" : {"Version" : 1.0}
});



function ArrayIntoSelect(Selector, array, name, value, emptyvalue, where) {
  var Select = $(Selector);

    if(where) {
        array = array.filter(where);
    }
    if(emptyvalue) {
        Select.append(`<option value="" disabled selected>-- ${ (typeof emptyvalue === 'boolean' ? "Seleccione" : emptyvalue) } --</option>`);
    }
  for(var i in array) {
    Select.append("<option value='"+(typeof value !== 'function' ? array[i][value] : value(array[i]))+"'>"+(typeof name !== 'function' ? array[i][name] : name(array[i]))+"</option>")
  }
    $(Selector).change();
  return Select;
} 

function FormParser(Form) {
    var Data = {};
    for (var i in Form) {
        if (!Form[i].classList) { continue };
        var input = $(Form[i]);
        if (input.attr("name")) {
            if (input.attr("name").trim() != "") {

                
                Data[input.attr("name").trim()] = input.val();

                if (input.hasClass("moneyFormat")) {
                    Data[input.attr("name").trim()] = parseFloat(Data[input.attr("name").trim()].split(",").join("").split("RD$ ").join("")) || 0.00;
                }

                if (input.hasClass("numberFormat")) {
                    Data[input.attr("name").trim()] = parseInt(Data[input.attr("name").trim()].split(",").join("")) || 0;
                }

                if (input.hasClass("percentFormat")) {
                    Data[input.attr("name").trim()] = parseFloat(Data[input.attr("name").trim()].split("_").join("0")) || 0;
                }
                if (input.hasClass("timeFormat")) {
                    if(Data[input.attr("name").trim()].search("m") > -1 || Data[input.attr("name").trim()].search("h") > -1) {
                      Data[input.attr("name").trim()] = "";
                    } else {
                      if(Data[input.attr("name").trim()].trim() != "") {
                        Data[input.attr("name").trim()] = Data[input.attr("name").trim()] + ":00";
                      }
                    }
                }

                if (input.hasClass("dateTimeFormat") || input.hasClass('dateFormat')) {

                    if(Data[input.attr("name").trim()].search("d") > -1 || Data[input.attr("name").trim()].search("m") > -1 || Data[input.attr("name").trim()].search("y") > -1 || Data[input.attr("name").trim()].trim() == "") {
                        Data[input.attr("name").trim()] = "";
                    } else {
                        var date = new Date(input.val().split("/").reverse().join("/"));
                        Data[input.attr("name").trim()] = date.toISOString().slice(0, 19).replace('T', ' ');
                    }
                }

                if (Form[i].type) {
                    if (Form[i].type.toUpperCase() == "CHECKBOX") {
                        Data[input.attr("name").trim()] = input.is(":checked") ? 1 : 0;
                    }
                }
            }
        }
    }
    return Data;
}

// Esta funcion limpia los formularios.
function ClearForm(selector) {
    selector = selector || "body";
    return $(selector).find("input, textarea, select").val("");
}

// Esta funcion activa o desactivo un formulario.
function ToggleForm(b, selector) {
    selector = selector || "body";
    return $(selector).find("input, textarea, select").prop("disabled", b);
}

// Con esta funcion se llena un formulario con la informacion de un objeto.
function FillForm(data, selector) {
    selector = selector || "body";
    ToggleForm(false, selector);
    for (var i in data) {
        var Input = $(selector).find("[name='" + i + "']");
        if (Input[0] && Input[0].type && Input[0].type.toUpperCase() == "CHECKBOX") {
            Input.prop("checked", data[i].toUpperCase() == "TRUE")
        } else {
            Input.val(data[i]);
        }
    }
    return $(selector).find("input, textarea, select");
}
