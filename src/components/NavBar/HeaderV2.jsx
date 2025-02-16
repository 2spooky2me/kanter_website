import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setLanguage } from "../../store/furnitureSlice"; // Adjust path based on your folder structure

const Header = () => {
    const furnitureItems = useSelector((state) => state.furniture.items || []);
    const currentLanguage = useSelector((state) => state.furniture.currentLanguage || "en"); // Default to English
    const dispatch = useDispatch();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % furnitureItems.length);
    }, [furnitureItems.length]);

    useEffect(() => {
        const interval = setInterval(() => nextSlide(), 2000);

        return () => clearInterval(interval);
    }, [nextSlide]);

    const toggleDropdown = () => {
        setIsDropdownOpen((prevState) => !prevState);
    };

    const handleLanguageChange = (selectedLanguage) => {
        const languageCode = selectedLanguage === "English" ? "en" : selectedLanguage === "עברית" ? "he" : "ru";
        dispatch(setLanguage(languageCode));
        setIsDropdownOpen(false);
    };

    const content = {
        en: {
            home: "Home",
            aboutUs: "About Us",
            contact: "Contact",
            collection: "Collection",
            language: "English",
            dropdown: ["English", "עברית", "Русский"],
        },
        he: {
            home: "בית",
            aboutUs: "עלינו",
            contact: "יצירת קשר",
            collection: "קולקציה",
            language: "עברית",
            dropdown: ["English", "עברית", "Русский"],
        },
        ru: {
            home: "Главная",
            aboutUs: "О нас",
            contact: "Контакты",
            collection: "Коллекция",
            language: "Русский",
            dropdown: ["English", "עברית", "Русский"],
        },
    };

    const langContent = content[currentLanguage];

    return (
        <div>
            <header className="relative">
                {furnitureItems.length > 0 && (
                    <div className="absolute inset-0">
                        <div
                            style={{
                                backgroundImage: `url(${furnitureItems[currentIndex].image})`,
                            }}
                            className="w-full h-20 bg-center bg-cover duration-500"
                        ></div>
                    </div>
                )}
                <nav className="relative z-10 flex justify-between items-center px-8 py-6 bg-transparent">
                    <h1 className="text-3xl font-bold text-black">Kanter</h1>
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
                                    {langContent.dropdown.map((language, index) => (
                                        <li
                                            key={index}
                                            onClick={() => handleLanguageChange(language)}
                                            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                        >
                                            {language}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default Header;
