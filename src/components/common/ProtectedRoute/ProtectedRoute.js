import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...props }) => (
  <Route>
    {() =>
      props.loggedIn ? <Component {...props} /> : <Redirect to='/' />
    }
  </Route>
);

export default ProtectedRoute;
