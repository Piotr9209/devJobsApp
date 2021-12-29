import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDevJobs } from "../../features/devJobsSlice/devJobsSlice";
import { Link } from "react-router-dom";

export const Jobs = () => {
  const [limit, setLimit] = useState(8);
  const dispatch = useDispatch();

  const { devJobs, loading, failed, success } = useSelector(
    (state) => state.devJobs
  );

  const loadMore = () => {
    setLimit(limit + 8);
    dispatch(getDevJobs(`_limit=${limit}`));
    console.log(devJobs);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getDevJobs(`_limit=${limit}`));
    }, 1000);
    return () => clearTimeout(timer);
  }, [dispatch, limit]);
  console.log(devJobs, "<-- dev Jobs in jobs");

  return (
    <main>
      {success === true &&
        devJobs.map((job) => {
          return (
            <div key={job.id}>
              <div>
                <img
                  src={job.logo}
                  alt=""
                  style={{ height: "200px", width: "200px" }}
                />
              </div>
              <div>
                <span>{job.postedAt} </span>
                <span>.</span>
                <span> {job.contract}</span>
              </div>
              <div>
                <p>{job.position}</p>
              </div>
              <div>
                <p>{job.company}</p>
              </div>
              <div>
                <p>{job.location}</p>
              </div>
              <Link to={`/id/${job.id}`}>View</Link>
            </div>
          );
        })}
      {devJobs.length < 30 ? (
        <button onClick={loadMore}>load more</button>
      ) : null}
      <button onClick={() => loadMore()} disabled={devJobs.length === 30}>
        {" "}
        load more
      </button>
    </main>
  );
};
