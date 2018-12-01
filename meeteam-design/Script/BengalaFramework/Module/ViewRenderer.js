BengalaFramework.Register({
    "Name" : "View Renderer Module",
    "Author" : "Pablo Ferreira",
    "Description" : "View Rendering, Parsing and MetaData Helper.",
    "Version" : {
        "Number" : 1.0,
        "Branch" : "STABLE"
    },
    "Type" : "Module",
    "SignName" : "BengalaFramework.Module.ViewRenderer",
    "Dependencies" : [],
    "Framework" : {"Version" : 1.0}
});

var DefaultSettings = Settings.AppSettings.ViewDefaults;

function ReplaceObjectFromRHTML(Objit, RHTML, oparent) {
	oparent = oparent || "";
	for(var i in Objit) {
		if(typeof Objit[i] !== 'object') {
			var IndexName = oparent+i;
			var RGX = new RegExp("\{\{[ ]*("+ IndexName +")[ ]*\}\}", "g");
			RHTML = RHTML.replace(RGX, Objit[i]);
		} else {
			RHTML = ReplaceObjectFromRHTML(Objit[i], RHTML, i+".");
		}
	}
	return RHTML;
}
function ParseRHTML(RHTML, Objit) {
		Objit = Objit || {};
		RHTML = ReplaceObjectFromRHTML(Objit, RHTML);
		var Matches = RHTML.match(/\{\{(.*?)\}\}/);
		if(!Matches) {
			return RHTML;
		}
		if(Matches.length == 2) {
			try {
				RHTML= RHTML.split(Matches[0]).join(eval(Matches[1]));
			} catch(e) {
				RHTML= RHTML.split(Matches[0]).join("");
				console.log("ERROR : El Interprete no pudo reaccionar a esta expresion '" + Matches[1] + "'");
			} 
		} else {
			return RHTML;
		}
		
		var ReMatch = RHTML.match(/\{\{(.*?)\}\}/);

		if(ReMatch) {
			RHTML = ParseRHTML(RHTML, Objit);
		}
		return RHTML;
}


function ExtendObjx(Obj1, Obj2) {
	for(var i in Obj2) {
		if(typeof Obj1[i] === 'undefined') {
			Obj1[i] = Obj2[i];
			continue;
		}
		if(typeof Obj1[i] === 'object') {
			Obj1[i] = ExtendObjx(Obj1[i], Obj2[i]);
			continue;
		}
	}
	return Obj1;
}

function GetConfig(HTML) {
	RHTML = HTML.split("::META");
	var Data = {};
	if(RHTML.length == 2) {
		try {
			var ViewInfo = (new Function(`return ${RHTML[0]}`))();
			ViewInfo = ExtendObjx(ViewInfo, DefaultSettings);
			Data.View = ParseRHTML(RHTML[1], ViewInfo);
			Data.Info = ViewInfo;
		} catch(e) {
			console.log("ERROR : Error interpretando la metadata de la vista.", e);
			Data.Info = DefaultSettings;
			Data.View = ParseRHTML(RHTML[1]);
		}
	} else {
		Data.Info = DefaultSettings;
		Data.View = ParseRHTML(RHTML[0]);
	}
	return Data;
}

var renderElements = function(i,v) { 
		var View = $(v).attr("render");
		if(View && View.trim() != "") {
			$.get(Settings.AppSettings.ViewsDirectory + VerifyUrl(View.trim()), 
			{"_z" : Math.floor(Math.random() * 999999999999)}, 
			function(e) {
				var Data = GetConfig(e);
		        if(Data.Info.BeforeLoad) {
	                var kz = (new Function("", Data.Info.BeforeLoad))();
	                if(kz === false) {
	                    return false;
	                }
	            }
				$(v).html(Data.View);
				if(Data.Info.AfterLoad) {
	                var kz = (new Function("", Data.Info.AfterLoad))();
	                if(kz === false) {
	                    return false;
	                }
	            }
			});
		}
	};
function RenderBase() {
	$("[render]").each(renderElements);
}

jQuery.fn.extend({
  RenderBase: function() {
    return this.each(renderElements);
  }
});

$(document).ready(RenderBase);
function VerifyUrl(url) {
    if(url.charAt(0) == "/" && Settings.AppSettings.ViewsDirectory.charAt(Settings.AppSettings.ViewsDirectory.length-1) == "/") {
        url = url.substring(1)
    }
    if(url.substring(0,Settings.AppSettings.ViewsDirectory.length) == Settings.AppSettings.ViewsDirectory) {
        url = url.substring(Settings.AppSettings.ViewsDirectory.length);
    }
    url.split("//").join("/");
    return url;
}