import React, { useState } from 'react';

interface CircleButtonProps {
  onClick?: () => void;
}

const CircleButton: React.FC<CircleButtonProps> = ({ onClick }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const handleInteractionStart = () => {
    setIsPressed(true);
  };

  const handleInteractionEnd = () => {
    setIsPressed(false);
    setIsHovering(false);
    if (!isTouch) {
      onClick?.();
      console.log('Button clicked!');
    }
  };

  const handleTouchEnd = () => {
    setIsPressed(false);
    setIsHovering(false);
    setIsTouch(true);
    onClick?.();
    console.log('Button clicked!');
  };

  const handleInteractionCancel = () => {
    setIsPressed(false);
  };

  return (
    <div className="relative inline-block">
      <div
        className="w-16 h-16 rounded-full cursor-pointer bg-red-500 overflow-hidden border-3 border-black"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false);
          setIsPressed(false);
        }}
        onMouseDown={handleInteractionStart}
        onMouseUp={handleInteractionEnd}
        onTouchStart={handleInteractionStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleInteractionCancel}
      >
        <div
          className={`
            w-full h-full rounded-full bg-blue-500
            transition-transform duration-300 ease-out
            ${isPressed ? 'translate-x-2 translate-y-2' : isHovering ? 'translate-x-0.5 translate-y-0.5' : ''}
          `}
        />
      </div>
    </div>
  );
};

export default CircleButton;