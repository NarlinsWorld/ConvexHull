//a dev function that shows the circumCircle for all triangles
function draw_cC(tri) {  
  let col = ['red', 'blue', 'black', 'green']; //point identification during development
  console.log('tri.length=', tri.length);
  for (let i = 0; i < tri.length; i++) { //do for each triangle
    noFill();
    stroke('#d58c21');
    let d = 2 * sqrt(tri[i].crSq);
    circle(tri[i].cx, tri[i].cy, d)
  }
}

function rightOrLeft(A, B, P) {
  //A is the startingPoint of line AB
  //B is the endPoint of line AB
  //P is an arbitrary Point in the plane
  // return LEFT is P is to the left of the line, else return right
  let u = [B[0] - A[0], B[1] - A[1]];
  let v = [P[0] - A[0], P[1] - A[1]];
  let det = u[0] * v[1] - u[1] * v[0];
  if (det > 0) {
    return "LEFT";
  }
  return "RIGHT";
}

/* a single line function to return a random integer between min and max inclusive
 */
function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomRealFromInterval(min, max){
  return Math.random() * (max - min +1) + min;
}

/* return a randomly chosen array of (x,y) pairs. The values will be integer and between
xmin xmax and ymin ymax. 

explanation of js sort -> https://medium.com/konsole-blog/javascript-array-sort-method-explained-with-examples-7450af3eae0a
let test_data = [[146,69],[103,85],[274,211],[1148,215],[58,296],[1304,250],[92,218],[172,116],[131,144],[93,101]];  
console.log(test_data.sort((a,b)=>a[0]-b[0]));
*/
function pointArray(npts, xmin, xmax, ymin, ymax, sortX_TF) { //if sortX_TF is true, then sort the points by the x coordinate
  let plocal = [];
  for (let i = 0; i < npts; i++) {
    plocal.push(
      [randomRealFromInterval(xmin, xmax),
      randomRealFromInterval(ymin, ymax)]);
  }
  if (sortX_TF){
    plocal.sort((a,b)=>a[1]-b[1]); //  sort on the y coordinate in order to break any ties in x
    plocal.sort((a,b)=>a[0]-b[0]); //sort again on the x coordinate
  }
  return plocal;
}



//the set of spiral points must stay under the 300 size limit.
function _pointsSpiral(n, xmin, xmax, ymin, ymax) {
  let p = [];
  let i = -1;
  let a = 10
  for (let t = 0; t < n-3; t++) {
    i += 1;
    p[i] = new Vertex([-a*t * sin(t) + 150, -a*t * cos(t) + 150]);
  }

  return p;
}



// Draw all points onto the canvas.
// The point size is the 3rd argument of circle(x,y,size)
function drawPts(ptsArr,size=5) {
  let col = ["red", "blue", "black", "green"]; //point identification during development
  push();
  for (let i = 0; i < ptsArr.length; i++) {
    fill(col[i % 4]);
    circle(ptsArr[i][0], ptsArr[i][1], size);
  }
  pop();
}

/* Draws the triangles to the canvas.
 */
function drawTriangles(arr) {
  //passing in a array of triangle objects
  push();
  stroke("purple");
  for (let i = 0; i < arr.length; i++) {
    line(arr[i].x1, arr[i].y1, arr[i].x2, arr[i].y2);
    line(arr[i].x2, arr[i].y2, arr[i].x3, arr[i].y3);
    line(arr[i].x3, arr[i].y3, arr[i].x1, arr[i].y1);
  }
  pop();
}

// a debug function that writes triangle points to the console
// These might come from triangles[] or from badTriangles[]

function logTriangles(tri) {
  for (let i = 0; i < tri.length; i++) {
    console.log(
      "tri[" + i + "] indices= ",
      tri[i].i1,
      tri[i].i2,
      tri[i].i3,
      "(" +
      tri[i].P1.x +
      ", " +
      tri[i].P1.y +
      ") (" +
      tri[i].P2.x +
      ", " +
      tri[i].P2.y +
      ") (" +
      tri[i].P3.x +
      ", " +
      tri[i].P3.y +
      ") " +
      tri[i].bad
    );
  }
}

/* notSharedEdges(badTs) is used in step 5a to find the polygonal hole
     5a_1 if (edge is not shared by any other triangles in badTriangles) {add edge to polygon}
     This routine just returns the list of edges.
     Since each edge point came from createVector(), what is returned is an array of vector point pairs.  That explains why the if in this routine is so complex. 

     In essence, we are just looking thru all of the badTriangles and returning those edges which a not shared among those badTriangles. The points from all of those unshared edges define the polygonal hole that we will triangulate from our new point.  After that, all of the bad triangles get erased.

     This could be simplified but it would probably need a new data structure for the triangle class.
  */
     function notSharedEdges(badTs) {
      let unshared = [];
      let a, b, c, d;
      let matched = false;
      let allEds = [];
      for (let i = 0; i < badTs.length; i++) {
        allEds.push([badTs[i].i1, badTs[i].i2]);  // allEds.push([badTs[i].P1, badTs[i].P2]);
        allEds.push([badTs[i].i2, badTs[i].i3]);  // allEds.push([badTs[i].P2, badTs[i].P3]);
        allEds.push([badTs[i].i3, badTs[i].i1]);  // allEds.push([badTs[i].P3, badTs[i].P1]);
      } //allEds is an array of all edges in bad triangles
      // console.log('LIST ALL EDGES'); //debug
      // listEdges(allEds); //debug
      
      
      for (let i = 0; i < allEds.length; i++) {
        matched = false;
        for (let j = 0; j < allEds.length; j++) {
          if (i != j) {
            a = allEds[i][0]; 
            b = allEds[i][1]; 
            e = allEds[j][0]; 
            f = allEds[j][1];
            if ((a==e && b==f) ^ ((a==f && b==e))) {
              matched = true; 
              //break;
            } //'end if' test for shared edges
          } //end if for i!=j
        } //end loop on j
        if (matched == false) { 
          unshared.push(allEds[i]);
        } //end if for push edge
      } //end loop on i
      return unshared;
    
    } //end function
  
    /* this is a debug console write that is a bit complicated.
It will show on the console (x1,y1) (x2,y2) the two points
instead of showing the Vector.
*/
function listEdges(arr){//of the form [[vectorPoint],[vectorPoint]]
  for(let i=0;i<arr.length;i++){
    console.log(arr[i])
  }
}

    /* in step 3a, we marked the bad triangles as those whose circumcircle included the new point.  Then, in step 6 we call this function to remove those marked triangles from the array.  
  */
  function removeBad() { //triangles is a global
    for (let i = triangles.length - 1; i > -1; i = i - 1) {
      if (triangles[i].bad == true) {
        triangles.splice(i, 1);
      }
    }
  }
  
  function keepGood(){
    let localArr = [];
    for(let i=0; i<triangles.length; i++){
      if(triangles[i].bad == false){
        localArr.push(triangles[i]);
      }
    }
    return localArr;
  }

  /* This function will make all of the triangles from a new point to the polygonal hole.

function connectToPolygon_old(P){
  let tri=[];
  for(let i=0; i<polygon.length; i++){
    let P1 = Vector(polygon[i][0].x,polygon[i][0].y);
    let P2 = Vector(polygon[i][1].x,polygon[i][1].y);
    tri = new Triangle(P,P1,P2);
    triangles.push(tri);
  }
}
  */

  function connectToPolygon(point_index){
    let tri=[];
    for(let i=0; i<polygon.length; i++){
      tri = new Triangle(point_index,polygon[i][0],polygon[i][1]);
      triangles.push(tri);
  }
}

//Given an array of vertices
function connectTheDots(arr) {
  for (let i = 1; i < arr.length; i++) {
    line(arr[i - 1][0], arr[i - 1][1], arr[i][0], arr[i][1]);
  }
}

//given two points retrun their slope 
function dy(pt0, pt1) { //each point is a pair [x0,y0] and [x1,y1]
  let x0 = pt0[0], y0 = pt0[1];
  let x1 = pt1[0], y1 = pt1[1];
  return (y1 - y0) / (x1 - x0);
}

function arrangeEdgesCW(edgeArr) {
  let saveArr = [];
  saveArr.push(edgeArr[0]);
  for (let i = 1; i < edgeArr.length; i++) {
    let itemx = saveArr[i-1][1][0];
    let itemy = saveArr[i-1][1][1]; 
    for (let j = 0; j < edgeArr.length; j++) {
        if (itemx == edgeArr[j][0][0] && itemy == edgeArr[j][0][1]) {
          saveArr.push(edgeArr[j]);
          break;
        } //end if
    } //end for j
  } //end for i
  return saveArr;
}

function connectEdges(edgeArr) {
  for (let i = 0; i < edgeArr.length; i++) {
    line(edgeArr[i][0][0], edgeArr[i][0][1], edgeArr[i][1][0], edgeArr[i][1][1])
  }
}
