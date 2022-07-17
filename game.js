import props from "./props.js";

let canvas = document.querySelector("#ctx");
let gfx = jwf(canvas);
let _canvasRect = {x:0,y:0,w:canvas.clientWidth,h:canvas.clientHeight}
let _snake = new props.snk({x:300,y:300,r:5})
let egg = newEgg()
let keyboard = {}
let _particles = PARTY(gfx.gfx,2)
let mouseClick = { x:0,y:0 }
let _score = 0
let _highscore = getHighscore() ?? 0
let _txtScore = document.querySelector("#score")
let _txtHighscore = document.querySelector("#highscore")
let _gameRuning = true

_txtHighscore.textContent = `Highscore: ${_highscore}`

window.addEventListener('keydown',(ke)=>{
	keyboard[ke.key] = true
})

window.addEventListener('keyup',(ke)=>{
	keyboard[ke.key] = false
})

window.addEventListener('mousemove',(me)=>{
	let rect = canvas.getBoundingClientRect ()
	mouseClick =	{ x:me.x - rect.x,y: me.y - rect.y }
})

function newEgg(){
	return new props.Egg({
		h:30,
		w:30,
		x: Math.random() * (canvas.clientWidth-30)   ,
		y: Math.random() * (canvas.clientHeight-30) 
	}) 
}

function getHighscore(){
	return localStorage.getItem("highscore")
}

/**@param {number} newScore */
function setHighscore(newScore){
	localStorage.setItem("highscore",newScore)
}

let _green_background = {
	r:100, g:150,b: 100, a:255
}
let _green = {
	r:0, g:255,b: 0, a:255
}
let _black = {
	r:0, g:0,b: 0, a:255
}

function background(){
	gfx.drawRect(_canvasRect,_green_background)
}

function draw(){
	gfx.clearBackground()
	background()

	gfx.drawRect(egg.shape,_black)

	_snake.body.forEach((b)=>{
		gfx.drawCircle(b,_green)
	})

	_particles.draw()
}

function handleTeleport(){
	if (!jwCL.checkCollisionCircleRec(_snake.body[0],_canvasRect)){
		if(_snake.body[0].y + _snake.body[0].r  < 0){
			_snake.body[0].y = _canvasRect.h
		}
		else if(_snake.body[0].x + _snake.body[0].r < 0){
			_snake.body[0].x = _canvasRect.w
		}
		else if(_snake.body[0].y >= _canvasRect.h){
			_snake.body[0].y = 0
		}
		else if(_snake.body[0].x >= _canvasRect.w)
		{
			_snake.body[0].x = 0
		}
	}
}

function update(){
	let colision = jwCL.checkCollisionCircleRec(_snake.body[0],egg.shape)

	if(colision){

		let amountParticules = _score > _highscore ? 100 : 20

		for (let i = 0; i < amountParticules; i++) {
			_particles.createParticle(egg.shape,undefined, Math.random() * 5,Math.random() * 200)
		}
		_score++
		_txtScore.textContent = `Score: ${_score}` 
		if(_score > _highscore){
			_txtHighscore.textContent = "NEW HIGHSCORE!"
		}
		egg = newEgg()
	}

	let snakeColision = false

	for (let index = 3; index < _snake.body.length; index++) {

		if(jwCL.checkCollisionCircles(_snake.body[0], _snake.body[index])){
			gfx.drawLine({
				p1:_snake.body[0],
				p2:_snake.body[index],
			})

			if(_score > _highscore)
			{
				
				setHighscore(_score)
			}

			snakeColision = true
			return
		}
	}


	if(!snakeColision){
		handleTeleport()
		_snake.move(	
			keyboard['a'] ? -1 : keyboard['d'] ? 1 : 0,
			colision,
			mouseClick

		)
		mouseClick = undefined
	}
	
}

setInterval(()=>{
	draw()

	if(_gameRuning)
	{
		update()
	}
},16)