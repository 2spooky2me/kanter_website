import React, { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../../store/furnitureSlice";

const Header = () => {
    const furnitureItems = useSelector((state) => state.furniture.items || []);
    const currentLanguage = useSelector((state) => state.furniture.currentLanguage || "en");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dispatch = useDispatch();

    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % furnitureItems.length);
    }, [furnitureItems.length]);

    useEffect(() => {
        const interval = setInterval(() => nextSlide(), 5000);
        return () => clearInterval(interval);
    }, [nextSlide]);

    const toggleDropdown = () => {
        setIsDropdownOpen((prevState) => !prevState);
    };

    const handleLanguageChange = (selectedLanguage) => {
        const languageCode = selectedLanguage === "English" ? "en" :
            selectedLanguage === "עברית" ? "he" : "ru";
        dispatch(setLanguage(languageCode));
        setIsDropdownOpen(false);
    };

    const content = {
        en: {
            home: "Home",
            aboutUs: "About Us",
            contact: "Contact",
            collection: "Collection",
            buttonLabel: "Explore Collection",
            language: "English",
            switchLanguage: "עברית",
        },
        he: {
            home: "בית",
            aboutUs: "עלינו",
            contact: "יצירת קשר",
            collection: "קולקציה",
            buttonLabel: "לחקור את הקולקציה",
            language: "עברית",
            switchLanguage: "English",
        },
        ru: {
            home: "Главная",
            aboutUs: "О нас",
            contact: "Контакты",
            collection: "Коллекция",
            buttonLabel: "Исследовать коллекцию",
            language: "Русский",
            switchLanguage: "English",
        },
    };

    const langContent = content[currentLanguage];

    return (
        <div>
            <header className="relative">
                {furnitureItems.length > 0 && (
                    <div className="absolute inset-0">
                        <div
                            style={{ backgroundImage: `url(${furnitureItems[currentIndex].image})` }}
                            className="w-full h-full bg-center bg-cover duration-500"
                        ></div>
                    </div>
                )}
                <nav className="relative z-10 flex justify-between items-center px-8 py-6 bg-transparent">
                    <h1 className="text-3xl font-bold text-black">
                        {currentLanguage === "en" ? "Kanter" : currentLanguage === "he" ? "קנטר" : "Кантер"}
                    </h1>
                    <ul className="flex space-x-6 text-white">
                        <li className="cursor-pointer hover:text-gray-300">
                            <Link to="/">{langContent.home}</Link>
                        </li>
                        <li className="cursor-pointer hover:text-gray-300">
                            <Link to="/about-us">{langContent.aboutUs}</Link>
                        </li>
                        <li className="cursor-pointer hover:text-gray-300">
                            <Link to="/contact">{langContent.contact}</Link>
                        </li>
                        <li className="cursor-pointer hover:text-gray-300">
                            <Link to="/gallery">{langContent.collection}</Link>
                        </li>
                    </ul>
                    <div className="relative">
                        <button
                            onClick={toggleDropdown}
                            className="px-4 py-2 bg-white text-gray-800 rounded shadow-md hover:shadow-lg"
                        >
                            {langContent.language} ▼
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded shadow-lg z-50">
                                <ul>
                                    <li
                                        onClick={() => handleLanguageChange("English")}
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                    >
                                        English
                                    </li>
                                    <li
                                        onClick={() => handleLanguageChange("Hebrew")}
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                    >
                                        עברית
                                    </li>
                                    <li
                                        onClick={() => handleLanguageChange("Russian")}
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                    >
                                        Русский
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </nav>

                {furnitureItems.length > 0 && (
                    <div className="relative z-10 flex flex-col items-center text-center py-20 px-6">
                        <h1 className="text-5xl font-bold text-white drop-shadow-md">
                            {furnitureItems[currentIndex].name[currentLanguage]}
                        </h1>
                        <p className="mt-4 text-lg text-white drop-shadow-md max-w-2xl">
                            {furnitureItems[currentIndex].description[currentLanguage]}
                        </p>
                        <button
                            className="mt-6 px-6 py-3 bg-white text-gray-800 font-medium rounded-lg shadow-md hover:bg-gray-100"
                        >
                            <Link to="/gallery">
                                {langContent.buttonLabel}
                            </Link>
                        </button>
                    </div>
                )}
            </header>
        </div>
    );
};

export default Header;
