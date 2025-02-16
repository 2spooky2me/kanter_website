import React from 'react';
import {useSelector} from 'react-redux';
import Slider from 'react-slick';
import ImageSlider from "./ImageSlider/ImageSlider";

const Shop = () => {
    const items = useSelector((state) => state.furniture.items);

    const sliderSettings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
    };

    return (
        <>
            <ImageSlider/>
            <section id="shop" className="shop">
                <h2>Shop</h2>
                <Slider {...sliderSettings} className="shop-slider">
                    {items.map((item, index) => (
                        <div key={index} className="shop-item">
                            <img src={item.image} alt={item.name} className="item-image"/>
                            <h3>{item.name}</h3>
                            <p>{item.description}</p>
                            <p>${item.price}</p>
                        </div>
                    ))}
                </Slider>
            </section>
        </>
    );
};

export default Shop;
