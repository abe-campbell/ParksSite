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
            <p style={{ textAlign: "center", fontSize: "500%" }}>
                { park?.name }
            </p>
            <p style={{ textAlign: "center", fontSize: "200%", marginBottom: "20px" }}>
              { park?.text }
            </p>
            <img
                src = { park?.url }
                alt = 'bleh'
                width = '100%'
            />
            <hr className="solid"></hr>
            <Gallery park = {park}/>
            <p>
              { park?.personalText }
            </p>

        </div>
    );   
}

export default ParkInfo;