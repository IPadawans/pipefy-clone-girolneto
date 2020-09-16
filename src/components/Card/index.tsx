import React, { useRef, useContext } from 'react';
import { useDrag, useDrop, DragObjectWithType } from 'react-dnd';

import { Container, Label } from './styles';

import { CardProps } from '../../services/api';

import BoardContext from '../../contexts/board';

interface CardProperties {
  data: CardProps;
  index: number;
  listIndex: number;
}

interface DragObjectWithTypeExtended extends DragObjectWithType {
  index: number;
  listIndex: number;
}

const Card: React.FC<CardProperties> = ({ data, index, listIndex }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { move } = useContext(BoardContext);
  const [{ isDragging }, dragRef] = useDrag({
    item: { type: 'CARD', index, listIndex },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
  });

  const [, dropRef] = useDrop({
    accept: 'CARD',
    hover(item: DragObjectWithTypeExtended, monitor) {
      const draggedListIndex = item.listIndex;
      const targetListIndex = listIndex;

      const draggedIndex = item.index;
      const targetIndex = index;

      if (
        draggedIndex === targetIndex &&
        draggedListIndex === targetListIndex
      ) {
        return;
      }

      const targetSize = ref.current?.getBoundingClientRect();
      if (!targetSize) {
        return;
      }

      const targetCenter = (targetSize.bottom - targetSize.top) / 2;

      const draggedOffset = monitor.getClientOffset();
      if (!draggedOffset) {
        return;
      }

      const draggedTop = draggedOffset.y - targetSize.top;

      if (draggedIndex < targetIndex && draggedTop < targetCenter) {
        return;
      }

      if (draggedIndex > targetIndex && draggedTop > targetCenter) {
        return;
      }

      move(draggedListIndex, targetListIndex, draggedIndex, targetIndex);

      item.index = targetIndex;
      item.listIndex = targetListIndex;
    },
  });

  dragRef(dropRef(ref));

  return (
    <Container ref={ref} isDragging={isDragging}>
      <header>
        {data.labels &&
          data.labels.map((label) => <Label key={label} color={label} />)}
      </header>
      <p>{data.content}</p>
      <img src={data.user} alt="avatar" />
    </Container>
  );
};

export default Card;
