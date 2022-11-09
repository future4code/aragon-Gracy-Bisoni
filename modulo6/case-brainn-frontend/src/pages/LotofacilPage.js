import { useContext, useEffect } from 'react';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import { GlobalContext } from '../global/GlobalState';
import { Numero, SectionLeft, SectionRight } from './styled';
import logo from '../assets/logo.png';

export default function LotofacilPage() {
  const context = useContext(GlobalContext);
  const { concurso, loteriaConcurso, currentColor } = context.states;
  const { getConcurso } = context.getters;

  useEffect(() => {
    const [idConcurso] = loteriaConcurso?.filter(loteria => {
      return loteria.loteriaId === 2;
    });

    getConcurso(idConcurso?.concursoId);
  }, []);

  const data = new Date(concurso?.data).toLocaleDateString();

  const numeros = concurso.numeros?.map(numero => {
    return <Numero>{numero}</Numero>;
  });

  return (
    <>
      <main>
        <SectionLeft style={{ background: currentColor }}>
          <Header />
          <h1>
            <span style={{ margin: '10px' }}>
              <img width="30vw" src={logo} />
            </span>
            LOTOFACIL
          </h1>
          <Footer concursoId={concurso.id} data={data} />
        </SectionLeft>

        <SectionRight>
          <ul>{numeros}</ul>
          <footer>
            Este sorteio é meramente ilustrativo e não possui nenhuma ligação
            com a CAIXA.
          </footer>
        </SectionRight>
      </main>
    </>
  );
}
