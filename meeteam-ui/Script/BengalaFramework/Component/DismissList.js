BengalaFramework.Register({
    "Name" : "DismissList Component",
    "Author" : "Pablo Ferreira",
    "Description" : "Dismissable Items List for Mobile.",
    "Version" : {
        "Number" : 1.0,
        "Branch" : "STABLE"
    },
    "Type" : "Component",
    "SignName" : "BengalaFramework.Component.DismissList",
    "Dependencies" : ["BengalaFramework.Module.MobileWrapper@1.0"],
    "Framework" : {"Version" : 1.0, "Type" : "Mobile"}
});

/*jshint esversion: 6 */
class DismissList {
	constructor(Selector, Config) {
		var x = this;
		x.Config = Config || {
			"Left" : {
				"color" : "#1abb5a",
				"text" : "Guardar"
			}, 
			"Right" : {
				"color" : "#bb1a1a",
				"text" : "Borrar"
			}
		};
		x.Element = document.querySelector(Selector);
		$(x.Element).addClass("DismissListContainer");
		var ListItems = x.Element.children;
		x.Items = ListItems;
		x.UpdateList();
		x.ItemMethods = {
			roundToggle : function() {
				var Dismissed = false;
				if(this.getTranslationPercent() > 150) {
					this.setTranslation(this.ListInstance.Width);
					$(this).trigger("DISMISSED_LEFT");
					Dismissed = true;
				} else if(this.getTranslationPercent() < 50) {
					this.setTranslation(0 - this.ListInstance.Width);
					$(this).trigger("DISMISSED_RIGHT");
					Dismissed = true;
				} else {
					this.setTranslation(0);
				}
				if(Dismissed) {
					this.ListDismiss();
				}
			},
			ListDismiss : function() {
				$(this).css("height", $(this).outerHeight()+"px");
				$(this).trigger("DISMISSED");
				setTimeout(function(Item) {
					$(Item).css("height", "0px");
					setTimeout(function(Item) {
						Item.RemoveBackgroundItem();
						$(Item).remove();
					}, 800, Item);
				}, 200, this);
			},
			setTranslation : function(x) {
				if(!this.isEnabled || (!this.ListInstance.Config.Right && x < 0) || (!this.ListInstance.Config.Left && x > 0)) { 
					return false; 
				}
				if(x == 0) {
					this.RemoveBackgroundItem();
				} else {
					this.AddBackgroundItem();
				}
				if((this.ListInstance.Config.Left || this.ListInstance.Config.Right)) { 
					var Colors = this.ListInstance.Config;
					var Col = {
						"color" : "transparent",
						"text" : ""
					};
					if(x > 0) { 
						if(Colors.Left) {
							Col = Colors.Left;
						}
					} else {
						if(Colors.Right) {
							Col = Colors.Right;
						}
					}
					$(".ItemBackCover_dismissList").html(Col.text);
					$(".ItemBackCover_dismissList").css({ 
						"background-color" : Col.color,
						"color" : Col["text-color"] || "#FFF",
						"text-align" : x > 0 ? "left" : "right" 
					});
				}
				$(this).css({
					"transform" : "translateX("+x+"px)",
					"-webkit-transform" : "translateX("+x+"px)"
				});
				$(this).trigger("ITEM_MOVE");
			},
			setTranslationPercent : function(x) {
				if(!this.isEnabled) { 
					return false; 
				}
				x = Math.floor(x);
				var Percent = (0 - this.ListInstance.Width) + (this.ListInstance.Width * x /100);
				this.setTranslation(Percent);
			},
			getTranslation : function() {
				var v = 0;
				v = $(this).position().left;
				return v;
			},
			getTranslationPercent : function() {
				var TranslationPixels = this.getTranslation() * -1;
				return 100 - (TranslationPixels / (this.ListInstance.Width) * 100);
			},
			AddBackgroundItem : function() {
				if(!(this.ListInstance.Config.Left || this.ListInstance.Config.Right)) { 
					return false; 
				} 
				var x = $(this.ListInstance.Element).find(".ItemBackCover_dismissList");
				var Bhind;
				if(x.length) {
					if(x.is(":visible")) {
						return;
					}
					Bhind = x[0];
				} else {
					Bhind = document.createElement("div");
				}
				$(Bhind).css({
					"height" : $(this).outerHeight() + "px",
					"line-height" : $(this).outerHeight() + "px",
					"top" : $(this).position().top
				});
				if(!x.length) {
					Bhind.classList.add("ItemBackCover_dismissList");
					$(this.ListInstance.Element).append(Bhind);
				}
				$(this.ListInstance.Element).find(".ItemBackCover_dismissList").show();
			},
			RemoveBackgroundItem : function() {
				if(!(this.ListInstance.Config.Left || this.ListInstance.Config.Right)) { 
					return false; 
				}
				$(this.ListInstance.Element).find(".ItemBackCover_dismissList").fadeOut();
			}
		};

		x.SizeUpdate();
	}
	SizeUpdate() {
		$(this.Element).css({
			"width" : $(this.Element).outerWidth() + "px",
			"overflow-x" : "hidden"
		});
	}
	get Width() {
		return $(this.Element).outerWidth();
	}
	MoveStart(evt) { 
		if(evt.type == "touchstart") {

			$(this)[0].setAttribute("xStartPoint", evt.changedTouches[0].pageX);
			$(this)[0].setAttribute("xTransPoint", $(this)[0].getTranslation());
			$(this)[0].setAttribute("xStartTime", (new Date().toString()));
		}
		if(!$(this)[0].hasAttribute("xStartPoint")) {
			$(this)[0].setTranslationPercent(evt.changedTouches[0].pageX / (this.ListInstance.Width) * 100);
		} else {
			var StartPoint = (parseInt($(this)[0].getAttribute("xStartPoint")));
			var TranslationPoint = (parseInt($(this)[0].getAttribute("xTransPoint")));
			var Distance = evt.changedTouches[0].pageX - StartPoint;
			$(this)[0].setTranslation(TranslationPoint+Distance);					
		}
	}
	MoveEnd(evt) {
		$(this)[0].roundToggle();

		if(evt) {
			var ThisSlider = $(this)[0];
			var ActualPosition = $(this)[0].getTranslation();
			var OldPosition = parseInt($(this)[0].getAttribute("xTransPoint"));
			if(ActualPosition != OldPosition) {
				var EndTime = new Date();
				var StartTime = new Date($(this)[0].getAttribute("xStartTime"));
				var TotalTime = (EndTime - StartTime);
				if((TotalTime) <= 1000) {
					if(ActualPosition > OldPosition) {
						this.setTranslation(this.ListInstance.Width);
						$(this).trigger("DISMISSED_LEFT");
					} else {
						this.setTranslation(0 - this.ListInstance.Width);
						$(this).trigger("DISMISSED_RIGHT");
					}
					this.ListDismiss();
				}
			}

			$(this)[0].removeAttribute("xStartPoint");
			$(this)[0].removeAttribute("xTransPoint");
			$(this)[0].removeAttribute("xStartTime");
		}

	}
	UpdateList() {
		var Obj = this;
		for(var i in Obj.Items) {
			var Item = Obj.Items[i];
			if(typeof Item.classList === 'undefined') { 
				continue; 
			}
			if(typeof Item.setTranslation !== 'undefined') { 
				continue; 
			}
			for(var J in Obj.ItemMethods) { 
				Obj.Items[i][J] = Obj.ItemMethods[J]; 
			}
			Item.isEnabled = true;
			Item.classList.add("animateCubic");
			$(Item).css("z-index" , 9999 - parseInt(1));

			$(Item).off();
			$(Item).on("touchmove", Obj.MoveStart);
			$(Item).on("touchstart", Obj.MoveStart);
			$(Item).on("touchend", Obj.MoveEnd);
			$(Item).on("touchcancel", Obj.MoveEnd);
			$(Item).on("touchleave", Obj.MoveEnd);
		}
	}
}