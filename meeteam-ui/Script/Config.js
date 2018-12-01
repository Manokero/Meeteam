//---------- Configuracion de tu Aplicacion 
// Estos valores de definen en principio, pero puede cambiarse en la ejecucion en cualquier parte del codigo, o incluso en la consola para pruebas.

// -- Configuraciones Generales
// Nombre de la Aplicacion
Settings.AppSettings.AppName = "Mee<b>team</b>";

// Aqui puedes definir la carpeta donde estan las vistas
Settings.AppSettings.ViewsDirectory = "./View/";

// Pantalla que se va a ver al cargar la aplicacion.
Settings.AppSettings.DefaultView = "Start.html";
//Vista de Error cuando no se encuentre una vista.
Settings.AppSettings.NotFoundView = "Error.html";

// Esta funcion se va a ejecutar inmediatamente inicie la aplicacion!
Settings.AppSettings.StartCallback = (f => f);
Settings.AppSettings.ViewChangeCallback = (f => f);
// Modificadores de Plataforma, esto permite que la aplicacion varie su diseno dependiendo el sistema Operativo.
Settings.AppSettings.PlatformModifiers = true;

// Colores para Resaltar! (Se utilizan con la clase .defaultTextColor y .defaultColor)
// Con esto puedes usar un color, y luego variarlo como quieras en toda la aplicacion
Settings.AppSettings.DefaultColor = "#e2694d";
Settings.AppSettings.DefaultTextColor = Settings.AppSettings.DefaultColor;

// Color de la Barra de Estado.
Settings.AppSettings.StatusBarColor = Settings.AppSettings.DefaultColor;
// Color de fondo por defecto para la aplicacion.
Settings.AppSettings.BodyBackgroundColor = "#000";

//Parametro Personalizado de consultas.
Settings.AppSettings.Server = "wabba.ferreirapablo.com";
Settings.AppSettings.WebServices = "http://"+Settings.AppSettings.Server+"/api/index.php";
//Settings.AppSettings.WebServices = "http://misc.ferreirapablo.com/api/index.php";
Settings.AppSettings.InBackground = true;

// Lenguaje por defecto
Settings.AppSettings.Language = "es";

// Configuracion de la Barra Superior
// Texto de la Barra Superior, por lo general esta el nombre de la aplicacion pero puede cambiarse
Settings.ActivityBarSettings.ActivityBarTitle = Settings.AppSettings.AppName;
//Alineacion del Texto de la Barra Superior
Settings.ActivityBarSettings.ActivityBarAlign = "left";

// Color de la Barra Superior
Settings.ActivityBarSettings.ActivityBarColor = "#FFFFFF";
// Color de Texto de la Barra Superior
Settings.ActivityBarSettings.ActivityBarTextColor =  Settings.AppSettings.DefaultColor;

// Configuraciones del Boton de la Izquierda de la Barra Superior
// Este booleano, define si hay un boton a la izquierda
Settings.ActivityBarSettings.HasLeftButton = true;
// Este valor define el icono del boton (En este caso "fa-bars" que son las 3 barritas del menu en movil por lo general.)
Settings.ActivityBarSettings.LeftButtonIcon = "fa-bars";
// Lo que Sucedera al pulsar ese boton
Settings.ActivityBarSettings.LeftButtonAction = function() {
	// Deberias Intentar usar esto por ejemplo! Para abrir el menu! (Sidebar)
	// Sidebar es el elemento que representa la barra lateral.
	// Esta se puede abrir con la funcion Sidebar.Open()
	// y puede cerrarse con la funcion Sidebar.Close()
	// Sencillo no? 
	// Incluso! Puedes hacer que se alterne entre abrirse y cerrarse con la funcion Sidebar.Toggle()
	// si llamas Sidebar.Toggle() la barra abrira si esta cerrada, y cerrara si esta abierta! 

	// Que tal si usamos alguna de estas funciones para que nuestro boton de la esquina superior abra el menu?
	Sidebar.Toggle();
};

// Configuraciones del Boton de la Derecha de la Barra Superior
// Este booleano, define si hay un boton a la Derecha
Settings.ActivityBarSettings.HasRightButton = true;
// Este valor define el icono del boton (En este caso "fa-bars" que son las 3 barritas del menu en movil por lo general.)
Settings.ActivityBarSettings.RightButtonIcon = "fa-search";
// Lo que Sucedera al pulsar ese boton
Settings.ActivityBarSettings.RightButtonAction = function() {
	location.hash = "Meeting.html";
};

// Se debe ocultar la barra superior?
Settings.ActivityBarSettings.Hidden = true;

Settings.SidebarSettings.SidebarRender = "Component/Sidebar.html";

Settings.AnimationSettings.Duration = 0.5