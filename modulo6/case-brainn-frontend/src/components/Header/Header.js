import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { colors } from '../../data/colors';
import { GlobalContext } from '../../global/GlobalState';
import {
  goToDiaDeSorte,
  goToLotofacil,
  goToLotomania,
  goToMegasena,
  goToQuina,
  goToTimemania,
} from '../../routes/coordinator';
import { HeaderContainer } from './styled';

export default function Header() {
  const navigate = useNavigate();

  const context = useContext(GlobalContext);
  const { loterias, currentColor } = context.states;
  const { getLoterias, getLoteriaConcurso } = context.getters;
  const { setCurrentColor } = context.setters;

  useEffect(() => {
    getLoterias();
    getLoteriaConcurso();
  }, []);

  const opcoesLoterias = loterias.map(loteria => {
    return (
      <option key={loteria.id} value={loteria.nome}>
        {loteria.nome.toUpperCase()}
      </option>
    );
  });

  const nomeSorteio = e => {
    switch (e.target.value) {
      case 'mega-sena':
        goToMegasena(navigate);
        setCurrentColor(colors.megasena);
        return;
      case 'quina':
        goToQuina(navigate);
        setCurrentColor(colors.quina);
        return;
      case 'lotofácil':
        goToLotofacil(navigate);
        setCurrentColor(colors.lotofacil);
        return;
      case 'lotomania':
        goToLotomania(navigate);
        setCurrentColor(colors.lotomania);
        return;
      case 'timemania':
        goToTimemania(navigate);
        setCurrentColor(colors.timemania);
        return;
      case 'dia de sorte':
        goToDiaDeSorte(navigate);
        setCurrentColor(colors.diadesorte);
        return;
      default:
        return goToMegasena(navigate);
    }
  };

  return (
    <HeaderContainer style={{ background: currentColor }}>
      <select name="sorteio" onChange={nomeSorteio}>
        <option value={''}>Selecione Loteria</option>
        {opcoesLoterias}
      </select>
    </HeaderContainer>
  );
}
