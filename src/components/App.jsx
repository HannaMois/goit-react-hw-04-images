import { Component } from 'react';
import * as Api from './service/api';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Button from './Button';
import Modal from './Modal';
import { Section } from './App.styled';

export class App extends Component {
  state = {
    images: [],
    isLoading: false,
    page: 1,
    query: '',
    openModal: false,
    largeImgUrl: '',
  };

  componentDidUpdate = async (_, prevState) => {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.getImages();
    }
  };

  getQuery = queryText => {
    if (queryText.text === this.state.query) {
      alert('Enter a new request');
    }
    this.setState({
      query: queryText.text,
      images: [],
      page: 1,
      totalHits: 0,
    });
  };

  handleImgClick = largeImgUrl => {
    this.setState({
      openModal: true,
      largeImgUrl,
    });
  };

  handleLoadMore = () => {
    this.setState(({ page }) => ({ page: page + 1 }));
  };

  getImages = async () => {
    const { query, page } = this.state;
    this.setState({ isLoading: true });

    try {
      const { images, totalPages } = await Api.getImages(query, page);

      if (images.length === 0) {
        alert('Sorry, nothing was found for your request');
        return;
      }

      this.setState(prevState => {
        return {
          images: [...prevState.images, ...images],
          totalPages,
        };
      });
    } catch (error) {
      this.setState({ error: 'Ooops, something went wrong' });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { images, isLoading, largeImgUrl, totalPages, page } = this.state;

    return (
      <Section>
        <Searchbar onSubmit={this.getQuery} />
        {isLoading && <Loader />}
        {images.length > 0 && (
          <ImageGallery onImageClick={this.handleImgClick} images={images} />
        )}
        {images.length > 0 && totalPages > page && !isLoading && (
          <Button onClick={this.handleLoadMore} />
        )}
        {largeImgUrl && (
          <Modal
            largeImgUrl={largeImgUrl}
            handleImgClick={this.handleImgClick}
          />
        )}
      </Section>
    );
  }
}
