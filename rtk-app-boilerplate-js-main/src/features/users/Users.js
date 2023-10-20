import { useDispatch, useSelector } from "react-redux";
import AddUser from "./AddUser";
import { useEffect } from "react";
import { fetchUsersAsync } from "./usersSlice";

const Users = () => {
  const dispatch = useDispatch();

  // Let's subscribe to the store updates in comp
  const usersState = useSelector((state) => {
    // state is store data
    console.log(state);
    // we need users property only
    return state.users;
  });

  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, []);

  if(usersState.isLoading) return (<h1>Loading...</h1>);
  if(usersState.isError) return (<h1>Something went wrong...Try again later!</h1>);

  return (
    <div className="row">
      <h1>User Management</h1>
      <div className="col-md-4">
        <AddUser />
      </div>

      <div className="col-md-8">
        <h2>List Users</h2>
        <div className="row">
          {usersState.userList?.map((user) => {
            return (
              <div className="col-md-4" key={user.id}>
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{user.name}</h5>
                    <h6 className="card-subtitle mb-2 text-body-secondary">
                      E-Mail: {user.email}
                    </h6>
                    <p className="card-text">Phone: {user.phone}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Users;
