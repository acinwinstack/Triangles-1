function newLine() {
    // Check if supposed to draw line for the moment
    if (lineDrawing) {

        stroke(clr);

        // Check if the first line has been allocated
        if (ln_array.length > 0) {

            // Loop through every exsisting line segments to check intersection
            for (var i = 0; i < ln_array.length; i++) {

                // segment1: (pt_array[clickeID].x, pt_array[clickedID].y)  (mouseX, mouseY)
                // segment2: (ln_array[i].x1, ln_array[i].y1)  (ln_array[i].x2, ln_array[i].y2)
                // Check if the two segments intersect
                intersects = checkIntersect(pt_array[clickedID].x, pt_array[clickedID].y, mouseX, mouseY, ln_array[i].x1, ln_array[i].y1, ln_array[i].x2, ln_array[i].y2);

                if (intersects) {
                    clickable = false;
                    line(pt_array[clickedID].x, pt_array[clickedID].y, Xa, Ya);
                    break;
                } else {
                    clickable = true;
                }
            }

            // New segment doesn't intersect with any existing segment
            if (clickable) {
                line(pt_array[clickedID].x, pt_array[clickedID].y, mouseX, mouseY);
            }

        } else {
            //print('drawing line');
            // There's no existing segments
            line(pt_array[clickedID].x, pt_array[clickedID].y, mouseX, mouseY);
        }
    }
}

function checkIntersect(s1x1, s1y1, s1x2, s1y2, s2x1, s2y1, s2x2, s2y2) {

    // Use integers for precise graphic pixel coordinates
    s1x1 = int(s1x1);
    s1x2 = int(s1x2);
    s1y1 = int(s1y1);
    s1y2 = int(s1y2);
    s2x1 = int(s2x1);
    s2x2 = int(s2x2);
    s2y1 = int(s2y1);
    s2y2 = int(s2y2);

    // segment1: y = m1 * x + b1
    // segment2: y = m2 * x + b2
    var m1, b1, m2, b2;

    // Vertical segments
    if (s1x1 == s1x2) {

        // Both segments are vertical
        if (s2x1 == s2x2) {

            // Check if the two segments overlay
            if ((max(s1y1, s1y2) > min(s2y1, s2y2) && max(s1y1, s1y2) < max(s2y1, s2y2)) ||
                (min(s1y1, s1y2) > min(s2y1, s2y2) && min(s1y1, s1y2) < max(s2y1, s2y2))) {
                return true;
            } else {
                return false;
            }
        }

        // Only segment1 is vertical, check if segment2 intersects with it
        m2 = (s2y1 - s2y2) / (s2x1 - s2x2);
        b2 = s2y1 - (m2 * s2x1);
        Xa = s1x1;
        Ya = m2 * Xa + b2;
        if (Ya < max(s1y1, s1y2) && Ya > min(s1y1, s1y2)) {
            return true;
        } else {
            return false;
        }

    } else if (s2x1 == s2x2) {

        // Only segment2 is vertical, check if segment1 intersects with it
        m1 = (s1y1 - s1y2) / (s1x1 - s1x2);
        b1 = s1y1 - (m1 * s1x1);
        Xa = s2x1;
        Ya = m1 * Xa + b1;
        if (Ya < max(s2y1, s2y2) && Ya > min(s2y1, s2y2)) {
            return true;
        } else {
            return false;
        }
    }

    // Neither are vertical, hence calculate slope and bias for both
    m1 = (s1y1 - s1y2) / (s1x1 - s1x2);
    b1 = s1y1 - (m1 * s1x1);
    m2 = (s2y1 - s2y2) / (s2x1 - s2x2);
    b2 = s2y1 - (m2 * s2x1);

    // Debug yellow lines when checking intersections
    if (debug_line) {
        stroke('#ffff00');
        line(0, b1, 600, 600 * m1 + b1);
        line(0, b2, 600, 600 * m2 + b2);

        // Reset stoke color
        stroke(clr);
    }

    // Parallel segments
    if (m1 == m2) {
        // Check if the two segments overlay
        if ((max(s1x1, s1x2) > min(s2x1, s2x2) && max(s1x1, s1x2) < max(s2x1, s2x2)) ||
            (min(s1x1, s1x2) > min(s2x1, s2x2) && min(s1x1, s1x2) < max(s2x1, s2x2))) {
            return true;
        }
        // No intersections if not overlayed
        return false;
    }

    // Find intersecting coords if segments intersect (Xa, Ya)
    // Ya = m1 * Xint + b1 = m2 * Xa + b2
    Xa = (b2 - b1) / (m1 - m2);
    Ya = m1 * Xa + b1;

    // Check if intersection is inbound of the two segments
    if (Xa < max(s2x1, s2x2) &&
        Xa > min(s2x1, s2x2) &&
        Xa < max(s1x1, s1x2) &&
        Xa > min(s1x1, s1x2) &&
        Ya < max(s2y1, s2y2) &&
        Ya > min(s2y1, s2y2) &&
        Ya < max(s1y1, s1y2) &&
        Ya > min(s1y1, s1y2)) {
        return true;
    }

    // Intersection is out of bound
    return false;
}
