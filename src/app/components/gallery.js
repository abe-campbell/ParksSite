import React from 'react';


function Gallery({ park }) {
    const imgList = park?.personalImages;
    return (
      <div className="gallery">
        {imgList?.map((image, index) => (
          <img
            key={index}
            className="gallery__item"
            src={image.src}
            alt={image.alt}
          />
        ))}
      </div>
    );
  }
  
  export default Gallery;