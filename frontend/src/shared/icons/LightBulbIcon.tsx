import type { FC } from 'react';

export type LightBulbIconProps = {
  width?: number;
  height?: number;
  className?: string;
};

export const LightBulbIcon: FC<LightBulbIconProps> = ({
  width = 16,
  height = 20,
  className,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 23 28"
      fill="none"
      className={className}
    >
      <path
        d="M6.49991 26.5H16.4997M11.4998 1.5C5.97707 1.5 1.5 5.23096 1.5 9.83333C1.5 11.5201 2.10139 13.0899 3.13525 14.4018C4.72507 16.4192 5.51927 17.4273 5.62246 17.5779C6.54038 18.9181 6.37137 18.4454 6.48689 19.9855C6.49988 20.1586 6.49991 20.4207 6.49991 20.9444C6.49991 21.7115 7.24609 22.3333 8.16655 22.3333L14.8331 22.3333C15.7536 22.3333 16.4997 21.7115 16.4997 20.9444C16.4997 20.4207 16.4997 20.1586 16.5127 19.9855C16.6282 18.4454 16.4583 18.9181 17.3762 17.5779C17.4794 17.4273 18.2749 16.4192 19.8648 14.4018C20.8986 13.0899 21.5 11.5201 21.5 9.83333C21.5 5.23096 17.0226 1.5 11.4998 1.5Z"
        stroke="#DBB345"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
