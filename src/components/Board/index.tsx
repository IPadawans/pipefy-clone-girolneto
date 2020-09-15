import React from 'react';

import List from '../List';

import { Container } from './styles';

const Board: React.FC = () => {
  return (
    <Container>
      <List />
      <List />
      <List />
      <List />
    </Container>
  );
};

export default Board;
