import React from "react";

const stepButton = [1, 2, 3, 4, 5, 6, 7];

const Resolve = ({ setOption, activeButtonStep, resolveStepByStep }) => (
  <div>
    <div>
      <h1>Melanger et resoudre</h1>
      <button className="button" onClick={() => setOption("shuffle")}>
        Mélanger
      </button>
      <button className="button" onClick={() => setOption("resolve")}>
        Resoudre
      </button>
      <button className="button" onClick={() => setOption("nbOfMoves")}>
        Nombre de mouvement
      </button>
      <button className="button" onClick={() => setOption("resetMovement")}>
        reset mouvement
      </button>
    </div>
    <div>
      <h1>Par etape</h1>
      {stepButton.map((step) => (
        <button
          key={step}
          className="button"
          style={{ background: activeButtonStep === step ? "#926d27" : "grey" }}
          onClick={() =>
            activeButtonStep === step ? resolveStepByStep(step) : null
          }
        >
          {`etape${step}`}
        </button>
      ))}
    </div>
  </div>
);

export default Resolve;
