import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li key={1}>
              <Link to="/" className="nav-link" tabIndex="-1" aria-disabled="true">
                Home
              </Link>
            </li>
            <li key={2}>
              <Link
                to="/Login"
                className="nav-link"
                tabIndex="-1"
                aria-disabled="true"
              >
                Login
              </Link>
            </li>
            <li className="nav-item" key={3}>
              <Link
                to="/Operations"
                className="nav-link"
                tabIndex="-1"
                aria-disabled="true"
              >
                Operaciones
              </Link>
            </li>
            <li className="nav-item" key={4}>
              <Link
                to="/Personal"
                className="nav-link "
                tabIndex="-1"
                aria-disabled="true"
              >
                Personal
              </Link>
            </li>
            <li className="nav-item" key={5}>
              <Link
                to="/Reports"
                className="nav-link "
                tabIndex="-1"
                aria-disabled="true"
              >
                Reportes
              </Link>
            </li>
            <li className="nav-item" key={6}>
              <Link
                to="/Graphics"
                className="nav-link "
                tabIndex="-1"
                aria-disabled="true"
              >
                Graficas
              </Link>
            </li>
            <li className="nav-item" key={7}>
              <Link
                to="/Products"
                className="nav-link "
                tabIndex="-1"
                aria-disabled="true"
              >
                Productos
              </Link>
            </li>
            <li className="nav-item" key={8}>
              <Link
                to="/Cortinas"
                className="nav-link "
                tabIndex="-1"
                aria-disabled="true"
              >
                Cortinas
              </Link>
            </li>
            <li className="nav-item" key={9}>
              <Link
                to="/Companies"
                className="nav-link "
                tabIndex="-1"
                aria-disabled="true"
              >
                Companias
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
