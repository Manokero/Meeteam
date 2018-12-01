BengalaFramework.Register({
    "Name" : "Validation Tool",
    "Author" : "Pablo Ferreira",
    "Description" : "Validation Tool for Objects, and properties.",
    "Version" : {
        "Number" : 1.0,
        "Branch" : "STABLE"
    },
    "Type" : "Util",
    "SignName" : "BengalaFramework.Util.Validation",
    "Dependencies" : [],
    "Framework" : {"Version" : 1.0}
});

function ObjectValidator(Data, Excluded, NotZero, NotNumbers, PhoneNumbers, Mails) {
    var ErrorCount = 0;
    Excluded = Excluded || [];
    NotZero = NotZero || [];
    NotNumbers = NotNumbers || [];
    PhoneNumbers = PhoneNumbers || [];
    Mails = Mails || [];

    AllowedTypes = ["string", "number"];
    for (var i in Data) {
        if (AllowedTypes.indexOf(typeof Data[i]) > -1) {
                if (!(Data[i] > 0) && NotZero.indexOf(i) > -1) {
                    ErrorCount++;
                    var Label =$("[for='"+i+"']").html();
                    if(ErrorCount > 1) { continue; }; 
                    Materialize.toast(Context.Lang["THE_INPUT"] + Label + Context.Lang["CANNOTBE0"], 1500 * parseInt(ErrorCount))
                    continue;
                }

                if (NotNumbers.indexOf(i) > -1 && hasNumber(Data[i])) {
                    ErrorCount++;
                    var Label =$("[for='"+i+"']").html();
                    if(ErrorCount > 1) { continue; }; 
                    Materialize.toast(Context.Lang["THE_INPUT"] + Label + Context.Lang["CANNOTHAVENUMBERS"], 1500 * parseInt(ErrorCount))
                    continue;
                }

                if (Mails.indexOf(i) > -1 && (!isMail(Data[i]))) {
                    ErrorCount++;
                    var Label =$("[for='"+i+"']").html();
                    if(ErrorCount > 1) { continue; }; 
                    Materialize.toast(Context.Lang["THE_INPUT"] + Label + Context.Lang["ISNOTVALID"], 1500 * parseInt(ErrorCount))
                    continue;
                }
             
                if (PhoneNumbers.indexOf(i) > -1 && (!isPhoneNumber(Data[i]))) {
                    ErrorCount++;
                    var Label =$("[for='"+i+"']").html();
                    if(ErrorCount > 1) { continue; }; 
                    Materialize.toast(Context.Lang["THE_INPUT"] + Label + Context.Lang["ISNOTVALID"], 1500 * parseInt(ErrorCount))
                    continue;
                }
             

             

            if (Data[i].toString().trim() == "" && Excluded.indexOf(i) < 0) {
                ErrorCount++
                var Label =$("[for='"+i+"']").html();
                if(ErrorCount > 1) { continue; }; 

                Materialize.toast(Context.Lang["THE_INPUT"] + Label + Context.Lang["CANNOTBEEMPTY"], 1500 * parseInt(ErrorCount))
            }
            
        }
    }

    if (ErrorCount > 0) {
        return false;
    } else {
        return true;
    }
}

function hasNumber(myString) {
  return /\d/.test(myString);
}

function isMail(string) {
    if(string.indexOf("@") < 0) { return false };
    if(string.split("@").length < 2) { return false };
    if(string.split("@")[1].indexOf(".") < 0) { return false}
    return true;   
}

function isPhoneNumber(string) {
    if(typeof string !== 'string') { return false }
    if(string.length == 14) {
        if(!(string.indexOf("(") > -1 && string.indexOf(")") > -1  && string.indexOf("-") > -1)) {
            return false;
        }
    } else if(string.length < 10) {
        return false;
    }
    return true;   
}