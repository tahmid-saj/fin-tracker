import SmartSlider from "react-smart-slider";

import "./home.styles.scss";

import AboutLinks from "./about-links/about-links.component";

const Caption = ({ caption }) => (
  <div style={{
    position: 'center',
    right: 200,
    top: 0,
    fontSize: 38,
    padding: 60,
    // border: 'solid `px',
    color: 'white',
    marginTop: '0px',
  }}>
    {caption}
  </div>
)

const slidesArray = [
      {
        url: "https://cdn.wallpapersafari.com/44/22/o06dUO.jpg",
        childrenElem: <Caption caption="Banking" />
      },
      {
        url: "https://img.freepik.com/free-vector/gradient-blue-background_23-2149337038.jpg",
        childrenElem: <Caption caption="Investments" />
      },
      {
        url: "https://img.freepik.com/premium-vector/gradient-blue-background_23-2149337033.jpg",
        childrenElem: <Caption caption="Savings" />
      },
    ];

const Home = () => {
  return (
    <div className="home-container">
      <SmartSlider slides={ slidesArray } autoSlide={ true } autoSlideInterval={ 7000 } opacity={ 0.5 }
        buttonShape={ "round" }
      />

      <AboutLinks></AboutLinks>
    </div>
  );
};

export default Home;