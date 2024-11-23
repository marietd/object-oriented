import React, { useState } from 'react';

interface CircleButtonProps {
  onClick?: () => void;
}

const CircleButton: React.FC<CircleButtonProps> = ({ onClick }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseUp = () => {
    setIsPressed(false);
    onClick?.();
  };

  return (
    <div className="relative inline-block">
      <div 
        className="w-16 h-16 rounded-full cursor-pointer bg-red-500 overflow-hidden border-3 border-black"
        onMouseEnter={() => setIsHovering(true)}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => {
          setIsHovering(false);
          setIsPressed(false);
        }}
      >
        <div 
          className={`
            w-full h-full rounded-full bg-blue-500
            transition-transform duration-30 ease-out
            ${isPressed ? 'translate-x-2 translate-y-2' : isHovering ? 'translate-x-0.5 translate-y-0.5' : ''}
          `}
        />
      </div>
    </div>
  );
};

export default CircleButton;