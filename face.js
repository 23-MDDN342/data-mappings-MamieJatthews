/*
 * FaceMap class - holds all informaiton about one mapped
 * face and is able to draw itself.
 */  

// remove this or set to false to enable full program (load will be slower)
var DEBUG_MODE = true;

// this can be used to set the number of sliders to show
var NUM_SLIDERS = 3;

// other variables can be in here too
// here's some examples for colors used


const stroke_color = [95, 52, 8];

// example of a global function
// given a segment, this returns the average point [x, y]
function segment_average(segment) {
  let sum_x = 0;
  let sum_y = 0;
  let s_len = segment.length;
  for (let i=0; i<s_len; i++) {
    sum_x = sum_x + segment[i][0];
    sum_y = sum_y + segment[i][1];
  }
  return [sum_x / s_len , sum_y / s_len ];
}

// This where you define your own face object
function Face() {
  // these are state variables for a face
  // (your variables should be different!)
  this.detailColour = [204, 136, 17];
  this.mainColour = [51, 119, 153];
  this.num_eyes = 2;    // can be either 1 (cyclops) or 2 (two eyes)
  this.eye_shift = -1;   // range is -10 to 10
  this.mouth_size = 1;  // range is 0.5 to 8

  this.chinColour = [153, 153, 51]
  //this.lipColour = [136, 68, 68]
  this.eyebrowColour = [119, 85, 17]

this.colourShift = 50;
this.hairLength = 0;
this.lipColour = 0;
  /*
   * Draw the face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge, 
   */  
  this.draw = function(positions) {
    console.log()


    this.red = color(41, 21, 4);
    this.blue = color(250, 198, 102);
    this.currentColor = lerpColor(this.red,this.blue, this.colourShift)
    fill(0, 100, 100);
    stroke(this.currentColor);



    //hair back
    stroke(0)
    strokeWeight(0.05);
    this.chinPoint0 = positions.chin[0];
    this.chinPoint16 = positions.chin[16];
   fill(this.currentColor);

   //if slider is above 80 have hair be longest 
   if(this.hairLength > 80) {
   rect(this.chinPoint0[0]-.5, this.chinPoint0[1], 1.5, 4, 0, 0, 5, 0);
   rect(this.chinPoint16[0]-1, this.chinPoint16[1], 1.5, 4, 0, 0, 0, 1);
   }
   //if slider is above 60 have medium long hair
   if(this.hairLength > 60){
   rect(this.chinPoint0[0]-.8, this.chinPoint0[1]-0.5, 1.5, 3, 0, 0, 0, 1);
   rect(this.chinPoint16[0]-0.7, this.chinPoint16[1]-0.5, 1.5, 3, 0, 0, 1, 0);
   }
  

   // head
  this.chin1 = positions.chin[1];
  this.chin14 = positions.chin[14];
  this.chin7 = positions.chin[7];

  this.chin9 = positions.chin[9];
  this.chin15 = positions.chin[15];
  

   ellipseMode(CENTER);
   fill(235, 126, 9);
   rect(this.chinPoint0[0], this.chinPoint0[1]-2, 3.5, 3, 5, 5, 0, 0);
   fill(252, 207, 3);
   triangle(this.chin1[0], this.chin1[1],
            this.chin14[0], this.chin14[1],
            this.chin7[0], this.chin7[1]);
    fill(242, 120, 104);       
   triangle(this.chin7[0], this.chin7[1],
            this.chin9[0]+0.8, this.chin9[1]-0.4,
            this.chin15[0], this.chin15[1]);
   

   //hair top
   this.chinPoint0 = positions.chin[0];
   
   fill(this.currentColor);
   
   if(this.hairLength > 20){
   rect(this.chinPoint0[0], this.chinPoint0[1]-2.6, 3.5, 1.5, 5, 5, 0, 0);
   }
   if(this.hairLength > 40){
   arc(this.chinPoint0[0]+0.1, this.chinPoint0[1]-1.4, 2, 3, 290, 150, CHORD)
   arc(this.chinPoint16[0]+0.1, this.chinPoint16[1]-1.4, 2, 3, 50, 240, CHORD)
   } 

   //nose
   fill(0, 100, 100);
   this.noseTop = positions.nose_bridge[0];
   this.noseLeft = positions.nose_tip[0];
   this.noseRight = positions.nose_tip[4];

   //create squidward shape nose using quad
   quad(this.noseTop[0]-0.2, this.noseTop[1]-1,
        this.noseTop[0]+0.2, this.noseTop[1]-1,
        this.noseRight[0]+0.2, this.noseRight[1]+0.3,
        this.noseLeft[0]-0.2, this.noseLeft[1]+0.3);

    // mouth

    // strokeWeight(0.03);

    // fill(this.lipColour);
    // stroke(this.lipColour);
    // this.draw_segment(positions.top_lip);
    // this.draw_segment(positions.bottom_lip);

    this.topLipL = positions.top_lip[0];
    this.topLipT = positions.top_lip[3];
    this.topLipR = positions.top_lip[6];

    this.botLipL = positions.bottom_lip[6];
    this.botLipT = positions.bottom_lip[3];
    this.botLipR = positions.bottom_lip[0];

    if(this.lipColour < 50){
    fill(180, 0, 0);
    }
    if(this.lipColour > 50){
      fill(235, 148, 148);
      }

    //ellipse(segment_average(positions.bottom_lip)[0], segment_average(positions.bottom_lip)[1], 1.36, 0.25 * this.mouth_size);
    
    triangle(this.topLipL[0]-0.2, this.topLipL[1],
      this.topLipT[0], this.topLipT[1]-0.2,
      this.topLipR[0]+0.2, this.topLipR[1]);

    triangle(this.botLipL[0]-0.2, this.botLipL[1],
      this.botLipT[0], this.botLipT[1],
      this.botLipR[0], this.botLipR[1]);

    // eyebrows
    fill( this.eyebrowColour);
    stroke( this.currentColor);
    strokeWeight(0.08);
    //this.draw_segment(positions.left_eyebrow);
    //this.draw_segment(positions.right_eyebrow);

    //set variables for left eyebrow
    this.browLeft = positions.left_eyebrow[1]
    this.browRight = positions.left_eyebrow[4]
    this.browTop = positions.left_eyebrow[3]

    //set variables for right eyebrow
    this.browLeft_R = positions.right_eyebrow[1]
    this.browRight_R = positions.right_eyebrow[4]
    this.browTop_R = positions.right_eyebrow[3]

    //ellipse(this.browLeft[0], this.browLeft[1], .1, .5);
  
    //draw eyebrows as a triangular representation
    stroke(0);
    strokeWeight(0.05);
    triangle(this.browLeft[0]-0.2, this.browLeft[1],
             this.browTop[0], this.browTop[1]-0.2,
             this.browRight[0]+0.2, this.browRight[1]);

    triangle(this.browLeft_R[0]-0.2, this.browLeft_R[1],
             this.browTop_R[0], this.browTop_R[1]-0.2,
             this.browRight_R[0]+0.2, this.browRight_R[1]);      

    //ellipse(segment_average(positions.left_eyebrow)[0], segment_average(positions.left_eyebrow)[1], 1, 1);
    //ellipse(segment_average(positions.right_eyebrow)[0], segment_average(positions.right_eyebrow)[1], 1, 1);

    // draw the chin segment using points
    //this.draw_segment(positions.chin);
    

    let left_eye_pos = segment_average(positions.left_eye);
    let right_eye_pos = segment_average(positions.right_eye);

    // eyes
    strokeWeight(0.05);
    stroke(0);
    let curEyeShift = 0.04 * this.eye_shift;
    
      fill(255);
      ellipse(left_eye_pos[0], left_eye_pos[1], 1, 0.5);
      ellipse(right_eye_pos[0], right_eye_pos[1], 1, 0.5);
      fill(0);
      ellipse(left_eye_pos[0], left_eye_pos[1], 0.25, 0.25);
      ellipse(right_eye_pos[0], right_eye_pos[1], 0.25, 0.25);
      fill(0, 100, 0);
      arc(left_eye_pos[0], left_eye_pos[1], 1, 0.5, 180, 0, CHORD)
      arc(right_eye_pos[0], right_eye_pos[1], 1, 0.5, 180, 0, CHORD)
      
      //this.chinPoint = positions.chin[15]
      //console.log(this.chinPoint)

      
      // fill(this.mainColour);
      // ellipse(left_eye_pos[0] + curEyeShift, left_eye_pos[1], 0.18);
      // ellipse(right_eye_pos[0] + curEyeShift, right_eye_pos[1], 0.18);
    
   // fill(0)
   //ellipse(0,0, 0.5,0.5) center point
   //rect(-2,-2,4.5,4) sizing debug 

   //hat 
  //  this.chinPoint0 = positions.chin[0]
  //  fill(this.currentColor);
  //  rect(this.chinPoint0[0], this.chinPoint0[1]-2, 3, 1);
  }

  // example of a function *inside* the face object.
  // this draws a segment, and do_loop will connect the ends if true
  this.draw_segment = function(segment, do_loop) {
    for(let i=0; i<segment.length; i++) {
        let px = segment[i][0];
        let py = segment[i][1];
        ellipse(px, py, 0.1);
        if(i < segment.length - 1) {
          let nx = segment[i+1][0];
          let ny = segment[i+1][1];
          line(px, py, nx, ny);
        }
        else if(do_loop) {
          let nx = segment[0][0];
          let ny = segment[0][1];
          line(px, py, nx, ny);
        }
    }
  };

  /* set internal properties based on list numbers 0-100 */
  this.setProperties = function(settings) {
    this.colourShift = map(settings[0], 0, 100, 0, 1);
    this.hairLength = map(settings[1], 0, 100, 0, 100);
    this.lipColour = map(settings[2], 0, 100, 0, 100);
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(3);
    settings[0] = map(this.colourShift,0, 1, 0, 100);
    settings[1] = map(this.hairLength, 0, 100, 0, 100);
    settings[2] = map(this.lipColour,0, 100, 0, 100);
    return settings;
  }
}
