import React from "react";
import HomeNav from "../Navbar/navbar";
import { Button } from "react-bootstrap";
import "../App.css";
function Home() {
  if (localStorage.getItem("token")) {
    window.location.href = "/contacts";
  }
  return (
    <div>
      <HomeNav />
      <div className=" d-flex flex-column justify-content-center align-items-center text-center background">
        <div className="shadow-lg p-3 mb-5 bg-white rounded d-flex justify-content-center align-items-center text-center home-wrap">
          <div className="text-wrap w-75">
            <h1 className="display-5 text1">
              Contact List Full Stack Application
            </h1>
            <br />
            <p className="lead text2">
              This is a Contact List Full Stack Application which allows users
              to add, edit and delete contact details. This application is
              intended for:
            </p>
            <p className="display-6 text3">Xeno Assignment- SDE Internship.</p>
            <hr className="my-4" />
            <p className="text4">
              This application is built using ReactJS, NodeJS, ExpressJS and
              MongoDb. It uses Json Web Tokens for authentication and
              authorization.
            </p>
            <br />
            <div className="d-flex gap-4 justify-content-center align-items-center">
              <p className="lead">
                <Button variant="primary" href="/sign-in">
                  Sign In
                </Button>
              </p>
              <p className="lead">
                <Button variant="primary" href="/sign-up">
                  Sign Up
                </Button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
