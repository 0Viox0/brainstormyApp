import type { FC } from 'react';

export type CheckmarkIconProps = {
  className?: string;
};

export const CheckmarkIcon: FC<CheckmarkIconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="29"
      height="22"
      viewBox="0 0 29 22"
      fill="none"
      className={className}
    >
      <path
        d="M2.5 11.3116L9.94 18.5L26.5 2.5"
        stroke="#68875F"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
};
