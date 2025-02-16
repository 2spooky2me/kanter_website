import React from "react";
import { useSelector } from "react-redux";
import Header from "./NavBar/Header";

const Home = () => {
    const furnitureItems = useSelector((state) => state.furniture.items);
    const currentLanguage = useSelector((state) => state.furniture.currentLanguage || "en");

    const headings = {
        en: "Featured Sofas",
        he: "ספות נבחרות",
        ru: "Избранные диваны",
    };

    const footerText = {
        en: "© 2025 Sofa Showcase. All rights reserved.",
        he: "© 2025 תצוגת ספות. כל הזכויות שמורות לקנטר.",
        ru: "© 2025 Выставка диванов. Все права защищены.",
    };

    return (
        <>
            <Header />
            <div className="min-h-screen bg-gray-50">
                <main className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-6">
                        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                            {headings[currentLanguage]}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {furnitureItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-100 rounded-lg shadow-md overflow-hidden"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name[currentLanguage]}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="text-xl font-bold">
                                            {item.name[currentLanguage]}
                                        </h3>
                                        <p className="text-gray-600 mt-2">
                                            {item.description[currentLanguage]}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>

                <footer className="bg-gray-800 text-white py-6">
                    <div className="max-w-7xl mx-auto px-6 text-center">
                        <p className="text-sm">{footerText[currentLanguage]}</p>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default Home;
