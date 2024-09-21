import "./home.styles.jsx";
import { HomeContainer } from "./home.styles.jsx";
import MediaCard from "../../../components/shared/mui/media-card/media-card.component.jsx"
import { Fragment } from "react";

import { useContext } from "react";
// import { UserContext } from "../../../contexts/shared/user/user.context";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../../store/shared/user/user.selector.js";

import { COLOR_CODES, NAV_LINKS } from "../../../utils/constants/shared.constants.js";

const cardStyles = {
  width: 360,
  height: 450,
  backgroundColor: COLOR_CODES.general["1"],
  marginBottom: "6%"
}

const Home = () => {
  // const { currentUser } = useContext(UserContext)
  const currentUser = useSelector(selectCurrentUser)
  
  const homeCardContent = {
    chatbot: {
      header: "Chatbot",
      description: "Provide your financial concerns and ask for suggestions from our chatbot",
      imageUrl: "https://media.licdn.com/dms/image/D4D12AQESxyAG3GNCQQ/article-cover_image-shrink_720_1280/0/1688674501094?e=2147483647&v=beta&t=TbnHoFrlrAZCHk6Qfm6lfBD9qNSgJ0IyOFdKa32mBWE",
      path: currentUser ? NAV_LINKS.paths.signedIn.chatbot : NAV_LINKS.paths.signedOut.chatbot
    },
    storage: {
      header: "Storage",
      description: "Upon signing up and logging into your account, we will store your data and provide specific advices for you",
      imageUrl: "https://media.istockphoto.com/id/1470864494/vector/computer-cloud-database-sharing-file-storage-and-search-business-technology-services-and.jpg?b=1&s=612x612&w=0&k=20&c=F4P8bKXbSsoZpCF4JahdPLz4OV7imHxMvgfDew4y9J8=",
      path: currentUser ? NAV_LINKS.paths.signedIn.dashboard : NAV_LINKS.paths.signedOut.auth
    },
    market: {
      header: "Market",
      description: "Get current and historical market data on stocks, indices, crypto and foreign exchange",
      imageUrl: "https://researchinandout.com/wp-content/uploads/2022/07/q1nta_3000_6242261-2-1024x683.jpg",
      path: currentUser ? NAV_LINKS.paths.signedIn.marketData : NAV_LINKS.paths.signedOut.marketData
    },
    expenses: {
      header: "Expenses",
      description: "Track your everyday expenses to meet your financial goals and have a clear picture on spending",
      imageUrl: "https://img.freepik.com/free-vector/hand-drawn-credit-assessment-concept_23-2149167956.jpg",
      path: currentUser ? NAV_LINKS.paths.signedIn.expenses : NAV_LINKS.paths.signedOut.expenses
    },
    banking: {
      header: "Banking",
      description: "Track your banking deposits, withdrawals, transfers and get insights on how to better manage accounts",
      imageUrl: "https://finflux.co/blog/wp-content/uploads/2023/06/282ed4b32c73225e1bded4921c035021.png",
      path: currentUser ? NAV_LINKS.paths.signedIn.banking : NAV_LINKS.paths.signedOut.banking
    },
    investment: {
      header: "Investment",
      description: "Track your investments and receive suggestions on possible investment opportunities or downfalls",
      imageUrl: "https://static.vecteezy.com/system/resources/previews/013/134/694/non_2x/business-man-investing-investment-on-index-stock-growing-wealth-with-compound-interest-earning-or-profit-concept-success-man-investor-ride-the-upright-index-graph-make-money-coins-grow-up-goal-vector.jpg",
      path: currentUser ? NAV_LINKS.paths.signedIn.investments : NAV_LINKS.paths.signedOut.investments
    },
    savings: {
      header: "Savings",
      description: "Estimate your saving goals, and manage savings from one place",
      imageUrl: "https://www.investmentexecutive.com/wp-content/uploads/sites/3/2019/02/savings-800x600_Piggy-bank-money-flat-icon-illustration_26012543.jpg",
      path: currentUser ? NAV_LINKS.paths.signedIn.savings : NAV_LINKS.paths.signedOut.savings
    },
    insurance: {
      header: "Insurance",
      description: "Keep track of all your insurance payments over different time periods in one place",
      imageUrl: "https://media.istockphoto.com/id/1226668909/vector/dental-insurance-vector-illustration-health-insurance-healthcare-claim-form-coverage-medical.jpg?s=612x612&w=0&k=20&c=HlFtvu6SKQX-b_uhtqi0oGTy9Ol8UzzwRuDifyFJkNU=",
      path: currentUser ? NAV_LINKS.paths.signedIn.insurance : NAV_LINKS.paths.signedOut.insurance
    },
    tools: {
      header: "Tools",
      description: "We also provide helpful financial tools to estimate savings goals, mortgage, insurance, foreign exchange and more",
      imageUrl: "https://www.winvesta.in/hubfs/Imported_Blog_Media/Foreign-Alternative-Assets.png",
      path: currentUser ? NAV_LINKS.paths.signedIn.usefulTools : NAV_LINKS.paths.signedOut.usefulTools
    }
  }

  return (
    <div className="container">
      <HomeContainer>
        <div className="row justify-content-center align-items-center">
          <div className="col-sm-12 col-md-6 col-lg-4">
            <MediaCard styles={ cardStyles } header={ homeCardContent.chatbot.header } imageUrl={ homeCardContent.chatbot.imageUrl } 
            imageTitle={ homeCardContent.chatbot.header } path={ homeCardContent.chatbot.path } content={ homeCardContent.chatbot.description }></MediaCard>
          </div>

          <div className="col-sm-12 col-md-6 col-lg-4">
            <MediaCard styles={ cardStyles } header={ homeCardContent.storage.header } imageUrl={ homeCardContent.storage.imageUrl } 
            imageTitle={ homeCardContent.storage.header } path={ homeCardContent.storage.path } content={ homeCardContent.storage.description }></MediaCard>
          </div>

          <div className="col-sm-12 col-md-6 col-lg-4">
            <MediaCard styles={ cardStyles } header={ homeCardContent.market.header } imageUrl={ homeCardContent.market.imageUrl } 
            imageTitle={ homeCardContent.market.header } path={ homeCardContent.market.path } content={ homeCardContent.market.description }></MediaCard>
          </div>

          <div className="col-sm-12 col-md-6 col-lg-4">
            <MediaCard styles={ cardStyles } header={ homeCardContent.expenses.header } imageUrl={ homeCardContent.expenses.imageUrl } 
            imageTitle={ homeCardContent.expenses.header } path={ homeCardContent.expenses.path } content={ homeCardContent.expenses.description }></MediaCard>
          </div>

          <div className="col-sm-12 col-md-6 col-lg-4">
            <MediaCard styles={ cardStyles } header={ homeCardContent.banking.header } imageUrl={ homeCardContent.banking.imageUrl } 
            imageTitle={ homeCardContent.banking.header } path={ homeCardContent.banking.path } content={ homeCardContent.banking.description }></MediaCard>
          </div>

          <div className="col-sm-12 col-md-6 col-lg-4">
            <MediaCard styles={ cardStyles } header={ homeCardContent.investment.header } imageUrl={ homeCardContent.investment.imageUrl } 
            imageTitle={ homeCardContent.investment.header } path={ homeCardContent.investment.path } content={ homeCardContent.investment.description }></MediaCard>  
          </div>

          <div className="col-sm-12 col-md-6 col-lg-4">
            <MediaCard styles={ cardStyles } header={ homeCardContent.savings.header } imageUrl={ homeCardContent.savings.imageUrl } 
            imageTitle={ homeCardContent.savings.header } path={ homeCardContent.savings.path } content={ homeCardContent.savings.description }></MediaCard>
          </div>

          <div className="col-sm-12 col-md-6 col-lg-4">
            <MediaCard styles={ cardStyles } header={ homeCardContent.insurance.header } imageUrl={ homeCardContent.insurance.imageUrl } 
            imageTitle={ homeCardContent.insurance.header } path={ homeCardContent.insurance.path } content={ homeCardContent.insurance.description }></MediaCard>
          </div>

          <div className="col-sm-12 col-md-6 col-lg-4">
            <MediaCard styles={ cardStyles } header={ homeCardContent.tools.header } imageUrl={ homeCardContent.tools.imageUrl } 
            imageTitle={ homeCardContent.tools.header } path={ homeCardContent.tools.path } content={ homeCardContent.tools.description }></MediaCard>
          </div>
        </div>      
      </HomeContainer>
    </div>
  );
};

export default Home;