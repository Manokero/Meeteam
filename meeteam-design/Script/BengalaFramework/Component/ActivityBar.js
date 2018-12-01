BengalaFramework.Register({
    "Name" : "Activity Bar Component",
    "Author" : "Pablo Ferreira",
    "Description" : "The Most Adaptable TopBar for you app.",
    "Version" : {
        "Number" : 1.0,
        "Branch" : "STABLE"
    },
    "Type" : "Component",
    "SignName" : "BengalaFramework.Component.ActivityBar",
    "Dependencies" : ["BengalaFramework.Module.MobileWrapper@1.0", "BengalaFramework.Util.Animation@1.0"],
    "Framework" : {"Version" : 1.0, "Type" : "Mobile"}
});


Settings.ActivityBarSettings = {

		//Titulo de la Barra Superior
		"_ActivityBarTitle": "",
		//Color de la Barra Superior
		"_ActivityBarColor": "#1a75bb",
		//Color de Texto de la Barra Superior
		"_ActivityBarTextColor": "#FFFFFF",
		//Alineacion de Texto de la Barra Superior
		"_ActivityBarAlign": "left",

		"_Hidden": true,
		//Configuracion de Botones de la Barra Superior
		//Configuracion de Boton de la Izquerda
		// Debe tener boton de la Izquierda? "true" o "false"
		"_HasLeftButton": true,
		//En caso tal, que icono tendria en este caso "fa-bars"
		"_LeftButtonIcon": "fa-bars",
		//Y Que accion haria ese icono, aqui se debe definir una funcion
		"_LeftButtonAction": function() {
			if (Sidebar.Activated) {
				Sidebar.Toggle();
			}
		},

		//Configuracion de Boton de la Izquerda
		// Debe tener boton de la Izquierda? "true" o "false"
		"_HasRightButton": true,
		//En caso tal, que icono tendria en este caso "fa-bars"
		"_RightButtonIcon": "fa-calendar",
		//Y Que accion haria ese icono, aqui se debe definir una funcion
		_RightButtonAction: function() {
			openView("./View/MySchedule.html");
		},


		get ActivityBarTitle() {
			return this._ActivityBarTitle;
		},

		set ActivityBarTitle(v) {
			this._ActivityBarTitle = v;
			this.RenderConfig();
		},

		get ActivityBarColor() {
			return this._ActivityBarColor;
		},

		set ActivityBarColor(v) {
			this._ActivityBarColor = v;
			this.RenderConfig();
		},

		get ActivityBarTextColor() {
			var retCol = "#FFFFFF";
			var col = "0x" + this.ActivityBarColor.substring(1);
			if (col > (0xFFFFFF / 2)) {
				retCol = "#000000";
			} else {
				retCol = "#FFFFFF";
			}

			return (typeof this._ActivityBarTextColor !== "undefined" && this._ActivityBarTextColor != null) ? this._ActivityBarTextColor : retCol;
		},

		set ActivityBarTextColor(v) {
			this._ActivityBarTextColor = v;
			this.RenderConfig();
		},

		get ActivityBarAlign() {
			return this._ActivityBarAlign;
		},

		set Hidden(v) {
			this._Hidden = v;
			this.RenderConfig();
		},

		get Hidden() {
			return this._Hidden;
		},

		set ActivityBarAlign(v) {
			this._ActivityBarAlign = v;
			this.RenderConfig();
		},
		get HasLeftButton() {
			return this._HasLeftButton;
		},

		set HasLeftButton(v) {
			this._HasLeftButton = v;
			this.RenderConfig();
		},

		get LeftButtonIcon() {
			return this._LeftButtonIcon;
		},

		set LeftButtonIcon(v) {
			this._LeftButtonIcon = v;
			this.RenderConfig();
		},

		get LeftButtonAction() {
			return this._LeftButtonAction;
		},

		set LeftButtonAction(v) {
			this._LeftButtonAction = v;
			this.RenderConfig();
		},


		get HasRightButton() {
			return this._HasRightButton;
		},

		set HasRightButton(v) {
			this._HasRightButton = v;
			this.RenderConfig();
		},

		get RightButtonIcon() {
			return this._RightButtonIcon;
		},

		set RightButtonIcon(v) {
			this._RightButtonIcon = v;
			this.RenderConfig();
		},

		get RightButtonAction() {
			return this._RightButtonAction;
		},

		set RightButtonAction(v) {
			this._RightButtonAction = v;
			this.RenderConfig();
		},

		"UpdateRecentsDesc": true,
		"UpdateStatusBarColor": true,

		RenderConfig: function(fastForce) {
			if(!$("#topBar").length) {
				$(Settings.AppSettings.AppDOMContainer || "#Everything").prepend(`
				<div id="topBar" style="display: none;" hidden>
                    <div class="lf waves-effect waves-light">
                        <i class="fa"> </i>
                    </div>
                    <div class="ct">
                    </div>
                    <div class="rt waves-effect waves-light">
                        <i class="fa"></i>
                    </div>
                </div>`);
			}
			if (fastForce) {
				document.querySelector("#topBar").hidden = this.hidden;
			}
			if(Settings.AnimationSettings) {
				$("#topBar").addClass(Settings.AnimationSettings["DurationClass"]);
            	$("#topBar").addClass(Settings.AnimationSettings["Easing"]);
			}
			if (this.Hidden) {
					if ($("#topBar").is(":visible")) {
						if(Settings.AnimationSettings) {
						$("#topBar").removeClass(Settings.AnimationSettings["InversedIn"]);
						$("#topBar").removeClass(Settings.AnimationSettings["InversedOut"]);
						if (!fastForce) {
							$("#topBar").addClass(Settings.AnimationSettings["InversedOut"]);
						}
					}
					setTimeout(function() {
						$("#topBar").hide();
						document.querySelector("#topBar").hidden = true;
					}, fastForce ? 0 : (99 * ((Settings.AnimationSettings ? Settings.AnimationSettings.Duration : 0) * 1000) / 100));
					$(Settings.AppSettings.ViewDOMContainer || "#MainContainer").addClass("UI_NONE");
				}
			} else {
				if (!$("#topBar").is(":visible")) {
					if(Settings.AnimationSettings) {

						$("#topBar").removeClass(Settings.AnimationSettings["InversedIn"]);
						$("#topBar").removeClass(Settings.AnimationSettings["InversedOut"]);
					}
					$("#topBar").show();
					document.querySelector("#topBar").hidden = false;

					if (!fastForce && Settings.AnimationSettings) {
						$("#topBar").addClass(Settings.AnimationSettings["InversedIn"]);
					}
				
					$(Settings.AppSettings.ViewDOMContainer || "#MainContainer").removeClass("UI_NONE");
				}
			}


			$("#topBar").css("background-color", this.ActivityBarColor);

			if (typeof cordova !== 'undefined') {
				if (cordova.platformId == 'android') {
					if (typeof RecentsControl !== 'undefined') {
						RecentsControl.setColor(this.ActivityBarColor);
						if (this.UpdateRecentsDesc) {
							RecentsControl.setDescription(this.ActivityBarTitle.replace(/<[^>]*>/g, ''));
						}
					}
				}
			}

			$("#topBar").css("color", this.ActivityBarTextColor);
				// if(this.Hidden) {
				// 	$("#topBar").css("display", "none")
				// 	document.querySelector("#topBar").hidden = true;
				// }

			$(".ct").html(this.ActivityBarTitle);

			$(".ct").css("text-align", this.ActivityBarAlign);

			if (!this.HasLeftButton) {
				$(".lf").hide();
				$(".ct").css("left", 20);
			} else {
				$(".lf").show();
				$(".ct").css("left", 60);
			}
			if (!this.HasRightButton) {
				$(".rt").hide();
			} else {
				$(".rt").show();
			}

			$(".rt > i").removeAttr("class");
			$(".rt > i").addClass("fa");
			$(".rt > i").addClass(this.RightButtonIcon);

			$(".lf > i").removeAttr("class");
			$(".lf > i").addClass("fa");
			$(".lf > i").addClass(this.LeftButtonIcon);

			if (this.RightButtonAction) {
				$(".rt").off();
				$(".rt").on("click", this.RightButtonAction);
			}

			if (this.LeftButtonAction) {
				$(".lf").off();
				$(".lf").on("click", this.LeftButtonAction);
			}

			$(".ct").css("width", "calc(100% - " + (($(".lf").is(":visible") ? $(".lf").outerWidth() : 20) * 2) + "px )");
			Settings.AppSettings.StatusBarColor = Settings.AppSettings._StatusBarColor;
			// if(!this.Hidden){ 
			// 	$("#topBar").show()
			// }
			if (typeof TabBarInstances !== 'undefined') {
				for (var i in TabBarInstances) {
					TabBarInstances[i].Update();
				}
			}
		}
	}