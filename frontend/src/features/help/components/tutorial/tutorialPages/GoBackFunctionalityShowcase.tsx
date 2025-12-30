import goBackFunctionality from '@/shared/media/goBackInHistoryFunctionality_800.mp4';

export const GoBackFunctionalityShowcase = () => {
  return (
    <>
      <p>
        Также можно вернуться на прошлый “слой” идей и выбрать другую идею для
        генеации
      </p>
      <video autoPlay muted loop playsInline>
        <source src={goBackFunctionality} type="video/mp4" />
      </video>
    </>
  );
};
