/** @jsx React.DOM */

var Cell = React.createClass({
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
            <td className={classes}>&nbsp;</td>
        );
    }
});

var Line = React.createClass({
    render: function() {
        return (
            <tr>
                {this.props.data.map(function(c) {
                    return c.view
                })}
            </tr>
        )
    }
});

var Pit = React.createClass({
    render: function() {
        return (
            <table>
                {this.props.data.map(function(l) {
                    return <Line data={l} />
                })}
            </table>
        );
    }
})

var render = function(data) {
    React.renderComponent(
        <Pit data={data} />,
        document.getElementById('pit')
    );
}
