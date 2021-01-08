import React, { useState } from "react";
import { useRubikCube } from "hooks/useRubikCube";

import Options from "./components/Options";
import TextInput from "./components/TextInput";
import Resolve from "./components/Resolve";
import ChangeAngle from "./components/ChangeAngle";
import ListMovement from "./components/ListMovement";

const Rubik = () => {
  const [
    cube,
    setOption,
    valueInput,
    setValueInput,
    executeMoves,
    activeButtonStep,
    resolveStepByStep,
    listAllMoves,
    time,
  ] = useRubikCube();
  const [rotate, setRotate] = useState(false);
  const [xAngle, setXAngle] = useState(45);
  const [yAngle, setYAngle] = useState(-35);

  const rotateRubik = (e) => {
    setXAngle(-e.movementX + xAngle);
    setYAngle(e.movementY + yAngle);
  };

  const newAngle = (x, y) => {
    x = xAngle + x > 145 ? 45 : xAngle + x;
    y = yAngle + y < -225 ? -35 : yAngle + y;
    setXAngle(x);
    setYAngle(y);
  };

  return (
    <div className="container">
      <div className="sub_container">
        <div className="container_cube" style={{ justifyContent: "center" }}>
          <div
            className="cubo"
            onMouseMove={(e) => rotate && rotateRubik(e)}
            onMouseDown={() => setRotate(true)}
            onMouseUp={() => setRotate(false)}
            style={{ transform: `rotateX(${yAngle}deg) rotateY(${xAngle}deg)` }}
          >
            {cube.map((face, i) => (
              <div className={`cara face${i}`} key={i}>
                {face.map((row, k) =>
                  row.map((carre, index) => (
                    <div
                      key={index}
                      className={`inferiors ${
                        i === 0 && k === 1 && index === 1 ? "logo" : ""
                      }`}
                      style={{ backgroundColor: carre }}
                    />
                  ))
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <ChangeAngle newAngle={newAngle} />
        <ListMovement listAllMoves={listAllMoves} time={time} />
        <TextInput
          valueInput={valueInput}
          setValueInput={setValueInput}
          executeMoves={executeMoves}
        />
        <Options setOption={setOption} />
        <Resolve
          setOption={setOption}
          activeButtonStep={activeButtonStep}
          resolveStepByStep={resolveStepByStep}
        />
      </div>
    </div>
  );
};

export default Rubik;
