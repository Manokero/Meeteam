BengalaFramework.Register({
    "Name" : "Sidebar Component",
    "Author" : "Pablo Ferreira",
    "Description" : "Sidebar Menu for Mobile.",
    "Version" : {
        "Number" : 1.0,
        "Branch" : "STABLE"
    },
    "Type" : "Component",
    "SignName" : "BengalaFramework.Component.Sidebar",
    "Dependencies" : ["BengalaFramework.Module.MobileWrapper@1.0"],
    "Framework" : {"Version" : 1.0, "Type" : "Mobile"}
});

var Sidebar = {
	SidebarElement : "#SidebarMenu",
	SidebarToggler : "#SidebarToggle",
	SidebarGapElement : ".SidebarGap",
	Activated : false,
	isEnabled : false,
	fastAnimateTouch : false,
	TranslationPercentCallback : null,
	SidebarBody : Settings.AppSettings.AppDOMContainer || "#Everything",
	_SidebarBodyScroll : false,
	_SidebarPersistent : false,

	set SidebarElementTransitionTime(v) {
		if(v > 0) {
			$(this.SidebarElement).css({
				"-webkit-transition" : v+"s",
				"transition" : v+"s"
			});
		} else {
			$(this.SidebarElement).css({
				"-webkit-transition" : "",
				"transition" : ""
			});
		}
	},

	get SidebarElementTransitionTime() {
		return parseFloat($(this.SidebarElement).css("transition").split(" ")[1].replace("s"));
	},

	get SidebarPersistent() {
		return this._SidebarPersistent;
	},
	set SidebarPersistent(v) {
		var Obj = this;
		Obj._SidebarPersistent = v;
		if(Obj._SidebarPersistent) {
			$(Obj.SidebarBody).css({
				"width" : "calc(100% - "+Obj.SidebarSize()+"px)", 
				"right" : "0px"
			})
			$(".SidebarGap" + (Obj.SidebarBodyScroll ? "" : ", .SidebarSlide")).off();
			Sidebar.Open();
		} else {
			$(Obj.SidebarBody).css({
				"width" : "", 
				"right" : ""
			})
			Obj.UpdateListeners();
		}
		Sidebar.Close();
	}, 

	get SidebarBodyScroll() {
		return this._SidebarBodyScroll;
	},
	set SidebarBodyScroll(v) {
		this.Close(true);
		if(this.Activated) {
			if(this._SidebarBodyScroll != v){
				$(".SidebarSlide").addClass("nonAnimation");
				$(".SidebarSlide").hide();
				$(".SidebarSlide").removeAttr("style");
				if(v) {
					$(".SidebarSlide").css("z-index", 0);
					if(!$(this.SidebarBody).length) {
						v = false;
					} else {
						Settings.AnimationSettings.Apply(this.SidebarBody, Time => Time/2);
						$(this.SidebarElement).addClass("BodyScroll");
						$(this.SidebarElement).css({
							"transform" : "translateX(0px)",
							"-webkit-transform" : "translateX(0px)"
						});
					} 
					
				} else {
					$(".SidebarSlide").css("z-index", 999999);
					$(this.SidebarElement).removeClass("BodyScroll");
					$(this.SidebarElement).css({
						"transform" : "translateX("+(0-this.SidebarSize())+"px)",
						"-webkit-transform" : "translateX("+(0-this.SidebarSize())+"px)"
					});
				}
				$(".SidebarSlide").show();
				$(".SidebarSlide").removeClass("nonAnimation");
			}
		}
		this._SidebarBodyScroll = v;
		this.UpdateListeners();
	},
	SidebarSize : function() {
		return ($(this.SidebarElement).outerWidth());
	},
	get Width() {
		return this.SidebarSize();
	},
	set Width(v) {
		if(typeof v !== 'number' || v < 0) {return;}
		$(this.SidebarElement).css("width", v.toString() +"px")
		this.SidebarPersistent = this.SidebarPersistent;
	},
	isOpen : function() { return $(this.SidebarElement).hasClass("Open"); }, 
	Open : function(force) {
		if(!this.isEnabled) { return false; }
		if(!$(this.SidebarElement).hasClass("Open") || force) {
			$(this.SidebarElement).addClass("Open");
			$(this.SidebarElement).removeClass("Close");
			this.setTranslation(0);
			$(this).trigger("SIDEBAR_OPEN");
			$(this).trigger("SIDEBAR_CHANGE");
			if(this.SidebarBodyScroll) {
				$(".SidebarGap").removeAttr("style");
				$(".SidebarGap").css({
					"width" : $(Sidebar.SidebarBody).outerWidth(),
					"left" : $(Sidebar.SidebarBody).position().left
				});
				$(".SidebarGap")[0].addEventListener("mousedown", function CloseBG() { 
					this.removeEventListener("mousedown",CloseBG);
					if(Sidebar.getTranslationPercent() >= 99) {
						Sidebar.Close();
					} else {
						Sidebar.roundToggle();
					}
				});
			}
		}
	},
	Close : function(force){
		if(!this.isEnabled || this.SidebarPersistent) { return false; }
		if(!$(this.SidebarElement).hasClass("Close") || force) {
			$(this.SidebarElement).addClass("Close");
			$(this.SidebarElement).removeClass("Open");
			this.setTranslation(0-this.SidebarSize());
			$(this).trigger("SIDEBAR_CLOSE");
			$(this).trigger("SIDEBAR_CHANGE");
			if(this.SidebarBodyScroll) {
				$(".SidebarGap").removeAttr("style");
			}
		}
	},
	Toggle : function() {
		if(!this.isEnabled) { return false; }
		if($(this.SidebarElement).hasClass("Open")) {
			this.Close();
		} else {
			this.Open();
		}
	},
	setTranslation : function(x) {
		if(!this.isEnabled) { return false; }
		if(x > 0 || x < (0 - this.SidebarSize())) { 
			return false;
		}

		if(!this.SidebarBodyScroll) {
			$(this.SidebarElement).css({
				"transform" : "translateX("+x+"px)",
				"-webkit-transform" : "translateX("+x+"px)"
			});
		} else {
			var bx = (this.SidebarSize() - (x*-1));
			$(this.SidebarBody).css({
				"transform" : "translateX("+bx+"px)",
				"-webkit-transform" : "translateX("+bx+"px)"
			});
		}

		$(this).trigger("SIDEBAR_MOVE");
	},
	setTranslationPercent : function(x) {
		if(!this.isEnabled) { return false; }
		x = Math.floor(x);
		if(x <= 100 && x >= 0) {
			var Percent = (0 - this.SidebarSize()) + (this.SidebarSize() * x /100);
			this.setTranslation(Percent);
		} else { 
			if(x > 100) { 
				this.Open(true);
			} else if(x < 0) { 
				this.Close(true);
			} 
		}
	},
	getTranslation : function() {
		var v = 0;
		if(this.SidebarBodyScroll) {
			v =  ($(this.SidebarBody).position().left - this.SidebarSize());
		} else {
			v = $(this.SidebarElement).position().left;
		}
		return v;
	},
	getTranslationPercent : function() {
		var TranslationPixels = this.getTranslation() * -1;
		return 100 - (TranslationPixels / (Sidebar.SidebarSize()) * 100);
	},
	roundToggle : function () {
		if(!this.isEnabled) { return false; }
		if (this.getTranslationPercent() > 60) {
			this.Open(true);
		} else {
			this.Close(true);
		}
	},
	Events : {
		Close : "SIDEBAR_CLOSE",
		Open : "SIDEBAR_OPEN",
		Move : "SIDEBAR_MOVE",
		Change : "SIDEBAR_CHANGE"
	},

	Initialize : function() {
		if(!this.Activated) {

			$(".SidebarSlide").hide();
			this.Activated = true;
			this.isEnabled = true;
			var Sidebar = this;
			$(this.SidebarElement).addClass("SidebarSlide");
			$(this.SidebarGapElement).addClass("SidebarGap");
			this.Close(true);
			this.Close(true);
			$(this.SidebarElement).show();
			$("body").on(
			"click", 
			this.SidebarToggler, 
			function() { 
					Sidebar.Toggle(); 
			});

			if(Sidebar.SidebarBodyScroll) { 
				$(".SidebarSlide").css("z-index", 0);
			} else {
				$(".SidebarSlide").css("z-index", 999999);
			}

			if(!$(this.SidebarBody).length) {
				this.SidebarBodyScroll = false;
			} else {
				if(this.SidebarBodyScroll) {
					$(this.SidebarElement).addClass("BodyScroll");
				}
			}

			$(window).on("resize", function() { $(".SidebarSection.BODY").css("height",  ($(".SidebarSlide").outerHeight() - ($(".SidebarSection.HEADER").outerHeight() +  $(".SidebarSection.FOOTER").outerHeight())) + "px");  }); 
			$(window).trigger("resize"); 
	
			this.UpdateListeners();
			$(".SidebarSlide").show();
		}
	},
	Listeners : {
		MoveEnd : function(evt) {
				if(Sidebar.SidebarPersistent) { return; }
				//$(Sidebar.SidebarElement +"," + Sidebar.SidebarBody).removeClass("touchInteraction");
				if(Sidebar.fastAnimateTouch) {
					$(".SidebarSlide").removeClass('fastAnimation');
				}
				Sidebar.roundToggle();
				if(evt) {
					var ActualPosition = Sidebar.getTranslation();
					var OldPosition = parseInt(evt.currentTarget.getAttribute("xTransPoint"));
					if(ActualPosition != OldPosition) {
						var EndTime = new Date();
						var StartTime = parseInt(evt.currentTarget.getAttribute("xStartTime"));
						var TotalTime = (EndTime - StartTime);
						var Distance = Math.abs(ActualPosition - OldPosition);
						//Settings.ActivityBarSettings.ActivityBarTitle = Distance;
						if(TotalTime <= 1000 && Distance > 5) {
							if((TotalTime * 0.001) < 0.5) {
								Sidebar.SidebarElementTransitionTime = (TotalTime * 0.001);
							}
							if(ActualPosition > OldPosition) {
								Sidebar.Open();
							} else {
								Sidebar.Close();
							}
							setTimeout(x => x.SidebarElementTransitionTime = 0, Sidebar.SidebarElementTransitionTime * 1000, Sidebar)

						}
					}
					evt.currentTarget.removeAttribute("xStartPoint");
					evt.currentTarget.removeAttribute("xTransPoint");
					evt.currentTarget.removeAttribute("xStartTime");
				}
		},
		MoveStart : function(evt) { 
				if(Sidebar.SidebarPersistent) { return; }

				//$(Sidebar.SidebarElement +"," + Sidebar.SidebarBody).addClass("touchInteraction");
				var PointAttr = 0;
				if(evt) {
					if(!evt.changedTouches) {
						PointAttr = evt.pageX;
					} else {
						PointAttr = evt.changedTouches[0].pageX;	
					}
				}
				if(evt.type == "touchstart" || evt.type == "mouseenter") {
					if(Sidebar.fastAnimateTouch) {
						$(".SidebarSlide").addClass('fastAnimation');
					}
					evt.currentTarget.setAttribute("xStartPoint", PointAttr);
					evt.currentTarget.setAttribute("xTransPoint", Sidebar.getTranslation());
					evt.currentTarget.setAttribute("xStartTime", (new Date().toString()));
				}
				if(!evt.currentTarget.hasAttribute("xStartPoint")) {
					Sidebar.setTranslationPercent(PointAttr / (Sidebar.SidebarSize()) * 100);
				} else {
					var StartPoint = (parseInt(evt.currentTarget.getAttribute("xStartPoint")));
					var TranslationPoint = (parseInt(evt.currentTarget.getAttribute("xTransPoint")));
					var Distance = PointAttr - StartPoint;
					Sidebar.setTranslation(TranslationPoint+Distance);					
				}
		}
	},
	UpdateListeners : function() {
			$(".SidebarGap, .SidebarSlide").off();
			$(".SidebarGap" + (this.SidebarBodyScroll ? "" : ", .SidebarSlide")).on("touchstart", this.Listeners.MoveStart);
			$(".SidebarGap" + (this.SidebarBodyScroll ? "" : ", .SidebarSlide")).on("touchmove", this.Listeners.MoveStart);
			$(".SidebarGap" + (this.SidebarBodyScroll ? "" : ", .SidebarSlide")).on("touchenter", this.Listeners.MoveStart);		
			$(".SidebarGap" + (this.SidebarBodyScroll ? "" : ", .SidebarSlide")).on("touchend", this.Listeners.MoveEnd);
			$(".SidebarGap" + (this.SidebarBodyScroll ? "" : ", .SidebarSlide")).on("touchcancel", this.Listeners.MoveEnd);
			$(".SidebarGap" + (this.SidebarBodyScroll ? "" : ", .SidebarSlide")).on("touchleave", this.Listeners.MoveEnd);

			// $(".SidebarGap" + (this.SidebarBodyScroll ? "" : ", .SidebarSlide")).on("mouseenter", this.Listeners.MoveStart)
			// $(".SidebarGap" + (this.SidebarBodyScroll ? "" : ", .SidebarSlide")).on("mouseover", this.Listeners.MoveStart)
			// $(".SidebarGap" + (this.SidebarBodyScroll ? "" : ", .SidebarSlide")).on("mousedown", this.Listeners.MoveStart)
			// $(".SidebarGap" + (this.SidebarBodyScroll ? "" : ", .SidebarSlide")).on("mouseleave", this.Listeners.MoveEnd)
			// $(".SidebarGap" + (this.SidebarBodyScroll ? "" : ", .SidebarSlide")).on("mouseout", this.Listeners.MoveEnd)
			// $(".SidebarGap" + (this.SidebarBodyScroll ? "" : ", .SidebarSlide")).on("mouseup", this.Listeners.MoveEnd)

	},
	Set : function(SidebarSelector, SidebarTogglerSelector, SidebarGapSelector) {
		if(SidebarSelector) {
			this.SidebarElement = SidebarSelector;
		}
		
		if(SidebarTogglerSelector) {
			this.SidebarToggler = SidebarTogglerSelector;
		}

		if(SidebarGapSelector) {
			this.SidebarGapElement = SidebarTogglerSelector;
		}
		this.Initialize();
	} 
};


Settings.SidebarSettings = {
		"SidebarSelector": "#SidebarMenu",
		"SidebarMakeGap": true,
		RenderConfig: function() {
			for (var i in this) {
				if (typeof Sidebar[i] !== 'undefined') {
					if (typeof Sidebar[i] === typeof this[i]) {
						Sidebar[i] = this[i];
					}
				}
			}
			if(!$(".WrapperBackground").length) {
				$("body").prepend('<div class="WrapperBackground"> </div>')
			}
			if(!$("#SidebarMenu").length) {
				$(`<div id="SidebarMenu" class="${("white" || this.SidebarBackgroundColor )}" style="display: none;"></div>`).insertAfter(".WrapperBackground");
				RenderBase();
			} 

			if(this.SidebarRender) {
				$("#SidebarMenu").attr("render", (this.SidebarRender || "Sidebar.html")).RenderBase();
			}

			if (this.SidebarMakeGap) {
				var Gap = document.createElement("div");
				Gap.classList.add("SidebarGap");
				document.querySelector("body").appendChild(Gap);
				this.SidebarGapSelector = ".SidebarGap";
			}

			Sidebar.Set(this.SidebarSelector || null, this.SidebarToggleSelector || null, this.SidebarGapSelector || null);

			$(Sidebar).on(Sidebar.Events.Move, function() {
				if(this.SidebarPersistent) { return };
				if (!this.SidebarBodyScroll) {
					$(Settings.AppSettings.AppDOMContainer || "#Everything").css("opacity", 1 - ((this.getTranslationPercent() / 2) * 0.01));
				} else {
					$(".SidebarSlide").css("opacity", 0.5 + ((this.getTranslationPercent() / 2) * 0.01));
				}
			});

			$(Sidebar).on(Sidebar.Events.Change, function() {
				if(this.SidebarPersistent) { return };
				if (!this.SidebarBodyScroll) {
					$(Settings.AppSettings.AppDOMContainer || "#Everything").css("opacity", !this.isOpen() ? 1 : 0.5);
				} else {
					$(".SidebarSlide").css("opacity", !this.isOpen() ? 0.5 : 1);
				}
			});

			$(Settings.AppSettings.ViewDOMContainer || "#MainContainer").on("mousedown", function() {
				if (Sidebar.isOpen()) {
					Sidebar.Close();
				}
			});
		}
}