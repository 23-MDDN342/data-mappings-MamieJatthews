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
  this.lipColour = [136, 68, 68]
  this.eyebrowColour = [119, 85, 17]

this.colourShift = 0;
this.eyeBrowValue = 50;
this.flowerValue = 0;
  /*
   * Draw the face with position lists that include:
   *    chin, right_eye, left_eye, right_eyebrow, left_eyebrow
   *    bottom_lip, top_lip, nose_tip, nose_bridge, 
   */  
  this.draw = function(positions) {
    console.log()
    // head
    ellipseMode(CENTER);
    stroke(stroke_color);
    fill(this.mainColour);
    ellipse(segment_average(positions.chin)[0], 0, 3, 4);
    noStroke();

    this.red = color(255,42,109)
    this.blue = color(5,217,232)
    this.currentColor = lerpColor(this.red,this.blue, this.colourShift)
    fill(0, 100, 100);
    stroke(this.currentColor);

    

    // mouth
    fill(this.detailColour);
    ellipse(segment_average(positions.bottom_lip)[0], segment_average(positions.bottom_lip)[1], 1.36, 0.25 * this.mouth_size);

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
    fill(this.chinColour);
    stroke(this.chinColour);
    this.draw_segment(positions.chin);
    
    

    fill(100, 0, 100);
    stroke(100, 0, 100);
    this.draw_segment(positions.nose_bridge);
    this.draw_segment(positions.nose_tip);

    strokeWeight(0.03);

    fill(this.lipColour);
    stroke(this.lipColour);
    this.draw_segment(positions.top_lip);
    this.draw_segment(positions.bottom_lip);

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
      
      this.chinPoint = positions.chin[15]
      //console.log(this.chinPoint)

      ellipse(this.chinPoint[0],this.chinPoint[1], .5)
      // fill(this.mainColour);
      // ellipse(left_eye_pos[0] + curEyeShift, left_eye_pos[1], 0.18);
      // ellipse(right_eye_pos[0] + curEyeShift, right_eye_pos[1], 0.18);
    
   // fill(0)
   //ellipse(0,0, 0.5,0.5) center point
   //rect(-2,-2,4.5,4) sizing debug 

   //hat 
   this.chinPoint0 = positions.chin[0]
   rect(this.chinPoint0[0], this.chinPoint0[1]-2, 3, 1);
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
    this.eyeBrowValue = map(settings[1], 0, 100, 0, 100);
    this.flowerValue = map(settings[2], 0, 100, 0, 20);
  }

  /* get internal properties as list of numbers 0-100 */
  this.getProperties = function() {
    let settings = new Array(3);
    settings[0] = map(this.colourShift,0, 1, 0, 100);
    settings[1] = map(this.eyeBrowValue, 0, 100, 0, 100);
    settings[2] = map(this.flowerValue,0, 20, 0, 100);
    return settings;
  }
}
