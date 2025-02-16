import React, {useCallback, useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from "react-redux";

const HeaderHebrew = () => {
    const furnitureItems = useSelector((state) => state.furniture.items);
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % furnitureItems.length);
    }, [furnitureItems.length]);

    useEffect(() => {
        const interval = setInterval(() => nextSlide(), 5000);

        return () => clearInterval(interval);
    }, [nextSlide]);

    return (
        <div>
            <header className="relative">
                {furnitureItems.length > 0 && (
                    <div className="absolute inset-0">
                        <div
                            style={{backgroundImage: `url(${furnitureItems[currentIndex].image})`,}}
                            className="w-full h-full bg-center bg-cover duration-500"></div>
                    </div>
                )}
                <nav
                    className="relative z-10 flex justify-between items-center px-8 py-6 bg-transparent">
                    <h1 className="text-3xl font-bold text-black">קנטר</h1>
                    <ul className="flex space-x-6 text-white">
                        <li className="cursor-pointer hover:text-gray-300">
                            <Link to="/home%hebrew">בית</Link>
                        </li>
                        <li className="cursor-pointer hover:text-gray-300">
                            <Link to="/about-us%hebrew">עלינו</Link>
                        </li>
                        <li className="cursor-pointer hover:text-gray-300">
                            <Link to="/contact%hebrew">יצירת קשר</Link>
                        </li>
                        <li className="cursor-pointer hover:text-gray-300">
                            <Link to="/gallery%hebrew">קולקציה</Link>
                        </li>
                    </ul>
                    <button
                        className="px-4 py-2 bg-white text-gray-800 rounded shadow-md hover:shadow-lg">
                        יצירת קשר
                    </button>
                </nav>

                {furnitureItems.length > 0 && (
                    <div
                        className="relative z-10 flex flex-col items-center text-center py-20 px-6">
                        <h1 className="text-5xl font-bold text-white drop-shadow-md">
                            {furnitureItems[currentIndex].name}
                        </h1>
                        <p className="mt-4 text-lg text-white drop-shadow-md max-w-2xl">
                            {furnitureItems[currentIndex].description}
                        </p>
                        <button
                            className="mt-6 px-6 py-3 bg-white text-gray-800 font-medium rounded-lg shadow-md hover:bg-gray-100">
                            <Link to="/gallery%hebrew">לחקור את הקולקציה</Link>
                        </button>
                    </div>
                )}
            </header>
        </div>
    );
};

export default HeaderHebrew;
