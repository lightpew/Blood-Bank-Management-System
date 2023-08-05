import React, { useEffect } from "react";
import { auth, getAuth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Header = () => {
  var user = auth.currentUser;

  useEffect(() => {
    if (user) {
      console.log("Loggdin");
    } else {
      console.log("not logged in");
    }
  });

  const navigate = useNavigate();

  const logoutfunc = () => {
    if (window.confirm("Do you Want to Log Out ?")) {
      signOut(auth)
        .then(() => {
          toast.success("Logout Successful !");
          navigate("/");
        })
        .catch((error) => {
          toast.error("Something Went wrong !");
        });
    }
  };

  return (
    <>
      <ToastContainer />
      <nav className="navbar navbar-expand-lg p-2 navdabba shadow">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
            Blood Bank Management
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav me-auto mb-2 mb-lg-0 container-fluid d-flex justify-content-end">

                <Link className="nav-link" aria-current="page" to="/">
                  Home
                </Link>

                <Link className="nav-link" aria-current="page" to="/whydonate">
                  Why Donate Blood
                </Link>

                <Link className="nav-link" aria-current="page" to="/donor">
                  Become a Donor
                </Link>

                <Link className="nav-link" aria-current="page" to="/acceptor">
                  Need Blood
                </Link>

              {/* <li className="nav-item">
                <a className="nav-link" aria-current="page" href="/">
                  About
                </a>
              </li> */}
              
              {user ? 
              (
                <>
                <Link className="nav-link" aria-current="page" to="/profile">
                    Profile
                  </Link>
                <Link
                    className="nav-link "
                    onClick={logoutfunc}
                    style={{ cursor: "pointer" }}
                  >
                      Logout
                    </Link>
                </>


              ) : (
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
