var React = require('react');
var WatchList = React.createClass({

  render: function() {

    return (

      <ul>
        {
          this.props.movies.map(function(item, i) {
            return (
              <li className="watchList">
                <img src={item.poster_url} alt={item.title} />
                <a href="">{item.title}</a>
                <button onClick={this.onItemDeleteBtnClick.bind(this, item)}>[x]</button>
              </li>
            );
          }.bind(this))
        }
      </ul>

    );

  },

  onItemDeleteBtnClick: function(item, event) {

    this.props.onItemDeleteBtnClick(item);

  }

});

module.exports = WatchList;