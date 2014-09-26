/** @jsx React.DOM */

var Cell = React.createClass({
    render: function() {
        return (
            <td class='cell'></td>
        );
    }
});

var Line = React.createClass({
    render: function() {
        for (var i=0,cols=[]; i<this.props.cols;i++)
            cols.push({key: 'x' + i + '' + this.props.index})

        return (
            <tr>
                {cols.map(function(c) {
                    return <Cell key={c.key} />
                })}
            </tr>
        )
    }
});

var Pit = React.createClass({
    render: function() {
        for (var i=0,lines = []; i<this.props.lines;i++)
            lines.push({index: i, cols: this.props.cols, key: 'l' + i})

        return (
            <table>
                {lines.map(function(l) {
                    return <Line index={l.index} cols={l.cols} key={l.key} />
                })}
            </table>
        );
    }
})

React.renderComponent(
    <Pit lines='20' cols='16' />,
    document.getElementById('pit')
);
