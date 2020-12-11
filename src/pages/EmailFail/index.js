import React, { useContext } from "react";
import { useNavigate } from "@reach/router";
import { useTranslation } from "react-i18next";
import AppContext from "../../store/context";

export default function EmailFail() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { state } = useContext(AppContext);
  const { email } = state;
  return (
    <div className="homepage">
      <h1>
        {t("Email could not be sent to")} {email}
      </h1>
      <br />
      <button
        className="commonButton"
        type="submit"
        onClick={() => {
          navigate("./landingPage");
        }}
      >
        {t("Browse the latest movies")}
      </button>
    </div>
  );
}
