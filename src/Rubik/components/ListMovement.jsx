import React from "react"

const ListMovement = ({ listAllMoves }) => (
    <div className="list_movement">
        <h1>Mouvement</h1>
        {
            listAllMoves.map((move, index) => (
                <span key={ index }>{ `${move} ` }</span>
            ))
        }
    </div>
)

export default ListMovement