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
    fetch(
      "https://contact-list-app-backend-production.up.railway.app/api/auth/login",
      {
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
      }
    )
      .then((res) => res.json())
      .then((data) => {
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

                <div className="d-grid">
                  <button type="submit" className="btn btn-primary">
                    Submit
                  </button>
                </div>
                <p className="forgot-password text-right">
                  Do Not Have An Account? <a href="/sign-up">sign-up</a>
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
