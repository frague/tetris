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
        return (
            <tr>
                {this.props.data.split('').map(function(c) {
                    return <Cell state={c} />
                })}
            </tr>
        )
    }
});

var Pit = React.createClass({
    getInitialState: function() {
        return {
            data: this.props.data
        }
    },
    render: function() {
        return (
            <table>
                {this.state.data.map(function(l, index) {
                    return <Line data={l} hidden={index < 2} />
                })}
            </table>
        );
    }
});

var Score = React.createClass({
    render: function() {
        return (
            <div>
                <h2>Score: {this.props.score}</h2>
            </div>
        )
    }
});

var render = function(tetris) {
    React.renderComponent(
        <Pit data={tetris.data} />,
        document.getElementById('pit')
    );
    
    React.renderComponent(
        <Score score={tetris.score} />,
        document.getElementById('score')
    );
    console.log(tetris.score);
}
