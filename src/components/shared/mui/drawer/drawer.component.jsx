import "./drawer.styles.scss"
import { useContext, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

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

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    marginRight: "1%",
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer({ navLinksHeaders, children }) {
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch()

  const currentUser = useSelector(selectCurrentUser)
  const { updateExpensesAndSummary } = useContext(ExpensesContext)
  const { updateBankingAccountsAndSummary } = useContext(BankingContext);
  const { updateInvestmentsAndSummary } = useContext(InvestmentsContext);
  const { updateSavingsAccountsAndSummary } = useContext(SavingsContext);
  const { updateInsurancesAndSummary } = useContext(InsuranceContext)
  const navigate = useNavigate();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
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

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar
          sx={{ 
            backgroundColor: "black",
            width: "100%"
          }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>

          <div className="fin-tracker-title">
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

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        
        <List>
          { navLinksHeaders.section1.map(({ header, path }, index) => (
            <Link to={ `${path}` }>
              <ListItem key={ header } disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}

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

                  <ListItemText primary={ header } sx={{ opacity: open ? 1 : 0 }}/>
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
                  <ListItem key={header} disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : 'auto',
                          justifyContent: 'center',
                        }}
                      >
                        {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}

                        { header === NAV_LINKS.headers.signedIn ? <LogoutIcon/> : null }
                      </ListItemIcon>
                      <ListItemText primary={header} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                  </ListItem>
                </span>
              ) : (
                <Link to={ `${path}` }>
                  <ListItem key={header} disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                      sx={{
                        minHeight: 48,
                        justifyContent: open ? 'initial' : 'center',
                        px: 2.5,
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : 'auto',
                          justifyContent: 'center',
                        }}
                      >
                        {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}

                        { header === NAV_LINKS.headers.signedOut ? <LoginIcon/> : null }
                      </ListItemIcon>
                      <ListItemText primary={header} sx={{ opacity: open ? 1 : 0 }} />
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
          {navLinksHeaders.section3.map(({ header, url }, index) => (
            <Link to={ `${url}` }>
              <ListItem key={header} disablePadding sx={{ display: 'block' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                    { header === NAV_LINKS.headers.website ? <LanguageIcon/> : null }
                    { header === NAV_LINKS.headers.github ? <GitHubIcon/> : null }
                    { header === NAV_LINKS.headers.medium ? <ion-icon name="logo-medium"></ion-icon> : null }
                    { header === NAV_LINKS.headers.linkedin ? <LinkedInIcon/> : null }
                    

                  </ListItemIcon>
                  <ListItemText primary={header} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 1 }}>
        <DrawerHeader />

        {/* <Typography paragraph>
        </Typography> */}

      </Box>
    </Box>
  );
}
