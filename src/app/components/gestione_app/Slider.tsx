import React, { useState } from 'react';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import 'app/css/gestione_app/Slider.css';

interface SliderProps {
  images: string[];
  //chartData: { id: string; amount: number | null }[];
}
const Slider: React.FC<SliderProps> = ({ images }) => {
  const [imageIndex, setImageIndex] = useState(0);

  function prevSlide(): void {
    setImageIndex((index) => {
      if (index === 0) {
        return images.length - 1;
      }
      return index - 1;
    });
  }

  function nextSlide(): void {
    setImageIndex((index) => {
      if (index === images.length - 1) {
        return 0;
      }
      return index + 1;
    });
  }

  return (
    <div style={{ width: '35em', height: '25em', position: 'relative' }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          overflow: 'hidden',
        }}
      >
        {images.map((url) => (
          <img
            key={url}
            src={url}
            className="img-slider"
            style={{ translate: `${-100 * imageIndex}%` }}
          />
        ))}

        <button onClick={prevSlide} className="slider-btn" style={{ left: 0 }}>
          <ArrowBackIosIcon />
        </button>
        <img
          src={images[imageIndex]}
          className="img-slider"
          alt={`Slide ${imageIndex + 1}`}
        />
        <button onClick={nextSlide} className="slider-btn" style={{ right: 0 }}>
          <ArrowForwardIosIcon />
        </button>
      </div>
    </div>
  );
};
export default Slider;
