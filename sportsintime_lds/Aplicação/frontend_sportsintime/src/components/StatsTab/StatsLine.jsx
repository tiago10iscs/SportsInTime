import "./styles.css";

import ValueBars from "./ValueBars";

/**
 * Representa a linha de estatisticas de um jogo
 *
 * @param {*} props podem ser de qualquer tipo, neste caso recebem os valores da estatistica
 * @returns uma div com as informações estatisticas
 */
function StatsLine(props) {
  var homeValue;
  var awayValue;
  var homePercent;
  var awayPercent;

  const percent = () => {
    homeValue = props.homeValue;
    awayValue = props.awayValue;
    homePercent = props.homeValue;
    awayPercent = props.awayValue;
  };

  const number = () => {
    homeValue = parseInt(props.homeValue, 10);
    awayValue = parseInt(props.awayValue, 10);

    var total = homeValue + awayValue;
    homePercent = Math.round((homeValue / total) * 100, 10).toString() + "%";
    awayPercent = Math.round((awayValue / total) * 100, 10).toString() + "%";
  };

  if (props.type === "percent") {
    percent();
  } else {
    number();
  }

  return (
    <div className="statsContainer">
      <span className="title">{props.title}</span>
      <div className="statsBox">
        <ValueBars value={homeValue} percent={homePercent} team="home" />
        <ValueBars value={awayValue} percent={awayPercent} team="away" />
      </div>
    </div>
  );
}

export default StatsLine;
