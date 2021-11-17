import { useState } from 'react';
import { Select } from 'antd';
import { taskAction } from '../../store/task-slice';
import { Draggable } from 'react-beautiful-dnd';
import { BiUserPlus } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { MdClose } from 'react-icons/md';
const { Option } = Select;

export default function TaskContent({ item, index, status }) {
  const users = useSelector(state => state.data.users);
  const [active, setActive] = useState(false);
  const dispatch = useDispatch();

  const deleteHandler = () => {
    dispatch(taskAction.removeFromTask({ type: status, index: index }));
  };

  const addUserHandler = () => {
    setActive(active ? false : true);
  };

  const handleChange = users => {
    dispatch(
      taskAction.addToTask({
        type: status,
        task: { id: item.id + '', title: item.title, users: users },
        index: index,
      })
    );
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
            <div className="task-users">
              {item.users.map((user, i) => {
                return (
                  <div key={i} className="task-user">
                    {user}
                  </div>
                );
              })}
            </div>
            {active && (
              <Select
                mode="multiple"
                style={{ width: '100%' }}
                placeholder="Select Users"
                onChange={handleChange}
                optionLabelProp="label"
                dropdownClassName="user-dropdown"
              >
                {users.map((user, i) => {
                  return (
                    <Option
                      className="user-options"
                      key={i}
                      value={user}
                      label={user}
                    >
                      {user}
                    </Option>
                  );
                })}
              </Select>
            )}
          </div>
        );
      }}
    </Draggable>
  );
}
