import { Component } from 'react';
import PropTypes from 'prop-types';
import { Overlay, Box } from './Modal.styled';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleBackdrop = evt => {
    if (evt.target === evt.currentTarget) {
      this.props.handleImgClick('');
    }
  };

  handleKeyDown = evt => {
    if (evt.code === 'Escape') {
      this.props.handleImgClick('');
    }
  };

  render() {
    // console.log(this.props.largeImgUrl);
    return (
      <Overlay onClick={this.handleBackdrop}>
        <Box>
          <img src={this.props.largeImgUrl} alt="Large" />
        </Box>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  handleImgClick: PropTypes.func,
};

export default Modal;
