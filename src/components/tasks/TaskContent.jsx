import { Draggable } from 'react-beautiful-dnd';
import { MdClose } from 'react-icons/md';
import { BiUserPlus } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import { taskAction } from '../../store/task-slice';

export default function TaskContent({ item, index, status }) {
  const disatch = useDispatch();
  const deleteHandler = () => {
    disatch(taskAction.removeFromTask({ id: item.id, type: status }));
  };

  const addUserHandler = () => {
    console.log('Added User');
  };

  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided, snapshot) => {
        return (
          <div
            className="task-item"
            ref={provided.innerRef}
            snapshot={snapshot}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className="item-content">
              <div>{item.title}</div>
              <div>
                <MdClose
                  size="28"
                  className="action-btn"
                  onClick={deleteHandler}
                />
                <BiUserPlus
                  size="28"
                  className="action-btn"
                  onClick={addUserHandler}
                />
              </div>
            </div>
          </div>
        );
      }}
    </Draggable>
  );
}
