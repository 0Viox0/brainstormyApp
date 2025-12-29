import { TreeOfIdeas } from '@/shared/images';

const COPYWRITING = {
  firstParagraph:
    'Представьте, что идея — это корень. Из него можно вырастить целое дерево идей.',
};

export const IdeasAndLevels = () => {
  return (
    <>
      <p>{COPYWRITING.firstParagraph}</p>
      <TreeOfIdeas className="mx-auto mt-[20px]" />
    </>
  );
};
