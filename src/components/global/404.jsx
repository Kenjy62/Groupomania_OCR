import React from "react";

function NotFound() {
  return (
    <div
      className="notfound"
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>Oups.. Cette page n'existe pas!</h1>
      <a href="/dashboard">Revenir à l'accueil</a>
    </div>
  );
}

export default NotFound;
