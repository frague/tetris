/** @jsx React.DOM */

var Cell = React.createClass({displayName: 'Cell',
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
            React.DOM.td({className: classes}, " ")
        );
    }
});

var Line = React.createClass({displayName: 'Line',
    render: function() {
        if (this.props.hidden) return null;
        if (this.props.state) 
            console.log(this.props.data, this.props.state);
        return (
            React.DOM.tr(null, 
                this.props.data.split('').map(function(c) {
                    var state = this.state ? (c != 0 ? this.state : 0) : c;
                    return Cell({state: state})
                }, this.props)
            )
        )
    }
});

var Pit = React.createClass({displayName: 'Pit',
    render: function() {
        return (
            React.DOM.table(null, React.DOM.tbody(null, 
                this.props.data.map(function(l, index) {
                    return Line({data: l, hidden: index < 2})
                })
            ))
        );
    }
});

var Fig = React.createClass({displayName: 'Fig',
    render: function() {
        return (
            React.DOM.table(null, React.DOM.tbody(null, 
                this.props.data.map(function(l) {
                    return Line({data: l, state: this.props.color, hidden: false})
                }, this)
            ))
        );
    }
});

var Score = React.createClass({displayName: 'Score',
    render: function() {
        return (
            React.DOM.div(null, 
                React.DOM.h2(null, "Score: ", React.DOM.strong(null, this.props.score)), 
                React.DOM.h2(null, "Lines: ", React.DOM.strong(null, this.props.lines)), 
                React.DOM.h2(null, "Speed: ", React.DOM.strong(null, this.props.speed))
            )
        )
    }
});

var render = function(tetris) {
    React.renderComponent(
        Pit({data: tetris.data}),
        document.getElementById('pit')
    );
    
    var f1 = tetris.figures[1];
    React.renderComponent(
        Fig({data: f1.data, color: f1.color}),
        document.getElementById('next')
    );
        
    React.renderComponent(
        Score({score: tetris.score, lines: tetris.lines, speed: tetris.speed}),
        document.getElementById('scores')
    );
}
