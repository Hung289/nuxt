import React from 'react';

const SVG = ({
    style = {},
    fill = '#3f3f3f',
    width = '100%',
    className = '',
    viewBox = '0 0 595.28 400.48'
}) => (
    <svg
        width={width}
        style={style}
        height={width}
        viewBox={viewBox}
        xmlns="http://www.w3.org/2000/svg"
        className={`svg-icon ${className || ''}`}
        xmlnsXlink="http://www.w3.org/1999/xlink"
    >
        <path
            fill={fill}
            d="M281.02 10.48h41.92a5.24 5.24 0 100-10.48h-41.92a5.24 5.24 0 000 10.48zM460.4 30.82h53a5.24 5.24 0 100-10.48h-53a5.24 5.24 0 000 10.48zM107.81 350.13H58.49a5.24 5.24 0 000 10.47h49.32a5.24 5.24 0 100-10.47zM504.78 377.25H469.7a5.24 5.24 0 100 10.48h35.13a5.24 5.24 0 000-10.48zM325.7 37.29a5.24 5.24 0 005.24 5.24h38.22a5.24 5.24 0 000-10.48h-38.21a5.25 5.25 0 00-5.25 5.24zM142.08 143.09h.62c9.85 0 18.42-3.77 25.49-11.2 26.13-27.51 22.82-98 22.66-101a5.25 5.25 0 00-1.95-3.83c-1-.82-25.6-20.19-56.94-20.19a71.56 71.56 0 00-22.26 3.53c-40.89 13.35-58.77 74.43-59.51 77a5.24 5.24 0 00.92 4.68c1.59 2.07 40.08 50.19 90.97 51.01zm-29.1-122.73a61.22 61.22 0 0119-3c23 0 42.54 12.33 48.51 16.52.05 1.59.09 3.91.09 6.78h-29.6a5.24 5.24 0 000 10.48h29.41c-.8 22.27-4.56 57.49-19.79 73.51-5.09 5.37-10.9 7.95-17.9 7.95h-.45c-40.2-.65-73.33-35.91-81.14-44.92 3.77-11.44 20.59-57.08 51.87-67.32zM282.64 182.6c28.6 6.84 58.17 13.91 68.22 21.13a5.23 5.23 0 008.29-4.2 234.61 234.61 0 00-10.69-66.07c-14.57-46.1-42.21-76.64-79.91-88.32-13.45-4.17-53.41-11.68-55.1-12a5.23 5.23 0 00-6 3.85c-2.22 8.72-21.49 85.87-14.15 109.52 4.56 14.83 36.8 23.53 89.34 36.09zm-72.94-108h27.58a5.24 5.24 0 000-10.48h-25.4c1.61-7.5 3.19-14.3 4.51-19.74 11.24 2.17 38.88 7.62 49.08 10.78 34.7 10.75 59.23 38.07 72.94 81.21a217.78 217.78 0 016.74 27.61h-27.76a5.24 5.24 0 100 10.48h28.36a5.36 5.36 0 001-.1c.86 6.4 1.33 11.92 1.6 16.14-14.44-6.4-38.29-12.11-63.26-18.08-19.71-4.71-40.08-9.58-55.78-14.82-21.78-7.28-25.46-12.34-26-14.18-3.61-11.5 1.07-42.38 6.39-68.82zM305.08 196.9c-50.66-17.71-123.12-41.36-163-40.59a5.25 5.25 0 00-5.07 4.35c-.51 2.95-11.86 72.46 37 105.58 15.12 10.24 33.54 15 58 15 14 0 28.8-1.53 43.12-3 14.6-1.51 29.7-3.07 44.24-3.07a143 143 0 0130.33 2.9 5.23 5.23 0 006.34-5 91 91 0 00-5.62-31.08c-8.09-21.93-23.72-37.54-45.34-45.09zm14.24 67.8c-15.08 0-30.45 1.59-45.32 3.13-14.7 1.52-28.58 2.95-42 2.95-22.24 0-38.79-4.2-52.09-13.22-23-15.6-30.77-41.37-33-62.15h31.19a5.24 5.24 0 000-10.48h-31.9a141.72 141.72 0 01.6-18.11c43.89 1.19 124.2 29.27 154.84 40a61.33 61.33 0 0130.51 22.51H295.2a5.24 5.24 0 000 10.48h41.91a5.19 5.19 0 001-.11 81.42 81.42 0 017.16 26.9 162.62 162.62 0 00-25.95-1.9zM347.23 65.6a5.22 5.22 0 002.43 5.67c25 14.86 26 95.68 24.31 125.57a5.25 5.25 0 004.51 5.49 454.59 454.59 0 0056.85 3.48c22.49 0 42.75-1.72 60.23-5.11 54.4-10.55 80.44-47.21 81.52-48.77a5.25 5.25 0 00.48-5.14c-32.86-73.11-125.27-81.2-180.52-86-4.08-.36-9-.54-14.56-.54-15 0-30 1.27-30.59 1.33a5.24 5.24 0 00-4.66 4.02zm35.25 5.1c5.27 0 9.87.17 13.67.5 50.4 4.41 133.11 11.65 167.1 70.61h-71.62a5.24 5.24 0 100 10.48h71.55a128.68 128.68 0 01-69.62 38.13c-16.82 3.26-36.41 4.92-58.23 4.92a471.15 471.15 0 01-50.63-2.84 467 467 0 00-1.22-53.61q-2.26-26.67-7.79-44.58h28.01a5.24 5.24 0 000-10.48h-31.89a61.37 61.37 0 00-7.11-12.65c5.18-.27 11.52-.51 17.78-.51zM576.59 242.38c-8.38-14.81-23.44-37.07-30.71-40.18a5.19 5.19 0 00-4.21 0c-.59.26-59.84 26.61-130.58 26.61a263.79 263.79 0 01-39.79-2.94 5.25 5.25 0 00-6 5.94c.15 1 3.8 24.95 19.74 50.8 14.79 24 43.33 54 95.36 61.08a5.49 5.49 0 00.7.05 5.22 5.22 0 003.09-1c.32-.23 33.07-23.58 85-22.85h.7c18.36 0 23.37-11.07 24.73-17.66 3.5-16.91-7.87-41.89-18.03-59.85zm7.59 58.63c-1 3.92-3.57 8.43-14.26 8.43h-.55c-49.14-.7-81.64 18.44-89.52 23.63a133.58 133.58 0 01-27.36-7h5.44a5.24 5.24 0 000-10.48H440.7a5.23 5.23 0 00-4.62 2.83 112.66 112.66 0 01-28.61-23.17h24.6a5.24 5.24 0 000-10.48h-33q-2.54-3.53-4.88-7.3a144.6 144.6 0 01-17-40.18 278.23 278.23 0 0033.9 2c65 0 119.22-21 132.08-26.33 4.33 4.1 14.45 17.09 24.44 34.8h-34.47a5.24 5.24 0 000 10.48h40c9.33 18.75 13.32 34.04 11.04 42.77zM390.58 310.34c-21.54-14.5-46.27-27.92-81.14-27.92-18.47 0-38.41 3.94-59.28 11.7-67.46 25.12-109.27 47.48-109.69 47.71a5.24 5.24 0 00.12 9.29c1 .49 98.54 49.36 197.83 49.36a281 281 0 0028.67-1.42c38.59-3.94 59.34-13.84 63.45-30.28 6.57-26.24-35.18-55.18-39.96-58.44zm-24.55 78.26a274.76 274.76 0 01-27.61 1.36c-57.46 0-114.45-16.85-151.46-30.63h47.83a5.24 5.24 0 100-10.48h-65.34a5.21 5.21 0 00-4 1.94c-4.09-1.72-7.63-3.27-10.55-4.59a1054 1054 0 0199-42.3c19.69-7.32 38.4-11 55.62-11 32.06 0 55.13 12.56 75.29 26.13 12.11 8.15 27.86 22.15 33.71 34.79h-27.16a5.24 5.24 0 100 10.48h29.34a12.33 12.33 0 01-.31 1.93c-1.99 7.89-13.02 18.18-54.36 22.37z"
        />
        <path
            fill={fill}
            d="M63.41 316.32c11.83 7.83 27.63 12 45.71 12a129.69 129.69 0 0050.15-10.22c15.95-7 23.81-14.48 24-22.93.25-9.81-10-15.21-11.15-15.79l-.17-.08c-.61-.28-61.38-28.78-68.87-96.16a5.23 5.23 0 00-7.67-4 129.39 129.39 0 00-30.3 24.05c-19.53 20.9-28.58 45.23-26.18 70.35 1.86 18.83 10.08 33.25 24.48 42.78zm30.46-123.94c6 33.93 24.38 57.66 39.34 71.93 16.9 16.11 32.75 23.7 34.32 24.43s5.37 3.54 5.3 6.12c-.07 2.85-4.77 7.92-17.76 13.6a118.76 118.76 0 01-45.94 9.35c-20.68 0-55.93-5.9-59.72-45.35-4.06-42.26 29.83-70.13 44.46-80.08zM91.2 153.27c1.23-6.67-.78-12.32-5.86-16.38-1.52-1.2-38.19-29.59-65.8-28.77-12.8.39-19.91 15.55-19.52 41.61.31 20.36 6.81 62.39 25 62.39a11.14 11.14 0 003.41-.54c15.56-4.98 58.6-35.7 62.77-58.31zm-66 48.33a.69.69 0 01-.22 0c-.83 0-4.76-2.56-8.78-15.11a134.91 134.91 0 01-5.71-37c-.27-18.06 3.57-30.8 9.36-31h.91c23.86 0 57.78 26.29 58.07 26.52 1.39 1.11 2.72 2.72 2.06 6.27-3.09 16.88-40.58 45.49-55.68 50.32zM266.02 148.14a30.72 30.72 0 10-30.72-30.71 30.75 30.75 0 0030.72 30.71zm0-50.95a20.24 20.24 0 11-20.24 20.24 20.26 20.26 0 0120.24-20.24zM218.35 191.91a28.26 28.26 0 1028.26 28.25 28.29 28.29 0 00-28.26-28.25zm0 46a17.78 17.78 0 1117.78-17.78 17.79 17.79 0 01-17.78 17.81zM127.94 98.83a25 25 0 10-25-25 25 25 0 0025 25zm0-39.45a14.49 14.49 0 11-14.48 14.49 14.51 14.51 0 0114.48-14.49z"
        />
        <path
            fill={fill}
            d="M89.32 287.87a17.57 17.57 0 10-17.57-17.57 17.59 17.59 0 0017.57 17.57zm0-24.66a7.09 7.09 0 11-7.09 7.09 7.1 7.1 0 017.09-7.09zM38.36 139.31a17.57 17.57 0 1017.57 17.57 17.59 17.59 0 00-17.57-17.57zm0 24.66a7.09 7.09 0 117.09-7.09 7.1 7.1 0 01-7.09 7.09zM322.7 316.84a25.79 25.79 0 1025.82 25.76 25.81 25.81 0 00-25.82-25.76zm0 41.09a15.31 15.31 0 1115.34-15.33 15.33 15.33 0 01-15.34 15.33zM473.14 246.98a23.32 23.32 0 1023.32 23.32 23.34 23.34 0 00-23.32-23.32zm0 36.16a12.84 12.84 0 1112.84-12.84 12.85 12.85 0 01-12.84 12.84zM438.62 151.43a23.32 23.32 0 10-23.32-23.32 23.34 23.34 0 0023.32 23.32zm0-36.16a12.84 12.84 0 11-12.84 12.84 12.85 12.85 0 0112.84-12.84zM20.28 45H43.7a5.24 5.24 0 000-10.48H20.28a5.24 5.24 0 000 10.48z"
        />
    </svg>
);

export default SVG;
