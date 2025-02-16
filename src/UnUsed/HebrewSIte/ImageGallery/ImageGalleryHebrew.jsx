import React, {useState} from "react";
import {useSelector} from "react-redux";
import {IoIosCloseCircle} from "react-icons/io";
import HeaderV2 from "../../../components/NavBar/HeaderV2";

const ImageGalleryHebrew = () => {
    const furnitureItems = useSelector((state) => state.furniture.items || []);
    const [selectedItem, setSelectedItem] = useState(null);

    const openModal = (item) => {
        setSelectedItem(item);
    };

    const closeModal = () => {
        setSelectedItem(null);
    };

    return (
        <>
            <HeaderV2 />
            <div
                className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12">
                <h1 className="text-4xl font-bold text-gray-800 mb-8">אוסף</h1>
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-4">
                    {furnitureItems.map((item, index) => (
                        <div
                            key={index}
                            className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer"
                            onClick={() => openModal(item)}
                        >
                            <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-70 object-cover transform transition-transform duration-500 group-hover:scale-110"
                            />
                            <div
                                className="absolute inset-0 bg-black bg-opacity-50 opacity-0 transition-opacity duration-500 group-hover:opacity-100 flex items-center justify-center">
                                <p className="text-white text-lg font-semibold">{item.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {}
            {selectedItem && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50"
                    onClick={closeModal}
                >
                    <div
                        className="bg-white w-full max-w-[38%] h-auto overflow-hidden relative rounded-lg"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute top-4 right-4 text-3xl text-gray-800 hover:text-black focus:outline-none"
                            onClick={closeModal}
                        >
                            <IoIosCloseCircle />
                        </button>
                        <div className="w-full">
                            <img
                                src={selectedItem.image}
                                alt={selectedItem.name}
                                className="w-full h-auto object-contain"
                            />
                        </div>
                        <div className="p-6 text-center bg-white">
                            <h2 className="text-3xl font-bold text-gray-800">
                                {selectedItem.name}
                            </h2>
                            <p className="text-gray-600 mt-4 text-lg">
                                {selectedItem.description}
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ImageGalleryHebrew;