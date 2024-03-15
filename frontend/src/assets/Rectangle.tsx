import { SVGProps } from 'react';

export const RectangleSvg = (props?: SVGProps<SVGSVGElement>) => {
    const width = 200;
    const height = 150;

  return (
    <svg
      viewBox={`0 0 100 200`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      stroke="black"
      strokeWidth={1.0}
      {...props}
      style={{
        marginTop: '20px'
      }}
    >
      <rect width={width} height={height} fill="#f1d4b3"/>
    </svg>
  );
};