import { ReactNode } from "react"
import "./tab-content.styles.tsx"
import { TabContentContainer } from "./tab-content.styles.tsx"

// renders the tab content with children inside

const TabContent = ({ children }: { children: ReactNode }) => {
  return (
    <TabContentContainer>
      { children }
    </TabContentContainer>
  )
}

export default TabContent