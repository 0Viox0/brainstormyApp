import { BorderedDiv } from '@/components/atoms';
import { CrownIcon } from '@/shared/icons';

export const PrimeButton = () => {
  return (
    <BorderedDiv className="w-[144px] items-center justify-between">
      <span className="">Prime</span>
      <CrownIcon />
    </BorderedDiv>
  );
};
