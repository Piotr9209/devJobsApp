import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDevJobs } from "../../features/devJobsSlice/devJobsSlice";

export const Jobs = () => {
  const dispatch = useDispatch();
  const { devJobs, loading, failed, success } = useSelector(
    (state) => state.devJobs
  );

  useEffect(() => {
    dispatch(getDevJobs());
  }, [dispatch]);

  console.log(success && devJobs.slice(0, 10));
  return <div>dupa dupa</div>;
};
