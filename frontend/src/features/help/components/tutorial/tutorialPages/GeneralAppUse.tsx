import generalAppUse from '@/shared/media/basicFunctionality_800.mp4';

export const GeneralAppUse = () => {
  return (
    <>
      <p>
        Введите идею → выберите способ трансформации идеи → напишите промпт,
        который задаст направление генерации идеи → сгенерируйте идеи ;)
      </p>
      <video autoPlay muted loop playsInline>
        <source src={generalAppUse} type="video/mp4" />
      </video>
    </>
  );
};
