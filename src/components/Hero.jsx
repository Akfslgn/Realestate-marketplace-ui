import './Hero.css';

function Hero() {
  return (
    <div className="jumbotron jumbotron-fluid hero d-flex align-items-end">
      <div className="container">
        <h1 className="display-4 fw-bolder text-light text-shadow-custom">Your. Dream. Home.</h1>
        <p className="lead text-shadow-custom text-light">
          This is a modified jumbotron that occupies the entire horizontal space
          of its parent.
        </p>
      </div>
    </div>
  );
}

export default Hero;
