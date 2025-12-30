import type { FC } from 'react';

export type CrossIconProps = {
  className?: string;
};

export const CrossIcon: FC<CrossIconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      className={className}
    >
      <path
        d="M2 2L15 15M2 15L15 2"
        stroke="#A35555"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
};
