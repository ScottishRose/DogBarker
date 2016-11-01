import React from 'react';

const propTypes = {
  wagCount: React.PropTypes.number,
  handleWagClick: React.PropTypes.func,
};

class WagButton extends React.Component {
  render() {
    return (
      <div className="wag-button">
        <p>{this.props.wagCount}</p>
        <button onClick={this.props.handleWagClick} >Wag!</button>
      </div>
    );
  }
}

WagButton.propTypes = propTypes;

export default WagButton;
