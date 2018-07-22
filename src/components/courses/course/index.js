import React from "react";
import { CourseWrapper } from "./styles";
import { Query } from "react-apollo";
import gql from "graphql-tag";

const COURSE_Q = gql`
  query courseInfo($courseID: ID!) {
    course(where: { id: $courseID }) {
      name
      id
      location
      description
      holes
    }
  }
`;

export const Course = props => {
  const courseID = props.match.params.id;
  return (
    <CourseWrapper>
      <Query query={COURSE_Q} variables={{ courseID }}>
        {({ loading, error, data }) => {
          return (
            <React.Fragment>
              {error ? <p>{error}</p> : null}
              {loading ? <p>Loading...</p> : null}
              {data.course && (
                <article>
                  <h2>
                    {data.course.name} <small>#{courseID}</small>
                  </h2>
                  <h3>Location: {data.course.location}</h3>
                  <div>Handicap: {data.course.description}</div>

                  {data.course.holes &&
                    data.course.holes.items.length > 0 && (
                      <React.Fragment>
                        <h3>Holes</h3>
                        <ul>
                          {data.course.holes.items.map((hole, i) => (
                            <li key={"hole-" + i}>
                              <h4>
                                {hole.name} - Par: {hole.par} - Index:{" "}
                                {hole.index}
                              </h4>
                            </li>
                          ))}
                        </ul>
                      </React.Fragment>
                    )}
                </article>
              )}
            </React.Fragment>
          );
        }}
      </Query>
    </CourseWrapper>
  );
};
