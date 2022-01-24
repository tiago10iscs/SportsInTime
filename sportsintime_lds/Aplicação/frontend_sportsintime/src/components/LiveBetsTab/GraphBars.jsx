import "./styles.css";

/**
 * Representam as barras que são apresentadas nos gráficas com o valor das apostas
 *
 * @param {*} props podem ser de qualquer tipo, neste caso representam os valores que serão aplicados às barras
 * @returns uma div com as barras gráficas, que contêm o valor das apostas
 */
function ValueBars(props) {
  if (props.option === "1") {
    return (
      <div className="valuesBox">
        <span className="value"> {props.value} </span>
        <div className="bar home">
          <div className="valueBar" style={{ width: props.percent }} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="valuesBox">
        <div className="bar away">
          <div className="valueBar" style={{ width: props.percent }} />
        </div>
        <span className="value"> {props.value} </span>
      </div>
    );
  }
}

export default ValueBars;
