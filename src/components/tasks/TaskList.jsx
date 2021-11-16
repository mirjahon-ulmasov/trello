import { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { taskAction } from '../../store/task-slice.js';
import Task from './Task.jsx';

let active = false;

export default function TaskList() {
  const [result, setResult] = useState();
  const headers = useSelector(state => state.data.headers);
  const task = useSelector(state => state.task);
  const dispatch = useDispatch();

  useEffect(() => {
    if (active) {
      dispatch(
        taskAction.addToTask({
          type: result.destination.droppableId,
          task: task.removed,
          index: result.destination.index,
        })
      );
    }
    active = true;
  }, [result, task.removed, dispatch]);

  const dragHandler = result => {
    if (!result.destination) {
      return;
    }
    setResult(result);
    dispatch(
      taskAction.removeFromTask({
        type: result.source.droppableId,
        index: result.source.index,
      })
    );
  };

  return (
    <div>
      <DragDropContext onDragEnd={dragHandler}>
        <div className="task-lists">
          {headers.map((e, i) => {
            return <Task key={i} header={e.title} status={e.status} />;
          })}
        </div>
      </DragDropContext>
    </div>
  );
}
