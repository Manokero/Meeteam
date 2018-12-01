
BengalaFramework.Register({
    "Name" : "Splash Screen Addon",
    "Author" : "Pablo Ferreira",
    "Description" : "Create perfect SplashScreens in a single line.",
    "Version" : {
        "Number" : 1.0,
        "Branch" : "STABLE"
    },
    "Type" : "Addon",
    "SignName" : "BengalaFramework.Addon.Splash",
    "Dependencies" : [],
    "Framework" : {"Version" : 1.0}
});

function SplashPlay(SplashElement, MaxTime, callback, afterFade) {
	MaxTime = MaxTime || 2;
	var xEase = Expo.easeIn;
	
	TweenLite.to(SplashElement.Logo, 1, {
		width : SplashElement.Logo.width - (20 * SplashElement.Logo.width / 100),
		height : SplashElement.Logo.width - (20 * SplashElement.Logo.width / 100),
		opacity : 1,
		ease : Expo.easeOut,
		onComplete : function() {
			var FullSize = Math.sqrt(Math.pow(window.outerWidth+300,2) + Math.pow(window.outerHeight+300,2));
			var x = TweenLite.to( SplashElement.Logo, MaxTime, { 
				width : FullSize*2, 
				height : FullSize*2, 
				ease: xEase
			})

			TweenLite.to(SplashElement.Backdrop, MaxTime, { 
				backgroundColor : '#FFFFFF', 
				ease : xEase, 
				onComplete : function() {
					if(typeof callback === 'function' && !afterFade) {
						callback(SplashElement);
					}
					TweenLite.to(SplashElement.Backdrop, 0.2, {
						opacity : 0,
						onComplete : function() {
							SplashElement.Backdrop.remove();
							if(typeof callback === 'function' && afterFade) {
								callback(SplashElement);
							}
						}
					}) 
				}
			})
		}
	})
}


function CreateSplash(Color, Logo, defaultSize) {
	var BaseDrop = document.createElement("div");
	BaseDrop.style.position        = 'fixed';
	BaseDrop.style.width           = '100%';
	BaseDrop.style.height          = '100%';
	BaseDrop.style.top 			   = '0px';
	BaseDrop.style.left 		   = '0px';
	BaseDrop.style.overflow        = 'hidden';
	BaseDrop.style.backgroundColor = Color;

	var LogoImage = document.createElement("img");
	LogoImage.src = Logo;
	LogoImage.style.position = 'absolute';
	LogoImage.style.left = '50%';
	LogoImage.style.top = '50%';
	LogoImage.style.transform = 'translate(-50%, -50%)';
	LogoImage.style.opacity = "0";
	LogoImage.style.width = LogoImage.style.height = defaultSize;
	//LogoImage.style.maxWidth = LogoImage.maxHeight = '100%';
	BaseDrop.appendChild(LogoImage);

	document.querySelector("body").appendChild(BaseDrop);
	return {
		"Backdrop" : BaseDrop,
		"Logo" : LogoImage
	};
}




