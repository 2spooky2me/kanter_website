import React from 'react';

const VideoPage = () => {
    return (
        <section className="video-page">
            <h2>How We Make Furniture</h2>
            <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/VfRGyfw7kGY"
                title="How We Make Furniture"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </section>
    );
};

export default VideoPage;