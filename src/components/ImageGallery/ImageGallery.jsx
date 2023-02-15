import PropTypes from 'prop-types';
import { ImageGalleryList } from './ImageGallery.styled';
import ImageGalleryItem from 'components/ImageGalleryItem';

const ImageGallery = ({ images, onImageClick }) => {
  return (
    <ImageGalleryList>
      {images.map(({ id, webformatURL, largeImageURL, tags }) => {
        return (
          <ImageGalleryItem
            onImageClick={onImageClick}
            webformatURL={webformatURL}
            largeImageURL={largeImageURL}
            alt={tags}
            key={id}
          />
        );
      })}
    </ImageGalleryList>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.number,
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
};

export default ImageGallery;
