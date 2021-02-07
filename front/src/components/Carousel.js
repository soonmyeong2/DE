

import { IconButton } from '@material-ui/core';
import { ArrowBackIos, ArrowForwardIos, ChatBubbleOutline } from '@material-ui/icons';
import React,{useEffect,useState,useRef} from 'react'
import '../css/Carousel.scss'

function Slide({ image }) {
    return (
        <img className="carousel-img" src={image} />
    );
  }

export default function Carousel ({images}) {
    
    
    const totalSlide= images.length
    const [currentSlide, setCurrentSlide] = useState(1);
    const slideRef = useRef(null);
    const nextSlide = () => {
    if (currentSlide >= totalSlide) { // 더 이상 넘어갈 슬라이드가 없으면 슬라이드를 초기화합니다.
        setCurrentSlide(1);
    } else {
        setCurrentSlide(currentSlide + 1);
    }
    };
    const prevSlide = () => {
        if (currentSlide === 1) {
            setCurrentSlide(totalSlide);
        } else {
            setCurrentSlide(currentSlide - 1);
        }
    }


      useEffect(() => {
        slideRef.current.style.transition = "all 0.5s ease-in-out";
        slideRef.current.style.transform = `translateX(-${(currentSlide-1)*100/2}%)`; // 백틱을 사용하여 슬라이드로 이동하는 애니메이션을 만듭니다.
      }, [currentSlide]);

      return (
        <div className="carousel-container">
          <div className="carousel-slider" style={{width:String(totalSlide*100) + '%'}} ref={slideRef}>
              {images.map(image => (
                  <Slide key={image.attachName} image={image.attachUrl} />
              ))}

          </div>
          
  
          {totalSlide == 1? null:
          <>
            <div className="carousel-button prev"  >
            <IconButton className="carousel-button prev"  onClick={prevSlide}>
                    <ArrowBackIos /> 
            </IconButton>
            </div>
            <div className="carousel-button next" >
            <IconButton onClick={nextSlide}>
                    <ArrowForwardIos />
            </IconButton>
            </div>
       
          </>}
          
        </div>
      );
}

