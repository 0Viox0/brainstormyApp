import { TextFieldLoader } from '@/components/atoms';
import { cn } from '@/shared/utils';

export const IdeaGeneratorLoader = () => {
  return (
    <div
      className={cn(
        `border-brainstormySecondary h-[129px] w-[288px] space-y-[10px]
        overflow-hidden rounded-[22px] border-[1px] p-[25px]`,
      )}
    >
      <div className="flex space-x-[5px]">
        <TextFieldLoader className="w-[112px]" />
        <TextFieldLoader className="w-[100px]" />
      </div>
      <div className="flex space-x-[5px]">
        <TextFieldLoader className="w-[40px]" />
        <TextFieldLoader className="w-[153px]" />
      </div>
      <div className="flex space-x-[5px]">
        <TextFieldLoader className="w-[140px]" />
        <TextFieldLoader className="w-[79px]" />
      </div>
      <TextFieldLoader className="w-[79px]" />
    </div>
  );
};
