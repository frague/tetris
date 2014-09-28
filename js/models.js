var game = function(pit) {
    this.is_over = false;
    this.data = [];
    this.pit = pit;
    this.pit.lines += 2;
    
    this.figures = [
        new figure(this.pit.cols),
        new figure(this.pit.cols),
        new figure(this.pit.cols)
    ];
    
    this.empty_line = Array(this.pit.cols + 1).join('0');
    this.full_line = this.empty_line.replace(/0/g, '1');
    for (var l = 0; l < this.pit.lines; l++) this.data.push(this.empty_line);
};

game.prototype.setState = function(line, col, character) {
    var l = this.data[line];
    this.data[line] = l.substr(0, col) + character + l.substr(col+character.length);
};

game.prototype.repaintFigure = function(color) {
    for (var l = 0; l < this.pit.lines; l++) {
        this.data[l] = this.data[l].split(this.figures[0].color).join(color);
    }
};

game.prototype.fixFigure = function() {
    this.repaintFigure('1');
    for (l = this.pit.lines - 1; l >= 0; l--) 
        if (this.data[l] == this.full_line) {
            this.data.splice(l, 1);
            this.data.unshift(this.empty_line);
            l++;
        }
};

game.prototype.move = function(dx) {
    this.repaintFigure('0');
    var f = this.figures[0];
    f.x += dx;
    if (f.x < 0 || 
        f.x + f.width > this.pit.cols ||
        f.merge(this)) {
            f.x -= dx;
            this.repaintFigure('0');
            f.merge(this);
            return false;
    }
    return true;
};

game.prototype.tick = function() {
    this.repaintFigure('0');
    
    var f = this.figures[0];
    if (f.merge(this)) {
        this.over();
        return;
    };
    
    var collided = f.y + f.height >= this.pit.lines;
    if (!collided) {
        for (var l = this.pit.lines - 1, prev = this.full_line; l >= 0; l--) {
            var li = this.data[l];
            if (li.indexOf(f.color) >= 0)
                for (var c = 0; c < this.pit.cols; c++)
                    if (li.charAt(c) == f.color && prev.charAt(c) == '1')
                        collided = true;
            prev = li;
        }
    }

    if (collided) {
        this.fixFigure();
        this.figures.splice(0, 1);
        this.figures.push(new figure(this.pit.cols));
    } else {
        f.y++;
    }
};

game.prototype.over = function() {
    this.is_over = true;
    clearInterval(ticker);
};

var figures = [
    ['222', '020'],
    ['20', '20', '22'],
    ['02', '02', '22'],
    ['2', '2', '2', '2'],
    ['022', '220'],
    ['220', '022']
];

var colors = 'rgbcm';

var figure = function(pit_width) {
    this.data = figures[Math.round((figures.length - 1) * Math.random())];
    this.pit_width = pit_width;
    this.calc();
    this.x = Math.round((pit_width - this.width) * Math.random());
    this.y = 0;
    this.color = colors.charAt(Math.round((colors.length - 1) * Math.random()));
};

figure.prototype.calc = function(g) {
    this.width = this.data[0].length;
    this.height = this.data.length;
};
    
figure.prototype.merge = function(g) {
    var result = false;
    for (var l = this.height - 1; l >= 0; l--) 
        for (var c = 0, line = g.data[l + this.y + 1]; c < this.width; c++)
            if (this.data[l].charAt(c) != '0') {
                if (g.data[this.y + l].charAt(this.x + c) != '0') result = true;
                else g.setState(this.y + l, this.x + c, this.color);
            }
    return result;
};

figure.prototype.rotate = function(cw) {
    var d = Array(this.width), old = this.data;
    for (var i = 0; i < this.height; i++) {
        for (var j = 0; j < this.width; j++)
            d[j] = (d[j] ? d[j] : '') + this.data[cw ? this.height - i  - 1 : i].charAt(cw ? j : this.width - j - 1);
    }
    this.data = d;
    this.calc();
    if (this.x + this.width > this.pit_width) this.x = this.pit_width - this.width;
    return old;
};
