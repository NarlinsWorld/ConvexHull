//Graph a field of points (x y vertices) and then draw the convex hull around them.


function setup() {
  createCanvas(400, 400);
  let npts = 60;
  let xmin = 50, xmax = 350, ymin = 50, ymax = 350, sortX_TF = true;
  let p = pointArray(npts, xmin, xmax, ymin, ymax, sortX_TF);


  /*the points are sorted. abbreviate convex hull = CH(P)
  1) The leftmost point (1st one in the sorted list) is on the CH(P).
  2) Imagine a line segment (edge) between it and the next point.
  3) Now get a 3rd Point, and a 4th, and a 5th . . .
  4) If any of those points lie to the LEFT of our segement (edge) then that edge cannot be on CH(P).
  5) But if none lie to the LEFT, then that edge is on CH(P).
  6) So add it.
  7) Do 2) thru 6) for all ordered pairs.  It is slow but effective.
  */


  let valid;
  let E = []; //lets create a list of edges around the convex hull
  for (let i = 0; i < p.length; i++) {
    for (let j = 0; j < p.length; j++) {
      if (i != j) {
        valid = true;
        for (let r = 0; r < p.length; r++) {
          if (r != i && r != j) {
            if (rightOrLeft(p[i], p[j], p[r]) == "LEFT") { valid = false; }
          }//end if
        }// end for r
        if (valid) {
          E.push([p[i], p[j]]); //this is an edge not a point
        }
      }//end if
    }//end for j
  }// end for i



  background(220);
  translate(0, height);
  scale(1, -1);
  drawPts(p);
  fill("white");
  circle(p[0][0], p[0][1], 10); //our first point
  circle(p[1][0], p[1][1], 7); //our second point

  
//Now put the edges into clockwise order.
  //show the original edge array
  console.log('Original Edge array')
  for (let i = 0; i < E.length; i++) {
    console.log(E[i][0][0], E[i][0][1], E[i][1][0], E[i][1][1])
  }

  let newE = arrangeEdgesCW(E);
  //show the arranged edge array
  console.log('ClockWise arrangement for the edge array')
  for (let i = 0; i < newE.length; i++) {
    console.log(newE[i][0][0], newE[i][0][1], newE[i][1][0], newE[i][1][1])
  }
  console.log(newE);
  connectEdges(newE);

}



function draw() {
}