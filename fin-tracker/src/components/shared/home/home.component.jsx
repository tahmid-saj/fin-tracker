import "./home.styles.jsx";
import { HomeContainer } from "./home.styles.jsx";
import MediaCard from "../mui/media-card/media-card.component";
import { Fragment } from "react";

import { useContext } from "react";
import { UserContext } from "../../../contexts/shared/user/user.context";

import { NAV_LINKS } from "../../../utils/constants/shared.constants";

const cardStyles = {
  width: 450,
  height: 400,
}


const Home = () => {
  const { currentUser } = useContext(UserContext)
  
  const homeCardContent = {
    chatbot: {
      header: "Chatbot",
      description: "Provide your financial concerns and ask for suggestions from our chatbot",
      imageUrl: "https://fiverr-res.cloudinary.com/images/t_main1,q_auto,f_auto,q_auto,f_auto/gigs/334804806/original/793cad2ae511c4c9b30c1d5e8206b8eb8ab21087/create-a-ai-chat-bot-embedded-website-for-you.png",
      path: currentUser ? NAV_LINKS.paths.signedIn.chatbot : NAV_LINKS.paths.signedOut.chatbot
    },
    storage: {
      header: "Storage",
      description: "Upon signing up and logging into your account, we will store your data and provide specific advices for you",
      imageUrl: "https://media.istockphoto.com/id/1352564117/vector/database-sql-structured-query-language-people-team-discuss-coding-for-storing-data-in-server.jpg?s=612x612&w=0&k=20&c=eRlvikJYlY8tJ8pVxgZFUv5GLgQbTy_rq18jKLZxq8A=",
      path: currentUser ? NAV_LINKS.paths.signedIn.dashboard : NAV_LINKS.paths.signedOut.auth
    },
    market: {
      header: "Market",
      description: "Get current and historical market data on stocks, indices, crypto and foreign exchange",
      imageUrl: "https://static.vecteezy.com/system/resources/previews/014/563/665/original/investment-forecast-or-prediction-vision-to-see-investing-opportunity-future-profit-from-stock-and-crypto-trading-concept-flat-modern-illustration-vector.jpg",
      path: currentUser ? NAV_LINKS.paths.signedIn.marketData : NAV_LINKS.paths.signedOut.marketData
    },
    expenses: {
      header: "Expenses",
      description: "Track your everyday expenses to meet your financial goals and have a clear picture on spending",
      imageUrl: "https://happay.com/blog/wp-content/uploads/sites/12/2022/08/non-operating-expenses.png",
      path: currentUser ? NAV_LINKS.paths.signedIn.expenses : NAV_LINKS.paths.signedOut.expenses
    },
    banking: {
      header: "Banking",
      description: "Track your banking deposits, withdrawals, transfers and get insights on how to better manage accounts",
      imageUrl: "https://happay.com/blog/wp-content/uploads/sites/12/2022/09/baas-banking-as-a-service-.png",
      path: currentUser ? NAV_LINKS.paths.signedIn.banking : NAV_LINKS.paths.signedOut.banking
    },
    investment: {
      header: "Investment",
      description: "Track your investments and receive suggestions on possible investment opportunities or downfalls",
      imageUrl: "https://segurosypensionesparatodos.fundacionmapfre.org/media/inversion/como-es-mejor-invertir-1194x535-1.jpg",
      path: currentUser ? NAV_LINKS.paths.signedIn.investments : NAV_LINKS.paths.signedOut.investments
    },
    savings: {
      header: "Savings",
      description: "Estimate your saving goals, and manage savings from one place",
      imageUrl: "https://media.istockphoto.com/id/1297385692/vector/banker-taking-clients-money-for-saving.jpg?s=612x612&w=0&k=20&c=qRmb_2QDb-JfJio9PFZsOwf7pspUwdWWoG9teZ8k6CQ=",
      path: currentUser ? NAV_LINKS.paths.signedIn.savings : NAV_LINKS.paths.signedOut.savings
    },
    tools: {
      header: "Tools",
      description: "We also provide helpful financial tools to estimate savings goals, mortgage, insurance, foreign exchange and more",
      imageUrl: "https://www.winvesta.in/hubfs/Imported_Blog_Media/Foreign-Alternative-Assets.png",
      path: currentUser ? NAV_LINKS.paths.signedIn.usefulTools : NAV_LINKS.paths.signedOut.usefulTools
    }
  }

  return (
    <Fragment>
      <HomeContainer>
        <MediaCard styles={ cardStyles } header={ homeCardContent.chatbot.header } imageUrl={ homeCardContent.chatbot.imageUrl } 
          imageTitle={ homeCardContent.chatbot.header } path={ homeCardContent.chatbot.path } content={ homeCardContent.chatbot.description }></MediaCard>

        <MediaCard styles={ cardStyles } header={ homeCardContent.storage.header } imageUrl={ homeCardContent.storage.imageUrl } 
          imageTitle={ homeCardContent.storage.header } path={ homeCardContent.storage.path } content={ homeCardContent.storage.description }></MediaCard>
        
        <MediaCard styles={ cardStyles } header={ homeCardContent.market.header } imageUrl={ homeCardContent.market.imageUrl } 
          imageTitle={ homeCardContent.market.header } path={ homeCardContent.market.path } content={ homeCardContent.market.description }></MediaCard>
        
        <MediaCard styles={ cardStyles } header={ homeCardContent.expenses.header } imageUrl={ homeCardContent.expenses.imageUrl } 
          imageTitle={ homeCardContent.expenses.header } path={ homeCardContent.expenses.path } content={ homeCardContent.expenses.description }></MediaCard>
      </HomeContainer>

      <HomeContainer>
        <MediaCard styles={ cardStyles } header={ homeCardContent.banking.header } imageUrl={ homeCardContent.banking.imageUrl } 
          imageTitle={ homeCardContent.banking.header } path={ homeCardContent.banking.path } content={ homeCardContent.banking.description }></MediaCard>
        
        <MediaCard styles={ cardStyles } header={ homeCardContent.investment.header } imageUrl={ homeCardContent.investment.imageUrl } 
          imageTitle={ homeCardContent.investment.header } path={ homeCardContent.investment.path } content={ homeCardContent.investment.description }></MediaCard>
        
        <MediaCard styles={ cardStyles } header={ homeCardContent.savings.header } imageUrl={ homeCardContent.savings.imageUrl } 
          imageTitle={ homeCardContent.savings.header } path={ homeCardContent.savings.path } content={ homeCardContent.savings.description }></MediaCard>
        
        <MediaCard styles={ cardStyles } header={ homeCardContent.tools.header } imageUrl={ homeCardContent.tools.imageUrl } 
          imageTitle={ homeCardContent.tools.header } path={ homeCardContent.tools.path } content={ homeCardContent.tools.description }></MediaCard>
      </HomeContainer>
    </Fragment>
  );
};

export default Home;