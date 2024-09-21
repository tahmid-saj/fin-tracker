import "./hidden-drawer.styles.scss"
import { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Typography } from '@mui/material';

import HomeIcon from '@mui/icons-material/Home'
import SmartToyIcon from '@mui/icons-material/SmartToy';
import DashboardIcon from '@mui/icons-material/Dashboard'
import PaidIcon from '@mui/icons-material/Paid'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import ShowChartIcon from '@mui/icons-material/ShowChart';
import PaymentIcon from '@mui/icons-material/Payment';
import SavingsIcon from '@mui/icons-material/Savings';
import SafetyCheckIcon from '@mui/icons-material/SafetyCheck';
import CalculateIcon from '@mui/icons-material/Calculate';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';

import LanguageIcon from '@mui/icons-material/Language';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ArticleIcon from '@mui/icons-material/Article';


import { Link, useNavigate } from 'react-router-dom';
import { ExpensesContext } from '../../../../contexts/signed-in/expenses/expenses.context';
import { BankingContext } from '../../../../contexts/signed-in/banking/banking.context';
import { InvestmentsContext } from '../../../../contexts/signed-in/investments/investments.context';
import { SavingsContext } from '../../../../contexts/signed-in/savings/savings.context';
import { InsuranceContext } from "../../../../contexts/signed-in/insurance/insurance.context";
// import { signOutUser } from '../../../../utils/firebase/firebase.utils';

import { NAV_LINKS } from '../../../../utils/constants/shared.constants';
import { COLOR_CODES } from "../../../../utils/constants/shared.constants";

import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../../../store/shared/user/user.selector";
import { signOutStart } from "../../../../store/shared/user/user.action";

export default function HiddenDrawer() {
  const [open, setOpen] = useState(true);

  const currentUser = useSelector(selectCurrentUser)
  const { updateExpensesAndSummary } = useContext(ExpensesContext)
  const { updateBankingAccountsAndSummary } = useContext(BankingContext);
  const { updateInvestmentsAndSummary } = useContext(InvestmentsContext);
  const { updateSavingsAccountsAndSummary } = useContext(SavingsContext);
  const { updateInsurancesAndSummary } = useContext(InsuranceContext)
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleSignOut = () => {
    updateExpensesAndSummary();
    updateBankingAccountsAndSummary();
    updateInvestmentsAndSummary();
    updateSavingsAccountsAndSummary();
    updateInsurancesAndSummary()
    // signOutUser();
    dispatch(signOutStart())
    navigate("/")
  }

  let navLinksHeaders;
  if (currentUser) {
    navLinksHeaders = NAV_LINKS.signedIn
  } else {
    navLinksHeaders = NAV_LINKS.signedOut
  }

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250, marginTop: "40px" }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        { navLinksHeaders.section1.map(({ header, path }, index) => (
          <Link to={ `${path}` }>
            <ListItem key={ header } disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  { header === NAV_LINKS.headers.home ? <HomeIcon/> : null }
                  { header === NAV_LINKS.headers.chatbot ? <SmartToyIcon/> : null }
                  { header === NAV_LINKS.headers.dashboard ? <DashboardIcon/> : null }
                  { header === NAV_LINKS.headers.expenses ? <PaidIcon/> : null }
                  { header === NAV_LINKS.headers.banking ? <AccountBalanceIcon/> : null }
                  { header === NAV_LINKS.headers.marketData ? <ShowChartIcon/> : null }
                  { header === NAV_LINKS.headers.investments ? <PaymentIcon/> : null }
                  { header === NAV_LINKS.headers.savings ? <SavingsIcon/> : null }
                  { header === NAV_LINKS.headers.insurance ? <SafetyCheckIcon/> : null }
                  { header === NAV_LINKS.headers.usefulTools ? <CalculateIcon/> : null }
                  { header === NAV_LINKS.headers.exports ? <FileDownloadIcon/> : null }
                </ListItemIcon>
                <ListItemText primary={ header } />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>

      <Divider />

      <List>
        { navLinksHeaders.section2.map(({ header, path }, index) => {
          return (
              currentUser ? (
                <span onClick={ handleSignOut }>
                  <ListItem key={header} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        { header === NAV_LINKS.headers.signedIn ? <LogoutIcon/> : null }
                      </ListItemIcon>
                      <ListItemText primary={header}/>
                    </ListItemButton>
                  </ListItem>
                </span>
              ) : (
                <Link to={ `${path}` }>
                  <ListItem key={header} disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                        { header === NAV_LINKS.headers.signedOut ? <LoginIcon/> : null }
                      </ListItemIcon>
                      <ListItemText primary={header}/>
                    </ListItemButton>
                  </ListItem>
                </Link>
              )
            )
        })}
      </List>

      <Divider/>

      <List>
        { navLinksHeaders.section3.map(({ header, url }, index) => (
          <Link to={ `${url}` }>
            <ListItem key={ header } disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  { header === NAV_LINKS.headers.website ? <LanguageIcon/> : null }
                  { header === NAV_LINKS.headers.github ? <GitHubIcon/> : null }
                  { header === NAV_LINKS.headers.medium ? <ArticleIcon/> : null }
                  { header === NAV_LINKS.headers.linkedin ? <LinkedInIcon/> : null }
                </ListItemIcon>
                <ListItemText primary={ header } />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );

  return (
    <div className="finance-planner-app-bar">
      <Button sx={{ position: "fixed", width: "100%", justifyContent: "left", top: "0", zIndex: "9999", overflow: "hidden",
        backgroundColor: COLOR_CODES.general["3"] }}
        onClick={toggleDrawer(true)}>
        <div className='finance-planner-title'>
          <MenuIcon/>
          <Typography sx={{ marginLeft: "10px", color: COLOR_CODES.general["4"], textTransform: "capitalize" }} 
            variant="h6">
            Finance Planner
          </Typography>
          {
            currentUser ?
            <Typography sx={{ marginLeft: "15px", color: COLOR_CODES.general["5"] }} variant="caption">
              { `Hello ${currentUser.displayName.split(" ")[0]}` }
            </Typography> : null
          }
        </div>
      </Button>
      
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}
