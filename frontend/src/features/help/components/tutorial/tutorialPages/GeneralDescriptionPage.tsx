const COPYWRITING = {
  firstParagraph:
    'Brainstormy — это приложение для структурированного создания и развития идей. Это не ChatGPT или DeepSeek.',
  seconParagraph: [
    'Если вам нужен ответ, факт или развернутое объяснение — используйте их.',
    'Если вам нужно придумать, изобрести или улучшить что-то своё — вы в нужном месте.',
  ],
  thirdParagraph:
    'Brainstormy помогает превратить одну мысль в множество, исследуя её с разных сторон удобным визуальным способом.',
};

export const GeneralDescriptionPage = () => {
  return (
    <>
      <p>{COPYWRITING.firstParagraph}</p>
      <ul className="list-disc pl-5">
        {COPYWRITING.seconParagraph.map((text, index) => (
          <li key={index}>{text}</li>
        ))}
      </ul>
      <p>{COPYWRITING.thirdParagraph}</p>
    </>
  );
};
