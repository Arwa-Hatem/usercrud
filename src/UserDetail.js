import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const UserDetail = () => {
  const { userid } = useParams();
  const [userdata, userDataChange] = useState({});

  useEffect(() => {
    fetch(`http://localhost:3000/users/${userid}`)
      .then((res) => res.json())
      .then((resp) => {
        userDataChange(resp);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [userid]);

  return (
    <div>
      <div className="container">
        <div className="card row" style={{ textAlign: "left" }}>
          <div className="card-title">
            <h2>User Details</h2>
          </div>
          <div className="card-body">
            {userdata && (
              <div>
                <h2>
                  The User name is : <b>{userdata.name}</b>
                </h2>
                <h5>Email is : {userdata.email}</h5>
                <h5>Phone Number is : {userdata.phone}</h5>
                <Link className="btn btn-danger" to="/">
                  Back
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
