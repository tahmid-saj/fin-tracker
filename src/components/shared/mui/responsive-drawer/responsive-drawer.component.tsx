import "./responsive-drawer.styles.scss"
import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import HomeIcon from '@mui/icons-material/Home'
import SmartToyIcon from '@mui/icons-material/SmartToy';
import DashboardIcon from '@mui/icons-material/Dashboard'
import PaidIcon from '@mui/icons-material/Paid'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import ShowChartIcon from '@mui/icons-material/ShowChart';
import PaymentIcon from '@mui/icons-material/Payment';
import SavingsIcon from '@mui/icons-material/Savings';
import CalculateIcon from '@mui/icons-material/Calculate';
import SafetyCheckIcon from '@mui/icons-material/SafetyCheck';
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

import { useDispatch, useSelector } from "react-redux";
import { selectCurrentUser } from "../../../../store/shared/user/user.selector";
import { signOutStart } from "../../../../store/shared/user/user.action";

const drawerWidth = 225;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
}

function ResponsiveDrawer(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const currentUser = useSelector(selectCurrentUser)
  const { updateExpensesAndSummary } = useContext(ExpensesContext)
  const { updateBankingAccountsAndSummary } = useContext(BankingContext);
  const { updateInvestmentsAndSummary } = useContext(InvestmentsContext);
  const { updateSavingsAccountsAndSummary } = useContext(SavingsContext);
  const { updateInsurancesAndSummary } = useContext(InsuranceContext)
  const navigate = useNavigate();
  const dispatch = useDispatch()

  let navLinksHeaders;
  if (currentUser) {
    navLinksHeaders = NAV_LINKS.signedIn
  } else {
    navLinksHeaders = NAV_LINKS.signedOut
  }

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

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

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
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
        {
          navLinksHeaders.section2.map(({ header, path }, index) => {
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
          })
        }
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
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar 
          sx={{ 
            backgroundColor: "black",
            width: "100%"
          }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <div className='finance-planner-title'>
            <Typography variant="h6" noWrap component="div">
              Finance Planner
            </Typography>
            {
              currentUser ?
              <Typography variant="body2" noWrap component="div">
                { `Hello ${currentUser.displayName}` }
              </Typography> : null
            }
          </div>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
      </Box>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
