import React from 'react';

// Function to calculate relative luminance
const getLuminance = (r: number, g: number, b: number) => {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
};

// Function to calculate contrast ratio
const getContrastRatio = (color1: string, color2: string) => {
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  };

  const color1rgb = hexToRgb(color1);
  const color2rgb = hexToRgb(color2);

  const l1 = getLuminance(color1rgb.r, color1rgb.g, color1rgb.b);
  const l2 = getLuminance(color2rgb.r, color2rgb.g, color2rgb.b);

  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);

  return ((lighter + 0.05) / (darker + 0.05)).toFixed(2);
};

interface ColorContrastDemoProps {
  textColor: string;
  backgroundColor: string;
  paragraphFontSize: number;
  paragraphFontWeight: number;
}

// Add new component for contrast info
const ContrastInfo = ({
  contrastRatio,
  requiredRatio,
  fontSize,
  weight,
}: {
  contrastRatio: string;
  requiredRatio: number;
  fontSize?: { em: number; rem: number; px: number };
  weight?: number;
}) => {
  const descriptionStyle = {
    backgroundColor: '#ffffff',
    padding: '10px',
    margin: '10px',
  };

  const passStyle = {
    ...descriptionStyle,
    backgroundColor: '#90EE90',
  };
  const failStyle = {
    ...descriptionStyle,
    backgroundColor: '#FFB6C1',
  };

  return (
    <p style={descriptionStyle}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '8px',
        }}
      >
        <span>
          Current contrast ratio: <strong>{contrastRatio}</strong>:1
        </span>
        <span
          style={Number(contrastRatio) >= requiredRatio ? passStyle : failStyle}
        >
          <strong>
            {Number(contrastRatio) >= requiredRatio ? 'Pass' : 'Fail'}
          </strong>
        </span>
      </div>
      <div>
        Required contrast ratio: <strong>{requiredRatio}</strong>:1
      </div>
      {fontSize && weight && (
        <div>
          <ul>
            <li>
              Font size: <strong>{fontSize.em}</strong>em /{' '}
              <strong>{fontSize.rem}</strong>rem /{' '}
              <strong>{fontSize.px}</strong>px
            </li>
            <li>
              Font weight: <strong>{weight}</strong>
            </li>
          </ul>
        </div>
      )}
    </p>
  );
};

export const ColorContrastDemo = ({
  textColor = '#000000',
  backgroundColor = '#ffffff',
  paragraphFontSize = 16,
  paragraphFontWeight = 400,
}: ColorContrastDemoProps) => {
  const containerStyle = {
    padding: '20px',
    margin: '20px',
  };

  const descriptionStyle = {
    backgroundColor: '#ffffff',
    padding: '10px',
    margin: '10px',
  };

  const headingStyle = {
    backgroundColor,
    color: textColor,
    display: 'inline-block',
    padding: '0 8px',
  };

  const contrastRatio = getContrastRatio(textColor, backgroundColor);

  const headings = [
    {
      level: 1,
      text: 'Heading Level 1',
      requiredRatio: 3,
      fontSize: { em: 2, rem: 2, px: 32 },
      weight: 700,
    },
    {
      level: 2,
      text: 'Heading Level 2',
      requiredRatio: 3,
      fontSize: { em: 1.5, rem: 1.5, px: 24 },
      weight: 700,
    },
    {
      level: 3,
      text: 'Heading Level 3',
      requiredRatio: 3,
      fontSize: { em: 1.17, rem: 1.17, px: 18.72 },
      weight: 700,
    },
    {
      level: 4,
      text: 'Heading Level 4',
      requiredRatio: 4.5,
      fontSize: { em: 1, rem: 1, px: 16 },
      weight: 700,
    },
  ];

  // Add color information display
  const ColorInfo = ({ label, color }: { label: string; color: string }) => (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        margin: '8px 0',
      }}
    >
      <div
        style={{
          width: '24px',
          height: '24px',
          backgroundColor: color,
          border: '1px solid #ccc',
          borderRadius: '4px',
        }}
      />
      <span>
        {label}: <code>{color}</code>
      </span>
      <button
        onClick={() => navigator.clipboard.writeText(color)}
        style={{
          padding: '4px 8px',
          border: '1px solid #ccc',
          borderRadius: '4px',
          background: 'white',
          cursor: 'pointer',
        }}
      >
        Copy
      </button>
    </div>
  );

  return (
    <>
      <div style={descriptionStyle}>
        <p>
          <strong>WCAG 2.1 Contrast Requirements:</strong>
        </p>
        <h2>Standard Text (Level AA)</h2>
        <p>
          Text and images of text must maintain a contrast ratio of at least{' '}
          <strong>4.5:1</strong> against their background.
        </p>
        <h2>Large-Scale Text (Level AA)</h2>
        <p>
          Large-scale text (defined as <strong>24px</strong> /{' '}
          <strong>1.5rem</strong> or <strong>18.66px</strong> /{' '}
          <strong>1.17rem</strong> if bold) requires a minimum contrast ratio of{' '}
          <strong>3:1</strong>.
        </p>
        <p>
          <strong>Technical Notes:</strong>
        </p>
        <ul>
          <li>
            Bold text = <code>font-weight: 700</code> or higher
          </li>
          <li>Font sizes are calculated using a base of 16px = 1rem</li>
          <li>Contrast ratio is calculated as (L1 + 0.05) / (L2 + 0.05)</li>
          <li>Text over gradients must maintain minimum contrast throughout</li>
        </ul>
        <div style={{ margin: '16px 0' }}>
          <ColorInfo label="Text Color" color={textColor} />
          <ColorInfo label="Background Color" color={backgroundColor} />
        </div>
      </div>
      <div style={containerStyle}>
        {headings.map((heading) => (
          <div key={heading.level}>
            {React.createElement(
              `h${heading.level}`,
              { style: headingStyle },
              heading.text
            )}
            <ContrastInfo
              contrastRatio={contrastRatio}
              requiredRatio={heading.requiredRatio}
              fontSize={heading.fontSize}
              weight={heading.weight}
            />
            <hr />
          </div>
        ))}
        <p
          style={{
            ...headingStyle,
            fontSize: `${paragraphFontSize}px`,
            fontWeight: `${paragraphFontWeight}`,
          }}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <ContrastInfo
          contrastRatio={contrastRatio}
          requiredRatio={
            (paragraphFontSize > 18.66 && paragraphFontWeight >= 700) ||
            paragraphFontSize >= 24
              ? 3
              : 4.5
          }
          fontSize={{
            em: paragraphFontSize / 16,
            rem: paragraphFontSize / 16,
            px: paragraphFontSize,
          }}
          weight={paragraphFontWeight}
        />
      </div>
    </>
  );
};
