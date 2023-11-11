import React, { useState } from 'react';
import { ChromePicker } from 'react-color';

function ColorPicker() {
  const [color, setColor] = useState('#000000');
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (color) => {
    setColor(color.hex);
  };

  return (
    <div>
      <div
        onClick={handleClick}
        style={{
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: color,
          
        }}
      />
      {displayColorPicker ? (
        <div style={{ position: 'absolute', zIndex: '2' }}>
          <div
            style={{
              position: 'fixed',
              top: '0px',
              right: '0px',
              bottom: '0px',
              left: '0px',
            }}
            onClick={handleClose}
          />
          <ChromePicker color={color} onChange={handleChange} />
        </div>
      ) : null}
      <p>Selected Color: {color}</p>
    </div>
  );
}

export default ColorPicker;
