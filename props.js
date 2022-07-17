class Rat{
	/**
	 * 
	 * @param {ICircle} shape 
	 */
	constructor(shape){
		this.shape = shape
	}
}

class Egg{
	/**@param {IRect} shape  */
	constructor(shape){
		this.shape = shape
	}
}

class snk{
	speed = 5
	turnSpeed = 5
	/**@type {ICircle[]} */
	body = []
	/**@param {ICircle} head */
	constructor(head){
		this.body.push(head)
		this.angle = jwML.DEG2RAD(45)
		// console.log(this.angle)
	}

	/**@param {number} dir [-1, 0, 1] */
	move(dir,collision,tgt){
		

		//TODO move the snake
		if(dir !== 0)
		{
			this.angle += jwML.DEG2RAD(dir * this.turnSpeed)
	
		}
		
		let d = jwML.AngleToNormalizedVector2(this.angle)

		if(tgt){
			//d = jwML.AngleToNormalizedVector2()
			dir = jwML.vector2Angle(this.body[0],tgt) 
			this.angle=	dir
		}

		let lastHead = {
			x:this.body[0].x,
			y:this.body[0].y,
			r:this.body[0].r
		} 

		// this.body[0].x += d.x * this.speed
		// this.body[0].y += d.y * this.speed

		lastHead.x += d.x * this.speed//lastHead.r * 2
		lastHead.y += d.y * this.speed//lastHead.r * 2

		// let newHead = this.body[0]

		if(!collision){
			// lastHead.r *= 2
			this.body.pop()
		} else{
			// console.log(this.body.length)
			// console.log(this.body.pop())
			
		}

		let newHead = lastHead

		this.body.unshift( newHead )

	}

}

export default {
	Rat, Egg, snk
}