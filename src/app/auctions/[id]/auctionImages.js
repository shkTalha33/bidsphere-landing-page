import React from 'react';
import Image from "next/image";
import { Modal } from 'antd';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'react-feather';

// Component for the dynamic image grid
const AuctionImages = ({ images }) => {
  const [showImageModal, setShowImageModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  if (!images || images.length === 0) {
    return <div className="text-center p-4">No images available</div>;
  }

  const handleSeeAllClick = () => {
    setCurrentImageIndex(0);
    setShowImageModal(true);
  };

  const navigateImage = (direction) => {
    if (direction === 'next') {
      setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    } else {
      setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }
  };

  // Render the image grid based on the number of images
  const renderImageGrid = () => {
    if (images.length === 1) {
      // If there's only 1 image, show it full width
      return (
        <div className="w-full h-full">
          <Image
            src={images[0]}
            className="w-full h-full object-cover rounded-[10px]"
            alt="auction item"
            width={500}
            height={300}
            layout="responsive"
          />
        </div>
      );
    } else if (images.length === 2) {
      // If there are 2 images, show them in 2 columns
      return (
        <div className="flex gap-2 h-full">
          <div className="flex-1">
            <Image
              src={images[0]}
              className="w-full h-full object-cover rounded-[10px]"
              alt="auction item"
              width={250}
              height={300}
              layout="responsive"
            />
          </div>
          <div className="flex-1">
            <Image
              src={images[1]}
              className="w-full h-full object-cover rounded-[10px]"
              alt="auction item"
              width={250}
              height={300}
              layout="responsive"
            />
          </div>
        </div>
      );
    } else if (images.length === 3) {
      // If there are 3 images, show 2 in first column and 1 in second column
      return (
        <div className="flex gap-2 h-full">
          <div className="flex-1">
            <div className="h-1/2 pb-1">
              <Image
                src={images[0]}
                className="w-full h-full object-cover rounded-[10px]"
                alt="auction item"
                width={250}
                height={150}
                layout="responsive"
              />
            </div>
            <div className="h-1/2 pt-1">
              <Image
                src={images[1]}
                className="w-full h-full object-cover rounded-[10px]"
                alt="auction item"
                width={250}
                height={150}
                layout="responsive"
              />
            </div>
          </div>
          <div className="flex-1">
            <Image
              src={images[2]}
              className="w-full h-full object-cover rounded-[10px]"
              alt="auction item"
              width={250}
              height={300}
              layout="responsive"
            />
          </div>
        </div>
      );
    } else if (images.length === 4) {
      // If there are 4 images, show 2 in each column
      return (
        <div className="flex gap-2 h-full">
          <div className="flex-1">
            <div className="h-1/2 pb-1">
              <Image
                src={images[0]}
                className="w-full h-full object-cover rounded-[10px]"
                alt="auction item"
                width={250}
                height={150}
                layout="responsive"
              />
            </div>
            <div className="h-1/2 pt-1">
              <Image
                src={images[1]}
                className="w-full h-full object-cover rounded-[10px]"
                alt="auction item"
                width={250}
                height={150}
                layout="responsive"
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="h-1/2 pb-1">
              <Image
                src={images[2]}
                className="w-full h-full object-cover rounded-[10px]"
                alt="auction item"
                width={250}
                height={150}
                layout="responsive"
              />
            </div>
            <div className="h-1/2 pt-1">
              <Image
                src={images[3]}
                className="w-full h-full object-cover rounded-[10px]"
                alt="auction item"
                width={250}
                height={150}
                layout="responsive"
              />
            </div>
          </div>
        </div>
      );
    } else {
      // If there are 5 or more images, show 4 and a "See All" button on the last spot
      return (
        <div className="flex gap-2 h-full">
          <div className="flex-1">
            <div className="h-1/2 pb-1">
              <Image
                src={images[0]}
                className="w-full h-full object-cover rounded-[10px]"
                alt="auction item"
                width={250}
                height={150}
                layout="responsive"
              />
            </div>
            <div className="h-1/2 pt-1">
              <Image
                src={images[1]}
                className="w-full h-full object-cover rounded-[10px]"
                alt="auction item"
                width={250}
                height={150}
                layout="responsive"
              />
            </div>
          </div>
          <div className="flex-1">
            <div className="h-1/2 pb-1">
              <Image
                src={images[2]}
                className="w-full h-full object-cover rounded-[10px]"
                alt="auction item"
                width={250}
                height={150}
                layout="responsive"
              />
            </div>
            <div className="h-1/2 pt-1 relative">
              {images.length === 5 ? (
                <Image
                  src={images[4]}
                  className="w-full h-full object-cover rounded-[10px]"
                  alt="auction item"
                  width={250}
                  height={150}
                  layout="responsive"
                />
              ) : (
                <>
                  <Image
                    src={images[3]}
                    className="w-full h-full object-cover rounded-[10px] brightness-50"
                    alt="auction item"
                    width={250}
                    height={150}
                    layout="responsive"
                  />
                  <button
                    onClick={handleSeeAllClick}
                    className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-[10px] text-white poppins_medium"
                  >
                    See All ({images.length})
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <div className="h-full">
        {renderImageGrid()}
      </div>

      {/* Image modal for swiping through all images */}
      <Modal
        open={showImageModal}
        onCancel={() => setShowImageModal(false)}
        footer={null}
        width="80%"
        centered
        className="image-swiper-modal"
        closeIcon={<X className="text-white" />}
      >
        <div className="relative h-[70vh]">
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src={images[currentImageIndex]}
              className="max-w-full max-h-full object-contain"
              alt={`auction item ${currentImageIndex + 1}`}
              width={800}
              height={600}
            />
          </div>
          
          <button
            onClick={() => navigateImage('prev')}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-2"
          >
            <ChevronLeft className="text-white h-6 w-6" />
          </button>
          
          <button
            onClick={() => navigateImage('next')}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 rounded-full p-2"
          >
            <ChevronRight className="text-white h-6 w-6" />
          </button>
          
          <div className="absolute bottom-4 left-0 right-0 text-center text-white">
            {currentImageIndex + 1} / {images.length}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AuctionImages;