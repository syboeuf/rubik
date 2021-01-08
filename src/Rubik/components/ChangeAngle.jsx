import React from "react";

const ChangeAngle = ({ newAngle }) => (
  <div>
    <h1>Changer de face</h1>
    <button className="button" onClick={() => newAngle(90, 0)}>
      Face precedente
    </button>
    <button className="button" onClick={() => newAngle(-90, 0)}>
      Face suivante
    </button>
    <button className="button" onClick={() => newAngle(0, 180)}>
      Haut / bas
    </button>
  </div>
);

export default ChangeAngle;
