import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';

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
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', background: 'white' }}>
      {Array.from({ length: 100 }).map((_, index) => (
        <img 
          key={index} 
          src={`https://nixon-s610.s3.us-west-1.amazonaws.com/DSCN` + String(index + 1).padStart(4, '0') + `.JPG`} 
          alt={`DOES NOT EXIST ${index}`} 
          style={{ margin: '5px', width: '620px'}} 
        />
      ))}
    </div>
  );
}


export default App;
