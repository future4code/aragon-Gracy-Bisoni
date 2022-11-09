import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DiaDeSortePage from '../pages/DiaDeSortePage';
import LotofacilPage from '../pages/LotofacilPage';
import LotomaniaPage from '../pages/LotomaniaPage';
import MegasenaPage from '../pages/MegasenaPage';
import QuinaPage from '../pages/QuinaPage';
import TimemaniaPage from '../pages/TimemaniaPage';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MegasenaPage />} />
        <Route path="/quina" element={<QuinaPage />} />
        <Route path="/lotofacil" element={<LotofacilPage />} />
        <Route path="/lotomania" element={<LotomaniaPage />} />
        <Route path="/dia-de-sorte" element={<DiaDeSortePage />} />
        <Route path="/timemania" element={<TimemaniaPage />} />
      </Routes>
    </BrowserRouter>
  );
}
