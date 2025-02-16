import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AboutUs from './components/AboutUs/AboutUs';
import ImageSlider from './UnUsed/ImageSlider/ImageSlider'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './UnUsed/ImageSlider/imageSlider.css'
import Home from "./components/Home";
import Contact from "./components/ContactUs/Contact";
import ImageGallery from "./components/ImageGallery/ImageGallery";




const App = () => {
    return (

        <Router>
            <Routes>
                <Route path="/contact" element={<Contact />} />
                <Route path="/" element={<Home />} />
                <Route path="/image" element={<ImageSlider />} />
                <Route path="/gallery" element={<ImageGallery />} />
                <Route path="/about-us" element={<AboutUs />} />

            </Routes>
        </Router>

    );
};

export default App;
