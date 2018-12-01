BengalaFramework.Register({
    "Name" : "ViewSlider Component",
    "Author" : "Pablo Ferreira",
    "Description" : "Multiple Horizontal Views in touch enabled for swiping betweeen them.",
    "Version" : {
        "Number" : 1.0,
        "Branch" : "STABLE"
    },
    "Type" : "Component",
    "SignName" : "BengalaFramework.Component.ViewSlider",
    "Dependencies" : ["BengalaFramework.Module.MobileWrapper@1.0", "BengalaFramework.Util.Animation@1.0"],
    "Framework" : {"Version" : 1.0, "Type" : "Mobile"}
});


/*jshint esversion: 6 */
var SliderInstances = [];
class ViewSlider {
	constructor(ViewSlide) {
		var x = this;
		this.ViewSlideBody = document.querySelector(ViewSlide);
		$(this.ViewSlideBody).addClass("ViewSliderContainer");

		this.ViewSlideElement = document.createElement("div");
		this.ViewSlideElement.id = "VIEWSE_" + (Math.floor(Math.random() * 999999999999));
		$(this.ViewSlideElement).append(this.ViewSlideBody.children);
		$(this.ViewSlideElement).addClass("ViewsBox");
		if(Settings.AnimationSettings) {
			$(this.ViewSlideElement).addClass(Settings.AnimationSettings.getPartialDurationClass(Time => Time/2));
        	$(this.ViewSlideElement).addClass(Settings.AnimationSettings["Easing"]);
		}
		for (var i = this.ViewSlideElement.children.length - 1; i >= 0; i--) {
			if (this.ViewSlideElement.children[i].classList) {
				var View = $(this.ViewSlideElement.children[i]);
				var ViewElement = View[0];
				ViewElement.setAttribute("ViewSlide_ID", i);
				View.addClass("ViewSlide");
				View.addClass("View");
			}
		}
		$(this.ViewSlideBody).append(this.ViewSlideElement);
		this.ViewSlideResize();
		$(window).on("resize", function() {
			x.ViewSlideResize();
		});
		this.ViewSlideBody.ViewSlider = this;
		this.isEnabled = true;
		this.Activated = true;
		this.UpdateListeners();
		SliderInstances.push(this);
	}
	ViewSlideResize() {
		if(typeof $(this.ViewSlideElement).position() == 'undefined') {
			return this.Delete();
		}
		if ($(this.ViewSlideBody).css("height")) {
			$(this.ViewSlideBody).css({
				"height": $(this.ViewSlideBody).parent().outerHeight()
			});
		}
		this.ViewSize = $(this.ViewSlideElement).parent().outerWidth();
		$(this.ViewSlideElement).css({
			"width": (this.ViewSlideSize(true)) + "px"
		});
		$(this.ViewSlideElement).find(".ViewSlide.View").css({
			"width": this.ViewSize + "px",
			"height": $(this.ViewSlideBody).outerHeight() + "px"
		});
		this.setTranslationPercent(this.getTranslationPercent())
		this.roundToggle();
	}
	get length() {
		return this.ViewSlideElement.children.length;
	}

	set ViewSlideTransitionTime(v) {
		if(typeof $(this.ViewSlideElement).position() == 'undefined') {
			return this.Delete();
		}
		if(v > 0) {
			$(this.ViewSlideElement).css({
				"-webkit-transition" : v+"s",
				"transition" : v+"s"
			});
		} else {
			$(this.ViewSlideElement).css({
				"-webkit-transition" : "",
				"transition" : ""
			});
		}
	}

	get ViewSlideTransitionTime() {
		return parseFloat($(this.ViewSlideElement).css("transition").split(" ")[1].replace("s"));
	}

	ViewSlideSize(wof) {
		if(typeof $(this.ViewSlideElement).position() == 'undefined') {
			return this.Delete();
		}
		return ($(this.ViewSlideElement).find(".ViewSlide.View").length * $(this.ViewSlideElement).parent().outerWidth()) - (wof ? 0 : this.ViewSize);
	}
	getViews() {
		if(typeof $(this.ViewSlideElement).position() == 'undefined') {
			return this.Delete();
		}
		return $(this.ViewSlideElement).find(".ViewSlide.View");
	}

	MoveStart(evt) {
		if (evt.type == "touchstart") {
			$($(this)[0].ViewSlider).trigger("VIEWDRAG_START")
			$(this)[0].ViewSlider.ViewSlideElement.setAttribute("xStartPoint", evt.changedTouches[0].pageX);
			$(this)[0].ViewSlider.ViewSlideElement.setAttribute("xTransPoint", $(this)[0].ViewSlider.getTranslation());
			$(this)[0].ViewSlider.ViewSlideElement.setAttribute("xStartTime", (new Date().toString()));
			$(this)[0].ViewSlider.ViewSlideElement.setAttribute("xStartView", $(this)[0].ViewSlider.getActualView());
			$(this)[0].ViewSlider.ViewSlideElement.setAttribute("StartPointVect", evt.changedTouches[0].pageX + "x"+evt.changedTouches[0].pageY);


		}
		if (!$(this)[0].ViewSlider.ViewSlideElement.hasAttribute("xStartPoint")) {
			$(this)[0].ViewSlider.setTranslationPercent(evt.changedTouches[0].pageX / ($(this)[0].ViewSlider.ViewSlideSize()) * 100);
		} else {
			$($(this)[0].ViewSlider).trigger("VIEWDRAG_MOVE");

			var StartPoint = (parseInt($(this)[0].ViewSlider.ViewSlideElement.getAttribute("xStartPoint")));
			var TranslationPoint = (parseInt($(this)[0].ViewSlider.ViewSlideElement.getAttribute("xTransPoint")));
			var Distance = evt.changedTouches[0].pageX - StartPoint;

			var StartPointVect = $(this)[0].ViewSlider.ViewSlideElement.getAttribute("StartPointVect");
			var ActualPointVect = (evt.changedTouches[0].pageX +"x"+evt.changedTouches[0].pageY);
			if(StartPoint != ActualPointVect) {
				if(!$(this)[0].ViewSlider.ViewSlideElement.getAttribute("xMoveLocked")) {
					var Pos1 = $(this)[0].ViewSlider.StringVectToVect(StartPointVect);
					var Pos2 = $(this)[0].ViewSlider.StringVectToVect(ActualPointVect);
					if(Math.abs(Pos1.x - Pos2.x) >= Math.abs(Pos1.y - Pos2.y)) {
						$(this)[0].ViewSlider.setTranslation(TranslationPoint + Distance);
					} else {
						$(this)[0].ViewSlider.ViewSlideElement.setAttribute("xMoveLocked", "1"); 
					}
				}
			}
		}
	}
	MoveEnd(evt) {
		$(this)[0].ViewSlider.roundToggle();
		if (evt) {
			//Obtengo la posicion actual del deslizador de vistas
			
			var ActualPosition = $(this)[0].ViewSlider.getTranslation();
			//Obtengo la posicion anterior del deslizador de vistas
			var OldPosition = parseInt($(this)[0].ViewSlider.ViewSlideElement.getAttribute("xTransPoint"));
			//Obtengo el indice de la vista que antes era visible.
			var OldView = parseInt($(this)[0].ViewSlider.ViewSlideElement.getAttribute("xStartView"));
			//Evaluo la siguiente condicion
			// Si la posicion actual es diferente de la posicion anterior
			// y la vista anterior proporcionalmente diferente a la actual
			if (ActualPosition != OldPosition && OldView == $(this)[0].ViewSlider.getActualView()) {
				// Entonces.
				// Buscamos el momento actual que equivaldria al tiempo final.
				var EndTime = new Date();
				// Buscamos el momento de inicio del movimiento, que equivaldria al tiempo inicial.
				var StartTime = new Date($(this)[0].ViewSlider.ViewSlideElement.getAttribute("xStartTime"));
				// Restamos el tiempo final con el inicial para obtener un tiempo total de movimiento
				var TotalTime = (EndTime - StartTime);
				// Restamos la posicion Actual con la Posicion Anterior y eso nos dara la distancia.
				// Sacamos su valor absoluto para que nos de un resultado positivo.
				var Distance = Math.abs(ActualPosition - OldPosition);
				// Si el tiempo es menor a 1000ms y la distancia es mayor a 10px
				if (TotalTime <= 1000 && Distance > 10) {
					// Si el tiempo total multiplicado por 0.001 es menor a 0.5s 
					if((TotalTime * 0.001) < 0.5) {
						// Definimos la velocidad de transicion del movimiento igual a la velocidad del movimiento definido
						$(this)[0].ViewSlider.ViewSlideTransitionTime = (TotalTime * 0.001);
					}
					//Obtenemos la vista actual
					var ViewToGo = $(this)[0].ViewSlider.getActualView();
					// Si la posicion actual es diferente a la posicion anterior
					if (ActualPosition > OldPosition) {
						//Vamos a la vista anterior
						ViewToGo -= 1;
					} else {
						//Vamos a la vista siguiente
						ViewToGo += 1;
					}
					//Definimos a que vista vamos a ir
					$(this)[0].ViewSlider.setActualView(ViewToGo);
					//Reiniciamos los valores cuando todo haya terminado
					setTimeout(x => x.ViewSlideTransitionTime = 0, $(this)[0].ViewSlider.ViewSlideTransitionTime * 1000, $(this)[0].ViewSlider)
				}
			}
			
			// Y Asi usamos la fisica para determinar atravez del delizamiento, 
			//y el tiempo a que vista quiere acceder el usuario.

			$($(this)[0].ViewSlider).trigger("VIEWDRAG_END")
			$(this)[0].ViewSlider.ViewSlideElement.removeAttribute("xStartPoint");
			$(this)[0].ViewSlider.ViewSlideElement.removeAttribute("xTransPoint");
			$(this)[0].ViewSlider.ViewSlideElement.removeAttribute("xStartTime");
			$(this)[0].ViewSlider.ViewSlideElement.removeAttribute("xStartView");
			$(this)[0].ViewSlider.ViewSlideElement.removeAttribute("StartPointVect");
			$(this)[0].ViewSlider.ViewSlideElement.removeAttribute("xMoveLocked");
		}
	}
	StringVectToVect(str) {
	  str = str || "0x0";
	  var x = str.split("x");
	  if(x.length) {
	    return {
	      x : parseFloat(x[0]) || null,
	      y : parseFloat(x[1]) || null
	    }
	  }
	} 
	UpdateListeners() {
		$(this.ViewSlideBody).off();
		if(typeof $(this.ViewSlideElement).position() == 'undefined') {
			return this.Delete();
		}
		$(this.ViewSlideBody).on("touchmove", this.MoveStart);
		$(this.ViewSlideBody).on("touchstart", this.MoveStart);
		$(this.ViewSlideBody).on("touchend", this.MoveEnd);
		$(this.ViewSlideBody).on("touchcancel", this.MoveEnd);
		$(this.ViewSlideBody).on("touchleave", this.MoveEnd);
	}
	setTranslation(x) {
		if(typeof $(this.ViewSlideElement).position() == 'undefined') {
			return this.Delete();
		}
		var S = this.getActualView();
		if (!this.isEnabled) {
			return false;
		}
		if (x > 0 || x < (0 - this.ViewSlideSize())) {
			return false;
		}
		$(this.ViewSlideElement).css({
			"transform": "translateX(" + x + "px)",
			"-webkit-transform": "translateX(" + x + "px)"
		});
		$(this.ViewSlideElement).trigger("VIEWSLIDE_MOVE");
		
		this.UpdateViewPercent();

	}
	setTranslationPercent(x) {
		if(typeof $(this.ViewSlideElement).position() == 'undefined') {
			return this.Delete();
		}
		if (!this.isEnabled) {
			return false;
		}
		x = Math.floor(x);
		if (x <= 100 && x >= 0) {
			var Percent = (0 - this.ViewSlideSize()) + (this.ViewSlideSize() * x / 100);
			this.setTranslation(Percent);
		} else {
			if (x >= 100) {
				this.setActualView(0);
			} else if (x <= 0) {
				this.setActualView(this.length - 1);
			}
		}
	}
	getTranslation() {
		var v = 0;
		if(typeof $(this.ViewSlideElement).position() == 'undefined') {
			return this.Delete();
		}
		v = $(this.ViewSlideElement).position().left;
		return v;
	}
	getTranslationPercent() {
		if(typeof $(this.ViewSlideElement).position() == 'undefined') {
			return this.Delete();
		}
		var TranslationPixels = this.getTranslation() * -1;
		return 100 - (TranslationPixels / (this.ViewSlideSize()) * 100) || 0;
	}
	setActualView(x) {
		if(typeof $(this.ViewSlideElement).position() == 'undefined') {
			return this.Delete();
		}
		$('[viewslide_id="' + this.getActualView() + '"]').trigger("VIEWSLIDE_OUT");
		$('[viewslide_id="' + x + '"]').trigger("VIEWSLIDE_IN");
		//this.setTranslationPercent(100 - (x * (100/(this.length-1))))
		this.setTranslation(0 - (this.ViewSize * (x)));
		setTimeout(function(xx) {
			$(xx).trigger("VIEW_CHANGE");

		}, 150, this);
		return true;
	}
	getActualView() {
		if(typeof $(this.ViewSlideElement).position() == 'undefined') {
			return this.Delete();
		}
		return Math.round(Math.round((100 - this.getTranslationPercent())) / (100 / (this.length - 1)));
	}
	roundToggle() {
		if(typeof $(this.ViewSlideElement).position() == 'undefined') {
			return this.Delete();
		}
		this.setActualView(this.getActualView());
	}
	getViewsLeftPercent() {
		if(typeof $(this.ViewSlideElement).position() == 'undefined') {
			return this.Delete();
		}
		var x = this;
		var PercentLeft = (((x.getTranslationPercent() / (100 / (x.length - 1))) * 100) - ((x.length - x.getActualView()) * 100)) * -1;
		return [100 - PercentLeft, PercentLeft];
	}
	UpdateViewPercent() {
		if(typeof $(this.ViewSlideElement).position() == 'undefined') {
			return this.Delete();
		}
		var x = this;
		$(x.ViewSlideElement).find(".ViewSlide.View").attr("viewPercent", 0);
		var PercentLeft = Math.floor((((Math.round((100 - x.getTranslationPercent())) / (100 / (x.length - 1)))) * 100) - (x.getActualView() * 100));
		$('[viewslide_id="' + x.getActualView() + '"]').attr("viewPercent", Math.round(100 - PercentLeft)).trigger("VIEW_MOVE");
		$('[viewslide_id="' + (x.getActualView() + 1) + '"]').attr("viewPercent", Math.round(PercentLeft)).trigger("VIEW_MOVE");
	}
	Delete() {
		if(SliderInstances.indexOf(this) > -1) {
			$(this).off();
			this.ViewSlideElement.remove()
			this.ViewSlideBody.remove()
			for(var i in this) { delete this[i]; }
			SliderInstances.splice(SliderInstances.indexOf(this), 1);
			return true;
		} else {
			return false;
		}
	}
}