'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaHeart, FaRegHeart, FaGift } from 'react-icons/fa';
import { Badge } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

interface DealCardProps {
  businessName: string;
  dealTitle: string;
  address: string;
  distance: string;
  originalPrice: number;
  timedPrice: number;
  timedPriceEndTime: Date;
  discountPrice: number;
  discountCode: string;
  mainImage: string;
  hoverImage: string;
  isPopular?: boolean;
}

export function DealCard({
  businessName,
  dealTitle,
  address,
  distance,
  originalPrice,
  timedPrice,
  timedPriceEndTime,
  discountPrice,
  discountCode,
  mainImage,
  hoverImage,
  isPopular = false,
}: DealCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div>
      {/* Business Name above card */}
      <h6 
        className="mb-1 ps-1" 
        style={{ 
          fontSize: '0.8rem',
          color: '#666',
          fontWeight: '500'
        }}
      >
        {businessName}
      </h6>

      {/* Main Card */}
      <div 
        className="card position-relative shadow-sm"
        style={{ 
          width: '100%',
          maxWidth: '100%',
          borderRadius: '16px',
          border: '1px solid #e0e0e0'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Favorite Heart Button */}
        <button 
          className="position-absolute btn p-0 m-2" 
          style={{ right: 0, zIndex: 2 }}
          onClick={() => setIsFavorite(!isFavorite)}
        >
          {isFavorite ? (
            <FaHeart className="text-danger" size={24} />
          ) : (
            <FaRegHeart className="text-danger" size={24} />
          )}
        </button>

        {/* Popular Badge */}
        {isPopular && (
          <div className="position-absolute m-2" style={{ left: 0, zIndex: 2 }}>
            <Badge bg="warning" className="d-flex align-items-center gap-1">
              <FaGift /> Popular
            </Badge>
          </div>
        )}

        {/* Card Image */}
        <div style={{ 
          height: '240px',
          position: 'relative',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
          overflow: 'hidden'
        }}>
          <Image
            src={mainImage}
            alt={dealTitle}
            fill
            className="object-fit-cover"
            sizes="100vw"
            priority
            style={{ 
              opacity: isHovered ? 0 : 1,
              transition: 'opacity 0.8s ease-in-out',
              position: 'absolute'
            }}
          />
          <Image
            src={hoverImage}
            alt={dealTitle}
            fill
            className="object-fit-cover"
            sizes="100vw"
            priority
            style={{ 
              opacity: isHovered ? 1 : 0,
              transition: 'opacity 0.8s ease-in-out',
              position: 'absolute'
            }}
          />
        </div>

        {/* Card Body */}
        <div className="card-body p-3 pt-2">
          {/* <h6 className="card-subtitle mb-1 text-muted">{businessName}</h6> */}
          <h5 className="card-title fw-bold mb-1">{dealTitle}</h5>
          
          <div className="d-flex justify-content-between align-items-center mb-3">
            <small className="text-muted">{address}</small>
            <small className="text-muted fw-bold">{distance}</small>
          </div>

          <div className="prices">
            <p className="mb-2 fs-6">
              <span className="text-muted text-decoration-line-through me-2">${originalPrice}</span>
              <span className="fw-bold fs-5 text-success">${timedPrice}</span>
            </p>
            
            <p className="mb-0">
              <small className="text-danger fw-bold">Limited Time Offer</small>
              <small className="text-muted ms-2">
                Ends in: {/* Add countdown timer component here */}
              </small>
            </p>

            <p className="mb-0">
              Use code <span className="badge bg-primary">{discountCode}</span>
              <span className="ms-2 fw-bold text-success">${discountPrice}</span>
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}