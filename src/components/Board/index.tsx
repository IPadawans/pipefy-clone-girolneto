import React, { useState, useEffect } from 'react';
import produce from 'immer';

import { loadLists, ListProps } from '../../services/api';

import List from '../List';

import BoardContext from '../../contexts/board';

import { Container } from './styles';

const Board: React.FC = () => {
  const [lists, setLists] = useState<ListProps[]>([]);
  useEffect(() => {
    setLists(loadLists());
  }, []);

  function move(
    fromList: number,
    toList: number,
    from: number,
    to: number,
  ): void {
    setLists(
      produce(lists, (draft) => {
        const dragged = draft[fromList].cards[from];
        draft[fromList].cards.splice(from, 1);
        draft[toList].cards.splice(to, 0, dragged);
      }),
    );
  }
  return (
    <BoardContext.Provider value={{ lists, move }}>
      <Container>
        {lists.map((list, index) => (
          <List key={list.title} index={index} data={list} />
        ))}
      </Container>
    </BoardContext.Provider>
  );
};

export default Board;
