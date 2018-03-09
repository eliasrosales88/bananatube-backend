DOCUMENTACION BANANATUBE-BACKEND API

/////////////////////////////////////////////////////
	INFORMACION DE LA API

GET	muestra la info de la api						/api/	

/////////////////////////////////////////////////////
	HOMEPAGE

GET	Renderiza p�gina de inicio con la lista de todos los videos					/

/////////////////////////////////////////////////////
	REGISTRO Y LOGIN

POST	env�a los datos de registro						/api/registro
POST	env�a datos de login y compara si existe en la BBDD. Si existe da acceso	/api/login
GET	verifica si el usuario mantiene una sesi�n iniciada. De ser as� devuelve true	/api/loginCheck
		{"login":true}
		{"login":false}
GET	cierra la sesi�n							/api/logout

/////////////////////////////////////////////////////
	CRUD DE VIDEO

POST	Vista de formulario de subida de video						/video/nuevo
POST	C.Almacena la ruta del video en la BBDD. Next					/video/nuevo/subida
GET	R.Next. Devuelve la vista del video seg�n ID					/video/:id
POST	U.Edita la descripci�n del video. Compara si el usuario que edita corresponde con el autor	/video/edicion/:id
POST	D.Elimina el video de la BBDD							/video/eliminar/:id