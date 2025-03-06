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
}

export const ColorContrastDemo = ({
  textColor = '#000000',
  backgroundColor = '#ffffff',
}: ColorContrastDemoProps) => {
  const containerStyle = {
    backgroundColor,
    padding: '20px',
    margin: '20px',
  };
  const descriptionStyle = {
    backgroundColor,
    padding: '10px',
    margin: '10px',
  };

  const headingStyle = {
    color: textColor,
  };

  const contrastRatio = getContrastRatio(textColor, backgroundColor);
  const passFailStyle = {
    ...headingStyle,
    color: '#000000',
    padding: '4px 8px',
    borderRadius: '4px',
    display: 'inline-block',
  };
  const passStyle = {
    ...passFailStyle,
    backgroundColor: '#90EE90',
  };
  const failStyle = {
    ...passFailStyle,
    backgroundColor: '#FFB6C1',
  };

  return (
    <>
      <div style={descriptionStyle}>
        <p>
          In general, a contrast ratio of <strong>4.5:1</strong> is the minimum
          for text and background color.
        </p>
        <h1>Large Text</h1>
        <p>
          Large text is <strong>18px</strong> or <strong>1.125rem</strong> or{' '}
          <strong>14pt</strong> bolded text and must have a ratio of{' '}
          <strong>3:1</strong>
        </p>
      </div>
      <div style={containerStyle}>
        <h1 style={headingStyle}>Heading Level 1</h1>
        <p>
          Contrast ratio: {contrastRatio}:1{' '}
          <span style={Number(contrastRatio) >= 3 ? passStyle : failStyle}>
            {Number(contrastRatio) >= 3 ? 'Pass' : 'Fail'}
          </span>
        </p>

        <h2 style={headingStyle}>Heading Level 2</h2>
        <p>
          Contrast ratio: {contrastRatio}:1{' '}
          <span style={Number(contrastRatio) >= 3 ? passStyle : failStyle}>
            {Number(contrastRatio) >= 3 ? 'Pass' : 'Fail'}
          </span>
        </p>

        <h3 style={headingStyle}>Heading Level 3</h3>
        <p>
          Contrast ratio: {contrastRatio}:1{' '}
          <span style={Number(contrastRatio) >= 3 ? passStyle : failStyle}>
            {Number(contrastRatio) >= 3 ? 'Pass' : 'Fail'}
          </span>
        </p>

        <h4 style={headingStyle}>Heading Level 4</h4>
        <p>
          Contrast ratio: {contrastRatio}:1{' '}
          <span style={Number(contrastRatio) >= 4.5 ? passStyle : failStyle}>
            {Number(contrastRatio) >= 4.5 ? 'Pass' : 'Fail'}
          </span>
        </p>
      </div>
    </>
  );
};
