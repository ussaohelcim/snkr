declare interface IColor{
	/** Red, 0 .. 255 */
	r:number
	/** Green, 0 .. 255 */
	g:number
	/** Blue, 0 .. 255 */
	b:number
	/** Alpha, 0 .. 255 */
	a?:number
}

declare interface IVec2{
	x:number
	y:number
}

declare interface IRect extends IVec2{
	w:number
	h:number
}

declare interface ITriangle {
	p1:IVec2;	p2:IVec2;	p3:IVec2;
}

declare interface ICircle extends IVec2{
	r:number
}

declare interface ILine{
	p1:IVec2
	p2:IVec2
}

const __BLACK:IColor = { r:0,g:0,b:0,a: 255 }

const jwf = (canvas:HTMLCanvasElement) => {
	return {
		_canvas : canvas,
		gfx:canvas.getContext('2d'),
		drawPixel: function (pixel: IVec2): void {
			this.gfx?.beginPath()
			this.gfx?.fillRect(pixel.x,pixel.y,1,1)
		},
		drawLine: function (line:ILine,thick:number = 5,color = __BLACK):void{
			this.gfx?.beginPath()
			this.gfx!.lineWidth = thick
			this.gfx?.moveTo(line.p1.x,line.p1.y)
			this.gfx?.lineTo(line.p2.x,line.p2.y)
			this._stroke(thick,color)

		},
		drawLineBezier(startPos:IVec2,cp1:IVec2,cp2:IVec2,endPos:IVec2,thick:number=5,color?:IColor):void{
			this.gfx?.beginPath()
			this.gfx?.moveTo(startPos.x,startPos.y)
			this.gfx?.bezierCurveTo(
				cp1.x,cp1.y,
				cp2.x,cp2.y,
				endPos.x,endPos.y
			)
			this._stroke(thick,color)
			
		},
		//#region Rectangle
		/**
		 * 
		 * @param rect 
		 * @param color Optional
		 */
		drawRect: function (rect: IRect,color = __BLACK): void {
			this.gfx?.beginPath()
			this._fill(color)
			this.gfx?.fillRect(rect.x,rect.y,rect.w,rect.h)
		},
		drawRectangleLines: function (rect: IRect,color = __BLACK): void {
			this.gfx?.beginPath()

			this.gfx?.rect(rect.x,rect.y,rect.w,rect.h)
			this._stroke(5,color)
			// this.gfx?.stroke()
		},
		//#endregion
		//#region Circle
		drawCircle: function (circle: ICircle,color = __BLACK): void {
			this.gfx?.beginPath();
			this.gfx?.arc(circle.x,circle.y,circle.r,0,Math.PI * 2)
			this._fill(color)
		},
		drawCircleLines: function (circle: ICircle,color = __BLACK): void {
			this.gfx?.beginPath();
			this.gfx?.arc(circle.x,circle.y,circle.r,0,Math.PI * 2)
			this._stroke(5,color)
		},
		/**
		 * Draws an arc. 
		 * @param circle Circle shape
		 * @param startAngle start angle in RADIANS
		 * @param endAngle end angle in RADIANS
		 * @param color 
		 */
		drawCircleSector: function (circle: ICircle, startAngle:number, endAngle:number,color = __BLACK): void {
			this.gfx?.beginPath();
			this.gfx?.arc(circle.x,circle.y,circle.r,startAngle,endAngle)
			this._fill(color)
		},
		//#endregion
		drawImage: function (pos:IVec2,img:HTMLImageElement): void {
			this.gfx?.drawImage(img,pos.x,pos.y)
		},
		drawTriangle: function (triangle:ITriangle,color = __BLACK):void{
			this.gfx?.beginPath()

			this.gfx?.moveTo(triangle.p1.x,triangle.p1.y)

			this.gfx?.lineTo(triangle.p2.x,triangle.p2.y)
			this.gfx?.lineTo(triangle.p3.x,triangle.p3.y)
			this.gfx?.lineTo(triangle.p1.x,triangle.p1.y)

			this._fill(color)
			this.gfx?.closePath()

		},
		clearBackground: function (): void {
			this.gfx?.clearRect(0,0,canvas.width,canvas.height)
		},
		//#region Private functions
		//those functions below are supossed to only be used by the framework
		
		_colorToString(color:IColor) {
			return `rgba(${color.r},${color.g},${color.b},${color.a ?? 255})`
		},
		_fill(color:IColor) {
			this.gfx!.fillStyle =  this._colorToString(color)
			this.gfx!.fill()
		},
		_stroke(stroke:number = 5, color?:IColor){
			if(color){
				this.gfx!.strokeStyle = this._colorToString(color)
			}
			this.gfx!.lineWidth = stroke
			this.gfx?.stroke()
		},
		//#endregion
	}
}
