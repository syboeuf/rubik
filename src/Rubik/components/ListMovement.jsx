import React from "react";

const ListMovement = ({ listAllMoves, time }) => (
  <div className="list_movement">
    <h1>Mouvement</h1>
    <p>{`Celà a mis ${time}s à se resoudre.`}</p>
    {listAllMoves.map((move, index) => (
      <span key={index}>{`${move} `}</span>
    ))}
  </div>
);

export default ListMovement;
