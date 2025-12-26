import { BorderedDiv } from '@/components/atoms';

export const ErrorMessage = () => {
  return (
    <BorderedDiv className="bg-[#D45553]">
      Что-то пошло не так, попробуйте снова
    </BorderedDiv>
  );
};
