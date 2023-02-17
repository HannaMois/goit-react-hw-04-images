import { useEffect } from 'react';
import { Overlay, Box } from './Modal.styled';

const Modal = ({ handleImgClick, largeImgUrl }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        handleImgClick('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleImgClick]);

  const handleBackdrop = event => {
    if (event.target === event.currentTarget) {
      handleImgClick('');
    }
  };

  return (
    <Overlay onClick={handleBackdrop}>
      <Box>
        <img src={largeImgUrl} alt="Large" />
      </Box>
    </Overlay>
  );
};
export default Modal;
