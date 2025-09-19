import { useState, forwardRef } from "react";
import images from "../../assets/images";

const Image = forwardRef(
  ({ src, alt, fallback = images.noImage, ...props }, ref) => {
    const imgSrc = src || fallback || images.noImage;

    return <img ref={ref} src={imgSrc} alt={alt} {...props} />;
  }
);

export default Image;
