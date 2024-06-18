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
    website: "tahmidsajin.com",
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
        header: "tahmidsajin.com",
        url: "http://tahmidsajin.com/"
      },
      {
        header: "GitHub",
        url: "https://github.com/tahmid-saj"
      },
      {
        header: "Medium",
        url: "http://tahmidsajin.com/"
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
        header: "tahmidsajin.com",
        url: "http://tahmidsajin.com/"
      },
      {
        header: "GitHub",
        url: "https://github.com/tahmid-saj"
      },
      {
        header: "Medium",
        url: "http://tahmidsajin.com/"
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
  background: "#27374D"
}