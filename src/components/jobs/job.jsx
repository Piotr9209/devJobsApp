import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDevJobs } from "../../features/devJobsSlice/devJobsSlice";
import { setEmptyDevJobs } from "../../features/devJobsSlice/devJobsSlice";
import { filterDevJobs } from "../../features/devJobsSlice/devJobsSlice";
import { setFilterLocationCompany } from "../../features/devJobsSlice/devJobsSlice";
import { useHistory } from "react-router-dom";

export const Job = ({ match }) => {
  const dispatch = useDispatch();
  const { devJobs, success } = useSelector((state) => state.devJobs);

  const history = useHistory();

  const handleClickBack = () => {
    dispatch(filterDevJobs(""));
    dispatch(setFilterLocationCompany(""));
    dispatch(setEmptyDevJobs());
    history.goBack();
  };

  useEffect(() => {
    dispatch(getDevJobs(`id=${match.params.id}`));
  }, [dispatch, match.params.id]);

  return (
    <article>
      {success && console.log(devJobs)}
      {success &&
        devJobs.map((job) => {
          return (
            <div key={job.id}>
              <div className="container-info-company">
                <div>
                  <img
                    src={job.logo}
                    alt="logo company"
                    style={{
                      height: "200px",
                      width: "200px",
                      backgroundColor: "red",
                    }}
                  />
                </div>
                <div>
                  <div>
                    <h1>{job.company}</h1>
                    <p>{`${job.company}.com`}</p>
                  </div>
                  <div>
                    <div className="button-anchor">
                      <a
                        href={job.website}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        Company Site
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="container-info-job">
                <div>
                  <span>{job.postedAt} </span>
                  <span>.</span>
                  <span> {job.contract}</span>
                  <p>{job.position}</p>
                  <p>{job.location}</p>
                </div>
                <div>
                  <div>
                    <a
                      href={job.apply}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Apply Now
                    </a>
                  </div>
                </div>
                <div>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nesciunt maiores necessitatibus illo quidem, odio asperiores
                    numquam ipsum nisi autem neque voluptatem optio sed,
                    repellendus, reiciendis nobis provident omnis debitis
                    eligendi. Excepturi iusto hic quibusdam nemo consequatur
                    nostrum harum nihil ex eos autem officia voluptatem
                    eligendi, aperiam sunt ipsa dolor laboriosam neque molestiae
                    totam provident cupiditate error illo iure nobis.
                    Necessitatibus? Nulla, quo? Voluptate recusandae ipsum
                    pariatur quidem cum reiciendis! Ducimus numquam impedit
                    accusantium nobis quaerat culpa doloribus, eos corporis.
                  </p>
                </div>
                <div>
                  <h2>Requirements</h2>
                  <p>{job.requirements.content}</p>
                  <ul>
                    {job.requirements.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h2>What You Will Do</h2>
                  <p>{job.role.content}</p>
                  <ul>
                    {job.role.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="container-footer">
                <div>
                  <h3>{job.position}</h3>
                  <p>{job.website}</p>
                </div>
                <div>
                  <div>
                    <a
                      href={job.apply}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      Apply Now
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      <button onClick={handleClickBack}>Back</button>
    </article>
  );
};
