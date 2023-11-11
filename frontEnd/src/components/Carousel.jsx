import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import s1 from '../data/s1.png';
import s2 from '../data/s2.png';
import s3 from '../data/s3.png';

const images = [
  {
    url: s1,
    alt: 'Image 1',
    title: 'Track your work performance',
  },
  {
    url: s2,
    alt: 'Image 2',
    title: "Monitor reseller's productivity",
  },
  {
    url: s3,
    alt: 'Image 3',
    title: 'Become a top reseller',
  },
];

const MyCarousel = () => {
  const imageStyle = {
    objectFit: 'cover',
    height: '30rem',
    width: '30rem',
  };

  const [autoplayTimer, setAutoplayTimer] = useState(null);

  useEffect(() => {
    // Create a timer for the auto-play feature when the component mounts
    const timer = setInterval(() => {
      // Auto-play logic here
    }, 3000);

    setAutoplayTimer(timer);

    // Cleanup: Clear the timer when the component unmounts
    return () => {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
      }
    };
  }, []);

  return (
    <div className="carousel-container w-1/2">
      <Carousel
        showArrows={true}
        showThumbs={false}
        showStatus={false}
        showIndicators={false}
        selectedItem={0}
        infiniteLoop={true}
        autoPlay={false}  // Disable auto-play here
        stopOnHover={true}
      >
        {images.map((image, index) => (
          <div key={index}>
            <img className="w-full" src={image.url} alt={image.alt} style={imageStyle} />
            <h2 className="font-semibold text-2xl text-blue-600">{image.title}</h2>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default MyCarousel;
