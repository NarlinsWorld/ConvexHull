//Graph a field of points (x y vertices) and then draw the convex hull around them.


function setup() {
  createCanvas(400, 400);
  let npts = 8;
  let xmin = 50, xmax = 350, ymin = 50, ymax = 350, sortX_TF = true;
  let p = pointArray(npts, xmin, xmax, ymin, ymax, sortX_TF);

  p = [[54,283],[122,248],[204,134],[219,180],[248,153],[284,349],[285,329],[291,212]]; //test data

  /*the points are sorted. abbreviate convex hull = CH(P)
  1) The leftmost point (1st one in the sorted list) is on the CH(P).
  2) Put the points p1 and p2 in a list Lupper with p1 and the first point.
  3) for i <-- 3 to n
  4)    do Append pi to Lupper.
  5)        while Lupper contains more than two points AND the last three points
                  in Lupper do not make a right turn
  6)           do Delete the middle of the last three points from Lupper
  7) Put the points p(n) and p(n-1) in a list Llower, with p(n) as the first point.
  8) for i <-- (n-2) downto 1
  9)    do Append p(i) to Llower.
  10)       while Llower contains more than two points AND the last three points 
                  in Llower do not make a right turn.
  11)              do Delete the middle of the last three points from Llower.
  12) Remove the first and the last point from Llower to avoid duplicatyion 
           of the points where the upper and lower hull meet.  
  13) Append Llower to Lupper, and call the resulting list L
  14) return L  
  */

  let Lu = [p[0],p[1]]; nLu=1; //nLu is the index
  for (let i=2; i<p.length; i++){                      //step 3
    Lu.push(p[i]);  nLu = nLu + 1;                                 //step 4
    if (rightOrLeft(Lu[nLu-2],Lu[nLu-1],Lu[nLu]) != "RIGHT") { //is p[i] to the LEFT of segment (p[i-2],p[i-1]) step 5
      let ar = Lu.splice(i-1,1); nLu=nLu-1;                           //step 6 remove p(i-1) frm Lu                                
    } //end if
    console.log('i=',i,' Lu=',Lu);
    break;
  } //end for i

 



  background(220);
  translate(0, height);
  scale(1, -1);
  drawPts(p);
  fill("white");
  circle(p[0][0], p[0][1], 10); //our first point
  
  connectTheDots(Lu);

  //show the pts
  for(let i=0; i<p.length; i++){
    console.log(p[i]);
  }
  


}



function draw() {
}