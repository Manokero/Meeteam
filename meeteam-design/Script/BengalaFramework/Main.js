var BengalaFramework = {
	"Plugins" : [],
	"Version" : {
		"Number" : 1.0,
		"Branch" : "STABLE",
		"Type" : "MOBILE"
	},
	GetPlugin(z) {
		if(!z) { return undefined; }
		var x = this.Plugins.filter(x => x.SignName == z);
		if(!x.length) {
			return undefined;
		}
		return x[0];
	},
	Register : function(BengalaPlugin) {
		var Obj = this;
		if(!BengalaPlugin.SignName || !BengalaPlugin.Type) {
			throw("Bengala Error : Plugin not valid.");
			return;
		}
		BengalaPlugin.Ready = false;
		var ImportErrors = 0;
		for(var i in BengalaPlugin.Dependencies) {
			var Exist = BengalaFramework.Plugins.filter(x => x.SignName == BengalaPlugin.Dependencies[i].split("@")[0]);
			if(!Exist.length) {
				ImportErrors++;
				console.log(`Bengala Error : The plugin "${BengalaPlugin.Name} (${BengalaPlugin.SignName})" has "${BengalaPlugin.Dependencies[i]}" as one of it's Dependencies, but it cannot be found.`)
			} else {
				var Package = BengalaPlugin.Dependencies[i].split("@");
				if(Package.length > 1) {
					if(Exist[0].Version.Number < parseFloat(Package[1])) {
						console.log(`Bengala Warning : The plugin "${BengalaPlugin.Name} (${BengalaPlugin.SignName})" has "${BengalaPlugin.Dependencies[i]}" as one of it's Dependencies, but it has an older version (${Exist[0].Version.Number} < ${parseFloat(Package[1])}) the plugin may not work properly.`)
					}
				}
			}
		}
		if(BengalaPlugin.Framework) {
			if(BengalaPlugin.Framework.Type) {
				if(BengalaPlugin.Framework.Type.toString().toUpperCase() != Obj.Version.Type.toString().toUpperCase()) {
					console.log(`Bengala Warning : The plugin "${BengalaPlugin.Name} (${BengalaPlugin.SignName})" may not work properly on the ${Obj.Version.Type} version of BengalaFramework, this plugin has been made for Bengala Framework ${BengalaPlugin.Framework.Type}`);
				}
			}
			if(BengalaPlugin.Framework.Number < Obj.Version.Number) {
				console.log(`Bengala Warning : The plugin "${BengalaPlugin.Name} (${BengalaPlugin.SignName})" may not work properly on this version of BengalaFramework (${Obj.Version.Number}), this plugin has been made for Bengala Framework (${BengalaPlugin.Framework.Number})`);
			}
		}
		if(ImportErrors == 0) {
			BengalaPlugin.Ready = true;
		}
		Obj.Plugins.push(BengalaPlugin);
	},
	LogPlugins : function() {
		console.log(BengalaFramework.Plugins.map(x => `<${x.Type}>      | ${x.Name} - ${x.Description} (${x.Version.Number.toString()}.0 / ${x.Version.Branch})`).join("\n"));
	}
}

var Settings = {
	"AppSettings": {
		//La funcion que se llamara cuando la aplicacion haya iniciado por completo.
		"_Language": localStorage.Language || "es",
		"StartCallback": null,
		"_AppName": "",
		set AppName(v) {
			this._AppName = v;
			this.RenderConfig();
		},
		set Language(v) {
			if (typeof Context !== 'undefined') {
				if (typeof Context.Language !== 'undefined') {
					if (Context.Language[v.toLowerCase()]) {
						if (this._Language != v.toLowerCase()) {
							this._Language = v.toLowerCase();
							localStorage.setItem("Language", v.toLowerCase());
							this.RenderConfig();
							LastLoadedUrl = "";
							location.hash = location.hash;
							RenderBase();
						}
					}
				}
			}
		},
		get Language() {
			return this._Language;
		},
		get AppName() {
			return this._AppName;
		},
		"AppDOMContainer" : "#Everything",

		"ViewDOMContainer" : "#MainContainer",
		// Contenedoor de vistas
		"ViewsDirectory": "./View/",
		//Vistas por defecto
		//-- Vista Predeterminada con la que Iniciara la Aplicacion
		"DefaultView": "Walls",
		//-- Vista Predeterminada para cuando no se Encuentre la vista Solicitada
		"NotFoundView": "ErrorPage.html",
		"ViewChangeLock": false,

		//Color de la Barra de Estado, normalmente es algo mas oscuro que el de la Barra Superior.
		"_StatusBarColor": "#888888",

		"_DefaultTextColor": "#1a75bb",
		"_DefaultColor": "#1a75bb",
		"_DefaultDarkColor": "#000000",
		"_BodyBackgroundColor": "#000000",
		"_BackdropVisible": true,

		"PlatformModifiers": true,

		set BodyBackgroundColor(v) {
			this._BodyBackgroundColor = v;
			this.RenderConfig();
		},

		get BodyBackgroundColor() {
			return this._BodyBackgroundColor;
		},

		set DefaultTextColor(v) {
			this._DefaultTextColor = v;
			this.RenderConfig();
		},


		get BackdropVisible() {
			return this._BackdropVisible;
		},
		set BackdropVisible(v) {
			this._BackdropVisible = v;
			this.RenderConfig();
		},


		get DefaultTextColor() {
			return this._DefaultTextColor;
		},
		set DefaultDarkColor(v) {
			this._DefaultDarkColor = v;
			this.RenderConfig();
		},

		get DefaultDarkColor() {
			return this._DefaultDarkColor;
		},
		set DefaultColor(v) {
			this._DefaultColor = v;
			this.RenderConfig();
		},

		get DefaultColor() {
			return this._DefaultColor;
		},
		"____RulesBackup____": {},
		RenderConfig: function() {
			$("title").html(this.AppName.replace(/<[^>]*>/g, ''));
			try {
				this.StatusBarColor = this._StatusBarColor;
				var BengalaStyleSheet = $("#BengalaFrameworkStyle")[0].sheet;
				for (var x in this.____RulesBackup____) {
					if (!BengalaStyleSheet) {
						continue;
					}
					if (!BengalaStyleSheet.cssRules[x]) {
						continue;
					}
					BengalaStyleSheet.cssRules[x].style.cssText = this.____RulesBackup____[x];
				}
				for (var i in BengalaStyleSheet.cssRules) {
					if (BengalaStyleSheet.cssRules[i].style) {
						var sStyle = BengalaStyleSheet.cssRules[i].style.cssText;
						this.____RulesBackup____[i] = sStyle;
						sStyle = sStyle.split("rgba(1, 1, 1, 0)").join(Settings.AppSettings.DefaultTextColor);
						sStyle = sStyle.split("rgba(2, 2, 2, 0)").join(Settings.AppSettings.DefaultColor);
						sStyle = sStyle.split("rgba(3, 3, 3, 0)").join(Settings.AppSettings.DefaultDarkColor);
						sStyle = sStyle.split("rgba(4, 4, 4, 0)").join(Settings.ActivityBarSettings.ActivityBarColor);
						BengalaStyleSheet.cssRules[i].style.cssText = sStyle;
					}
				}
			} catch(e) {
				console.log("Error alterando estilos.");
			}
			if ($("div.WrapperBackground").length) {
				document.querySelector("div.WrapperBackground").hidden = !this._BackdropVisible;
				if (!document.querySelector("div.WrapperBackground").hidden) {
					$("._gmaps_cdv_").removeClass("_gmaps_cdv_");
				}
			}
			$(this.AppDOMContainer || "#Everything").css("background-color", this._BodyBackgroundColor);
		},
		set StatusBarColor(hex) {
			$(".FakeStatusBar").css("background-color", hex);
			if (typeof StatusBar !== "undefined") {
				if(typeof StatusBar.isVisible !== 'undefined') {
					StatusBar.backgroundColorByHexString(hex);
				}
			}
			$(`[name="theme-color"]`).attr("content", hex)
			this._StatusBarColor = hex;
		},
		get StatusBarColor() {
			return this._StatusBarColor;
		},

		ViewInterfaceSettingsRender : function(Data){
		    if(!Data["Info"]["ViewActivityBarShadow"]) {
                $("#topBar").addClass("noShadow");
            } else {
                $("#topBar").removeClass("noShadow");
            }
            if(Data["Info"]["ViewFullScreen"]) {
                Settings.ActivityBarSettings.Hidden = true;
            } else {
                Settings.ActivityBarSettings.Hidden = false;
            }
		},

		ViewDefaults: {
			"ViewActivityBarShadow": true,
			"ViewAnimation": true,
			"ViewFullScreen": false,
			"BeforeLoad": "",
			"AfterLoad": "",
			"AppSettingsProperties": {
				"BodyBackgroundColor": "#FCFCFC",
				"BackdropVisible": true
			}
		}
	},
	fromPlainObject(Config) {
		var bg = this;
		if(typeof Config === 'string') {
			Config = JSON.parse(Config);
		} 
		if(typeof Config !== 'object') { return false; }

		function SetterExtend(obj, w) {
			for(var i in obj) {
				if(i.charAt(0) === "_") { continue; }
				if(w[i]) {
					if(obj[i]) {
						if(typeof w[i] === typeof obj[i] || typeof w[i] === 'undefined' || w[i] == null){
							if(typeof w[i] === 'object') {
								SetterExtend(obj[i], w[i])
							} else {
								w[i] = obj[i];
							}
						}
					}
				}
			}
		}
		SetterExtend(Config, bg);		
	},
	toPlainObject() {
		function GetPlainObject(v, recursionlevel) {
			recursionlevel = recursionlevel || 0;
			var AllowedTypes = ["boolean", "number", "string"];

			var c = {};
			var isArray = false;
			if(typeof v.length !== 'undefined'){
				c = [];
				isArray = true;
			} 
			for(var i in v) {
				if(i.toString().charAt(0) == '_') { continue; }
				if(AllowedTypes.indexOf(typeof v[i]) > -1) {
					if(!isArray) {
						c[i] = v[i];
					} else {
						c[i].push(v[i]);
					}
				} else if(typeof v[i] === 'object') {
					c[i] = GetPlainObject(v[i], recursionlevel+1);
				}
			}
			return c;
		}
		return GetPlainObject(this);
	},
	RenderConfig : function() {
		for(var i in this) {
			if(typeof this[i].RenderConfig === 'function') {
				this[i].RenderConfig();
			}
		}
	}
};
