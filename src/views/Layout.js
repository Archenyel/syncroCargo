import { Outlet, Link } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li>
              <Link to="/" class="nav-link" tabindex="-1" aria-disabled="true">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/Login"
                class="nav-link"
                tabindex="-1"
                aria-disabled="true"
              >
                Login
              </Link>
            </li>
            <li class="nav-item">
              <Link
                to="/Operations"
                class="nav-link"
                tabindex="-1"
                aria-disabled="true"
              >
                Operaciones
              </Link>
            </li>
            <li class="nav-item">
              <Link
                to="/Personal"
                class="nav-link "
                tabindex="-1"
                aria-disabled="true"
              >
                Personal
              </Link>
            </li>
            <li class="nav-item">
              <Link
                to="/Reports"
                class="nav-link "
                tabindex="-1"
                aria-disabled="true"
              >
                Reportes
              </Link>
            </li>
            <li class="nav-item">
              <Link
                to="/Graphics"
                class="nav-link "
                tabindex="-1"
                aria-disabled="true"
              >
                Graficas
              </Link>
            </li>
            <li class="nav-item">
              <Link
                to="/Products"
                class="nav-link "
                tabindex="-1"
                aria-disabled="true"
              >
                Productos
              </Link>
            </li>
            <li class="nav-item">
              <Link
                to="/Cortinas"
                class="nav-link "
                tabindex="-1"
                aria-disabled="true"
              >
                Cortinas
              </Link>
            </li>
            <li class="nav-item">
              <Link
                to="/Companies"
                class="nav-link "
                tabindex="-1"
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
