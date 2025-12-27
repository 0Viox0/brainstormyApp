import { Header } from '@/components/molecules';
import { useUser } from '@/features/auth/hooks/useUser';
import { Outlet } from 'react-router';

export const MainLayout = () => {
  useUser();

  return (
    <>
      <Header />
      <div className="min-h-[100vh]">
        <Outlet />
      </div>
    </>
  );
};
