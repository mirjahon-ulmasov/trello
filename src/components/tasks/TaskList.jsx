import React, { useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import Task from './Task.jsx';

// fake data generator
const getItems = (count, prefix) =>
  Array.from({ length: count }, (v, k) => k).map(k => {
    const randomId = Math.floor(Math.random() * 1000);
    return {
      id: `item-${randomId}`,
      status: prefix,
      content: `item ${randomId}`,
    };
  });

const removeFromList = (list, index) => {
  const result = Array.from(list);
  const [removed] = result.splice(index, 1);
  return [removed, result];
};

const addToList = (list, index, element) => {
  const result = Array.from(list);
  result.splice(index, 0, element);
  return result;
};

const headers = [
  { title: 'Нужно сделать', status: 'todo' },
  { title: 'В процессе', status: 'inProgress' },
  { title: 'Готово', status: 'done' },
];

const generateLists = () =>
  headers.reduce(
    (acc, header) => ({ ...acc, [header.title]: getItems(5, header.title) }),
    {}
  );

export default function TaskList() {
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.task);

  const [elements, setElements] = React.useState(generateLists());

  console.log(elements);
  console.log(tasks);

  useEffect(() => {
    setElements(generateLists());
  }, []);

  const onDragEnd = result => {
    if (!result.destination) {
      return;
    }

    const listCopy = { ...elements };

    const sourceList = listCopy[result.source.droppableId];
    const [removedElement, newSourceList] = removeFromList(
      sourceList,
      result.source.index
    );
    listCopy[result.source.droppableId] = newSourceList;
    const destinationList = listCopy[result.destination.droppableId];
    listCopy[result.destination.droppableId] = addToList(
      destinationList,
      result.destination.index,
      removedElement
    );

    setElements(listCopy);
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="task-lists">
          {headers.map(e => {
            return (
              <Task
                key={e.title}
                header={e.title}
                status={e.status}
              />
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
}
