import React, {useCallback, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from "react-redux";

const HeaderV2Hebrew = () => {
    const furnitureItems = useSelector((state) => state.furniture.items);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [language, setLanguage] = useState('English');

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
        setLanguage(selectedLanguage);
        setIsDropdownOpen(false);
    };

    return (
        <div>
            <header className="relative">
                {furnitureItems.length > 0 && (
                    <div className="absolute inset-0">
                        <div
                            style={{backgroundImage: `url(${furnitureItems[currentIndex].image})`,}}
                            className='w-full h-20 bg-center bg-cover duration-500'></div>
                    </div>
                )}
                <nav
                    className="relative z-10 flex justify-between items-center px-8 py-6 bg-transparent">
                    <h1 className="text-3xl font-bold text-black">Kanter</h1>
                    <ul className="flex space-x-6 text-white">
                        <li className="cursor-pointer hover:text-gray-300"><Link
                            to="/home%hebrew">בית </Link></li>
                        <li className="cursor-pointer hover:text-gray-300"><Link
                            to="/about-us%hebrew">עלינו</Link></li>
                        <li className="cursor-pointer hover:text-gray-300"><Link
                            to="/contact%hebrew">יצירת קשר</Link></li>
                        <li className="cursor-pointer hover:text-gray-300"><Link
                            to="/gallery%hebrew">קולקציה</Link></li>
                    </ul>
                    <div className="relative">
                        <button
                            onClick={toggleDropdown}
                            className="px-4 py-2 bg-white text-gray-800 rounded shadow-md hover:shadow-lg">
                            {language} ▼
                        </button>
                        {isDropdownOpen && (
                            <div
                                className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded shadow-lg z-50">
                                <ul>
                                    <li
                                        onClick={() => handleLanguageChange('English')}
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-100">
                                        <Link to="/">English</Link>
                                    </li>
                                    <li
                                        onClick={() => handleLanguageChange('Hebrew')}
                                        className="px-4 py-2 cursor-pointer hover:bg-gray-100">
                                        <Link to="/home%hebrew">Hebrew</Link>
                                    </li>
                                </ul>
                            </div>
                        )}
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default HeaderV2Hebrew;
