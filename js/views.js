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
        return (
            React.DOM.tr(null, 
                this.props.data.split('').map(function(c) {
                    return Cell({state: c})
                })
            )
        )
    }
});

var Pit = React.createClass({displayName: 'Pit',
    getInitialState: function() {
        return {
            data: this.props.data
        }
    },
    render: function() {
        return (
            React.DOM.table(null, 
                this.state.data.map(function(l, index) {
                    return Line({data: l, hidden: index < 2})
                })
            )
        );
    }
})

var render = function(data) {
    React.renderComponent(
        Pit({data: tetris.data}),
        document.getElementById('pit')
    );
}
