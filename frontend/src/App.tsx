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
    </>
  );
}

export default App;
