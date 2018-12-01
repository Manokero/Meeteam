BengalaFramework.Register({
    "Name" : "View Manager Module",
    "Author" : "Pablo Ferreira",
    "Description" : "View Manager, single page app wrapper and handler.",
    "Version" : {
        "Number" : 1.0,
        "Branch" : "STABLE"
    },
    "Type" : "Module",
    "SignName" : "BengalaFramework.Module.ViewManager",
    "Dependencies" : ["BengalaFramework.Module.ViewRenderer@1.0", "BengalaFramework.Util.Animation@1.0"],
    "Framework" : {"Version" : 1.0}
});

var LastLoadedUrl = "";
window.onhashchange=function(HashChangeEvent) {
    var LocationHashRequest = VerifyUrl(window.location.hash.replace("#", ""));
    if(Settings.AppSettings.ViewChangeLock || window.location.hash.replace("#", "") == LastLoadedUrl) {
        if(typeof HashChangeEvent !== 'undefined') {
            if(typeof HashChangeEvent.preventDefault === 'function') { 
                HashChangeEvent.preventDefault();
            }
        }
        return false;
    }
    if(window.location.hash.trim() != "") {
        var LoadView = function(response) {

            if(typeof HashChangeEvent !== 'undefined') {
                if(HashChangeEvent.newURL.split("#").length < 2) {
                    return false;
                }
                var xvUrl = HashChangeEvent.newURL.split("#")[1]
            }
            var Data = GetConfig(response);

            if(Data["Info"]["BeforeLoad"]) {
                var kz = new Function("", Data["Info"]["BeforeLoad"])();
                if(kz === false) {
                    if(typeof HashChangeEvent !== 'undefined' && window.location.hash.replace("#", "") == LastLoadedUrl) {
                        window.location.hash = HashChangeEvent.oldURL.split("#")[1];
                    }
                    return false;
                }
            }

            if(Settings.AnimationSettings) {
                for(var i in Settings.AnimationSettings) {
                    if(typeof Settings.AnimationSettings[i] !== 'string') { continue; }
                    $(Settings.AppSettings.ViewDOMContainer || "#MainContainer").removeClass(Settings.AnimationSettings[i]);                
                }

                Settings.AnimationSettings.Apply(Settings.AppSettings.ViewDOMContainer || "#MainContainer");
                $(Settings.AppSettings.ViewDOMContainer || "#MainContainer").addClass(Settings.AnimationSettings["Out"]);
            }
            setTimeout(function() { $(Settings.AppSettings.ViewDOMContainer || "#MainContainer").html("") }, 99 * ((Settings.AnimationSettings ? Settings.AnimationSettings.Duration : 0) * 1000) / 100);
            setTimeout(function() {

                Settings.AppSettings.ViewInterfaceSettingsRender(Data);

                if(Data["Info"]["ViewLocked"]) {
                    Settings.AppSettings.ViewChangeLock = true;
                } else {
                    Settings.AppSettings.ViewChangeLock = false;
                }
                if(Data["Info"]["AppSettingsProperties"]) {
                    for(var i in Data["Info"]["AppSettingsProperties"]) {
                        if(typeof Settings.AppSettings[i] !== 'undefined') {
                            if(typeof Data["Info"]["AppSettingsProperties"][i] !== 'undefined') {
                                Settings.AppSettings[i] = Data["Info"]["AppSettingsProperties"][i];
                            } 
                        }
                    }
                }
                $(".SidebarOption").removeClass("active");
                $(".SidebarOption[href='"+location.hash+"']").addClass("active");

                if(Data["Info"]["ViewAnimation"]) {
                    if(Data["Info"]["ViewAnimation"] === true) {
                        if(Settings.AnimationSettings) {
                            $(Settings.AppSettings.ViewDOMContainer || "#MainContainer").removeClass(Settings.AnimationSettings["Out"]);
                            $(Settings.AppSettings.ViewDOMContainer || "#MainContainer").addClass(Settings.AnimationSettings["In"])
                        }
                    } else {
                        $(Settings.AppSettings.ViewDOMContainer || "#MainContainer").addClass(Data["Info"]["ViewAnimation"])
                    }
                } else {
                    $(Settings.AppSettings.ViewDOMContainer || "#MainContainer").removeClass(Settings.AnimationSettings["Out"]);
                    $(Settings.AppSettings.ViewDOMContainer || "#MainContainer").removeClass(Settings.AnimationSettings["In"]);
                }
                ShowView(Data["View"]);
                if(typeof Sidebar !== 'undefined' && Sidebar) {
                    Sidebar.Close();
                }
                if(typeof HashChangeEvent !== 'undefined') { 
                   LastLoadedUrl = xvUrl;
               }
               if(Data["Info"]["AfterLoad"]) {
                var kz = new Function("", Data["Info"]["AfterLoad"])();
                if(kz === false) {
                    return false;
                }
            }
        }, 100 * ((Settings.AnimationSettings ? Settings.AnimationSettings.Duration : 0) * 1000) / 100)
        };
        var HashUrl = "";
        if(LocationHashRequest.toUpperCase().search("HTTP") > -1) {
            HashUrl = decodeURIComponent(LocationHashRequest);
        } else { 
            HashUrl = Settings["AppSettings"]["ViewsDirectory"] + LocationHashRequest;
        }


        $.get(HashUrl , navigator.onLine ? {"_z" : Math.floor(Math.random() * 999999999999)} : {}, LoadView).fail(function() {
            $.get(Settings["AppSettings"]["ViewsDirectory"] + Settings["AppSettings"]["NotFoundView"], LoadView)
        })
    }
}




function ShowView(html) {
    if(Settings) {
        if(Settings["AppSettings"]) {
            if(typeof Settings["AppSettings"]["ViewChangeCallback"] === 'function') {
                Settings["AppSettings"]["ViewChangeCallback"]();
            }
        }
    }
    $(Settings.AppSettings.ViewDOMContainer || "#MainContainer").html(html);
    RenderBase();
}

function ViewParams() { 
    var r = {};
    var url = location.href;
    var params = url.split("?");
    if(params.length == 2) { 
        var paramdiv = params[1];
        var sPar = paramdiv.split("&");
        for(var i in sPar) { 
            var z = sPar[i].split("=");
            if(z.length == 2) { 
                r[z[0]] = decodeURIComponent(z[1]);
            } else { 
                r[z[0]] = null;
            }
        }
    }
    r["VIEW_URL"] = Settings["AppSettings"]["ViewsDirectory"] + window.location.hash.replace("#", "").split("?")[0];
    r["VIEW_ROUTE"] = r["VIEW_URL"].split("/");
    var LastDir = r["VIEW_URL"].split("/");
    LastDir.pop();
    r["VIEW_DIR"] = LastDir.filter(x => x.trim() !== '').join("/");
    return r;
}

function Restart() {
    window.location.hash = "";
    window.location.href = "";
}

$(document).ready(function() {
    if(typeof Settings.AnimationSettings !== 'undefined') {
        Settings.AnimationSettings.Apply(Settings.AppSettings.ViewDOMContainer || "#MainContainer");
    }
    if(window.location.hash.trim() == "") {
        window.location.hash = "#" + Settings["AppSettings"]["DefaultView"];
        window.location.hash = "#" + Settings["AppSettings"]["DefaultView"];
    } else {
        window.onhashchange();
    }
})

function openView(InterfaceURL) {
    window.location.hash = InterfaceURL;
}