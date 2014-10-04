var pit = {
    lines: 20,
    cols: 10
};

function over() {
    document.getElementById('game_over').className = '';
};


var tetris = new game(pit, over);

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
    else if (e.keyCode == 32 && !tetris.drop) {
        tetris.drop = setInterval(tickHandler, 1);
    }
    
    if (dx && tetris.move(dx)) render(tetris);
    
    if (r) {
        var f = tetris.figures[0], o = f.rotate(r > 0);
        if (tetris.move(0)) render(tetris);
        else {
            f.data = o;
            f.calc(this);
        }
    }
};

(function() {
    render(tetris);
    //tetris.ticker = window.setInterval(tickHandler, tetris.speed);
    document.onkeydown = checkKey;
    tetris.speedUp();
})();
