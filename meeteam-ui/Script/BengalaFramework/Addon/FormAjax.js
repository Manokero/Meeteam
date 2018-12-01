BengalaFramework.Register({
    "Name" : "Form Ajax Addon",
    "Author" : "Pablo Ferreira",
    "Description" : "Convert any form to an ajax form.",
    "Version" : {
        "Number" : 1.0,
        "Branch" : "STABLE"
    },
    "Type" : "Addon",
    "SignName" : "BengalaFramework.Addon.FormAjax",
    "Dependencies" : [],
    "Framework" : {"Version" : 1.0}
});

var FormAjax = {
	Set : function(Form, callback, callbackerror, checkfunction, formatFunction) {
		$(Form).off();
		$(Form).on("submit", function(e) {
            var tform = this;
            $(tform).find("[type='submit']").prop("disabled", true);
			e.preventDefault();
			e.stopPropagation();
			var Params = $(Form).find("input, select, textarea");
			var x_Data = FormParser(Params);

			if(formatFunction && (typeof formatFunction === "function")) {
				x_Data = formatFunction(x_Data);
			}

			if(!checkfunction || (typeof checkfunction === "function" && checkfunction(x_Data) !== false)) {
				var form = this;

				if(form.name) {
					x_Data["_c"] = form.name;
				}
				if(localStorage["Key"]) {
					x_Data["Key"] = localStorage["Key"];
				}
				console.log(x_Data);
				var JQXHR = $.ajax({
				  method: $(form).prop("method"),
				  url: $(form).prop("action"),
				  data: x_Data
				}).done(function(i,j,k) { 
                    $(tform).find("[type='submit']").prop("disabled", false);
                    callback(i,j,k)
                });

				if(callbackerror) {
					JQXHR.fail(function() {
                       $(tform).find("[type='submit']").prop("disabled", false);
                        callbackerror();
                    })
				}
				
			} else {
                $(tform).find("[type='submit']").prop("disabled", false);
            } 
			return false;
		})
	}
}
