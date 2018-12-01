BengalaFramework.Register({
    "Name" : "Object Table Addon",
    "Author" : "Pablo Ferreira",
    "Description" : "JSON Based Html Tables generator.",
    "Version" : {
        "Number" : 1.0,
        "Branch" : "STABLE"
    },
    "Type" : "Addon",
    "SignName" : "BengalaFramework.Addon.ObjectTable",
    "Dependencies" : [],
    "Framework" : {"Version" : 1.0}
});


function ObjectTable(selector, array, JParams, tableName) {
    tableName = tableName || "table"
    var Templates = JParams;
    var data = array;
    var HTMLTABLE = '<table id="' + tableName + '" class="table">'
    HTMLTABLE = HTMLTABLE + "<thead>"
    HTMLTABLE = HTMLTABLE + "<tr>"
    // $.each(data[0], function (index, value) {

    $.each(Templates, function (indexTemp) {

        if (Templates[indexTemp].titleClass) {
            HTMLTABLE = HTMLTABLE + "<th id='" + indexTemp + "'class='HEAD-" + Templates[indexTemp].titleClass + "'>" + Templates[indexTemp].title + "</th>"
        } else {
            HTMLTABLE = HTMLTABLE + "<th id='" + indexTemp + "' class='HEAD-" + indexTemp + "'>" + Templates[indexTemp].title + "</th>"
        }
        if (Templates[indexTemp].style) {
            $.each(Templates[indexTemp].style, function (rule) {
                $("#" + indexTemp).css('"' + rule + '"', '"' + Templates[indexTemp].style[rule] + '"');
                $("#" + indexTemp).css(rule, Templates[indexTemp].style[rule]);

            })

        }
    })




    // })

    HTMLTABLE = HTMLTABLE + "</tr>"
    HTMLTABLE = HTMLTABLE + "</thead>"
    $.each(data, function (indexD, value) {
        if (!data[indexD] || value == null) {
            return;
        }
        HTMLTABLE = HTMLTABLE + "<tr>"

        //$.each(data[indexD], function (index, value) {

        $.each(Templates, function (indexTemp) {
            if (indexTemp) {

                var NAMESTRING = "";
                if (Templates[indexTemp].Template) {
                    NAMESTRING = Templates[indexTemp].Template;
                    $.each(data[indexD], function (index, value) {
                        NAMESTRING = NAMESTRING.replace("{VALUE." + index + "}", value);
                        NAMESTRING = NAMESTRING.replace("{" + index + "}", "[" + indexD + "]." + index);


                    })
                    NAMESTRING = NAMESTRING.replace("{DEFAULT}", "[" + indexD + "]." + indexTemp);
                    NAMESTRING = NAMESTRING.replace("{i}", indexD);
                    NAMESTRING = NAMESTRING.replace("{Template.NAME}", Templates[indexTemp].title);
                    NAMESTRING = NAMESTRING.replace("{Table.NAME}", tableName);

                } else {
                    NAMESTRING = indexD
                }
                if (Templates[indexTemp].concat) {
                    var ConcatValue = Templates[indexTemp].concat.replace("{CONTENT}", "").replace(" ", "");
                    data[indexD][indexTemp] = Templates[indexTemp].concat.replace("{CONTENT}", data[indexD][indexTemp]).replace(ConcatValue, data[indexD][ConcatValue])

                }
                if (Templates[indexTemp].replaces) {
                    $.each(Templates[indexTemp].replaces, function (rule) {
                        if (data[indexD][indexTemp] == rule) {
                            data[indexD][indexTemp] = Templates[indexTemp].replaces[rule];
                        };
                    });
                }
                if (Templates[indexTemp].Format) {
                    var Value = data[indexD][indexTemp];
                    data[indexD][indexTemp] = Templates[indexTemp].Format.split("{CONTENT}").join(data[indexD][indexTemp])
                    data[indexD][indexTemp] = data[indexD][indexTemp].split("{i}").join(indexD)
                }

                if (Templates[indexTemp].Treat) {
                    data[indexD][indexTemp] = Templates[indexTemp].Treat(data[indexD][indexTemp], data[indexD], indexD, indexTemp);
                }

                if (!Templates[indexTemp].Type) { Templates[indexTemp]["Type"] = "STRING" };
                switch (Templates[indexTemp].Type.toUpperCase()) {
                    default:
                        HTMLTABLE = HTMLTABLE + "<td id='" + NAMESTRING + "' class='BODY-" + indexTemp + "'>" + data[indexD][indexTemp] + "</td>"
                        break;
                    case "INPUT":
                        var atributes = ""
                        if (Templates[indexTemp]["properties"]) {
                            $.each(Templates[indexTemp]["properties"], function (Id) {
                                var odption = Templates[indexTemp]["properties"];
                                atributes = atributes + Id + "='" + odption[Id] + "'";
                            })
                        }
                        HTMLTABLE = HTMLTABLE + "<td id='" + NAMESTRING + "' class='BODY-" + indexTemp + "'><input " + atributes + " class='BODY-" + indexTemp + "' name='" + NAMESTRING + "'type='text' value='" + data[indexD][indexTemp] + "'/></td>"
                        break
                    case "BUTTON":
                        var atributes = ""
                        if (Templates[indexTemp]["properties"]) {
                            $.each(Templates[indexTemp]["properties"], function (Id) {
                                var odption = Templates[indexTemp]["properties"];
                                atributes = atributes + Id + "='" + odption[Id] + "'";
                            })
                        }
                        HTMLTABLE = HTMLTABLE + "<td id='" + NAMESTRING + "' class='BODY-" + indexTemp + "'><button " + atributes + " class='BODY-" + indexTemp + "' name='" + NAMESTRING + "'>" + data[indexD][indexTemp] + "</td>"
                        break
                    case "SELECT":
                        HTMLTABLE = HTMLTABLE + "<td id='" + NAMESTRING + "' class='BODY-" + indexTemp + "'>"
                        var atsributes = ""
                        if (Templates[indexTemp]["properties"]) {
                            $.each(Templates[indexTemp]["properties"], function (Id) {
                                var odption = Templates[indexTemp]["properties"];
                                atsributes = atsributes + Id + "='" + odption[Id] + "'";
                            })
                        }
                        HTMLTABLE = HTMLTABLE + "<select " + atsributes + " >"
                        var count = 0;
                        $.each(Templates[indexTemp].dropdown, function (rule) {
                            var option = Templates[indexTemp].dropdown[rule];
                            //HTMLTABLE = HTMLTABLE + "<option id='DD"+count+"'>"+rule+"</option>"; 
                            var atributes = ""
                            $.each(option, function (Id) {

                                atributes = atributes + Id + "='" + option[Id] + "'";
                            })


                            HTMLTABLE = HTMLTABLE + "<option " + atributes + ">" + rule + "</option>";
                            count++;
                        });
                        HTMLTABLE = HTMLTABLE + "<select>"
                        HTMLTABLE = HTMLTABLE + "</td>"
                        break
                    case "CHECKBOX":
                        var atributes = ""
                        if (Templates[indexTemp]["properties"]) {
                            $.each(Templates[indexTemp]["properties"], function (Id) {
                                var odption = Templates[indexTemp]["properties"];
                                atributes = atributes + Id + "='" + odption[Id] + "'";
                            })
                        }
                        HTMLTABLE = HTMLTABLE + "<td id='" + NAMESTRING + "' class='BODY-" + indexTemp + "'><input " + atributes + " class='BODY-" + indexTemp + "' name='" + NAMESTRING + "'type='checkbox' placeholder='" + data[indexD][indexTemp] + "'/></td>"
                        break
                    case "HIDDEN":
                        var atributes = ""
                        if (Templates[indexTemp]["properties"]) {
                            $.each(Templates[indexTemp]["properties"], function (Id) {
                                var odption = Templates[indexTemp]["properties"];
                                atributes = atributes + Id + "='" + odption[Id] + "'";
                            })
                        }
                        HTMLTABLE = HTMLTABLE + "<td id='" + NAMESTRING + "' class='BODY-" + indexTemp + "'><input " + atributes + " class='BODY-" + indexTemp + "' name='" + NAMESTRING + "'type='hidden' value='" + data[indexD][indexTemp] + "'/></td>"
                        break
                    case "SUBMIT":
                        var atributes = ""
                        if (Templates[indexTemp]["properties"]) {
                            $.each(Templates[indexTemp]["properties"], function (Id) {
                                var odption = Templates[indexTemp]["properties"];
                                atributes = atributes + Id + "='" + odption[Id] + "'";
                            })
                        }
                        HTMLTABLE = HTMLTABLE + "<td id='" + NAMESTRING + "' class='BODY-" + indexTemp + "'><input " + atributes + " class='BODY-" + indexTemp + "' name='" + NAMESTRING + "'type='submit' placeholder='" + data[indexD][indexTemp] + "'/></td>"
                        break
                }

            }


        })

        //})

        HTMLTABLE = HTMLTABLE + "</tr>"

    })
    $(selector).html(HTMLTABLE);
    $.each(Templates, function (indexTemp) {
        if (Templates[indexTemp]["Body.style"]) {
            $(".BODY-" + indexTemp).css(Templates[indexTemp]["Body.style"]);
        }

        if (Templates[indexTemp]["Head.style"]) {
            $(".HEAD-" + indexTemp).css(Templates[indexTemp]["Head.style"]);
        }
        
    })

}

function addSearch(table, input, label) {
    label = label || "" + label + ""
    $(input).on("keyup", function () {
        var value = $(this).val();
        var wantsToSelect = false;
        $(table + " tr").each(function (index) {
            if (index !== 0) {

                $row = $(this);

                var id = $row.find("td").text();
                if (id.toUpperCase().search(value.toUpperCase()) < 0) {

                    $row.hide();
                } else {
                    $row.show();
                    if (value.length > 3) {
                        $(table + " tr td").each(function (index) {

                            if ($(this).html().search(label) > 0) {
                                $(this).html($(this).html().replace("<" + label + ">", ""));
                                $(this).html($(this).html().replace("</" + label + ">", ""));
                            }
                            if ($(this).html().toUpperCase().search(value.toUpperCase()) >= 0) {
                                $(this).html($(this).html().replace($(this).html().substring($(this).html().toUpperCase().search(value.toUpperCase()), $(this).html().toUpperCase().search(value.toUpperCase()) + value.length), "<" + label + ">" + $(this).html().substring($(this).html().toUpperCase().search(value.toUpperCase()), $(this).html().toUpperCase().search(value.toUpperCase()) + value.length) + "</" + label + ">"));
                            }
                        });
                    }
                }
            }
        });
    });

}