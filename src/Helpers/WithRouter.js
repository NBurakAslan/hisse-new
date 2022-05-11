import React from "react";
import { useParams, useNavigate } from "react-router-dom";

export function withRouter(Child) {
  return (props) => {
    const params = useParams();
    const history = useNavigate();
    return <Child {...props} params={params} history={history} />;
  };
}
