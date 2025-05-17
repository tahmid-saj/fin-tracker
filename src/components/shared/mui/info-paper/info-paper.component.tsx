import { ReactNode } from "react"
import "./info-paper.styles.tsx"
import { InfoPaperContainer } from "./info-paper.styles.tsx"

// renders a simple paper with children inside
const InfoPaper = ({ children }: { children: ReactNode }) => {
  return (
    <InfoPaperContainer>
      { children }
    </InfoPaperContainer>
  )
}

export default InfoPaper