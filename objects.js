function Point(x, y) {

    this.x = int(x);
    this.y = int(y);
    this.stroke_color = '#ffffff';
    this.old_color = '#ffffff';

}


function Line(x1, y1, x2, y2, clr) {

    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.clr = clr;
}

function Triangle(pt1, pt2, pt3, area, clr) {
    this.pt1 = pt1;
    this.pt2 = pt2;
    this.pt3 = pt3;
    this.area = area;
    this.area_color = clr;
}
