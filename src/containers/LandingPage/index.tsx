import "./landingpage.styles.css";
import HeroImage from "../../assets/images/hero-photo.png";
import { Link, NavLink } from "react-router-dom";
import Wallet from "../../assets/images/wallet";
import People from "../../assets/images/peope";
import User from "../../assets/images/user";
import Star from "../../assets/images/star";
import SplitPayment from "../../assets/images/split-payment";
import Search from "../../assets/images/search";
import FooterImage from "../../assets/images/footerImage.png";

const LandingPage = () => {
  return (
    <section>
      <Masthead />
      <Features />
      <Benefits />
      <Footer />
    </section>
  );
};

export default LandingPage;

const Navigation = () => {
  return (
    <section className="navigation">
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="navigation__wrapper d-flex justify-content-between">
              <div className="navigation__left">
                <NavLink to="/explore">Explore</NavLink>
                <NavLink to="/landlords">For landlords</NavLink>{" "}
                <NavLink to="/agents">For agents</NavLink>
              </div>
              <div className="navigation__right">
                <Link to="/login">Log in</Link>
                <button>Get started</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Masthead = () => (
  <section className="masthead">
    <Navigation />
    <div className="container">
      <div className="row">
        <div className="col-sm-6">
          <h1>
            Share your brilliant ideas and moments, with your new{" "}
            <span>flatmate</span>
          </h1>
          <p>
            With checkroomie, you can now find flatmates and roommates that you
            can call family, we make it easier to find your new roommates and
            flatmates
          </p>
          <div className="action--btn">
            <button>Search for a flatmate</button>
            <span>Trust by 12,455 people</span>
          </div>
        </div>
        <div className="col-sm-6">
          <img src={HeroImage} alt="" className="hero--image" />
        </div>
      </div>
    </div>
  </section>
);

const Features = () => {
  return (
    <section className="features">
      <div className="container">
        <div className="row">
          <div className="w-50 m-auto align-self-center text-center">
            <span className="tags">How it works</span>
            <h1>
              We understand how important it is to have someone to share with
            </h1>
            <p>See how we make finding this person a smoothless experience</p>
          </div>
        </div>
        <div className="features__list">
          <div className="row">
            <div className="col-12 col-sm-4 col-md-6 col-lg-4">
              <div className="feature__card">
                <User />
                <h6>Create an account</h6>
                <p>
                  You don’t just find roommates or flatmates, you get to enjoy
                  so much benefits using checkroommie
                </p>
              </div>
            </div>
            <div className="col-12 col-sm-4 col-md-6 col-lg-4">
              <div className="feature__card">
                <Wallet />
                <h6>Fill up your profile and flatmate qualities</h6>
                <p>
                  Save for your rents, save for house maintenance, save for
                  foods etc, you can save for anything you need in the house
                </p>
              </div>
            </div>
            <div className="col-12 col-sm-4 col-md-6 col-lg-4">
              <div className="feature__card">
                <People />
                <h6>Get flatmates results</h6>
                <p>
                  You and your flatmates can now easily split your rents without
                  no fuss, and issues of delayed payemtns
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Benefits = () => {
  return (
    <section className="benefits">
      <div className="container">
        <div className="row">
          <div className="w-50 m-auto align-self-center text-center">
            <Star />
            <h1>What you get using checkroommie</h1>
            <p>You don't just find roommates or flatmates</p>
          </div>
        </div>
        <div className="benefits__list">
          <div className="row">
            <div className="col-12 col-sm-4 col-md-6 col-lg-4">
              <div className="benefit__card">
                <Search />
                <h6>Fast and efficient search</h6>
                <p>
                  You don’t just find roommates or flatmates, you get to enjoy
                  so much benefits using checkroommie
                </p>
              </div>
            </div>
            <div className="col-12 col-sm-4 col-md-6 col-lg-4">
              <div className="benefit__card">
                <Wallet />
                <h6>Group rent savings</h6>
                <p>
                  Save for your rents, save for house maintenance, save for
                  foods etc, you can save for anything you need in the house
                </p>
              </div>
            </div>
            <div className="col-12 col-sm-4 col-md-6 col-lg-4">
              <div className="benefit__card">
                <SplitPayment />
                <h6>Split rent payments</h6>
                <p>
                  You and your flatmates can now easily split your rents without
                  no fuss, and issues of delayed payemtns
                </p>
              </div>
            </div>

            <div className="col-12 col-sm-4 col-md-6 col-lg-4">
              <div className="benefit__card">
                <Search />
                <h6>Fast and efficient search</h6>
                <p>
                  You don’t just find roommates or flatmates, you get to enjoy
                  so much benefits using checkroommie
                </p>
              </div>
            </div>
            <div className="col-12 col-sm-4 col-md-6 col-lg-4">
              <div className="benefit__card">
                <Wallet />
                <h6>Group rent savings</h6>
                <p>
                  Save for your rents, save for house maintenance, save for
                  foods etc, you can save for anything you need in the house
                </p>
              </div>
            </div>
            <div className="col-12 col-sm-4 col-md-6 col-lg-4">
              <div className="benefit__card">
                <SplitPayment />
                <h6>Split rent payments</h6>
                <p>
                  You and your flatmates can now easily split your rents without
                  no fuss, and issues of delayed payemtns
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
            <h1>Find your new roommates and flatmates today!</h1>
            <p>
              With checkroomie, you can now find flatmates and roommates that
              you can call family, we make it easier to find your new roommates
              and flatmates
            </p>
            <Link to="/explore" className="footerBtn">
              Get started
            </Link>
          </div>
        </div>
      </div>
      <div className="container copyright">
        <div className="row">
          <div className="w-50 m-auto text-center">
            <p>CheckRoommie | &copy; copyright 2022 all rights reserved</p>
            <div className="copyright__footerLinks">
              <Link to="/about">About us</Link>
              <Link to="/contact">Contact us</Link>
              <Link to="/terms">Terms and Condition</Link>
              <Link to="/policy">Privacy policy</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="footer--image">
        <img src={FooterImage} alt="" />
      </div>
    </footer>
  );
};
