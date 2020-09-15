import React from 'react';

import { Container, Label } from './styles';

const Card: React.FC = () => {
  return (
    <Container>
      <header>
        <Label color="#7159c1" />
      </header>
      <p>TESTESTESTESTES</p>
      <img
        src="https://api.adorable.io/avatars/285/abott@adorable.pngCopy to Clipboard"
        alt="avatar"
      />
    </Container>
  );
};

export default Card;
