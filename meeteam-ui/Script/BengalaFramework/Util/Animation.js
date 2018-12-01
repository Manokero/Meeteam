BengalaFramework.Register({
	"Name" : "Animation Util",
	"Author" : "Pablo Ferreira",
	"Description" : "CSS Animation Condiguration for BengalaFramework",
	"Version" : {
		"Number" : 1.0,
		"Branch" : "STABLE"
	},
	"Type" : "Component",
	"SignName" : "BengalaFramework.Util.Animation",
	"Dependencies" : [],
	"Framework" : {"Version" : 1.0}
});
Settings.AnimationSettings = {
	"_Easing" : "EaseInDefaultInterpolator",
	"_Duration" : 1,
	"_DurationClass" : "Time1s0ms",
	"_In" : "FadeAndUpIn",
	"_Out" : "FadeAndUpOut",
	"_InversedIn" : "FadeAndDownIn",
	"_InversedOut" : "FadeAndDownOut",
	get Duration() { return this._Duration; },
	set Duration(v) {
		if(typeof v !== 'number') { return; }
		if(v > 5) { return; }
		if(v % 0.25 != 0) { return; }
		var x = v.toString().split(".");
		this.DurationClass = `Time${(x[0])}s${(x[1] || 0)}ms`;
		this._Duration = v;
	},
	AnimationSet(Animation, AnimationInversed, Easing, Duration) {
		if(Animation) {
			this.In = Animation+"In";
			this.Out = Animation+"Out"
		}
		if(AnimationInversed) {
			this.InversedIn = AnimationInversed+"In";
			this.InversedOut = AnimationInversed+"Out"
		}
		if(Easing) {
			this.Easing = Easing;
		}
		if(Duration) {
			this.Duration = Duration;
		}
	},
	Apply(Selector,f) {
		if(!$(Selector).length) { return false; }
        $(Selector).addClass(typeof f === 'function' ? this.getPartialDurationClass(f) : this["DurationClass"]);
        $(Selector).addClass(this["Easing"]);
        return true;
	},
	getDurationClass(v){
		if(typeof v !== 'number') { return this.getDurationClass(); }
		if(v > 5) { return this.getDurationClass(); }
		if(v % 0.25 != 0) { return this.getDurationClass(); }
		var x = v.toString().split(".");
		return `Time${(x[0])}s${(x[1] || 0)}ms`;
	},
	getPartialDurationClass(f){
		if(typeof f !== 'function') {
			return this.DurationClass;
		}
		v = f(this.Duration)
		if(typeof v !== 'number') { return this.getDurationClass(); }
		if(v > 5) { return this.getDurationClass(); }
		if(v % 0.25 != 0) { return this.getDurationClass(); }
		var x = v.toString().split(".");
		return `Time${(x[0])}s${(x[1] || 0)}ms`;
	},
	get Easing() { 
		return this._Easing; 
	},
	set Easing(v) {  
		$(Settings.AppSettings.AppDOMContainer).addClass(v).removeClass(this._Easing); 
		$("."+this._Easing).addClass(v).removeClass(this._Easing); 
		this._Easing = v; 
	},
	get DurationClass() { 
		return this._DurationClass; 
	},
	set DurationClass(v) { 
		$(Settings.AppSettings.AppDOMContainer).addClass(v).removeClass(this._DurationClass); 
		$("."+this._DurationClass).addClass(v).removeClass(this._DurationClass); this._DurationClass = v; 
	},
	get In() { 
		return this._In; 
	},
	set In(v) {
		$(Settings.AppSettings.AppDOMContainer).addClass(v).removeClass(this._In); 
		$("."+this._In).addClass(v).removeClass(this._In); 
		this._In = v; 
	},
	get Out() { 
		return this._Out; 
	},
	set Out(v) { 
		$(Settings.AppSettings.AppDOMContainer).addClass(v).removeClass(this._Out);
		$("."+this._Out).addClass(v).removeClass(this._Out); 
		this._Out = v; 
	},
	get InversedIn() { 
		return this._InversedIn; 
	},
	set InversedIn(v) {
		$(Settings.AppSettings.AppDOMContainer).addClass(v).removeClass(this._InversedIn); 
		$("."+this._InversedIn).addClass(v).removeClass(this._InversedIn); 
		this._InversedIn = v; 
	},
	get InversedOut() { 
		return this._InversedOut; 
	},
	set InversedOut(v) { 
		$(Settings.AppSettings.AppDOMContainer).addClass(v).removeClass(this._InversedOut);
		$("."+this._InversedOut).addClass(v).removeClass(this._InversedOut); 
		this._InversedOut = v; 
	},
	RenderConfig : function() {
		if(typeof this.getDurationClass === 'undefined') { return false; }
		for(var i in this) {
			if(i.charAt(0) !== '_' && (typeof this[i] === 'string' || typeof this[i] === 'nu')) { 
				//this[i] = this[i];
			}
		}
	}
};
 