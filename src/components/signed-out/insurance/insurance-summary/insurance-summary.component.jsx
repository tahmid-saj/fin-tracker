import "./insurance-summary.styles.scss"
import { Typography } from "@mui/material"

const InsuranceSummary = () => {
  return (
    <div className="insurance-summary">
      <Typography sx={{ marginBottom: "2%" }} variant="h6">{`Insurance Summary`}</Typography>
      <Typography paragraph>{`Total: $`}</Typography>
      <Typography paragraph>{`Start: `}</Typography>
      <Typography paragraph>{`End: -`}</Typography>
      <Typography paragraph>{`Categories: `}</Typography>
    </div>
  )
}

export default InsuranceSummary