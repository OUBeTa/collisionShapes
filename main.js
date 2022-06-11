import * as jquerry from './jquery.js'

const FPS = 100 //número que vai ser tranformado em milisegundos para ser usado na função setInterval()
const SPEED = 4

let keysPressed = {} //toda vez que uma tecla é precionada, seu nome é armazenado nesse dictionary com o valor true
let collisionItems = []

class GenericObject { // ramdom bullshit go!!!

	constructor(x,y,width,height,id,className,isCollItem=false){

		$('<div>').appendTo('body').attr('id',id)

		this.x = x
		this.y = y
		this.id = '#'+id
		this.className = '.'+className
		this.width = width
		this.height = height

		$(this.id).css('width',this.width+'px')
		$(this.id).css('height',this.height+'px')
		$(this.id).css('position','absolute')
		$(this.id).css('top',this.y)
		$(this.id).css('left',this.x)
		$(this.id).addClass(className)

		if(isCollItem == true){collisionItems.push(this)}

	}

}

let char = new GenericObject(50,50,80,80,'char','underPlayerControl')
let one = new GenericObject(250,250,800,300,'wallOne','walls',true)
let two = new GenericObject(250,630,300,300,'wallTwo','walls',true)

let keysEnabled = ['KeyW','KeyD','KeyA','KeyS'] //teclas que disparam gatilhos ao serem apertadas

let nIntervId = setInterval(time,Math.round(1000/FPS)) //dispara a função 'time()' a cada x milissegundos

function time(){ //faz o update dos acontecimentos que precisam ser revisados toda a hora

	if(keysPressed['KeyS'] == true){

		char.y += SPEED
		if(!checkMove()){$(char.id).css('top', char.y)}
		if(checkMove()){char.y -= SPEED}

	}

	if(keysPressed['KeyD'] == true){

		char.x += SPEED
		if(!checkMove()){$(char.id).css('left', char.x)}
		if(checkMove()){char.x -= SPEED}

	}

	if(keysPressed['KeyA'] == true & char.x > 0){

		char.x -= SPEED
		if(!checkMove()){$(char.id).css('left', char.x)}
		if(checkMove()){char.x += SPEED}

	}

	if(keysPressed['KeyW'] == true & char.y > 0){

		char.y -= SPEED
		if(!checkMove()){$(char.id).css('top', char.y)}
		if(checkMove()){char.y += SPEED}
	}

}

function checkMove(){ //retorna true se houver colisão e undefined se não houver

	var value

	for(var x = 0; x < collisionItems.length; x++){

		if(!isColliding(char,collisionItems[x])){

			value = true

			break

		}

	}

	if(value){return value}

}


function isColliding(a,b){

	return(

		(a.y + a.width) <= (b.y) ||
		(a.y) >= (b.y + b.height) ||
		((a.x + a.width) <= b.x) ||
		(a.x >= (b.x + b.width))

		)

}



/*

*/

document.addEventListener('keydown', (event) => { //ativa toda vez que uma tecla é precionada

	for(var x of keysEnabled){ 

		if(event.code == x){ //verifica se a tecla precionada está na lista de teclas possíveis

			keysPressed[event.code] = true //adiciona um ítem com o o índice igual ao nome da tecla precionada e com o valor true

		}

	}},false)

document.addEventListener('keyup',(event) => { //ativa toda a vez que uma tecla for solta

	for(var x of keysEnabled){ //verifica se a tecla precionada está na lista de teclas possíveis

		if(event.code == x){

			delete keysPressed[event.code] //remove a tecla que foi solta do dictionary keysPressed

		}

	}},false)

