import React, { useEffect } from "react";
import HomeNav from "../Navbar/navbar";
import Display from "./display";

function Contacts() {
  const user = localStorage.getItem("user");
  useEffect(() => {
    !user && window.location.replace("/sign-in");
  }, []);

  return (
    <div>
      <HomeNav />
      <h1 className="mt-4 text-center">
        {localStorage.getItem("user").split(" ")[0]}'s Contact List
      </h1>
      <Display />
    </div>
  );
}

export default Contacts;
