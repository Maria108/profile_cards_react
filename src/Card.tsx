import React, { useState } from "react";

function Card(props: any) {
  const [visible, setVisible] = useState(false);
  let changeInput: any;
  let objIndex;

  const handleChange = (e: any) => {
    changeInput = e.target.value;
  };
  const handleSubmit = (nam: string) => async (e: any) => {
    e.preventDefault();
    const allUsers = JSON.parse(localStorage.getItem("data"));
    switch (nam) {
      case "fn":
        objIndex = allUsers.findIndex(
          (item: any) => item.name.first === props.user.name.first
        );
        allUsers[objIndex].name.first = changeInput;
        localStorage.setItem("data", JSON.stringify(allUsers));
        props.parentCallback(allUsers, objIndex);
        break;
      case "ln":
        objIndex = allUsers.findIndex(
          (item: any) => item.name.last === props.user.name.last
        );
        allUsers[objIndex].name.last = changeInput;
        localStorage.setItem("data", JSON.stringify(allUsers));
        props.parentCallback(allUsers, objIndex);
        break;
      case "em":
        objIndex = allUsers.findIndex(
          (item: any) => item.email === props.user.email
        );
        allUsers[objIndex].email = changeInput;
        localStorage.setItem("data", JSON.stringify(allUsers));
        props.parentCallback(allUsers, objIndex);
        break;
      case "ph":
        objIndex = allUsers.findIndex(
          (item: any) => item.phone === props.user.phone
        );
        allUsers[objIndex].phone = changeInput;
        localStorage.setItem("data", JSON.stringify(allUsers));
        props.parentCallback(allUsers, objIndex);
        break;
      default:
        console.log("not an option");
    }
    setVisible(false);
  };
  let fullname = props.user.name.first + " " + props.user.name.last;
  let address =
    props.user.location.street.number +
    " " +
    props.user.location.street.name +
    ", " +
    props.user.location.city +
    ", " +
    props.user.location.state +
    ", " +
    props.user.location.country;
  return (
    <figure className="snip1515">
      <div className="profile-image">
        <img src={props.user.picture.large} alt="Avatar" />
      </div>
      <figcaption>
        <h3>{fullname}</h3>
        <p>
          <b>Email:</b> {props.user.email}
        </p>
        <p>
          <b>Phone:</b> {props.user.phone}
        </p>
        <p>
          <b>Address:</b> {address}
        </p>
        {visible ? null : (
          <button onClick={() => setVisible(!visible)}>Edit User</button>
        )}

        {visible && (
          <div>
            <form onSubmit={handleSubmit("fn")}>
              <label>
                <input
                  type="text"
                  placeholder="Edit First Name"
                  onChange={handleChange}
                />
              </label>
              <input className="styleInput" type="submit" value="Submit" />
            </form>
            <form onSubmit={handleSubmit("ln")}>
              <label>
                <input
                  type="text"
                  placeholder="Edit Last Name"
                  onChange={handleChange}
                />
              </label>
              <input className="styleInput" type="submit" value="Submit" />
            </form>
            <form onSubmit={handleSubmit("em")}>
              <label>
                <input
                  type="text"
                  placeholder="Edit Email"
                  onChange={handleChange}
                />
              </label>
              <input className="styleInput" type="submit" value="Submit" />
            </form>
            <form onSubmit={handleSubmit("ph")}>
              <label>
                <input
                  type="text"
                  placeholder="Edit Phone"
                  onChange={handleChange}
                />
              </label>
              <input className="styleInput" type="submit" value="Submit" />
            </form>
          </div>
        )}
      </figcaption>
    </figure>
  );
}

export default Card;
