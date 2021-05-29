var db = JSON.parse('{"personas":[{"name":"Cynthia Pérez", "mujer": true , "docente":true,"primergrado":true},{"name":"Flor", "mujer": true , "docente":true,"caba":true},{"name":"Nico Ruiz Peyré", "docente":true,"mendoza":true},{"name":"Laura Brandan", "mujer": true,"administrativa":true },{"name":"Pablo Duclaud", "docente":true,"recreologo":true},{"name":"Fabiola Franck", "mujer": true , "docente":true,"pampa":true},{"name":"Fabio", "docente":true,"parana":true},{"name":"Ailín Aguirre Varela", "mujer": true , "cordoba": true},{"name":"Jimena Ledesma", "mujer": true, "docente":true,"bibliotecaria":true },{"name":"María Sarasin", "mujer": true, "docente":true ,"cemento":true},{"name":"Nicolas Gallo", "docente":true,"edfisica":true,"caba":true},{"name":"Paola Olivera", "mujer": true,"santiago": true },{"name":"Alejandro Piraccini", "docente":true, "cerveza":true},{"name":"Karina", "mujer": true, "docente":true, "inicial":true,"hijos":true },{"name":"Coty", "mujer": true ,"diseñoindumentaria":true },{"name":"Aye", "mujer": true, "docente":true ,"quimica": true},{"name":"Hernán", "docente":true,"caba":true,"analsita":true},{"name":"Miriam", "mujer": true, "docente":true ,"edfisica":true,"caba":true},{"name":"Sonia", "mujer": true, "docente":true, "cordoba": true },{"name":"Eze", "docente":true,"musica":true,"dj":true,"mardelplata":true},{"name":"Nico", "docente":true,"quimica": true},{"name":"Patricia Ludueña", "mujer": true, "docente":true ,"edfisica":true,"pampa":true},{"name":"Lore", "mujer": true , "docente":true,"edfisica":true},{"name":"Flor", "mujer": true , "docente":true},{"name":"Solange Rubisntein", "mujer": true,"actriz":true},{"name":"Romi", "mujer": true , "docente":true,"caba":true, "chocalmendras":true},{"name":"Nancy", "mujer": true, "docente":true ,"musica":true},{"name":"Gisela", "mujer": true, "docente":true,"inicial":true },{"name":"Gisela", "mujer": true , "cordoba": true,"acompañante":true},{"name":"María Laura Machado", "mujer":true,"trabajadorsocial":true}]}');
var db_playing =  [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29];
var props_descarted=[];
document.getElementById("imagen").hidden= false;
document.getElementById("buttons").hidden= true;
function empezarjuego() {
	document.getElementById("imagen").src= "images/pregunta.jpg";
	getPregunta().then(a => {document.getElementById("pregunta").innerHTML =  a;})
	document.getElementById("buttonem").hidden= true;
	document.getElementById("buttons").hidden= false;
}
function checkstatus() {
	if (db_playing.length == 1) {
		document.getElementById("buttons").hidden= true;
		document.getElementById("pregunta").innerHTML = "¿Estabas pensando en " + db.personas[db_playing[0]].name + "?";
		document.getElementById("imagen").src= "images/respuesta.jpeg";
		document.getElementById("resultado").src= "images/" + db_playing[0] +".png";
	}
}
async function boton(respuesta) {
	await filter(respuesta);
	document.getElementById("pregunta").innerHTML =  await getPregunta();
	checkstatus()
	console.log(db_playing)
	console.log(await getPopularProperty())
}
async function filter(respuesta) {
	var pop = await getPopularProperty();
	if (respuesta === "si") {
		for (var i = db_playing.length - 1; i >= 0; i--) {
			var evaldb = eval("db.personas[db_playing[i]]." + pop)
			if (evaldb == undefined){
				db_playing.splice(i,1);
			}
		}
	}else if(respuesta === "no"){
		for (var i = db_playing.length - 1; i >= 0; i--) {
			var evaldb = eval("db.personas[db_playing[i]]." + pop)
			if (evaldb) {
				db_playing.splice(i, 1);
			}
		}
	}
	props_descarted.push(pop);
}	
 async function getPopularProperty() {
	var array1 = await getRemainingProperties(db_playing);
	var array2 = []
	var array3 = []
	var contador
	for (var i =0; i <array1.length; i++) {
		contador = 0;
		for (var a = 0; a<db_playing.length; a++) {
			var props = Object.getOwnPropertyNames(db.personas[db_playing[a]]);
			for (var b =0; b < props.length; b++) {
				if (props[b] == array1[i]){
				contador += 1;
				}
			}	
		}
		array2.push(contador)
		array3.push(contador)
	}
	array3.sort(function (a, b){return b - a;});
	for (var i = 0; i <array2.length; i++) {
		if (array2[i]==array3[0]) {
			return array1[i]
		}
	}
}
async function getPregunta() {
	switch(await getPopularProperty()) {
  case "mujer":
		return "¿Es mujer?"   
		break;
  case "docente":
    return "¿Es docente?"
    break;
  case "edfisica":
  	return "¿Es profe de educación física?"
  	break;
  case "quimica":
  	return "¿Es docente de química?"
  	break;
  case "cordoba":
  	return "¿Es de Córdoba?"
  	break;
  case "santiago":
  	return "¿Es de Santiago del Estero?"
  	break;
  case "mendoza":
  	return "¿Es de Mendoza?"
  	break;
  case "musica":
  	return "¿Esta relacionadx con el mundo de la música?"
  	break;
  case "caba":
  	return "¿Es de CABA?"
  	break;
  case "pampa":
  	return "¿Es de La Pampa?"
  	break;
  case "cerveza":
  	return "¿Es sabido que no puede dejar la cerveza?"
  	break;
  case "dj":
  	return "¿Es DJ?"
  	break;
  case "mardelplata":
  	return "¿Es de Mar del Plata?"
  	break;
  case "recreologo":
  	return "¿Es recreologo?"
  	break;
  case "analista":
  	return "¿Es analista en sistemas?"
  	break;
  case "parana":
  	return "¿Es de Paraná?"
  	break;
  case "actriz":
  	return "¿Es actriz?"
  	break;
  case "trabajadorsocial":
  	return "¿Es trabajadora social?"
  	break;
  case "acompañante":
  	return "¿Es acompañante terapéutico?"
  	break
  case "inicial":
  	return "¿Es docente de inicial?"
  	break
  case "chocalmendras":
  	return "¿Es sabido que le encanta el chocolate con almendras?"
  	break
  case "diseñoindumentaria":
  	return "¿Es diseñadora de Indumentaria?"
  	break
  case "hijos":
  	return "¿Tiene hij@/s?"
  	break;
  	case "cemento":
  	return "¿Es sabido que crió con el cemento?"
  	break;
  	case "bibliotecaria":
  	return "¿Es bibliotecaria?"
  	break;
  case "bibliotecaria":
  	return "¿Trabaja como administrativa en el nivel superior?"
  	break;
  	case "primergrado":
  	return "¿Es docente de primer grado?"
  	break;
  default:
    return "Me quedé sin preguntas por el momento"
	}
}
function getRemainingProperties(restantes) {
	return new Promise((resolved) => {
			var final_array = [];
			var current_prop;
			var esta;
			for (var i = 0; i < restantes.length; i++) {
				current_prop = Object.getOwnPropertyNames(db.personas[restantes[i]]);

				for (var a = 1; a<current_prop.length; a++) {
					var esta=false;
					for (var b=0;b<final_array.length;b++) {
						if (current_prop[a]==final_array[b]){
							esta=true;
						};
					};
					if (!esta){
						final_array.push(current_prop[a])
					};
				};
			};
			for (var i = final_array.length - 1; i >= 0; i--) {
			  var esta=false;
				for (var a = 0; a <props_descarted.length; a++) {
					if (final_array[i] == props_descarted[a]) {
						esta = true;
					}		
				}
				if (esta) {
					final_array.splice(i, 1);
				}
			}
			resolved(final_array);
	});
};
