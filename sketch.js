//Graph a field of points (x y vertices) and then draw the convex hull around them.


function setup() {
  createCanvas(400, 400);
  let npts = 100;
  let xmin = 50, xmax = 350, ymin = 50, ymax = 350, sortX_TF = true;
  let p = pointArray(npts, xmin, xmax, ymin, ymax, sortX_TF);

  //p = [[54,283],[122,248],[204,134],[219,180],[248,153],[284,349],[285,329],[291,212]]; //test data
 

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

  let Lu = [p[0],p[1]]; //step 2
  

  //step 3 thru 6
  let t0; let A,B,P;
  for(let i=2; i<p.length; i++){
    Lu.push(p[i]);
    t0 = Date.now(); //set time for while loop safety
    condition = true;
     while(condition){
       if(Date.now()-t0 > 500){console.log("while loop timed out"); break;}
       P = Lu.length-1; //console.log("P=",P);
       B = Lu.length-2; //console.log("B=",B); 
       A = Lu.length-3; //console.log("A=",A); 
       if (rightOrLeft(Lu[A],Lu[B],Lu[P]) != "RIGHT"){Lu = axit(Lu,B);} else {condition = false;} 
       if(Lu.length <= 2){condition = false; //console.log("ended because Lu.length <=2");
        }
     }
    //console.log('End while loop for i=',i)
  }
  
//step 7. Put the points p(n) and p(n-1) in a list Llower, with p(n) as the first point.
let q = []; j=0;
for(let i=p.length-1; i>-1; i--){
  q[j] = p[i];
  j=j+1;
}

//steps 8 thru 11
  let Ll=[q[0],q[1]];
  for(let i=2; i<q.length; i++){
    Ll.push(q[i]);
    t0 = Date.now(); //set time for while loop safety
    condition = true;
     while(condition){
       if(Date.now()-t0 > 500){console.log("while loop timed out"); break;}
       P = Ll.length-1; //console.log("P=",P);
       B = Ll.length-2; //console.log("B=",B); 
       A = Ll.length-3; //console.log("A=",A); 
       if (rightOrLeft(Ll[A],Ll[B],Ll[P]) != "RIGHT"){Ll = axit(Ll,B);} else {condition = false;} 
       if(Ll.length <= 2){condition = false; //console.log("ended because Ll.length <=2");

       }
     }
    //console.log('End while loop for i=',i)
  }
  
  //step 12 Remove the 1st and last point of Ll
  Ll = axit(Ll,Ll.length-1);
  Ll = axit(Ll,0);

  //step 13 append Lu & Ll 
  for (let i=0; i<Ll.length; i++){
    Lu.push(Ll[i]);
  }
  //step 14 make list L for plotting
  let L = Lu;
  L.push(Lu[0]);

  background(220);
  translate(0, height);
  scale(1, -1);
  drawPts(p);
  fill("white");
  circle(p[0][0], p[0][1], 10); //our first point
  
  connectTheDots(L);
  //connectTheDots(Ll);

  /*show the pts
  for(let i=0; i<q.length; i++){
    console.log(q[i]);
  }
  */


}


/*function to remove 1 element from an array
whenever the array looks like [[x1,y1],[x2,y2],[x3,y3] ...]
*/
axit = function (arr,index){
  let temparr=[];
  for(let i=0; i<arr.length; i++){
    if(i != index){
      temparr.push(arr[i]);
    }
  }
  return temparr;
}
