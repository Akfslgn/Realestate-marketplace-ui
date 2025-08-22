import yollLogo from '/yollo-logo.svg';
import './Logo.css';

function Logo() {
  return (
    <div className="d-flex justify-content-center">
      <div style={{ width: '30rem' }} className="text-center">
        <img src={yollLogo} className="w-50 pulse" alt="React logo" />
      </div>
    </div>
  );
}

export default Logo;
