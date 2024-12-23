import React, { useEffect, useState } from 'react';
import ParkMarker from './markers';
import Gallery from './gallery.js'

const ParkInfo = ({ park, isOpen, onClose }) => {


    useEffect(() => {
        if (isOpen) {
          document.body.style.overflow = 'auto';
        } else {
          document.body.style.overflow = 'auto';
        }
        return () => {
          document.body.style.overflow = 'auto';
        };
      }, [isOpen]);

    return (
        <div className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
            <button
                className = 'close'
                onClick = {onClose}
            > 
                X
            </button>
            <p>
                { park?.name }
            </p>
            <img
                src = { park?.url }
                alt = 'bleh'
                width = '100%'
            />
            <p>
              { park?.text }
            </p>
            <Gallery park = {park}/>

        </div>
    );   
}

export default ParkInfo;