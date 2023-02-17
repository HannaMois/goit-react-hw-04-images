import React from 'react';
import { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import getImages from './service/api';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Loader from './Loader';
import Button from './Button';
import Modal from './Modal';
import { Section } from './App.styled';

export const App = () => {
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [largeImgUrl, setLargeImgUrl] = useState('');
  const [totalImages2, setTotalImages2] = useState(0);

  useEffect(() => {
    if (!query) return;
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        const { images, totalImages } = await getImages(query, page);
        setImages(prevImages => [...prevImages, ...images]);
        setTotalImages2(totalImages);

        if (totalImages === 0) {
          toast.error('Sorry, nothing was found for your request');
          return;
        }
      } catch (error) {
        setError('Ooops, something went wrong');
      } finally {
        setIsLoading(false);
      }
    };
    if (query !== '') fetchImages();
  }, [query, page]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const getQuery = queryText => {
    if (queryText === query) {
      toast.error('Enter a new request');
      return;
    }
    setQuery(queryText);
    setImages([]);
    setPage(1);
    setTotalImages2(0);
  };

  const handleImgClick = largeImgUrl => {
    setLargeImgUrl(largeImgUrl);
  };

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  return (
    <Section>
      <Searchbar onSubmit={getQuery} />
      {isLoading && <Loader />}
      {images.length > 0 && (
        <ImageGallery onImageClick={handleImgClick} images={images} />
      )}
      {totalImages2 !== images.length && !isLoading && (
        <Button onClick={handleLoadMore} />
      )}
      {largeImgUrl && (
        <Modal largeImgUrl={largeImgUrl} handleImgClick={handleImgClick} />
      )}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        theme="colored"
        closeOnClick
      />
    </Section>
  );
};
