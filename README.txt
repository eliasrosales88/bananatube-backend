DOCUMENTACION BANANATUBE-BACKEND API

/////////////////////////////////////////////////////
	INFORMACION DE LA API

GET	muestra la info de la api						/api/	

/////////////////////////////////////////////////////
	HOMEPAGE

GET	Renderiza página de inicio con la lista de todos los videos					/

/////////////////////////////////////////////////////
	REGISTRO Y LOGIN

POST	envía los datos de registro						/api/registro
POST	envía datos de login y compara si existe en la BBDD. Si existe da acceso	/api/login
GET	verifica si el usuario mantiene una sesión iniciada. De ser así devuelve true	/api/loginCheck
		{"login":true}
		{"login":false}
GET	cierra la sesión							/api/logout

/////////////////////////////////////////////////////
	CRUD DE VIDEO

POST	Vista de formulario de subida de video						/video/nuevo
POST	C.Almacena la ruta del video en la BBDD. Next					/video/nuevo/subida
GET	R.Next. Devuelve la vista del video según ID					/video/:id
POST	U.Edita la descripción del video. Compara si el usuario que edita corresponde con el autor	/video/edicion/:id
POST	D.Elimina el video de la BBDD							/video/eliminar/:id