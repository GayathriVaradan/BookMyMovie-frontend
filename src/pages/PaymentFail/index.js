import React from "react";
import { useNavigate } from "@reach/router";
import { useTranslation } from "react-i18next";

export default function PaymentFail() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="homepage">
      <h1>{t("Payment failed. Please try to book again.")}</h1>
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
