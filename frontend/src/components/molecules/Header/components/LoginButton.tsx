import { BorderedDiv } from '@/components/atoms';

export const LoginButton = () => {
  const handleLogin = () => {};

  return (
    <BorderedDiv className="cursor-pointer" onClick={handleLogin}>
      Ввойти
    </BorderedDiv>
  );
};
