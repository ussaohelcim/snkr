//Particle system for jwf

interface IParticle extends IVec2{
	/**
	 * Ticks to live
	 */
	ttl:number
	angle:number
	color:IColor
	speed:number
	size:number
}

interface IParty{
	particleList:IParticle[]
	_gfx:CanvasRenderingContext2D
	draw():void
	createParticle(pos:IVec2,angle:number,speed:number,ttl:number, color?:IColor):void
}
/**@private */

/**
 * Just works particle system. You are supposed to create one for each type of particle.  
 * @param ctx add the jwf.gfx here.
 * @param size Size of the particles. (radius)
 * @returns 
 */
const PARTY = (ctx:CanvasRenderingContext2D,size = 3,color?:IColor):IParty=>{

	return {
		_gfx : ctx,
		particleList : [],
		/**
		 * Draws and update all particles. Also decreases the particle ttl every time this is called.
		 */
		draw: function(){
			this.particleList.forEach((p)=>{
				this._gfx.beginPath();
				this._gfx.arc(p.x,p.y,size,0,Math.PI * 2)
				this._gfx.fillStyle = _colorToString(p.color) 
				this._gfx.fill()

				let dir = __AngleToNormalizedVector2(p.angle)
				let nPos = __vector2Add(
					{x:p.x,y:p.y},
					_vector2Scale(dir,p.speed)
				)
				p.x = nPos.x
				p.y = nPos.y

				p.ttl--
			})

			this.particleList = this.particleList.filter((p)=>{
				return p.ttl > 0
			})
		},
		/**
		 * 
		 * @param pos Particle inital position
		 * @param ttl TICKs to live. The amount of frames this particle will live
		 */
		createParticle: function(pos:IVec2, angle?, speed = 5,ttl:number = 60, _color = color){

			const _getParticle = (pos:IVec2,size:number, speed = 10, ttl:number = 60, color?:IColor)=>{
				let p:IParticle = {
					x : pos.x,
					y : pos.y,
					speed: speed,
					ttl : ttl,
					angle : angle ?? Math.random() * Math.PI * 2 ,
					color: color ?? ____randColor(),
					size: size
				}
				return p
			}

			this.particleList.push(_getParticle(pos,size,speed,ttl,color))
		},
		
	}
}
/**@private */
function ____randColor():IColor{
	return {
		r: Math.random() * 255,
		g: Math.random() * 255,
		b: Math.random() * 255,
		a:255
	}
}
/**@private */
function _colorToString(color:IColor) {
	return `rgba(${color.r},${color.g},${color.b},${color.a ?? 255})`
}
/**@private */
function __AngleToNormalizedVector2(angle:number){
	return {
		x: Math.cos(angle),
		y: Math.sin(angle)
	};
}

function __normalizedVector2ToAngle(v:IVec2){
	return Math.atan2(v.y,v.x);
}

function __vector2Add(v1:IVec2,v2:IVec2){
	return {x:v1.x + v2.x, y:v1.y + v2.y}
}
function _vector2Scale(v:IVec2,scale:number){
	return {x: v.x * scale,y:v.y * scale}
}