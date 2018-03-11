/////////////////////////////////////////////////////
/                                                   /
/		DOCUMENTACION BANANATUBE-BACKEND API		/
/                                                   /
/////////////////////////////////////////////////////


GET		Muestra la info de la api						
		/api/	


GET		Renderiza p�gina de inicio
		/

POST	Env�a los datos de registro	y los almacena en BBDD					
		/api/registro

POST	Env�a datos de login y compara si existe en la BBDD. Si existe da acceso	
		/api/login

GET		Verifica si el usuario mantiene una sesi�n iniciada. De ser as� devuelve true	
		/api/loginCheck

GET		cierra la sesi�n							
		/api/logout

GET		Muestra el perfil del usuario con sesion iniciada							
		/api/perfil/:id

POST	Registra los datos iniciales del video en la BBDD (carga en dos etapas)
		/api/subirVideo

POST C	Sube el archivo de video y almacena la URL de la ubicacion del video en la BBDD.
		/api/uploadFile

GET  R 	Devuelve una lista de videos segun el usuario que tenga la sesion iniciada					
		/api/user/videos/:id

PENDIENTES
------------------------------------------------------
POST U	Edita la descripci�n del video. Compara si el usuario que edita corresponde con el autor	
		/api/video/edicion/:id

POST D	Elimina el video de la BBDD							
		/api/video/eliminar/:id