import React from 'react';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import { GlobalContext } from '../global/GlobalState';
import { Numero, SectionLeft, SectionRight } from './styled';

export default function LotteryPage() {
  const context = useContext(GlobalContext);
  const { concurso, loteriaConcurso } = context.states;
  const { getConcurso } = context.getters;

  useEffect(() => {
    const [idConcurso] = loteriaConcurso?.filter(loteria => {
      return loteria.loteriaId === 3;
    });

    getConcurso(idConcurso?.concursoId);
  }, []);

  const data = new Date(concurso?.data).toLocaleDateString();

  const numeros = concurso.numeros?.map(numero => {
    return <Numero>{numero}</Numero>;
  });
}
