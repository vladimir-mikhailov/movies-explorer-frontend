import { useMemo } from 'react';
import { Route, Redirect } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';
import './ProtectedRoute.css';

const ProtectedRoute = ({ component: Component, ...props }) => {
  const { loggedIn } = props;

  const render = useMemo (() => {
    if (loggedIn === null) return (
      <main className='main protected-route'>
        <Preloader />
      </main>

    );
    return (
      <Route>
        {() => (loggedIn ? <Component {...props} /> : <Redirect to='/' />)}
      </Route>
    );
  }, [loggedIn, props]);



  return render;
};

export default ProtectedRoute;
