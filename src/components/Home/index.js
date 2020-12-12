import React from "react";
import { useNavigate } from "@reach/router";
import "./index.css";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="homepage">
      <h1>{t("Hello! Welcome to Book My Movie.")}</h1>
      <div>
        {t(
          "A one stop location for all the latest movie in playing in Stockholm."
        )}
        <br />
        {t("Hope you have a wonderful time!!")}
      </div>
      <br />
      <button
        className="commonButton"
        type="submit"
        onClick={() => {
          navigate("./allMovies");
        }}
      >
        {t("Browse the latest movies")}
      </button>
    </div>
  );
}
