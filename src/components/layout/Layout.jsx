import { useDispatch, useSelector } from 'react-redux';
import { Fragment } from 'react';
import { dataAction } from '../../store/data-slice';

export default function Layout(props) {
  const users = useSelector(state => state.data.users);
  const dispatch = useDispatch();

  const userHandler = e => {
    dispatch(dataAction.changeUser(e.target.id));
  };

  return (
    <Fragment>
      <div className="navbar">
        <h1>Project Management</h1>
        <div className="nav__profiles">
          <div className="task-users">
            {users.map((user, i) => {
              return (
                <div
                  key={i}
                  id={user}
                  className="task-user"
                  onClick={userHandler}
                >
                  {user}
                </div>
              );
            })}
          <button type="button" id="ALL" onClick={userHandler}>
            All
          </button>
          </div>
        </div>
      </div>
      <main className="main">{props.children}</main>
    </Fragment>
  );
}
