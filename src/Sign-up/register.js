import React, { Component } from "react";
import HomeNav from "../Navbar/navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function myParams(Component) {
  return (props) => <Component navHook={useNavigate()} />;
}
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      conpassword: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { name, email, password, conpassword } = this.state;

    if (!password || !conpassword || !name || !email) {
      return toast.warning("Some Fields Are Empty!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (password.length < 6 || conpassword.length < 6) {
      return toast.error("Passwords Should Be Atleast 6 Characters!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else if (password !== conpassword) {
      return toast.error("Passwords Do Not Match!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          this.props.navHook("/sign-in");
        });
    }
  }
  render() {
    return (
      <>
        <HomeNav />
        <ToastContainer />
        <div className="h-100 d-flex align-items-center justify-content-center">
          <div className="auth-wrapper">
            <div className="auth-inner">
              <form onSubmit={this.handleSubmit}>
                <h3>Sign Up</h3>

                <div className="mb-3">
                  <label>Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    onChange={(e) => this.setState({ name: e.target.value })}
                  />
                </div>

                <div className="mb-3">
                  <label>Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter email"
                    onChange={(e) => this.setState({ email: e.target.value })}
                  />
                </div>

                <div className="mb-3">
                  <label>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    onChange={(e) =>
                      this.setState({ password: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Enter password"
                    onChange={(e) =>
                      this.setState({ conpassword: e.target.value })
                    }
                  />
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Sign Up
                  </button>
                </div>
                <p className="forgot-password text-right">
                  Already registered <a href="/sign-in">sign in?</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default myParams(SignUp);
