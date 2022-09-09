import React from 'react';
import { P } from './styled';

const Footer = props => {
  return (
    <footer>
      <p>CONCURSO</p>
      <P>
        {props.concursoId} - {props.data}
      </P>
    </footer>
  );
};
export default Footer;
