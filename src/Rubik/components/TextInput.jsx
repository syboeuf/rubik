import React from "react"

const TextInput = ({ valueInput, setValueInput, executeMoves }) => (
    <div>
        <h1>Ecriver pour faire un mouvement</h1>
        <textarea
            type="text"
            className="textinput"
            value={ valueInput }
            onChange={ (e) => setValueInput(e.target.value) }
            placeholder="Exemple F ou U"
        />
        <button className="button" onClick={ () => executeMoves() }>Envoyer</button>
    </div>
)

export default TextInput