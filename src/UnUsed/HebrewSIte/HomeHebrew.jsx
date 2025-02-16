import {useSelector} from "react-redux";
import HeaderHebrew from "./NavBar/HeaderHebrew";

const HomeHebrew = () => {

    const furnitureItems = useSelector((state) => state.furniture.items);

    return (
        <>
            <HeaderHebrew />
            <div className="min-h-screen bg-gray-50">
                <main className="py-16 bg-white">
                    <div className="max-w-7xl mx-auto px-6">
                        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                            ספות נבחרות
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {furnitureItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-100 rounded-lg shadow-md overflow-hidden"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="text-xl font-bold">{item.name}</h3>
                                        <p className="text-gray-600 mt-2">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>

                <footer className="bg-gray-800 text-white py-6">
                    <div className="max-w-7xl mx-auto px-6 text-center">
                        <p className="text-sm">
                            &copy; 2025 תצוגת ספות. כל הזכויות שמורות לקנטר.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default HomeHebrew;
