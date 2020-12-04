import React from "react";
import { useTranslation } from "react-i18next";
import "./Header.css";

export default function Header() {
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  return (
    <div className="headerContent">
      <h1>Book My Movie.</h1>
      <div>
        {t("Select Language:")}
        <button
          className="language-btn"
          type="button"
          value="tl"
          onClick={() => {
            i18n.changeLanguage("tl");
          }}
        >
          Tamil
          {/* <img src="india.png" alt="Hindi" /> */}
        </button>
        <button
          className="language-btn"
          type="button"
          value="sv"
          onClick={() => {
            i18n.changeLanguage("sv");
          }}
        >
          Swedish
          {/* <img src="sweden.png" alt="Swedish" /> */}
        </button>
      </div>
    </div>
  );
}
