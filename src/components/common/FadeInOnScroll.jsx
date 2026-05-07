import React, { useEffect, useRef, useState } from 'react';

const FadeInOnScroll = ({ children, className = '', delay = 0 }) => {
    const elementRef = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const node = elementRef.current;
        if (!node) {
            return undefined;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.16 }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={elementRef}
            style={{ transitionDelay: `${delay}ms` }}
            className={`transform transition duration-700 ease-out ${
                isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            } ${className}`}
        >
            {children}
        </div>
    );
};

export default FadeInOnScroll;
