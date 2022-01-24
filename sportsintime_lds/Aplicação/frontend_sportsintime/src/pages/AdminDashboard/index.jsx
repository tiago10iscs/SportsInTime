import "./index.css";
import React, { useState, useEffect } from "react";
import Axios from "axios";
import reportsData from "../../reportsData";
import ReportCard from "../../components/ReportCard";

/**
 * Componente que representa a admin Dashboard.
 * A admin Dashboard é uma página exclusiva para admins do website. A página apresenta a lista de reports
 * que devem ser resolvidos pelos admins
 *
 * @returns página com a admin dashboard
 */
function AdminDashboard() {
  const [reports, setReports] = useState([]);

  const getReports = () => {
    Axios.get("https://localhost:7261/api/report").then((res) => {
      const rep = res.data;
      console.log(rep);
      setReports(rep);
    });
  };

  /* Obtem todos os jogos de 45 em 45 segundos */
  useEffect(() => {
    getReports();
    // eslint-disable-next-line
  }, []);

  const data = reportsData;

  return (
    <div className="reportsContainer">
      {reports.length ? (
        reports.map((report, index) => {
          /**
           * Função que permite marcar um report como verificado
           */
          const verified = () => {
            console.log(
              `O report ao utilizador com o id ${report.userId} foi marcado como verificado`
            );
          };

          /**
           * Função que permite banir um utilizador
           */
          const banned = () => {
            console.log(`O utilizador com o id ${report.userId} foi banido`);
          };

          return (
            <ReportCard
              data={report}
              key={index}
              verified={verified}
              banned={banned}
              id={report.idUser}
            />
          );
        })
      ) : (
        <span className="emptyTitle">Não existem reports disponíveis</span>
      )}
    </div>
  );
}

export default AdminDashboard;
