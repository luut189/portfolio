export default function HandDrawnArrow({
  width = 75,
  height = 75,
  color = 'currentColor',
  strokeWidth = 3,
  className = '',
}) {
  return (
    <svg
      viewBox='0 0 80 50'
      width={width}
      height={height}
      className={className}
      xmlns='http://www.w3.org/2000/svg'>
      {/* Arrow shaft with curve going from left to right and down */}
      <path
        d='M 10 10 Q 30 8, 45 18 Q 55 28, 65 34'
        stroke={color}
        strokeWidth={strokeWidth}
        fill='none'
        strokeLinecap='round'
      />

      {/* Arrow head - top line */}
      <path
        d='M 65 33 L 62 22'
        stroke={color}
        strokeWidth={strokeWidth}
        fill='none'
        strokeLinecap='round'
      />

      {/* Arrow head - bottom line */}
      <path
        d='M 65 34 L 54 38'
        stroke={color}
        strokeWidth={strokeWidth}
        fill='none'
        strokeLinecap='round'
      />
    </svg>
  );
}
