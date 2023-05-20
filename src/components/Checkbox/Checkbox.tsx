import React, { useState } from 'react';
import clsx from 'clsx';

import styles from './Checkbox.module.css';

interface Props {
  big?: boolean;
  small?: boolean;
  modalId: number;
  selectedColor: string;
  onColorChange: (arg: string) => void;
  colors: { color: string; colorRus: string; img: string }[];
}

export const Checkbox = ({ colors, onColorChange, small, big, selectedColor, modalId }: Props) => {
  const [currentColor, setCurrentColor] = useState(colors[0].color);

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    setCurrentColor(newColor);
    onColorChange(newColor);
  };

  return (
    <div className={clsx({ [styles.radioSmall]: small, [styles.radioBig]: big })}>
      {colors.map(({ color }, index) => {
        return (
          <div
            key={index + modalId}
            onClick={(event) => {
              event.stopPropagation();
            }}
          >
            <input
              className={small ? styles.inputSmall : styles.inputBig}
              type="radio"
              id={color}
              name="color"
              value={color}
              onChange={handleColorChange}
              defaultChecked={color === selectedColor}
            />
            <label htmlFor={color} className={styles[color]}></label>
          </div>
        );
      })}
    </div>
  );
};
