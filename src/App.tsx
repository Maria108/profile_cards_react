import React, { useState, useEffect } from "react";
import Card from "./Card";
import "./styles.css";

function App() {
  const [users, setUsers] = useState([]);
  const [index, setIndex] = useState(-1);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [sortState, setSortState] = useState("none");
  let arrUser: string[] = [];
  let sortUser: any;

  // callback updates all users when child component updates a user
  const handleCallback = (childData: any, index: number) => {
    setUsers(childData);
    setIndex(index);
  };

  // sorting user by different fields
  const sortItems = (sortState: string) => {
    switch (sortState) {
      case "sortByFirstName":
        users.map((user: any) => {
          arrUser.push(user.name.first);
        });
        sortUser = arrUser
          .sort((a, b) => (a.toLowerCase() > b.toLowerCase() ? 1 : -1))
          .map((el, i) => (
            <Card
              key={i}
              user={users.find((obj: any) => {
                return obj.name.first === el;
              })}
              parentCallback={handleCallback}
            />
          ));
        break;
      case "sortByLastName":
        users.map((user: any) => {
          arrUser.push(user.name.last);
          sortUser = arrUser
            .sort((a, b) => (a.toLowerCase() > b.toLowerCase() ? 1 : -1))
            .map((el, i) => (
              <Card
                key={i}
                user={users.find((obj: any) => {
                  return obj.name.last === el;
                })}
                parentCallback={handleCallback}
              />
            ));
        });
        break;
      case "sortByEmail":
        users.map((user: any) => {
          arrUser.push(user.email);
          sortUser = arrUser
            .sort((a, b) => (a > b ? 1 : -1))
            .map((el, i) => (
              <Card
                key={i}
                user={users.find((obj: any) => {
                  return obj.email === el;
                })}
                parentCallback={handleCallback}
              />
            ));
        });
        break;
      default:
        console.log("not an option");
    }
  };

  // fetching users and setting to localStorage
  const fetchUsers = async () => {
    const response = await fetch("https://randomuser.me/api/?results=12");
    const data = await response.json();
    localStorage.setItem("data", JSON.stringify(data.results));
    setUsers(data.results);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // if user was updated we show his updated card
  useEffect(() => {
    const result = users.filter((user) => users.indexOf(user) === index);
    setFilteredResults(result);
  }, [users, index]);

  // searching user by any value (first name, last name, email, phone)
  const searchItems = (searchValue: any) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = users.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(users);
    }
  };

  return (
    <div className="container">
      <div className="header">
        <input
          className="styleSearch"
          type="search"
          placeholder="Search user here"
          onChange={(e) => searchItems(e.target.value)}
        />
        <select
          className="styleSearch"
          defaultValue={"DEFAULT"}
          onChange={(e) => setSortState(e.target.value)}
        >
          <option value="DEFAULT" disabled>
            Sort:
          </option>
          <option value="sortByFirstName">Sort by first name</option>
          <option value="sortByLastName">Sort by last name</option>
          <option value="sortByEmail">Sort by email</option>
        </select>
      </div>
      <div className="cards">
        {(() => {
          if (sortState === "none" && searchInput.length <= 1) {
            return users.map((user, index) => {
              return (
                <div>
                  <Card
                    key={index}
                    user={user}
                    parentCallback={handleCallback}
                  />
                </div>
              );
            });
          } else if (sortState !== "none" && searchInput.length <= 1) {
            sortItems(sortState);
            return sortUser;
          } else if (searchInput.length > 1) {
            return filteredResults.map((user) => {
              return <Card user={user} parentCallback={handleCallback} />;
            });
          }
        })()}
      </div>
    </div>
  );
}

export default App;
