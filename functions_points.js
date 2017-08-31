function checkPointClick() {
    // Check if a point is clicked
    for (var i = 0; i < pt_array.length; i++) {

        // Distance of mouse position to point
        dist = sqrt(sq(pt_array[i].x - mouseX) + sq(pt_array[i].y - mouseY));

        // Point is clicked
        if (dist <= tolerance) {
            //print('clicked on point');
            point_clicked = true;

            // Change color of point
            pt_array[i].stroke_color = clr;

            clickedID = i;

            // Check if the first_point is clicked
            if (first_point) {
                //print('this is second point');
                // A segment from the first_point exists
                // Check if there are segments intersecting
                if (intersects) {
                    // Check if intersection of two segments is within tolerance of the point clicked
                    if (abs(Xa - pt_array[i].x) <= tolerance &&
                        abs(Ya - pt_array[i].y) <= tolerance) {
                        // Don't consider intersected, use point as second_point
                        ln_array.push(new Line(first_point.x, first_point.y, pt_array[i].x, pt_array[i].y, clr));

                        // Check if a triangle is formed
                        checkTriangleFormation();

                        first_point.old_color = clr;
                        first_point = null;
                        lineDrawing = false;
                        clickedID = null;
                        player = !player;
                    } else {
                        // Consider segments intersected, can't draw line (undo move)
                        lineDrawing = false;
                        first_point = null;
                        clickedID = null;
                        pt_array[i].stroke_color = pt_array[i].old_color;
                    }
                } else {
                    // Add new line segment
                    ln_array.push(new Line(first_point.x, first_point.y, pt_array[i].x, pt_array[i].y, clr));

                    // Check if a triangle is formed
                    checkTriangleFormation();

                    pt_array[i].old_color = clr;
                    first_point.old_color = clr;
                    first_point = null;
                    lineDrawing = false;
                    clickedID = null;
                    player = !player;
                }
            } else {
                //print('this is first point');
                // Start drawing new segment 
                first_point = pt_array[i];
                lineDrawing = true;
            }
            i = pt_array.length;
        }
    }
}

var pt1_X, pt1_Y, pt2_X, pt2_Y, pt3_X, pt3_Y, pt4_X, pt4_Y;
var isTri;

function checkTriangleFormation() {

    i = ln_array.length - 1;

    pt1_X = ln_array[i].x1;
    pt1_Y = ln_array[i].y1;
    pt2_X = ln_array[i].x2;
    pt2_Y = ln_array[i].y2;

    for (var j = 0; j < ln_array.length; j++) {
        if (i != j) {

            pt3_X = ln_array[j].x1;
            pt3_Y = ln_array[j].y1;
            pt4_X = ln_array[j].x2;
            pt4_Y = ln_array[j].y2;

            if ((pt3_X == pt1_X) && (pt3_Y == pt1_Y)) {
                isTri = thirdLineTest(i, j, pt4_X, pt4_Y, pt2_X, pt2_Y);
            } else if ((pt3_X == pt2_X) && (pt3_Y == pt1_Y)) {
                isTri = thirdLineTest(i, j, pt4_X, pt4_Y, pt1_X, pt1_Y);
            } else if ((pt4_X == pt1_X) && (pt4_Y == pt1_Y)) {
                isTri = thirdLineTest(i, j, pt3_X, pt3_Y, pt2_X, pt2_Y);
            } else if ((pt4_X == pt2_X) && (pt4_Y == pt2_Y)) {
                isTri = thirdLineTest(i, j, pt3_X, pt3_Y, pt1_X, pt1_Y);
            }
        }
    }


    print(isTri);
}

function thirdLineTest(i, j, final_pt_X, final_pt_Y, first_pt_X, first_pt_Y) {

    for (var k = 0; k < ln_array.length; k++) {

        if (k != i && k != j) {

            if (((ln_array[k].x1 == final_pt_X) &&
                    (ln_array[k].y1 == final_pt_Y) &&
                    (ln_array[k].x2 == first_pt_X) &&
                    (ln_array[k].y2 == first_pt_Y)) ||
                ((ln_array[k].x2 == final_pt_X) &&
                    (ln_array[k].y2 == final_pt_Y) &&
                    (ln_array[k].x1 == first_pt_X) &&
                    (ln_array[k].y1 == first_pt_Y))) {
                return true;
            }

        }
    }
}
