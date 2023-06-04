import React, { Component } from "react";
import HomeNav from "../Navbar/navbar";
import { useNavigate } from "react-router-dom";

function myParams(Component) {
  return (props) => <Component navHook={useNavigate()} />;
}
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (!data.error) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", data.user.name);

          this.props.navHook(`/contacts`);
        } else {
          console.log(data.error);
        }
      });
  }
  render() {
    return (
      <>
        <HomeNav />
        <div className="h-100 d-flex align-items-center justify-content-center">
          <div className="auth-wrapper">
            <div className="auth-inner">
              <form onSubmit={this.handleSubmit}>
                <h3>Sign In</h3>

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
                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customCheck1"
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheck1"
                    >
                      Remember me
                    </label>
                  </div>
                </div>

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
                <p className="forgot-password text-right">
                  Forgot <a href="#">password?</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }
}
export default myParams(Login);
