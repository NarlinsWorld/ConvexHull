<h2>Convex Hull</h2>

The javascript code is using the js.p5 library for canvas drawing. The number of data points is initially 100, and the user must click the Draw Hull button to see the canvas.  The randomly, selected type real, datapoints are graphed onto a 400 x 400 canvas and inside a range xmin = 50, xmax = 350, ymin = 50, ymax = 350.  

There is an error in the code such that if two points happen to be identical, then the convex hull will fail.  The program will continue to run, but an erronious drawing will appear.  Fortunately, using "real" random nummbers puts the probability for getting an identical pair at about zero. 

The code runs pretty fast.  10,000 points can be drawn in about 8 ms.  That is the execution time for finding the convex hull, not counting the time to actually draw it.  It makes more sense to look at 10 to 50 points, where one doesn't just always get a nearly perfect rectangle for the hull.

The method for coding comes from the textbook "computation Geometry" by Mark de Berg, Otfried Cheong, Marc van Kreveld and Mark Overmars. They provide pseudo-code for two different methods.  This is the second method.  The first one is quite slow.

<h2> Algorithm Overview</h2>

A set of random real datapoints (x,y) is created. Then the points are numerically sorted such that the smallest x values come first.  Furthermore, the y values are also sorted in a similar manner.  When the sorting is finished, the first point in the sorted list will have a smallest x value and a smallest y value. The y value sort is of no value to the routine, but the x value sort assures that the first datapoint will be on the convex hull.  

The approach is go left to right across the field and find the upper hull.  Then we go right to left across the field and find the lower hull.  Then we join the hulls and are done. The insight to how this method works is that as we go across the top of the hull we are always making a right turn.  **What do we mean by a right turn?**  Select any point and draw the line segment (and by extension the line) between the first point, which is on the hull and the selected point. Now select any third point from our set. The third point will be either above or below or on the line. If it is above the line, we call that a left turn.  If it is below the line, we call that a right turn.  We can build the top half of the hull incrementally if we add a point and then ask if the 3rd point resulted in a left or right turn.  If it was right, fine.  If it was left (technically known as "not right"), then we have to remove the middle point and ask the same question about the most recent 3 points.  Let's look at an example.

Here is a small dataset which is already sorted.
(54, 283),(122,24),(204,134),(219,180),(248,153),(284,349),(285,329),(291,212).
