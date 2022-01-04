import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDevJobs } from "../../features/devJobsSlice/devJobsSlice";
import { filterDevJobs } from "../../features/devJobsSlice/devJobsSlice";
import { setFilterFullTimeWork } from "../../features/devJobsSlice/devJobsSlice";
import { setFilterLocationCompany } from "../../features/devJobsSlice/devJobsSlice";
import { Link } from "react-router-dom";

export const Jobs = () => {
  const [limit, setLimit] = useState(8);
  const [query, setQuery] = useState("");
  const [hiddenButton, setHiddenButton] = useState(false);
  const [toggleMessage, setToggleMessage] = useState(false);
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const { success } = useSelector((state) => state.devJobs);

  const devJobs = useSelector((state) => {
    const allJobs = state.devJobs.devJobs;
    const filterCharacters = state.devJobs.filteredCharacters;
    if (!filterCharacters) {
      return allJobs;
    } else {
      return allJobs.filter((job) => job.company.includes(filterCharacters));
    }
  });

  const onChangeQuery = (e) => {
    setQuery(e.target.value);
    const newQuery = e.target.value;
    console.log(newQuery);
    if (newQuery.length === 0) {
      setToggleMessage(false);
      setMessage(null);
      setHiddenButton(false);
      dispatch(filterDevJobs(newQuery));
    } else if (newQuery.length < 3) {
      setToggleMessage(true);
      setMessage("too small characters");
      dispatch(filterDevJobs(newQuery));
    } else {
      setToggleMessage(false);
      setMessage(null);
      setHiddenButton(true);
      dispatch(filterDevJobs(newQuery));
    }
  };

  const loadMore = () => {
    setLimit(limit + 8);
    dispatch(getDevJobs(`_limit=${limit}`));
    console.log(devJobs, "<--- devJobs");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getDevJobs(`_limit=${limit}`));
    }, 500);
    return () => clearTimeout(timer);
  }, [dispatch, limit]);

  return (
    <main>
      <nav>
        <div>
          <div>
            <input
              type="text"
              value={query}
              onChange={onChangeQuery}
              placeholder="Filter by title, companies, expertise..."
            />
            <p>{toggleMessage && message}</p>
          </div>
          <div></div>
          <div></div>
        </div>
      </nav>
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
      <button
        onClick={() => loadMore()}
        disabled={devJobs.length === 30 || hiddenButton}
      >
        {" "}
        load more
      </button>
    </main>
  );
};
