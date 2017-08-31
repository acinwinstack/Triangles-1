var pt_array = new Array(0);
var ln_array = new Array(0);

// boolean player1 = true, player2 = false
var player = true;

var level = 8;
var point_size = 20;
var tolerance = point_size / 2;

var clickedID;
var lineDrawing;


var clr;
var intersects = false;


var Xa, Ya;
var debug_line = false;


var first_point;
var first_wait = false;
var clickable = true;
var clickedID;

var dist;
var point_clicked;


function setup() {

    var cnv = createCanvas(600, 600);
    var cnvX = (windowWidth - width) / 2;
    var cnvY = (windowHeight - height) / 2;
    cnv.position(cnvX, cnvY);

    background(color('#003965'));

    var randX, randY, valid;

    for (var i = 0; i < level; i++) {

        valid = true;
        randX = random(point_size / 2, this.width - point_size / 2);
        randY = random(point_size / 2, this.height - point_size / 2);

        for (var j = 0; j < pt_array.length; j++) {
            if (!(abs(randX - pt_array[j].x) > point_size / 2 && abs(randY - pt_array[j].y) > point_size / 2)) {
                valid = false;
                j = pt_array.length;
                i--;
            }
        }

        if (valid) {
            pt_array.push(new Point(randX, randY));
        }

    }

    fill(0);
    for (var i = 0; i < pt_array.length; i++) {
        stroke(color(pt_array[i].stroke_color));
        ellipse(pt_array[i].x, pt_array[i].y, point_size, point_size);
    }

    lineDrawing = false;

}

function draw() {

    // Reset background to animate drawing
    background(color('#003965'));

    // Color of points
    fill(0);

    // Draw all points
    for (var i = 0; i < pt_array.length; i++) {
        stroke(color(pt_array[i].stroke_color));
        ellipse(pt_array[i].x, pt_array[i].y, point_size, point_size);
    }

    // Draw mouse leading new line
    newLine();

    // Draw every existing segments
    for (var i = 0; i < ln_array.length; i++) {
        stroke(ln_array[i].clr);
        line(ln_array[i].x1, ln_array[i].y1, ln_array[i].x2, ln_array[i].y2);
    }
}

function keyPressed() {

    // Toggle to show/hide debug lines when spacebar pressed
    if (keyCode == 32) {
        debug_line = !debug_line;
    }

}

function mousePressed() {

    if (player) {
        clr = '#ff0000';
    } else {
        clr = '#00ff00';
    }

    point_clicked = false;
    checkPointClick();

    // No point was clicked, hence undo everything
    if (!point_clicked && clickedID != null) {
        // No point was clicked
        lineDrawing = false;
        first_point = null;
        pt_array[clickedID].stroke_color = pt_array[clickedID].old_color;
    }
}
