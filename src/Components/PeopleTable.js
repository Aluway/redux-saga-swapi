import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import PeopleTablePagination from "./PeopleTablePagination";

function PeopleTable(props) {
  const people = useSelector((state) => state.people);
  const dispatch = useDispatch();

  const changePage = (newPage) =>
    dispatch({
      type: "LOAD_USERS",
      payload: {
        page: newPage,
        search: people.search,
      },
    });

  const search = (e) =>
    dispatch({
      type: "LOAD_USERS",
      payload: {
        page: 1,
        search: e.target.value,
      },
    });

  return (
    <React.Fragment>
      <h1>SW People</h1>
      <form style={{ display: "inline-block" }}>
        <input
          style={{ padding: "12px 20px" }}
          type="text"
          value={people.search}
          onChange={search}
          placeholder="Search people..."
        />
      </form>
      {people.loading ? (
        <div>Loading...</div>
      ) : (
        <React.Fragment>
          <table border={1} width="100%" cellPadding={2} cellSpacing={0}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Birth year</th>
                <th>Eye color</th>
                <th>Gender</th>
                <th>Hair color</th>
                <th>Height</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {people.data.results.map((person) => {
                const id = person.url.replaceAll(/\D/g, "");
                return (
                  <tr key={id}>
                    <td>{person.name}</td>
                    <td>{person.birth_year}</td>
                    <td>{person.eye_color}</td>
                    <td>{person.gender}</td>
                    <td>{person.hair_color}</td>
                    <td>{person.height}</td>
                    <td>
                      <Link to={`/people/${id}`}>Details</Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <PeopleTablePagination
            page={people.page}
            total={people.data.count}
            onChange={changePage}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default PeopleTable;
