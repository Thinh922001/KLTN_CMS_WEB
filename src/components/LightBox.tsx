import React, { useState } from 'react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import { Eye } from 'lucide-react';

const ImageGallery = ({ images }: { images: string[] }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsVisible(false);
    }
  };

  return (
    <div>
      <Eye
        style={{ cursor: 'pointer', fontSize: '24px' }}
        onClick={() => setIsVisible(true)}
      />

      {isVisible && (
        <div
          className="overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.8)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onClick={handleOverlayClick}
        >
          <div
            style={{
              position: 'relative',
              padding: '20px',
              backgroundColor: '#fff',
              borderRadius: '8px',
            }}
          >
            <button
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                cursor: 'pointer',
              }}
              onClick={() => setIsVisible(false)}
            >
              ✕
            </button>
            <PhotoProvider>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                {images.map((img, index) => (
                  <PhotoView key={index} src={img}>
                    <img
                      src={img}
                      alt={`img-${index}`}
                      style={{
                        width: 100,
                        cursor: 'pointer',
                        margin: '5px',
                        borderRadius: '4px',
                      }}
                    />
                  </PhotoView>
                ))}
              </div>
            </PhotoProvider>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
