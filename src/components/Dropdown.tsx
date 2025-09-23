import React from "react";

export default function DropdownMenu() {
  return (
    <div className="relative inline-block">
      {/* Botón que dispara el dropdown */}
      <button
        className="btn"
        popover-target="popover-1"
        style={{ position: "relative" } as React.CSSProperties} // React-friendly
      >
        Menu
      </button>

      {/* Dropdown */}
      <ul
        className="dropdown menu w-52 rounded-box bg-base-100 shadow-sm mt-2 absolute"
        popover="auto"
        id="popover-1"
        style={{ top: "100%", left: 0 } as React.CSSProperties} // Posicionamiento debajo del botón
      >
        <li>
          <a href="#">Item 1</a>
        </li>
        <li>
          <a href="#">Item 2</a>
        </li>
        <li>
          <a href="#">Item 3</a>
        </li>
      </ul>
    </div>
  );
}
