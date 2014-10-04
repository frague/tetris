/** @jsx React.DOM */

var Cell = React.createClass({
    render: function() {
        var cx = React.addons.classSet;
        var classes = cx({
            'cell': true,
            'figure': this.props.state != 0,
            'brick': this.props.state == 1,
            'green': this.props.state == 'g',
            'red': this.props.state == 'r',
            'blue': this.props.state == 'b',
            'cyan': this.props.state == 'c',
            'magenta': this.props.state == 'm'
        });
        return (
            <td className={classes}>&nbsp;</td>
        );
    }
});

var Line = React.createClass({
    render: function() {
        if (this.props.hidden) return null;
        if (this.props.state) 
            console.log(this.props.data, this.props.state);
        return (
            <tr>
                {this.props.data.split('').map(function(c) {
                    var state = this.state ? (c != 0 ? this.state : 0) : c;
                    return <Cell state={state} />
                }, this.props)}
            </tr>
        )
    }
});

var Pit = React.createClass({
    render: function() {
        return (
            <table><tbody>
                {this.props.data.map(function(l, index) {
                    return <Line data={l} hidden={index < 2} />
                })}
            </tbody></table>
        );
    }
});

var Fig = React.createClass({
    render: function() {
        return (
            <table><tbody>
                {this.props.data.map(function(l) {
                    return <Line data={l} state={this.props.color} hidden={false} />
                }, this)}
            </tbody></table>
        );
    }
});

var Score = React.createClass({
    render: function() {
        return (
            <div>
                <h2>Score: <strong>{this.props.score}</strong></h2>
                <h2>Lines: <strong>{this.props.lines}</strong></h2>
                <h2>Speed: <strong>{this.props.speed}</strong></h2>
            </div>
        )
    }
});

var render = function(tetris) {
    React.renderComponent(
        <Pit data={tetris.data} />,
        document.getElementById('pit')
    );
    
    var f1 = tetris.figures[1];
    React.renderComponent(
        <Fig data={f1.data} color={f1.color} />,
        document.getElementById('next')
    );
        
    React.renderComponent(
        <Score score={tetris.score} lines={tetris.lines} speed={tetris.speed} />,
        document.getElementById('scores')
    );
}
