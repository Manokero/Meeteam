BengalaFramework.Register({
    "Name" : "Mobile Wrapper Module",
    "Author" : "Pablo Ferreira",
    "Description" : "Native Functions Enabler, Mobile Events handler. (Made for Cordova <3)",
    "Version" : {
        "Number" : 1.0,
        "Branch" : "STABLE"
    },
    "Type" : "Module",
    "SignName" : "BengalaFramework.Module.MobileWrapper",
    "Dependencies" : [],
    "Framework" : {"Version" : 1.0, "Type" : "Mobile"}
});


var History = [];
var DefinedStyle = "UI_DEFAULT";
var app = {
// Application Constructor
initialize: function() {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
},
onDeviceReady: function() {
    this.receivedEvent('deviceready');
    document.addEventListener("resume", function() {
        if(typeof Settings !== 'undefined') {
            if(typeof Settings["AppSettings"] !== 'undefined') {
                if(typeof Settings["AppSettings"]["InBackground"] !== 'undefined') {
                   Settings["AppSettings"]["InBackground"] = false;
               }
           }
       }
   }, false);

    document.addEventListener("pause", function() {
        if(typeof Settings !== 'undefined') {
            if(typeof Settings["AppSettings"] !== 'undefined') {
                if(typeof Settings["AppSettings"]["InBackground"] !== 'undefined') {
                   Settings["AppSettings"]["InBackground"] = true;
               }
           }
       }
   }, false);

    $(document).ready(function(){
        if(window.MobileAccessibility){
            window.MobileAccessibility.usePreferredTextZoom(false);
        }
        InitInterface()
    })
},
// Update DOM on a Received Event
receivedEvent: function(id) {
//console.log(id);
}};

app.initialize();

var PlaformStyles = {
    "UI_IOS" : `
    .btn {box-shadow: none !important;border-radius: 5px !important;text-transform: none; font-weight: bold;}
    .dropdown-content {border-radius: 10px;box-shadow: none;border: 1px solid #EEE;}
    .dropdown-content > li:first-child {border-top: 0px;}
    .dropdown-content > li {border-top: 1px solid #EEE;}
    `,
    "UI_DEFAULT" : ``,
    "UI_WP" : ``
}
function SetPlatformUI(uiType) {
    uiType = uiType || DefinedStyle;
    var UITypes = ["UI_DEFAULT", "UI_IOS", "UI_WP"]
    for(var i in UITypes) {
        $("*").removeClass(UITypes[i]);
    }
    switch(uiType.toUpperCase()) {
        case "WP" :
            $("#topBar, #MainContainer, body, html").addClass(UITypes[2]);
            DefinedStyle = UITypes[2]
            Settings["ActivityBarSettings"]["ActivityBarAlign"] = "left";
            Sidebar.SidebarBodyScroll = true;
            Settings["AppSettings"].StatusBarColor = Settings["ActivityBarSettings"]["ActivityBarColor"];
            break;
            case "IOS" :
                case "UI_IOS" :
                    $("#topBar, #MainContainer, body, html").addClass(UITypes[1]);
                    DefinedStyle = UITypes[1]
                    Settings["ActivityBarSettings"]["ActivityBarAlign"] = "center";
                    Sidebar.SidebarBodyScroll = true;
                    Settings["AppSettings"].StatusBarColor = Settings["ActivityBarSettings"]["ActivityBarColor"];
                    break;
                    case "UI_DEFAULT" :
                        default :
                            $("#topBar, #MainContainer, body, html").addClass(UITypes[0]);
                            DefinedStyle = UITypes[0]
                            Settings["ActivityBarSettings"]["ActivityBarAlign"] = "left";
                            Sidebar.SidebarBodyScroll = false;
                            Settings["AppSettings"].StatusBarColor = shadeBlendConvert(0.2, Settings["ActivityBarSettings"]["ActivityBarColor"], "#000000");
                            break;
                        }
                        $("#PlatformCSS").html(PlaformStyles[DefinedStyle] || "")
                        $(".ct").css("text-align", Settings["ActivityBarSettings"]["ActivityBarAlign"])
                        RefreshItems()
                    }


                    function RefreshItems() {
                        if(typeof TabBarInstances !== 'undefined') {
                            for(var i in TabBarInstances) {
                                TabBarInstances[i].Update();
                            }
                        }
                        if(typeof SliderInstances !== 'undefined') {
                            for(var i in SliderInstances) {
                                SliderInstances[i].ViewSlideResize();
                            }
                        }
                    }

                    function InitInterface() {
                        if(!localStorage["USERDATA_ID"]) {
                            localStorage.setItem("USERDATA_ID", Math.floor(Math.random() * 9999999999999999999))
                        }
                        if(Settings["AppSettings"]["PlatformModifiers"] && (typeof device !== "undefined")) {
                            SetPlatformUI(device.platform);
                        }

                        if(typeof device === "undefined") {
                            SetPlatformUI("DEFAULT");
                        }

                        $(window).on("resize", RefreshItems);
                        Settings.RenderConfig();
                        if(typeof Settings["AppSettings"]["StartCallback"] == 'function') {
                            Settings["AppSettings"]["StartCallback"]();
                        }
                    }
