import React from "react";
import ExportBox from "../../components/signed-in/exports/export-box/export-box.component";

const ExportsRoute = () => {
  return (
    <div className="exports-route-container">
      <h2><strong>Export the summary</strong></h2>

      <ExportBox></ExportBox>
    </div>
  );
};

export default ExportsRoute;