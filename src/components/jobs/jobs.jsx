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
  const [location, setLocation] = useState("");
  const [checked, setChecked] = useState(false);
  const [hiddenButton, setHiddenButton] = useState(false);
  const [toggleMessage, setToggleMessage] = useState(false);
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const { success } = useSelector((state) => state.devJobs);

  const devJobs = useSelector((state) => {
    let allJobs = state.devJobs.devJobs;
    const filterCharacters = state.devJobs.filteredCharacters;
    const filterLocation = state.devJobs.filterLocationCompany;
    const filterFullTimeWork = state.devJobs.filterFullTimeWork;

    if (!filterCharacters && !filterLocation && filterFullTimeWork === false) {
      return allJobs;
    }
    //TODO: one filter, and next in on filter 3x if logic
    if (filterCharacters) {
      allJobs = allJobs.filter(
        (job) =>
          job.company.toLowerCase().includes(filterCharacters) ||
          job.position.toLowerCase().includes(filterCharacters)
      );
    }
    if (filterLocation) {
      allJobs = allJobs.filter((job) =>
        job.location.toLowerCase().includes(filterLocation)
      );
    }
    if (filterFullTimeWork === true) {
      allJobs = allJobs.filter((job) => job.contract.includes("Full Time"));
    }
    return allJobs;
  });

  const handleChangeQuery = (e) => {
    setQuery(e.target.value);
    const newQuery = e.target.value.toLowerCase().trim();
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

  const handleChangeLocation = (e) => {
    setLocation(e.target.value);
    const newLocation = e.target.value.toLowerCase().trim();
    if (newLocation.length === 0) {
      setToggleMessage(false);
      setMessage(null);
      setHiddenButton(false);
      dispatch(setFilterLocationCompany(newLocation));
    } else if (newLocation.length < 3) {
      setToggleMessage(true);
      setMessage("too small characters");
      dispatch(setFilterLocationCompany(newLocation));
    } else {
      setToggleMessage(false);
      setMessage(null);
      setHiddenButton(true);
      dispatch(setFilterLocationCompany(newLocation));
    }
  };
  const handleChangeChecked = () => {
    setChecked(!checked);
    dispatch(setFilterFullTimeWork(!checked));
    setHiddenButton(false);
    if (checked === true) {
      setHiddenButton(true);
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
            <label htmlFor="filteredQuery">
              <input
                type="text"
                id="filteredQuery"
                value={query}
                onChange={handleChangeQuery}
                placeholder="Filter by title or name companies"
              />
            </label>
          </div>
          <div>
            <label htmlFor="filteredLocation">
              <input
                type="text"
                id="filteredLocation"
                value={location}
                onChange={handleChangeLocation}
                placeholder="Filter by location..."
              />
            </label>
          </div>
          <div>
            <label htmlFor="checkFullTime">
              <input
                type="checkbox"
                id="checkFullTime"
                defaultChecked={checked}
                onChange={handleChangeChecked}
              />
              Full Time Only
            </label>
          </div>
          <p>{toggleMessage && message}</p>
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
                  style={{
                    height: "200px",
                    width: "200px",
                    backgroundColor: "red",
                  }}
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
