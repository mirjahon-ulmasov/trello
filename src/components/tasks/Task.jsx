import { useDispatch, useSelector } from 'react-redux';
import { taskAction } from '../../store/task-slice.js';
import { Droppable } from 'react-beautiful-dnd';
import TaskContent from './TaskContent.jsx';
import { MdClose } from 'react-icons/md';
import { useState } from 'react';

export default function Task({ header, status }) {
  const currentUser = useSelector(state => state.data.currentUser);
  const task = useSelector(state => state.task[status]);
  const [active, setActive] = useState(false);
  const [input, setInput] = useState('');
  const dispatch = useDispatch();

  const addInputHandler = () => {
    if (active && input) {
      dispatch(
        taskAction.addToTask({
          type: status,
          task: { id: Math.random() + '', title: input, users: null },
          index: task.length,
        })
      );
      setInput('');
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
      <div className="task-body">
        <Droppable droppableId={status}>
          {(provided,snapshot) => (
            <div {...provided.droppableProps} ref={provided.innerRef} style={{minHeight: '5px'}}>
              {task
                .filter(task =>
                    task.users.find(user => user === currentUser) ||
                    currentUser === 'ALL')
                .map((e, i) => {
                  return (
                    <TaskContent
                      key={e.id}
                      item={e}
                      index={i}
                      status={status}
                    />
                  );
                })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </div>
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
