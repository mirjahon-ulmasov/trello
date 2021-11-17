import { DragDropContext } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { taskAction } from '../../store/task-slice.js';
import Task from './Task.jsx';

export default function TaskList() {
  const headers = useSelector(state => state.data.headers);
  const dispatch = useDispatch();

  const dragHandler = result => {
    if (!result.destination) {
      return;
    }
    dispatch(taskAction.dragDropTask(result));
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
