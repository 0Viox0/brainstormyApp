import type { FC } from 'react';

export type MainBlockConnectorProps = {
  className?: string;
};

export const MainBlockConnector: FC<MainBlockConnectorProps> = ({
  className,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="52"
      height="49"
      viewBox="0 0 52 49"
      fill="none"
      className={className}
    >
      <path
        d="M47.9995 24.08L31.9204 24.08C18.4331 24.08 7.49954 35.0136 7.49954 48.5009"
        stroke="#9C9C9C"
      />
      <path
        d="M48.4995 24.001L31.8021 24.1698C18.353 24.3057 7.37296 13.4499 7.35585 0.000184888"
        stroke="#9C9C9C"
      />
    </svg>
  );
};
