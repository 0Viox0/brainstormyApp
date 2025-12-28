import { useAppStore } from '@/shared/storage/store';
import { LoginButton, PrimeButton, UserInfo } from './components';
import { Tutorial } from '@/features/help';

export const Header = () => {
  const user = useAppStore((state) => state.user);

  return (
    <header
      className="fixed z-[100] mt-[40px] flex w-full items-center
        justify-between px-[100px]"
    >
      <PrimeButton />
      <div className="flex items-center space-x-[40px]">
        <Tutorial />
        {user ? <UserInfo user={user} /> : <LoginButton />}
      </div>
    </header>
  );
};
