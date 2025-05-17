import { useCallback } from "react"
import "./tab-headers.styles.scss"

// renders tab headers using tab headers, active tab and a tab header click handler provided

type TabHeaderProps = {
  tabHeaders?: string[],
  tabHeader?: string,
  activeTabHeader: string,
  tabHeaderClickHandler: Function
}

const TabHeader = ({ tabHeader, activeTabHeader, tabHeaderClickHandler }: TabHeaderProps) => {
  // const handleTabClick = (tabHeaderClicked, tabHeaderClickHandler) => {
  //   tabHeaderClickHandler(tabHeaderClicked)
  // }

  // useCallback memo
  const handleTabClick = useCallback((tabHeaderClicked: string, tabHeaderClickHandler: Function) => {
    tabHeaderClickHandler(tabHeaderClicked)
  }, [])

  return (
    <li className="nav-item">
      <a className={`nav-link ${tabHeader === activeTabHeader ? "active" : ""}`}
        onClick={() => handleTabClick(tabHeader!, tabHeaderClickHandler)}>
        { tabHeader }
      </a>
    </li>
  )
}

const TabHeaders = ({ tabHeaders, activeTabHeader, tabHeaderClickHandler }: TabHeaderProps) => {
  return (
    <ul className="nav nav-tabs">
      {
        tabHeaders?.map((tabHeader, index) => {
          return (
            <TabHeader key={ index } tabHeader={ tabHeader } 
              activeTabHeader={ activeTabHeader } tabHeaderClickHandler={ tabHeaderClickHandler }/>
          )
        })
      }
    </ul>
  )
}

export default TabHeaders