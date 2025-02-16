import React, {useCallback, useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import './imageSlider.css'
import {BsChevronBarLeft, BsChevronBarRight} from "react-icons/bs";
import {RxDotFilled} from "react-icons/rx";

const ImageSlider = () => {
    const items = useSelector((state) => state.furniture.items);
    const [currentIndex, setCurrentIndex] = useState(0);


    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, [items.length]);


    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    };

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex)
    };

    useEffect(() => {
        const interval = setInterval(() => nextSlide(), 5000);

        return () => clearInterval(interval);
    }, [nextSlide]);

    if (!items || items.length === 0) {
        return <div>No items to display</div>;
    }

    return <div
        className='max-w-[1000px] h-[550px] w-full m-auto py-16 px-4 relative group'>
        <div style={{backgroundImage: `url(${items[currentIndex].image})`,}}
             className='w-full h-full rounded-2xl bg-center bg-cover duration-500'></div>
        <div
            className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] left-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
            <BsChevronBarLeft onClick={prevSlide} size={30}/>
        </div>
        <div
            className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer'>
            <BsChevronBarRight onClick={nextSlide} size={30}/>
        </div>
        <div className="flex top-4 justify-center py-2">
            {items.map((_, index) => (
                <div key={index} onClick={() => goToSlide(index)} className='text-2xl cursor-pointer'>
                    <RxDotFilled/>
                </div>
            ))}
        </div>
    </div>

};

export default ImageSlider;
