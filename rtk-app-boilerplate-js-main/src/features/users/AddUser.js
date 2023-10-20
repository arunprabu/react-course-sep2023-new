import { useDispatch } from "react-redux";
import { addUserAsync } from "./usersSlice";

const AddUser = () => {
  const dispatch = useDispatch();

  const handleAddUser = (event) => {
    event.preventDefault();
    // TODO: read form data
    // I will create a user object instead of collecting data from form
    const user = {
      name: 'Arun',
      phone: 35467890,
      email: 'a@b.com',
    };

    console.log(user);

    dispatch(addUserAsync(user));

  };

  return (
    <>
      <h2>Add User</h2>
      <form onSubmit={handleAddUser}>
        <div className="mb-3">
          <label htmlFor="nameInput" className="form-label">
            Name
          </label>
          <input type="text" className="form-control" id="nameInput" />
        </div>
        <div className="mb-3">
          <label htmlFor="phoneInput" className="form-label">
            Phone
          </label>
          <input type="text" className="form-control" id="phoneInput" />
        </div>
        <div className="mb-3">
          <label htmlFor="emailInput" className="form-label">
            Email address
          </label>
          <input type="email" className="form-control" id="emailInput" />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default AddUser;
