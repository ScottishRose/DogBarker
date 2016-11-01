import React from 'react';
import request from 'superagent';
import BarkList from './BarkList.jsx';
import Bark from './Bark.jsx';

const propTypes = {
  bark: React.PropTypes.string,
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      barks: [],
    };
    this.handlePublish = this.handlePublish.bind(this);
    this.httpUpdateBark = this.httpUpdateBark.bind(this);
    this.httpPublishBark = this.httpPublishBark.bind(this);
    this.httpDeleteBark = this.httpDeleteBark.bind(this);
  }
  componentDidMount() {
    this.httpGetBarks();
  }
  httpGetBarks() {
    const url = 'https://dogbarker-66301.firebaseio.com/barks.json';
    request.get(url)
           .then((response) => {
             const barksData = response.body;
             let barks = [];
             if (barksData) {
               barks = Object.keys(barksData).map((id) => {
                 const individualBarkData = barksData[id];
                 return {
                    id,
                    barker: individualBarkData.barker,
                    content: individualBarkData.content,
                    wagCount: individualBarkData.wagCount,
                  };
                });
              }
              this.setState({ barks });
          });
  }
  handlePublish({ id, content, barker, wagCount }) {
    if (id) {
      this.httpUpdateBark({ id, content, barker, wagCount });
    } else {
      this.httpPublishBark({ content, barker, wagCount });
    }
  }
  httpDeleteBark(id) {
    const url = `https://dogbarker-66301.firebaseio.com/barks/${id}.json`;
    request.del(url)
           .then(() => {
             this.httpGetBarks();
           });
  }
  httpUpdateBark({ id, content, barker, wagCount }) {
    const url = `https://dogbarker-66301.firebaseio.com/barks/${id}.json`;
    request.patch(url)
           .send({ content, barker, wagCount })
           .then(() => {
             this.httpGetBarks();
           });
  }
  httpPublishBark({ content, barker }) {
    const url = 'https://dogbarker-66301.firebaseio.com/barks.json';
    request.post(url)
           .send({ content, barker, wagCount: 0 })
           .then(() => {
             this.httpGetBarks();
           });
  }
  render() {
    return (
      <div className="container">
        <h1>Dog Barker!</h1>
        <h3>Your place to bark about being a dog.</h3>
        <BarkList
          handleDelete={this.httpDeleteBark}
          handlePublish={this.handlePublish}
          barks={this.state.barks}
        />
        <Bark handleDelete={this.httpDeleteBark} handlePublish={this.handlePublish} />
      </div>
    );
  }
}

App.propTypes = propTypes;

export default App;
