import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import AboutUs from './components/AboutUs/AboutUs';
import ImageSlider from './UnUsed/ImageSlider/ImageSlider'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './UnUsed/ImageSlider/imageSlider.css'
import Home from "./components/Home";
import Contact from "./components/ContactUs/Contact";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import AdminPage from "./components/Admin/AdminPage";
import { getLanguageMeta } from './i18n/translations';
import { fetchSofas } from './store/furnitureSlice';




const App = () => {
    const dispatch = useDispatch();
    const currentLanguage = useSelector((state) => state.furniture.currentLanguage);

    useEffect(() => {
        dispatch(fetchSofas());
    }, [dispatch]);

    useEffect(() => {
        const { dir } = getLanguageMeta(currentLanguage);
        document.documentElement.lang = currentLanguage;
        document.documentElement.dir = dir;
    }, [currentLanguage]);

    return (

        <Router>
            <Routes>
                <Route path="/contact" element={<Contact />} />
                <Route path="/" element={<Home />} />
                <Route path="/image" element={<ImageSlider />} />
                <Route path="/gallery" element={<ImageGallery />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/admin" element={<AdminPage />} />

            </Routes>
        </Router>

    );
};

export default App;
