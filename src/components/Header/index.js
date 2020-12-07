import React from "react";
import { useTranslation } from "react-i18next";
import "./index.css";

export default function Header() {
  const { t } = useTranslation();
  const { i18n } = useTranslation();

  return (
    <div className="headerContent">
      <div className="movieTitle">
        <h1>Book My Movie</h1>
      </div>
      <div className="languages">
        {t("Select Language:")}
        <button
          className="commonButton"
          type="button"
          value="tl"
          onClick={() => {
            i18n.changeLanguage("tl");
          }}
        >
          Tamil
        </button>
        <button
          className="commonButton"
          type="button"
          value="sv"
          onClick={() => {
            i18n.changeLanguage("sv");
          }}
        >
          Swedish
        </button>
      </div>
    </div>
  );
}
