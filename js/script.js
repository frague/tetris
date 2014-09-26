/** @jsx React.DOM */

var Cell = React.createClass({displayName: 'Cell',
    render: function() {
        return (
            React.DOM.td({class: "cell"})
        );
    }
});

var Line = React.createClass({displayName: 'Line',
    render: function() {
        for (var i=0,cols=[]; i<this.props.cols;i++)
            cols.push({key: 'x' + i + '' + this.props.index})

        return (
            React.DOM.tr(null, 
                cols.map(function(c) {
                    return Cell({key: c.key})
                })
            )
        )
    }
});

var Pit = React.createClass({displayName: 'Pit',
    render: function() {
        for (var i=0,lines = []; i<this.props.lines;i++)
            lines.push({index: i, cols: this.props.cols, key: 'l' + i})

        return (
            React.DOM.table(null, 
                lines.map(function(l) {
                    return Line({index: l.index, cols: l.cols, key: l.key})
                })
            )
        );
    }
})

React.renderComponent(
    Pit({lines: "20", cols: "16"}),
    document.getElementById('pit')
);
