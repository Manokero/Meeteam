BengalaFramework.Register({
    "Name" : "TabBar Component",
    "Author" : "Pablo Ferreira",
    "Description" : "Tabs, perfect for ViewSlider Haptic Response.",
    "Version" : {
        "Number" : 1.0,
        "Branch" : "STABLE"
    },
    "Type" : "Component",
    "SignName" : "BengalaFramework.Component.TabBar",
    "Dependencies" : ["BengalaFramework.Module.MobileWrapper@1.0", "BengalaFramework.Util.Animation@1.0"],
    "Framework" : {"Version" : 1.0, "Type" : "Mobile"}
});

/*jshint esversion: 6 */
var TabBarInstances = [];
class TabBar {
	constructor(Options, Config) {
		var x = document.createElement("div");
		this.Config = Config || {
			FullWidth : true
		};
		x.classList.add("TabBar");
		this.Indicator = $("<div class='Indicator'></div>")
		if(Settings.AnimationSettings) { 
			Settings.AnimationSettings.Apply(this.Indicator, Time => Time/2)
	    }
		$(x).append(this.Indicator);
		x.TabBarInstance = this;
		this.BarElement = x;
		this.addTab(Options);
		this.Update();
		TabBarInstances.push(this);
	}
	get FullWidth() {
		return this.Config.FullWidth;
	}
	set FullWidth(v) {
		this.Config.FullWidth = v;
		this.RenderConfig();
	}
	setSettingColor() {
		$(this.BarElement).css({
			"background-color" : Settings.ActivityBarSettings.ActivityBarColor
		});
		$(this.BarElement).find(".Indicator").css({
			"border-color" : Settings.ActivityBarSettings.ActivityBarTextColor
		});
		$(this.BarElement).find(".TabBarOption").css({
			"color" : Settings.ActivityBarSettings.ActivityBarTextColor
		});
	}
	addTab(Options) {
		var x = this;
		if(!Options) { return; }
		if(!Options.length && (Options.Title || Options.title)) {
			Options = [Options];
		}
		for(var i in Options) {
			var Option = document.createElement("div");
			Option.innerHTML = Options[i].title || Options[i].Title;
			Option.classList.add("TabBarOption");
			if(Settings.AnimationSettings) { 
				Settings.AnimationSettings.Apply(Option, Time => Time/2)
			}
			Option.setAttribute("TabBarOption_ID", $(this.BarElement).find(".TabBarOption").length);
			if(Options[i].Action) {
				$(Option).on("click", Options[i].Action);
			} else {
				$(Option).on("click", x.DefaultAction);
			}

			if(Options[i].Width) {
				if(typeof Options[i].Width === 'number') {
					if(Options[i].Width > 0 && Options[i].Width < 100) {
						$(Option).css({"width" : Options[i].Width +"%", "text-align" : "center" })
					}
				}
			}
			Option.OptionInstance = Options[i];
			Option.OptionInstance.TabBar = x;
			this.BarElement.appendChild(Option);
		}
		this.Update();
	}
	Update() {
		this.setSettingColor();
		this.RenderConfig();
		var Tab = $(this.BarElement).find("div.TabBarOption.Active");
		if(Tab.length) {
			$(this.BarElement).find(".TabBarOption").removeClass("Active");
			Tab.addClass("Active");
			var pxx = Tab.position().left;
			$(this.BarElement).find(".Indicator").css({
				"width" : Tab.outerWidth() + "px",
				"transform" : "translateX("+pxx+"px)",
				"-webkit-transform" : "translateX("+pxx+"px)"
			});
		}
	}
	DefaultAction(e) { 
		e.currentTarget.OptionInstance.TabBar.setTabActive(e.currentTarget.getAttribute("TabBarOption_ID"));
	}
	RenderConfig() {
		var TBX = this;
		if(TBX.Config.FullWidth) {
			var Tabs = $(TBX.BarElement).find(".TabBarOption");
			Tabs.css({"width" : (100 / Tabs.length) +"%", "text-align" : "center" });
		}
	}
	Delete() {
		$(this).off();
		this.BarElement.remove()
		for(var i in this) { delete this[i]; }
		TabBarInstances.splice(TabBarInstances.indexOf(this), 1);
		return true;
	}
	setTabActive(id) {
		var Tab = $(this.BarElement).find("[tabbaroption_id='"+id+"']");
		if(Tab.length) {
			$(this.BarElement).find(".TabBarOption").removeClass("Active");
			Tab.addClass("Active");
			var pxx = Tab.position().left;
			$(this.BarElement).find(".Indicator").css({
				"width" : Tab.outerWidth() + "px",
				"transform" : "translateX("+pxx+"px)",
				"-webkit-transform" : "translateX("+pxx+"px)"
			});
		}
	}
}

