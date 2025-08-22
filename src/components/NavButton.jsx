import { NavLink } from "react-router";
import "./NavButton.css";

function NavButton({ to, text, callback, icon }) {
  return (
    <li className="nav-item flex-fill">
      <NavLink
        to={to}
        className={({ isActive }) =>
          `nav-link text-center py-2 px-1 d-flex flex-column align-items-center ${
            isActive ? "active" : "not-active"
          }`
        }
      >
        <span
          onClick={callback}
          className="d-flex flex-column align-items-center"
        >
          {/* Desktop: Show text, Mobile: Show icon */}
          <span className="d-none d-lg-inline small fw-semibold">{text}</span>
          {/* Mobile: Show icon with small text below */}
          <span className="d-lg-none d-flex flex-column align-items-center">
            {icon && <span className="fs-5 mb-1">{icon}</span>}
            <span className="small" style={{ fontSize: "10px" }}>
              {text}
            </span>
          </span>
        </span>
      </NavLink>
    </li>
  );
}

export default NavButton;
