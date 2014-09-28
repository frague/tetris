var pit = {
    lines: 20,
    cols: 20
};

var complexity = 500, ticker;

var tetris = new game(pit);

var tickHandler = function() {
    tetris.tick();
    render(tetris);
};

function checkKey(e) {
    if (tetris.is_over) return;
    
    var e = e || window.event, dx, r;
    if (e.keyCode == 37) dx = -1;
    else if (e.keyCode == 39) dx = 1;
    else if (e.keyCode == 38) r = 1;
    else if (e.keyCode == 40) r = -1;
    if (dx && tetris.move(dx)) render(tetris);
    if (r) {
        var o = tetris.figures[0].rotate(r > 0);
        if (tetris.move(0)) render(tetris);
        else tetris.figures[0].data = o;
    }
}

var f = function() {
    render(tetris);
    ticker = window.setInterval(tickHandler, complexity);
    document.onkeydown = checkKey;
}();
