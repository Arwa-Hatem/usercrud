import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const UserListing = () => {
  const [userdata, userDataChange] = useState(null);
  const navigate = useNavigate();

  const LoadDetail = (id) => {
    navigate("/user/detail/" + id);
  };
  const LoadEdit = (id) => {
    navigate("/user/edit/" + id);
  };
  const RemoveFunction = (id) => {
    fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    fetch("http://localhost:3000/users")
      .then((res) => res.json())
      .then((resp) => {
        userDataChange(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="container">
      <div className="card">
        <div className="card-title">
          <h2>Users</h2>
        </div>
        <div className="card-body">
          <div className="divbtn">
            <Link to="user/create" className="btn btn-success">
              Add user
            </Link>
          </div>
          <table className="table table-bordered">
            <thead className="bg-dark text-white">
              <tr>
                <td>Name</td>
                <td>Email</td>
                <td>Phone</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {userdata &&
                userdata.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                    <td>
                      <button
                        onClick={() => {
                          LoadEdit(item.id);
                        }}
                        className="btn btn-success"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          RemoveFunction(item.id);
                        }}
                        className="btn btn-danger"
                      >
                        Remove
                      </button>
                      <button
                        onClick={() => {
                          LoadDetail(item.id);
                        }}
                        className="btn btn-primary"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserListing;
