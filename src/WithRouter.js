import React from "react";
import { useParams, useNavigate } from "react-router-dom";

export function withRouter(Child) {
  return (props) => {
    const params = useParams();
    const history = useNavigate();
    return <Child {...props} params={params} history={history} />;
  };
}

// import { useParams } from "react-router-dom";

// const WithRouter = (WrappedComponent) => (props) => {
//   const params = useParams();

//   return <WrappedComponent {...props} params={params} />;
// };
// export default WithRouter;
