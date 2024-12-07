import React from 'react';

interface ImagePreviewProps {
  images: File[];
  onRemove: (index: number) => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ images, onRemove }) => {
  if (images.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-4 bg-inherit p-1 rounded-md">
      {images.map((image, index) => (
        <div key={index} className="relative inline-block">
          <img
            src={URL.createObjectURL(image)}
            alt={`preview-${index}`}
            className="w-16 h-16 object-cover rounded-lg"
          />
          <button
            className="absolute top-0 right-0 bg-black bg-opacity-50 text-white rounded-full w-5 h-5 flex items-center justify-center cursor-pointer"
            onClick={() => onRemove(index)}
          >
            X
          </button>
        </div>
      ))}
    </div>
  );
};

export default ImagePreview;
