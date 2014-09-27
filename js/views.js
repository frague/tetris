/** @jsx React.DOM */

var Cell = React.createClass({displayName: 'Cell',
    getInitialState: function() {
        return {
            state: this.props.data.state
        }
    },
    render: function() {
        this.props.data.view = this;
        var cx = React.addons.classSet;
        var classes = cx({
            'cell': true,
            'brick': this.state.state
        });
        return (
            React.DOM.td({className: classes}, " ")
        );
    }
});

var Line = React.createClass({displayName: 'Line',
    render: function() {
        return (
            React.DOM.tr(null, 
                this.props.data.map(function(c) {
                    return c.view
                })
            )
        )
    }
});

var Pit = React.createClass({displayName: 'Pit',
    render: function() {
        return (
            React.DOM.table(null, 
                this.props.data.map(function(l) {
                    return Line({data: l})
                })
            )
        );
    }
})

var render = function(data) {
    React.renderComponent(
        Pit({data: data}),
        document.getElementById('pit')
    );
}
