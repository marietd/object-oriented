import React, { useState, useEffect, useCallback } from 'react';

interface CircleKnobProps {
  onChange?: (value: number) => void;
}

const CircleKnob: React.FC<CircleKnobProps> = ({ onChange }) => {
  const [value, setValue] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [lastY, setLastY] = useState(0);

  const valueToAngle = (val: number): number => {
    const normalizedValue = Math.max(0, Math.min(3, val));
    return -120 + (normalizedValue / 3) * 240;
  };

  const angleToCoordinates = (angle: number, radius: number): { x: number; y: number } => {
    const angleInRadians = (angle - 90) * (Math.PI / 180);
    return {
      x: radius * Math.cos(angleInRadians),
      y: radius * Math.sin(angleInRadians),
    };
  };

  const markerDots = Array.from({ length: 5 }, (_, i) => {
    const angle = -120 + i * 60;
    return angleToCoordinates(angle, 42);
  });

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientY = (e as React.TouchEvent).touches?.[0]?.clientY ?? (e as React.MouseEvent).clientY;
    setLastY(clientY);
  };

  const handleMove = useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (isDragging) {
        const clientY = (e as TouchEvent).touches?.[0]?.clientY ?? (e as MouseEvent).clientY;
        const deltaY = lastY - clientY;
        const sensitivity = 0.1;
        const newValue = Math.max(0, Math.min(3, value + deltaY * sensitivity));

        setValue(newValue);
        onChange?.(newValue);
        setLastY(clientY);
      }
    },
    [isDragging, lastY, value, onChange]
  );

  const handleEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleMove);
      window.addEventListener('touchend', handleEnd);

      return () => {
        window.removeEventListener('mousemove', handleMove);
        window.removeEventListener('mouseup', handleEnd);
        window.removeEventListener('touchmove', handleMove);
        window.removeEventListener('touchend', handleEnd);
      };
    }
  }, [isDragging, handleMove, handleEnd]);

  const currentAngle = valueToAngle(value);
  const dotPosition = angleToCoordinates(currentAngle, 16);

  return (
    <div className="relative inline-block">
      <div
        className="w-16 h-16 rounded-full bg-blue-500 cursor-pointer"
        onMouseDown={handleStart}
        onTouchStart={handleStart}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {(isHovering || isDragging) &&
          markerDots.map((pos, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-red-500"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) translate(${pos.x}px, ${pos.y}px)`,
              }}
            />
          ))}
        {(isHovering || isDragging) && (
          <div
            className="absolute w-3 h-3 rounded-full bg-red-500"
            style={{
              left: '50%',
              top: '50%',
              transform: `translate(-50%, -50%) translate(${dotPosition.x}px, ${dotPosition.y}px)`,
            }}
          />
        )}
      </div>
    </div>
  );
};

export default CircleKnob;
