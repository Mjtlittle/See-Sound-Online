class Scheme {
    constructor(name, colors) {

        this.name = name;

        // convert colors to hex
        this.colors = colors.map(hexToList);
        this.num_colors = this.colors.length;

    }

    // pass a value between 0 and 1 to get the color within the gradient
    get_listcolor(p) {

        // if there is only one color in the scheme
        if (this.num_colors == 1)
            return this.colors[0];

        // if the p is at the ends just return the color
        if (p >= 1.0)
            return this.colors[this.num_colors-1];
        else if (p <= 0.0)
            return this.colors[0];

        // get the two colors that will be part of the gradient
        let i = Math.floor(p * (this.num_colors - 1));
        let c_a = this.colors[i];
        let c_b = this.colors[i+1];

        // tween between the two colors
        let w = 1 / (this.num_colors-1);
        let cp = (p % w) / w;

        let nr = c_a[0] + (c_b[0] - c_a[0]) * cp;
        let ng = c_a[1] + (c_b[1] - c_a[1]) * cp;
        let nb = c_a[2] + (c_b[2] - c_a[2]) * cp;

        // return
        return [nr, ng, nb];
    }

    get_color(p) {
        let color = this.get_listcolor(p);
        return listToRgb(color);
    }

    get_inv_color(p) {
        return this.get_color(1-p);
    }

    get_last() {
        return listToRgb(this.colors[this.num_colors-1]);
    }

    get_first() {
        return listToRgb(this.colors[0]);
    }
}

let current_scheme = 0;
// follow the general rule that colors go from dark to light varient
let schemes = [
    new Scheme('Deep Ocean',['343633', '22495d', '2693bf', 'ffed68', 'ffffff', 'def3f6']),
    new Scheme('Smoky Fire',['253031', '336699', 'fb3640', 'ff9f1c', 'f2f4f3','ffffff']),
    new Scheme('Rainbow', ['01295f','01295f', '2e86ab', '849324', 'ffb30f', 'fd151b']),
    new Scheme('Clemson',['f66733', '522d80','ffffff']),
    new Scheme('Grayscale',['000000','aaaaaa']),
]

function next_scheme() {
    current_scheme += 1;
    current_scheme %= schemes.length;
}

function prev_scheme() {
    if (current_scheme === 0) {
        current_scheme = schemes.length;
    }
    current_scheme -= 1;
}

function get_scheme(){
    return schemes[current_scheme];
}

function hexToList(hex) {
    var value = parseInt(hex, 16);
    var r = (value >> 16) & 255;
    var g = (value >> 8) & 255;
    var b = value & 255;

    return [r,g,b];
}

function listToRgb(color) {
    return 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
}