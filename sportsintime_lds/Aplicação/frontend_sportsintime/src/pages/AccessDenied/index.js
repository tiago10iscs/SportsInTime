import "./index.css"
import React from 'react'
import { ImWarning } from "react-icons/im";

/**
 * Esta página é apresentada ao utilizador quando este não tem premissões 
 * para aceder a uma determinada rota
 * 
 * @returns div com página interdita
 */
function AccessDenied() {
    return(
        <div className="accessDenied">
            <ImWarning className="icon" />
            <div className="text">Não tem permissão para aceder a esta página.</div>
        </div>
    )
}

export default AccessDenied;