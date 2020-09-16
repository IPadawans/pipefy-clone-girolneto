import { createContext } from 'react';
import { ListProps } from '../services/api';

interface BoardContextProps {
  lists: ListProps[];
  move(fromList: number, toList: number, from: number, to: number): void;
}
export default createContext<BoardContextProps>({
  lists: [],
  move: () => {},
});
