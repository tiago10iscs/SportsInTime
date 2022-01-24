import "./styles.css";

import StatsLine from "./StatsLine";
import { useState, useEffect } from "react";
import Axios from "axios";

/**
 * Este compoenete é utilizado para apresentar ao utilizador as estatísticas do jogo.
 * Este componente está inserido na página de jogo.
 *
 * @returns div com estatísticas de um determinado jogo
 */
function StatsTab(props) {
  const [stats, setStats] = useState(null);

  const getStats = () => {
    Axios.get(`https://localhost:7261/api/gamestats/${props.id}`).then(
      (res) => {
        const match_stats = res.data;
        setStats(match_stats);
      }
    );
  };

  useEffect(() => {
    getStats();
    setInterval(getStats, 45000);
    // eslint-disable-next-line
  }, []);

  if (props.estado === 2 || props.estado === 3) {
    return <div />;
  } else {
    return props.trigger ? (
      <>
        {!stats ? (
          <div />
        ) : (
          <div className="container">
            <div className="statsContainer">
              <StatsLine
                title="Posse de Bola"
                type="percent"
                awayValue={stats.ballPossessionAway}
                homeValue={stats.ballPossessionHome}
              />
              <StatsLine
                title="Remates"
                type="number"
                homeValue={stats.shotsHome}
                awayValue={stats.shotsAway}
              />
              <StatsLine
                title="Passes"
                type="number"
                homeValue={stats.passesHome}
                awayValue={stats.passesAway}
              />
              <StatsLine
                title="Faltas"
                type="number"
                homeValue={stats.foulsHome}
                awayValue={stats.foulsAway}
              />
              <StatsLine
                title="Cantos"
                type="number"
                homeValue={stats.cornersHome}
                awayValue={stats.cornersAway}
              />
            </div>
          </div>
        )}
      </>
    ) : (
      ""
    );
  }
}

export default StatsTab;
