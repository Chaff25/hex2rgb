import { useState } from 'react';
import type { ChangeEvent } from 'react';
import './App.css';

const HEX_PATTERN = /^#([0-9a-fA-F]{6})$/;

interface RgbColor {
  r: number;
  g: number;
  b: number;
}

function parseHex(hex: string): RgbColor | null {
  if (!HEX_PATTERN.test(hex)) {
    return null;
  }
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
}

function App() {
  const [hex, setHex] = useState('#9921ff');
  const [rgb, setRgb] = useState<RgbColor | null>({
    r: 153, g: 33, b: 255,
  });
  const [error, setError] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setHex(value);

    if (value.length !== 7) {
      setRgb(null);
      setError(false);
      return;
    }

    const parsed = parseHex(value);
    if (parsed) {
      setRgb(parsed);
      setError(false);
    } else {
      setRgb(null);
      setError(true);
    }
  };

  const bg = rgb
    ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
    : '#9921ff';

  return (
    <div className="app" style={{ backgroundColor: bg }}>
      <label className="container">
        <input
          type="text"
          className="input-field"
          placeholder="Введите код цвета..."
          value={hex}
          onChange={handleChange}
          maxLength={7}
        />

        {rgb && !error && (
          <span className="result">{`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`}</span>
        )}

        {error && (
          <span className="result error">Ошибка!</span>
        )}
      </label>
    </div>
  );
}

export default App;