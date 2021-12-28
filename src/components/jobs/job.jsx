import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDevJobs } from "../../features/devJobsSlice/devJobsSlice";

export const Job = ({ match }) => {
  const dispatch = useDispatch();
  const { devJobs, loading, failed, success } = useSelector(
    (state) => state.devJobs
  );
  console.log(match);
  useEffect(() => {
    dispatch(getDevJobs(`id=${match.params.id}`));
  }, [dispatch, match.params.id]);
  return (
    <main>
      {success && console.log(devJobs)}
      {success === true &&
        devJobs.map((job) => {
          return (
            <div key={job.id}>
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
            </div>
          );
        })}
    </main>
  );
};
