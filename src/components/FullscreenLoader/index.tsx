import Spinner from "../../assets/images/spinner"

import "./fullscreenloader.styles.css";

const FullScreenLoader = () => {
  return (
    <section className="fullscreen__loader">
      <Spinner />
      <h1>Please wait!!</h1>
    </section>
  )
}

export default FullScreenLoader;