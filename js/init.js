var pit = {
    lines: 10,
    cols: 6
};

var data = [];

var complexity = 10, ticker;

var cell = function(col, line) {
    this.col = col;
    this.line = line;
    this.next = null;
    this.state = 0;
    this.future_state = 0;
    this.view = Cell({data: this});
};

cell.prototype.push = function() {
    if (this.next) {
        if (this.state && this.next.state) return;
        this.next.future_state = this.state;
        this.next.push();
    } else 
        if (!this.future_state) return;
    this.setState(this.future_state);
};

cell.prototype.setState = function(state) {
    this.state = state;
    this.view.setState({state: this.state});
};