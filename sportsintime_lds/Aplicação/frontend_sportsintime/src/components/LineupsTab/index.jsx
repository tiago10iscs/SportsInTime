import "./styles.css";
import Axios from "axios";
import { useState, useEffect } from "react";
import LineupContainer from "./LineupContainer";

/**
 * Este compoenete é utilizado para apresentar ao utilizador as equipas iniciais bem como
 * os suplentes de ambas as equipas
 *
 * @returns div com lista de jogadores da equipa inicial e lista de jogadores suplentes
 */
function LineupsTab(props) {
  const [lineups, setLineups] = useState(null);

  const getLineups = () => {
    Axios.get(`https://localhost:7261/api/formacoes/${props.id}`).then(
      (res) => {
        const match_lineups = res.data;
        console.log(res.data);
        setLineups(match_lineups);
      }
    );
  };

  useEffect(() => {
    getLineups();
    setInterval(getLineups, 45000);
    // eslint-disable-next-line
  }, []);

  if (props.estado === 2 || props.estado === 3) {
    return <div />;
  } else {
    return props.trigger ? (
      <>
        {!lineups ? (
          <div />
        ) : (
          <div className="container">
            <span className="lineupsTitle"> EQUIPAS INICIAIS </span>
            <LineupContainer data={lineups} type="inicial" />
            <span className="lineupsTitle"> SUPLENTES </span>
            <LineupContainer data={lineups} type="suplentes" />
          </div>
        )}
      </>
    ) : (
      ""
    );
  }
}

export default LineupsTab;
