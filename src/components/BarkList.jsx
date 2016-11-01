import React from 'react';
import Bark from './Bark.jsx';

const propTypes = {
  barks: React.PropTypes.array.isRequired,
  handlePublish: React.PropTypes.func,
  handleDelete: React.PropTypes.func,
};

class BarkList extends React.Component {
  render() {
    const barkElements = this.props.barks.map((bark, idx) => {
      return (
        <li key={idx}>
          <Bark
            handlePublish={this.props.handlePublish}
            handleDelete={this.props.handleDelete}
            content={bark.content}
            barker={bark.barker}
            wagCount={bark.wagCount}
            id={bark.id}
          />
        </li>
      );
    });
    return (
      <ul>
        {barkElements}
      </ul>
    );
  }
}

BarkList.propTypes = propTypes;

export default BarkList;
