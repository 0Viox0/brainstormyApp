import { useAppStore } from '@/shared/storage/store';
import { LoginButton, PrimeButton, UserInfo } from './components';

export const Header = () => {
  const user = useAppStore((state) => state.user);

  const isLoggedIn = user.username !== 'none';

  return (
    <header
      className="fixed z-30 mt-[40px] flex w-full items-center justify-between
        px-[100px]"
    >
      <PrimeButton />
      {isLoggedIn ? <UserInfo /> : <LoginButton />}
    </header>
  );
};
