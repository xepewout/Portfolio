import logo from './logo.svg';
import './App.css';

import { HashRouter as Router,Routes, Route, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';


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
          style={{ margin: '5px', width: '600px'}}
          loading="lazy"
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
  useEffect(() => {
    fetch('/api/some-endpoint')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // process your data here
      })
      .catch(error => {
        console.error('Error fetching data: ', error);
      });
  }, []);
  return (
    <Router>
      <nav>
        <Link to="/" class = "link">Home</Link>
        <Link to="/images" class = "link">Nikon-S610</Link>
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
    <div class = "intro">
      <h1>Jorryn's Art</h1>
      <h2>Entry 1 - jan 4 2023:</h2>
      <p>"intro" - ive never really been good at personable writing 
        because i mostly like to 
        imitate a certain style or 
        try incredibly hard to convince others of random bullshit, 
        so this idea of conveying the most 
        intimate parts of myself through written words 
        is unexplored territory. That being said,
        I am not afraid of others reading my attempt at 
        transparent thoughts but I cant 
        guarantee the quality nor consistency of them. 
        I don’t even really know who is going to be reading this, 
        I want to reach as many people as possible 
        but that comes with the responsibility of 
        outputting quality that can be seen, 
        by both myself as the writer and you as the 
        audience, as a good use of the audiences time - 
        which scares me, so I want to lay some groundwork. The following is a 
        general overview of what to expect from 
        this blog to understand whether or not interacting with 
        it is an appropriate use of your time. A little about me, 
        at the time of writing this on Janurary 4, 2024 my name is 
        Jorryn, I am 23 years old, and am from Los Angeles California.
        I am passionate about video games, film, art, and really 
        any form of expression. I appreciate, love, genuinty 
        and the things that make a "good aesthetic".  
        This blog will be mostly that, an exploration of my 
        lens of the world through the things I enjoy and why 
        plus how I enjoy them. I plan to write a 
        blog post weekly with some photos and 
        share different things like stuff 
        that Im working on and things that ive liked recently and sometimes
        some thoughts + philisophy. If this 
        at all sounds any sort of interesting to you 
        then you might find it worthwhile to partake, but
        this is mostly for myself and to try to replace my 
        instagram because I hate instagram.</p>
    </div>
  );
}

function ImagesPage() {
  const totalImages = 427;
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
          const baseName = `https://dnvb2dob98elq.cloudfront.net/DSCN` + String(imageIndex).padStart(4, '0');
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
