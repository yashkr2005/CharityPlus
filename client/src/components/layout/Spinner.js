import React, { Fragment } from 'react';
import { css } from "@emotion/react";
import PuffLoader from "react-spinners/PuffLoader";

const override = css`
  display: block;
  margin: 100px auto;
  border-color: red;
`;
const Spinner = () => {
  return (
      <Fragment>
         <PuffLoader color={"red"} loading={true} css={override} size={150} />
      </Fragment>
  );
};

export default Spinner
