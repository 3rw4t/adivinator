var db = JSON.parse('{"personas":[{"name":"Cynthia Pérez", "mujer": true , "docente":true},{"name":"Flor", "mujer": true , "docente":true},{"name":"Nico Ruiz Peyré", "docente":true},{"name":"Laura Brandan", "mujer": true },{"name":"Pablo Duclaud", "docente":true},{"name":"Fabiola Franck", "mujer": true , "docente":true},{"name":"Fabio", "docente":true},{"name":"Ailín Aguirre Varela", "mujer": true },{"name":"Jimena Ledesma", "mujer": true, "docente":true },{"name":"María Sarasin", "mujer": true, "docente":true },{"name":"Nicolas Gallo", "docente":true},{"name":"Paola Olivera", "mujer": true },{"name":"Alejandro Piraccini", "docente":true},{"name":"Karina", "mujer": true, "docente":true },{"name":"Coty", "mujer": true },{"name":"Aye", "mujer": true, "docente":true },{"name":"Hernán", "docente":true},{"name":"Miriam", "mujer": true, "docente":true },{"name":"Sonia", "mujer": true, "docente":true },{"name":"Eze", "docente":true},{"name":"Nico", "docente":true},{"name":"Patricia Ludueña", "mujer": true, "docente":true },{"name":"Lore", "mujer": true , "docente":true},{"name":"Flor", "mujer": true , "docente":true},{"name":"Solange Rubisntein", "mujer": true },{"name":"Rumi", "mujer": true , "docente":true},{"name":"Nancy", "mujer": true, "docente":true },{"name":"Gisela", "mujer": true, "docente":true },{"name":"Gisela", "mujer": true },{"name":"María Laura Machado", "mujer": true }]}');
var db_playing =  [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]
var props_descarted=[]
function si() {
	filter(true);
	document.getElementById("pregunta").innerHTML = getPregunta();
}
function filter(respuesta) {
	var pop= getPopularProperty()
	if (respuesta) {
		for (var i = db_playing.length - 1; i >= 0; i--) {
			var evaldb = eval("db.personas[db_playing[i]]." + getPopularProperty())
			if (evaldb == undefined) {
				db_playing.splice(db_playing[i], 1);
			}
		}
		
	}else{
		for (var i = db_playing.length - 1; i >= 0; i--) {
			var evaldb = eval("db.personas[db_playing[i]]." + getPopularProperty())
			if (evaldb) {
				db_playing.splice(db_playing[i], 1);
			}
		}
	}
	
	props_descarted.push(pop)
	
}
function getRemainingProperties() {
	var final_array = [];
	var current_prop;
	var esta;
	for (var i = 0; i < db_playing.length; i++) {
		current_prop = Object.getOwnPropertyNames(db.personas[db_playing[i]]);
		current_prop.shift();
		for (var a = 0; a<current_prop.length; a++) {
			var esta=false;
			for (var b=0;b<final_array.length;b++) {
				if (current_prop[a]==final_array[b]){
					esta= true;
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
			final_array.splice(final_array[i], 1);
		}
	}
	
	return final_array;
};
function getPopularProperty() {
	var array1 = getRemainingProperties()
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
	array3.sort(function (a, b){ return b - a;});
	for (var i = 0; i <array2.length; i++) {
		if (array2[i]==array3[0]) {
			return array1[i]
		}
	}
}
function getPregunta() {
	
	switch(getPopularProperty()) {
  case "mujer":
	return "Es mujer"   
	break;
  case "docente":
    return "Es docente?"
    break;
  default:
    // code block
}
}

document.getElementById("pregunta").innerHTML = getPregunta();


/*
if (db.personas[0].xd == undefined) {
	console.log(Object.getOwnPropertyNames(db.personas[2]))
	console.log(Object.values(db.personas[2]))
}
for (var i = 0; i < nombre_personas.length; i++) {
	document.write('<h2 style="text-align: center;"> {"name":"' + nombre_personas[i] +'"},</h2>');
}
'<img src="images/' + i + '.png" class="imagen">'+ '<h2 style="text-align: center;">'+ db.personas[i].name +' '+ i + ' es ' + genero+'</h2>'
	document.writeln('<img src="images/' + i + '.png" class="imagen">');
	document.writeln('<h2 style="text-align: center;">'+ db.personas[i].name +' '+ i + ' es ' + genero+'</h2>');
for (var i = 0; i < 7; i++) {
	document.write('<h2 style="text-align: center;">'+ laJuana.age +'</h2>');
	document.write('<h2 style="text-align: center;">'+ laJuana.name +'</h2>');

}
for (var i = nombre_personas.length - 1; i >= 0; i--) {
	let x = new Persona (nombre_personas[i])
	
}
var myJsonString = JSON.stringify(nombre_personas);

for (var i = 0; i < nombre_personas.length; i++) {
	document.write('<h2 style="text-align: center;"> {"name":"' + nombre_personas[i] +'", "id":"' + i + '" },</h2>');
}
	var genero, contador;
	contador = 0
for (var i = 0 ; i < db.personas.length; i++) {

	if (genera_personas[i]){
		genero = "mujer";
		contador= contador +1 ;
	}else{
		genero = "hombre";
	}
	document.write('<img src="images/' + i + '.png" class="imagen">');
	document.write('<h2 style="text-align: center;">'+ db.personas[i].name +' '+ i + ' es ' + genero+'</h2>');
}
	var genero, contador;
	contador = 0
for (var i = 0 ; i < db.personas.length; i++) {

	if (genera_personas[i]){
		genero = "mujer";
		contador= contador +1 ;
	}else{
		genero = "hombre";
	}
	document.write('<img src="images/' + i + '.png" class="imagen">');
	document.write('<h2 style="text-align: center;">'+ db.personas[i].name +' '+ i + ' es ' + genero+'</h2>');}
document.write('<h2 style="text-align: center;"> Cantidad de mujeres: '+contador+'</h2>');
*/