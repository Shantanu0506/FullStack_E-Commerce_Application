import React from 'react';
import phone from '../images/pm.jpg';
import phone1 from '../images/am.jpg';
import phone2 from '../images/sm.jpg';
import phone3 from '../images/shiwa-id-Uae7ouMw91A-unsplash.jpg';
import phoneIcon from '../images/mobile_3_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg';

import watch from '../images/aw.webp';
import watch1 from '../images/sw.webp';
import watch2 from '../images/gw.webp';
import watch3 from '../images/daniel-korpai-QhF3YGsDrYk-unsplash.jpg';
import watchIcon from '../images/watch_check_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg';

import tv from '../images/lt.jpg';
import tv1 from '../images/st.jpg';
import tv2 from '../images/st2.jpg';
import tv3 from '../images/nicolas-j-leclercq-fg00hP0VPI8-unsplash.jpg';
import tvIcon from '../images/tv_gen_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg';

import machine from '../images/bl.jpg';
import machine1 from '../images/il.jpg';
import machine2 from '../images/pl.jpg';
import machine3 from '../images/raychan-vkpVPcIBU5U-unsplash.jpg';
import machineIcon from '../images/local_laundry_service_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg';

// Reusable ProductCarousel Component
const ProductCarousel = ({ title, images, icon, bgColor, carouselId }) => {
    return (
        <div className={`col-sm-12 col-md-6 col-lg-3 ${bgColor} mb-3 mb-lg-0`}>
            <div className="p-3 text-center h-100">
                <h4 className="text-white mb-3">{title}</h4>
                
                <div id={carouselId} className="carousel slide mb-3" data-bs-ride="carousel" data-bs-interval="3000">
                    {/* Carousel Indicators */}
                    <div className="carousel-indicators">
                        {images.map((_, index) => (
                            <button 
                                key={index}
                                type="button" 
                                data-bs-target={`#${carouselId}`} 
                                data-bs-slide-to={index} 
                                className={index === 0 ? "active" : ""}
                                aria-current={index === 0 ? "true" : "false"}
                                aria-label={`Slide ${index + 1}`}
                            ></button>
                        ))}
                    </div>

                    {/* Carousel Items */}
                    <div className="carousel-inner">
                        {images.map((img, index) => (
                            <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                <img 
                                    src={img.src} 
                                    className="d-block w-100 product-img" 
                                    alt={img.alt}
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Carousel Controls */}
                    <button 
                        className="carousel-control-prev" 
                        type="button" 
                        data-bs-target={`#${carouselId}`} 
                        data-bs-slide="prev"
                        aria-label="Previous image"
                    >
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button 
                        className="carousel-control-next" 
                        type="button" 
                        data-bs-target={`#${carouselId}`} 
                        data-bs-slide="next"
                        aria-label="Next image"
                    >
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>

                {/* Explore Button */}
                <button className="product-btn btn btn-light rounded-pill px-4 py-2 fw-bold">
                    Explore 
                    <img 
                        src={icon} 
                        alt="category icon" 
                        className="ms-2" 
                        style={{width: '20px', height: '20px'}}
                    />
                </button>
            </div>
        </div>
    );
};

function Home1() {
    // Product data configuration
    const products = [
        {
            title: "Smart Phones",
            images: [
                { src: phone, alt: "Premium mobile phone" },
                { src: phone1, alt: "Android smartphone" },
                { src: phone2, alt: "Samsung mobile device" },
                { src: phone3, alt: "Modern smartphone design" }
            ],
            icon: phoneIcon,
            bgColor: "bg-primary",
            carouselId: "carouselPhone"
        },
        {
            title: "Smart Watches",
            images: [
                { src: watch, alt: "Apple smartwatch" },
                { src: watch1, alt: "Samsung Galaxy watch" },
                { src: watch2, alt: "Garmin fitness watch" },
                { src: watch3, alt: "Premium smartwatch collection" }
            ],
            icon: watchIcon,
            bgColor: "bg-success",
            carouselId: "carouselWatch"
        },
        {
            title: "Smart TVs",
            images: [
                { src: tv1, alt: "Samsung smart television" },
                { src: tv, alt: "LG OLED TV" },
                { src: tv2, alt: "Sony 4K smart TV" },
                { src: tv3, alt: "Modern TV entertainment center" }
            ],
            icon: tvIcon,
            bgColor: "bg-danger",
            carouselId: "carouselTv"
        },
        {
            title: "Washing Machines",
            images: [
                { src: machine, alt: "Bosch front-load washer" },
                { src: machine1, alt: "IFB washing machine" },
                { src: machine2, alt: "Premium laundry appliance" },
                { src: machine3, alt: "Modern washing machine design" }
            ],
            icon: machineIcon,
            bgColor: "bg-secondary",
            carouselId: "carouselMachine"
        }
    ];

    return (
        <div className="container-fluid">
            {/* Page Header */}
            <div className="row py-4">
                <div className="col-12 text-center">
                    <h1 className="display-4 fw-bold text-dark mb-2">Welcome to TechStore</h1>
                    <p className="lead text-muted">Discover our amazing collection of premium electronics</p>
                </div>
            </div>

            {/* Product Categories */}
            <div className="row g-3">
                {products.map((product, index) => (
                    <ProductCarousel 
                        key={index} 
                        title={product.title}
                        images={product.images}
                        icon={product.icon}
                        bgColor={product.bgColor}
                        carouselId={product.carouselId}
                    />
                ))}
            </div>

            {/* Call to Action Section */}
            <div className="row py-5">
                <div className="col-12 text-center">
                    <div className="bg-light p-4 rounded-3">
                        <h3 className="mb-3">Find Your Perfect Tech Companion</h3>
                        <p className="text-muted mb-4">Browse through our curated selection of premium electronics</p>
                        <button className="btn btn-primary btn-lg rounded-pill px-5">
                            Shop All Categories
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home1;