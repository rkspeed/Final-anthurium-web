/* global cv */
import React, { useRef, useState, useEffect } from 'react';

const ImageProcessor = ({ selectedImage }) => {

    const canvasRef = useRef(null);
    const imgRef = useRef(null);


    useEffect(() => {
        if (selectedImage) {
            const img = imgRef.current;
            img.onload = () => {
                const canvas = canvasRef.current;
                const ctx = canvas.getContext('2d');
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                processImage(img);
            };
        }
    }, [selectedImage]);

    const processImage = (img) => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const src = cv.imread(img);
        const gray = new cv.Mat();
        cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);

        // Use Canny edge detector
        const edges = new cv.Mat();
        cv.Canny(gray, edges, 50, 100, 3, false);

        // Find contours
        const contours = new cv.MatVector();
        const hierarchy = new cv.Mat();
        cv.findContours(edges, contours, hierarchy, cv.RETR_TREE, cv.CHAIN_APPROX_SIMPLE);

        // Draw contours on the canvas
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 2;
        for (let i = 0; i < contours.size(); i++) {
            const contour = contours.get(i);
            const points = contour.data32S;
            ctx.beginPath();
            for (let j = 0; j < points.length; j += 2) {
                const x = points[j];
                const y = points[j + 1];
                if (j === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            }
            ctx.closePath();
            ctx.stroke();
        }

        // Clean up
        src.delete();
        gray.delete();
        edges.delete();
        contours.delete();
        hierarchy.delete();
    };

   

return (
    <div className='can-img'>
        {/* <input type="file" accept="image/*" onChange={handleImageUpload} /> */}
        <img ref={imgRef} src={selectedImage} alt="Uploaded" style={{ display: 'none', maxWidth: '200px' }} />
        <canvas ref={canvasRef}></canvas>
    </div>
);
};

export default ImageProcessor;
