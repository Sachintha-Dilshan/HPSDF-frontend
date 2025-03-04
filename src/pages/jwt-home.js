import { useState, useEffect } from "react";
import UserService from "../services/UserService";


export default function JWTHome() {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent()
      .then(response => setContent(response.data))
      .catch(error => {
        const resMessage =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();
        setContent(resMessage);
      });
  }, []); // Empty dependency array to fetch data only once

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>{content}</h3>
      </header>
    </div>
  );
}
