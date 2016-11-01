import React from 'react';
import WagButton from './WagButton.jsx';

const propTypes = {
  content: React.PropTypes.string,
  barker: React.PropTypes.string,
  wagCount: React.PropTypes.number,
  handlePublish: React.PropTypes.func,
  handleDelete: React.PropTypes.func,
  id: React.PropTypes.string,
};

class Bark extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      localBarker: this.props.barker || '',
      localContent: this.props.content || '',
    };
    this.handleEditOfBarker = this.handleEditOfBarker.bind(this);
    this.handleEditOfContent = this.handleEditOfContent.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleWagClick = this.handleWagClick.bind(this);
    this.isSaved = this.isSaved.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      localBarker: nextProps.barker || '',
      localContent: nextProps.content || '',
    });
  }
  handleEditOfBarker(e) {
    const newBarker = e.target.value;
    this.setState({
      localBarker: newBarker,
    });
  }
  handleEditOfContent(e) {
    const newContent = e.target.value;
    this.setState({
      localContent: newContent,
    });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.handlePublish({
      id: this.props.id,
      barker: this.state.localBarker,
      content: this.state.localContent,
    });
    this.setState({ saved: true });
  }
  handleDeleteClick() {
    this.props.handleDelete(this.props.id);
  }
  handleWagClick() {
    let localWagCount = this.props.wagCount;
    localWagCount += 1;
    this.props.handlePublish({
      wagCount: localWagCount,
      id: this.props.id,
      barker: this.state.localBarker,
      content: this.state.localContent,
    });
  }
  isSaved() {
    return this.props.barker === this.state.localBarker &&
          this.props.content === this.state.localContent;
  }
  render() {
    let activeButtons;
    if (this.isSaved()) {
      activeButtons = (
        <div className="active-buttons">
          <button onClick={this.handleDeleteClick}>Delete</button>
          <WagButton
            handleWagClick={this.handleWagClick}
            wagCount={this.props.wagCount}
          />
        </div>
      );
    }
    return (
      <div className={this.isSaved() ? 'saved' : 'not-saved'} >
        <form className="bark-display" onSubmit={this.handleSubmit}>
          <input
            type="text"
            name="barker"
            placeholder="Who Barks Here?"
            value={this.state.localBarker}
            onChange={this.handleEditOfBarker}
          />
          <input
            type="text"
            name="content"
            placeholder="Bark and Howl Here!"
            value={this.state.localContent}
            onChange={this.handleEditOfContent}
          />
          <input
            type="submit"
            value="SAVE"
            className="hidden"
          />
        </form>
        {activeButtons}
      </div>
    );
  }
}

Bark.propTypes = propTypes;

export default Bark;
