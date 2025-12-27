import { Route, Routes } from 'react-router';
import {
  FirstIdeaEntry,
  GoogleAuth,
  Graph,
  YandexAuth,
} from './components/pages';
import { MainLayout } from './components/templates';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<FirstIdeaEntry />} />
          <Route path="auth">
            <Route path="yandex" element={<YandexAuth />} />
            <Route path="google" element={<GoogleAuth />} />
          </Route>
          <Route path="graph" element={<Graph />} />
        </Route>
      </Routes>
      {
        // <Header />
        // <YandexAuth />
        // <div className="min-h-[100vh]">
        //   {displayGraph ? (
        //     <div>
        //       <LayersManager initialIdea={firstIdea} />
        //       <TokensUsed />
        //     </div>
        //   ) : (
        //     <div className="absolute top-1/2 left-1/2 -translate-1/2">
        //       <AutoResizeTextarea
        //         onSubmit={handleSubmit}
        //         placeholder="Введи начальную идею"
        //       />
        //     </div>
        //   )}
        // </div>
      }
    </>
  );
}

export default App;
