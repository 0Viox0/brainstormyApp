import { PrimeButton, UserInfo } from './components';

export const Header = () => {
  return (
    <header
      className="fixed z-30 mt-[40px] flex w-full items-center justify-between
        px-[100px]"
    >
      <PrimeButton />
      <UserInfo />
    </header>
  );
};
