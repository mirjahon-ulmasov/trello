import { useDispatch, useSelector } from 'react-redux';
import { taskAction } from '../../store/task-slice.js';
import { Droppable } from 'react-beautiful-dnd';
import TaskContent from './TaskContent.jsx';
import { MdClose } from 'react-icons/md';
import { useState } from 'react';

export default function Task({ header, status }) {
  const dispatch = useDispatch();
  const task = useSelector(state => state.task[status]);
  const [input, setInput] = useState('');
  const [active, setActive] = useState(false);

  const addInputHandler = () => {
    if (active) {
      dispatch(
        taskAction.addToTask({
          task: { id: Math.random() + '', title: input },
          type: status,
        })
      );
      setActive(false);
    } else {
      setActive(true);
    }
  };

  const closeInputHandler = () => {
    setActive(false);
  };

  return (
    <div className="tasks">
      <div className="task-header">{header}</div>
      <Droppable droppableId={header}>
        {provided => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {task.map((e, i) => {
              return (
                <TaskContent key={e.id} item={e} index={i} status={status} />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      {active && (
        <textarea
          rows="3"
          onChange={e => {
            setInput(e.target.value);
          }}
          className="task-input"
          placeholder="Ввести заголовок для этой карточки"
        ></textarea>
      )}
      <div className="btn">
        <button className="add-btn" onClick={addInputHandler}>
          <span>&#43;</span>Добавить карточку
        </button>
        <MdClose size="36" className="close-btn" onClick={closeInputHandler} />
      </div>
    </div>
  );
}
