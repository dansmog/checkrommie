import { Link } from "react-router-dom";
import { Footer, Navigation } from "../LandingPage";
import "./styles.css";

const Terms = () => {
  return (
    <section className="marketing-wrapper">
      <Navigation />
      <section className="marketing d-flex align-items-center justify-content-center">
        <h1>Terms of Service</h1>
      </section>
      <section className="content">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 mb-5">
              <h1 className="title">Introduction</h1>
              <p className="body">
                Checkrommie Digital Limited (herein referred to as Checkrommie,
                “us”, “we” or “our”) operates this website (“the Service”).
              </p>
              <p className="body">
                We strive to maintain the highest standards of integrity in all
                our operations and are dedicated to protecting our customers’
                and online visitors’ privacy on our service. This page informs
                you of our policies regarding collecting, using, and disclosing
                personal data when you use our Service and the choices you have
                associated with that data.
              </p>
              <p className="body">
                We use your data to provide and improve the Service. Unless
                otherwise defined in this Privacy Policy, terms used in this
                Privacy Policy have the same meanings as our{" "}
                <Link to="/terms">Terms of Use</Link>. We are committed to
                protecting your Personal Data while You use this Application.
              </p>
            </div>
            <div className="col-sm-12 mb-5">
              <h1 className="title">Information Collection and Usage</h1>
              <p className="body">
                Checkrommie Digital Limited (herein referred to as Checkrommie,
                “us”, “we” or “our”) operates this website (“the Service”).
              </p>
              <p className="body">
                We strive to maintain the highest standards of integrity in all
                our operations and are dedicated to protecting our customers’
                and online visitors’ privacy on our service. This page informs
                you of our policies regarding collecting, using, and disclosing
                personal data when you use our Service and the choices you have
                associated with that data.
              </p>
              <p className="body">
                We use your data to provide and improve the Service. Unless
                otherwise defined in this Privacy Policy, terms used in this
                Privacy Policy have the same meanings as our{" "}
                <Link to="/terms">Terms of Use</Link>. We are committed to
                protecting your Personal Data while You use this Application.
              </p>
            </div>
            <div className="col-sm-12">
              <h1 className="title">Types of Data Collection</h1>
              <p className="body">
                Checkrommie Digital Limited (herein referred to as Checkrommie,
                “us”, “we” or “our”) operates this website (“the Service”).
              </p>
              <p className="body">
                We strive to maintain the highest standards of integrity in all
                our operations and are dedicated to protecting our customers’
                and online visitors’ privacy on our service. This page informs
                you of our policies regarding collecting, using, and disclosing
                personal data when you use our Service and the choices you have
                associated with that data.
              </p>
              <p className="body">
                We use your data to provide and improve the Service. Unless
                otherwise defined in this Privacy Policy, terms used in this
                Privacy Policy have the same meanings as our{" "}
                <Link to="/terms">Terms of Use</Link>. We are committed to
                protecting your Personal Data while You use this Application.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </section>
  );
};

export default Terms;
