// shared constants

export const BUTTON_TYPE_CLASSES = {
  base: "base",
  google: "google-sign-in",
  inverted: "inverted"
};

export const FINANCE_ITEM_TYPES = {
  expenses: "Expenses",
  banking: "Bank Accounts",
  investments: "Investments",
  savings: "Savings Accounts",
  insurance: "Insurance"
};

export const NAV_LINKS = {
  headers: {
    home: "Home",
    chatbot: "Chatbot",
    dashboard: "Dashboard",
    expenses: "Expenses",
    banking: "Banking",
    marketData: "Market Data",
    investments: "Investments",
    savings: "Savings",
    insurance: "Insurance",
    usefulTools: "Useful Tools",
    exports: "Exports",
    signedOut: "Sign In / Register",
    signedIn: "Sign Out",
    website: "tahmidsajin.io",
    github: "GitHub",
    medium: "Medium",
    linkedin: "LinkedIn"
  },
  paths: {
    signedOut: {
      home: "/",
      chatbot: "/dashboard",
      dashboard: "/dashboard",
      expenses: "/expenses",
      banking: "/banking",
      marketData: "/investments",
      investments: "/investments",
      savings: "/savings",
      insurance: "/insurance",
      usefulTools: "/useful-tools",
      exports: "/exports",
      auth: "/auth",
    },
    signedIn: {
      home: "/",
      chatbot: "/dashboard-signed-in",
      dashboard: "/dashboard-signed-in",
      expenses: "/expenses-signed-in",
      banking: "/banking-signed-in",
      marketData: "/investments-signed-in",
      investments: "/investments-signed-in",
      savings: "/savings-signed-in",
      insurance: "/insurance-signed-in",
      usefulTools: "/useful-tools",
      exports: "/exports-signed-in",
      signOut: "/",
    },
  },
  signedOut: {
    section1: [
      {
        header: "Home",
        path: "/",
      },
      {
        header: "Chatbot",
        path: "/dashboard",
      },
      {
        header: "Dashboard",
        path: "/dashboard",
      },
      {
        header: "Expenses",
        path: "/expenses",
      },
      {
        header: "Banking",
        path: "/banking",
      },
      {
        header: "Market Data",
        path: "/investments",
      },
      {
        header: "Investments",
        path: "/investments",
      },
      {
        header: "Savings",
        path: "/savings"
      },
      {
        header: "Insurance",
        path: "/insurance"
      },
      {
        header: "Useful Tools",
        path: "/useful-tools"
      },
    ],
    section2: [
      {
        header: "Sign In / Register",
        path: "/auth"
      }
    ],
    section3: [
      {
        header: "tahmidsajin.io",
        url: "http://tahmidsajin.io/"
      },
      {
        header: "GitHub",
        url: "https://github.com/tahmid-saj"
      },
      {
        header: "Medium",
        url: "https://medium.com/@tahmid.saj/designing-a-finance-planner-application-58d3ad928d62"
      },
      {
        header: "LinkedIn",
        url: "https://ca.linkedin.com/in/tsajin"
      },
    ]
  },
  signedIn: {
    section1: [
      {
        header: "Home",
        path: "/"
      },
      {
        header: "Chatbot",
        path: "/dashboard-signed-in"
      },
      {
        header: "Dashboard",
        path: "/dashboard-signed-in"
      },
      {
        header: "Expenses",
        path: "/expenses-signed-in"
      },
      {
        header: "Banking",
        path: "/banking-signed-in"
      },
      {
        header: "Market Data",
        path: "/investments-signed-in"
      },
      {
        header: "Investments",
        path: "/investments-signed-in"
      },
      {
        header: "Savings",
        path: "/savings-signed-in"
      },
      {
        header: "Insurance",
        path: "/insurance-signed-in"
      },
      {
        header: "Useful Tools",
        path: "/useful-tools"
      },
      {
        header: "Exports",
        path: "/exports-signed-in"
      },
    ],
    section2: [
      {
        header: "Sign Out",
        path: "/"
      }
    ],
    section3: [
      {
        header: "tahmidsajin.io",
        url: "http://tahmidsajin.io/"
      },
      {
        header: "GitHub",
        url: "https://github.com/tahmid-saj"
      },
      {
        header: "Medium",
        url: "https://medium.com/@tahmid.saj/designing-a-finance-planner-application-58d3ad928d62"
      },
      {
        header: "LinkedIn",
        url: "https://ca.linkedin.com/in/tsajin"
      },
    ]
  }
}

export const COLOR_CODES = {
  card: {
    infoCard: "#DCF2F1"
  },
  paper: {
    formPaper: "#DDE6ED",
    infoPaper: "#9DB2BF"
  },
  scrollbar: {
    scroll: "#666666",
    background: "white"
  },
  general: {
    "0": "#DCF2F1",
    "1": "#7FC7D9",
    "2": "#365486",
    "3": "#0F1035",
    "4": "#DDE6ED",
    "5": "#9DB2BF",
    "6": "#526D82",
    "7": "#27374D",
  },
  background: "#27374D",
  bankingActions: {
    deposit: "#98D8AA",
    withdraw: "#F6D186",
    transfer: "#F6D186",
    close: "#E99497"
  }
}

export const COMMON_SPACING = {
  screenWidthOnDrawerClose: 500,
  navBarWidth: 225,
  navBarMargin: 230,
  hiddenAppBarMarginTop: 60,
  pageContent: {
    margin: {
      top: "0%",
      right: "2%",
      bottom: "2%",
      left: "2%"
    }
  },
  calendarDayInfo: {
    width: 375,
    height: 600
  },
  summaryInfoCard: {
    width: 375
  },
  filter: {
    width: 375
  },
  addForm: {
    width: 375
  },
  pieChart: {
    width: 375,
    height: 375
  },
  barChart: {
    width: "100%",
    height: 400
  },
  lineChart: {
    width: "100%",
    height: 400
  },
  table: {
    width: "100%",
    height: 400
  },
  filterTable: {
    height: 650
  },
  tablePaper: {
    height: 500
  },
  bankingActions: {
    width: 300
  },
  financeItemInfo: {
    width: 300
  }
}