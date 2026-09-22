import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { hexToRgb, rgbToString } from '../utils/hexToRgb';
import type { RgbColor } from '../utils/hexToRgb';

function HexToRgb() {
  const [hex, setHex] = useState('');
  const [rgb, setRgb] = useState<RgbColor | null>(null);
  const [error, setError] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setHex(value);

    if (value.length !== 7) {
      setRgb(null);
      setError(false);
      return;
    }

    const parsed = hexToRgb(value);
    if (parsed) {
      setRgb(parsed);
      setError(false);
    } else {
      setRgb(null);
      setError(true);
    }
  };

  const backgroundColor = rgb ? rgbToString(rgb) : undefined;

  return (
    <div
      className="hex-to-rgb"
      style={backgroundColor ? { backgroundColor } : undefined}
    >
      <input
        type="text"
        className="hex-to-rgb__input"
        value={hex}
        onChange={handleChange}
        maxLength={7}
        placeholder="#ffffff"
        aria-label="HEX цвет"
      />

      {rgb && !error && (
        <div className="hex-to-rgb__result">{rgbToString(rgb)}</div>
      )}

      {error && (
        <div className="hex-to-rgb__error">Ошибка!</div>
      )}
    </div>
  );
}

export default HexToRgb;