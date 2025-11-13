const Navbar = ({ children }) => {
  return (
    <>
      {/* Desktop Navbar - Top */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white py-2 sticky-top shadow-sm d-none d-lg-flex">
        <div className="container">
          <a className="navbar-brand me-5" href="/">
            <span className="text-primary fw-bold fs-4">HomeHeaven</span>
          </a>

          <div className="navbar-collapse">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex justify-content-center align-items-center">
              {children}
            </ul>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar - Top (Logo only) */}
      <nav className="navbar navbar-light bg-white py-2 sticky-top shadow-sm d-lg-none">
        <div className="container">
          <a className="navbar-brand mx-auto" href="/">
            <span className="text-primary fw-bold fs-4">HomeHeaven</span>
          </a>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav
        className="navbar fixed-bottom bg-white border-top shadow-lg d-lg-none"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="container-fluid">
          <ul className="navbar-nav w-100 d-flex flex-row justify-content-around align-items-center">
            {children}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
