import PropTypes from 'prop-types';
import { ImageBox, Image } from './ImageGalleryItem.styled';

const ImageGalleryItem = ({
  webformatURL,
  alt,
  largeImageURL,
  onImageClick,
}) => {
  return (
    <ImageBox onClick={() => onImageClick(largeImageURL)}>
      <Image src={webformatURL} alt={alt} name={largeImageURL} />
    </ImageBox>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string,
  largeImageURL: PropTypes.string,
  alt: PropTypes.string,
  onclick: PropTypes.func,
};

export default ImageGalleryItem;
