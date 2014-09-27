var tickHandler = function() {
    if (!data.length) return;
    for (var i = 0; i < pit.cols; i++) data[0][i].push();
};

setInterval(function() {
    if (!data.length) return;
    data[0][Math.round(pit.cols * Math.random())].setState(8);
}, 100);

var f = function() {
    var prev_line;
    for (var l = 0; l < pit.lines; l++) {
        var line = [];
        for (var c = 0; c < pit.cols; c++) {
            var nc = new cell(c, l);
            if (prev_line) prev_line[c].next = nc;
            line.push(nc);
        }
        prev_line = line;
        data.push(line);
    }
    render(data);
    ticker = window.setInterval(tickHandler, complexity);
}();
