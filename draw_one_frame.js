

function draw_one_frame(cur_frac) {
	noStroke();
	fill(0); // black background
	rect(0, 0, width, height);
  
	push()
	translate(width/2, height/2)//set origin point (0, 0) to middle of screen 
	noFill();

	rect(0.6*width, 0.6*height, 0.4*width, 0.4*height);

	strokeWeight(2);
	stroke(200);


	//lines that create perspective 
	line(-width/128, -height/32, -width/2, -height/.5);
	line(-width/48, -height/64, -width/2, -height/2.7);
	line(-width/48, height/64, -width/2, height/2.7);
	line(-width/128, height/32, -width/2, height/.5);
	line(width/128, -height/32, width/2, -height/.5);
	line(width/48, -height/64, width/2, -height/2.7);
	line(width/48, height/64, width/2, height/2.7);
	line(width/128, height/32, width/2, height/.5);
	
	//x and y lines 
	// line(0, height/2, 0, -height/2);
	// line(width, 0, -width, 0)

	//centre cirlce
	fill(200)
	ellipse(0,0, width/ 200)

	//Determine reference grid points for background lines
	strokeWeight(10);
	let grid_points = [
	  0.0 * height,
	  0.02 * height,
	  0.04 * height,
	  0.08 * height,
	  0.16 * height,
	  0.32 * height,
	  0.64 * height,
	  0.128 * height,
	  0.256 * height,
	  0.512 * height
	  
	]
	
	//debug gridpoints lines 
	if (debugView) {
	  strokeWeight(1);
	  stroke(255, 0, 0);
	  for(let i=0; i<grid_points.length; i++) {
		line(0, grid_points[i], width, grid_points[i]);
	  }
	}
	
	//draw background lines 
	strokeWeight(1);
	stroke(0, 200, 0); //neon green 
	noFill();
	for(let i=0; i<grid_points.length-1; i++) {
	  let cur_grid_line = map(cur_frac, 0, 1, grid_points[i], grid_points[i+1])
	 //scale(cur_frac*2);
	 line(-width, cur_grid_line, width, cur_grid_line);
	 line(-width*2, -cur_grid_line, width*2, -cur_grid_line);
	 line(cur_grid_line*2, -height, cur_grid_line*2, height);
	 line(-cur_grid_line*2, -height, -cur_grid_line*2, height);

	 //circle which zoom small to large
	 push()
	 stroke(255, 0, 0)
	 strokeWeight(height/600)
	 scale(cur_grid_line);
	 ellipse(0, 0, 200);
	 pop();
	 
	 //Draw octagon zoom sequence
	 push()
	 strokeWeight(0.5)
	 //scale(cur_frac*10);
	 let scaleMap = map(cur_frac, 0, 1, 10, 5);
	 let scaleMap2 = map(cur_frac, 0, 1, 20, 10);
	 let scaleMap3 = map(cur_frac, 0, 1, 40, 30);
	 let scaleMap4 = map(cur_frac, 0, 1, 30, 20);
	 let scaleMap5 = map(cur_frac, 0, 1, 5, 0.5);
	 
	 drawOct(scaleMap);
	 drawOct(scaleMap2);
	 drawOct(scaleMap3);
	 drawOct(scaleMap4);
	 drawOct(scaleMap5);
	 drawOct(30);
	 drawOct(4);

	//Octagons which zoom large to small
	//  let scaleMap6 = map(cur_frac, 0, 1, 1, 30);
	//  let scaleMap7 = map(cur_frac, 0, 1, 1, 10);
	 let scaleMap8 = map(cur_frac, 0, 1, height/15, 1);
	//  let scaleMap9 = map(cur_frac, 0, 1, 0.5, 5);
	 
	//  drawOct(scaleMap6);
	//  drawOct(scaleMap7);
	//  drawOct(scaleMap8);
	//  drawOct(scaleMap9);

	drawCirc(scaleMap8);

	 pop()
	}
	
 




pop()
  }

  //Draw function for Octagon
  function drawOct (scaleFactor){
	strokeWeight(height/ 500)
	stroke(255)
	beginShape();
	vertex(-width/(scaleFactor*4), -height/(scaleFactor));
	vertex(-width/(scaleFactor*1.5), -height/(scaleFactor*2));
	vertex(-width/(scaleFactor*1.5), height/(scaleFactor*2));
	vertex(-width/(scaleFactor*4), height/(scaleFactor));
	vertex(width/(scaleFactor*4), height/(scaleFactor));
	vertex(width/(scaleFactor*1.5), height/(scaleFactor*2));
	vertex(width/(scaleFactor*1.5), -height/(scaleFactor*2));
	vertex(width/(scaleFactor*4), -height/(scaleFactor));
	endShape(CLOSE);
  }

  //Draw Function for circle 
  function drawCirc (scaleFactor){
	strokeWeight(height/ 200)
	stroke(255, 0, 0)
	ellipse(0, 0, scaleFactor*30);
  }



