import React from "react";
import {
  Switch,
  Route,
  Redirect,
  useLocation,
  useHistory
} from "react-router-dom";

const ElementDemos = ({ demos }) => {
  const location = useLocation();
  const history = useHistory();

  return (
    <div className="DemoWrapper">
      <div className="DemoPickerWrapper">
        <select
          className="DemoPicker"
          value={location.pathname}
          onChange={event => {
            history.push(event.target.value);
          }}
        >
          {demos.map(({ path, label }) => (
            <option key={path} value={path}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <Switch>
        <Redirect to={demos[0].path} from="/" exact />
        {demos.map(({ path, component: Component }) => (
          <Route key={path} path={path}>
            <div className="Demo">
              <Component />
            </div>
          </Route>
        ))}
      </Switch>
    </div>
  );
};

export default ElementDemos;
