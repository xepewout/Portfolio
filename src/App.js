import logo from './logo.svg';
import './App.css';

import { HashRouter as Router,Routes, Route, Link } from 'react-router-dom';
import React, { useState } from 'react';

function MediaItem({ baseName }) {
  const [hasImageError, setHasImageError] = useState(false);

  const handleImageError = () => {
    setHasImageError(true);
  };

  return (
    <>
      {!hasImageError ? (
        <img 
          src={`${baseName}.JPG`} 
          onError={handleImageError} 
          alt="" 
          style={{ margin: '5px', width: '620px'}}
        />
      ) : (
        <video 
          style={{ margin: '5px', width: '620px'}} 
          controls
        >
          <source src={`${baseName}.mp4`} type="video/mp4" />
          Your browser does not support this video format.
        </video>
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/images">Images</Link>
      </nav>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/images" element={<ImagesPage />} />
      </Routes>
    </Router>
  );
}

function HomePage() {
  return (
    <div>
      <h1>Welcome</h1>
      {/* Additional content */}
    </div>
  );
}

function ImagesPage() {
  const totalImages = 201;
  const imagesPerPage = 50;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastImage = totalImages - (currentPage - 1) * imagesPerPage;
  const indexOfFirstImage = Math.max(indexOfLastImage - imagesPerPage, 0);
  const currentImages = Array.from({ length: totalImages }).slice(indexOfFirstImage, indexOfLastImage).reverse();

  return (
    <div>
      <Pagination totalImages={totalImages} imagesPerPage={imagesPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div style={{ display: 'flex', flexWrap: 'wrap', background: 'white' }}>
        {currentImages.map((_, index) => {
          const imageIndex = indexOfLastImage - index;
          const baseName = `https://nixon-s610.s3.us-west-1.amazonaws.com/DSCN` + String(imageIndex).padStart(4, '0');
          return <MediaItem key={imageIndex} baseName={baseName} />;
        })}
      </div>
      <Pagination totalImages={totalImages} imagesPerPage={imagesPerPage} currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}


function Pagination({ totalImages, imagesPerPage, currentPage, setCurrentPage }) {
  const totalPages = Math.ceil(totalImages / imagesPerPage);

  const getPageTitle = pageNumber => {
    const startNumber = totalImages - (pageNumber - 1) * imagesPerPage;
    const endNumber = Math.max(startNumber - imagesPerPage + 1, 1);
    return `${startNumber} - ${endNumber}`;
  };

  const handleClick = (e, pageNumber) => {
    e.preventDefault();
    setCurrentPage(pageNumber);
  };

  return (
    <nav>
      <ul style={{ listStyle: 'none', display: 'flex', justifyContent: 'center' }}>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNumber => (
          <li key={pageNumber} style={{ margin: '10px' }}>
            <a 
              href="#" 
              onClick={(e) => handleClick(e, pageNumber)} 
              style={{ textDecoration: currentPage === pageNumber ? 'underline' : 'none' }}
            >
              {getPageTitle(pageNumber)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}







export default App;
