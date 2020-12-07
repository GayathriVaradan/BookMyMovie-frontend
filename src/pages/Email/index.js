import React, { useContext } from "react";
import { useNavigate } from "@reach/router";
import { useTranslation } from "react-i18next";
import emailjs from "emailjs-com";
import AppContext from "../../store/context";
import "./index.css";

function Email() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { state } = useContext(AppContext);
  // const { emailSent, setEmailSent } = useState("");
  // const { emailNotSent, setEmailNotSent } = useState("");

  const {
    selectedMovie,
    selectedDate,
    selectedTheater,
    selectedShow,
    selectedSeats,
    firstName,
    lastName,
    email,
    pricePaid,
  } = state;
  function sendEmail(e) {
    e.preventDefault();
    emailjs
      .sendForm(
        "service_qt99x78",
        "template_xr4xa7u",
        e.target,
        "user_xIIga5AoYEL3LO4DVYWiU"
      )
      .then(
        (result) => {
          navigate("./thankYou");
          console.log(result);
        },
        (error) => {
          console.log(error.text);
        }
      );
  }
  return (
    <div>
      <form className="contact-form" onSubmit={sendEmail}>
        <table className="emailtable">
          <tbody>
            <tr>
              <th>
                <label htmlFor="movieTitle">{t("Movie")} :</label>
              </th>
              <td>
                <textarea
                  id="movieTitle"
                  name="movieTitle"
                  value={selectedMovie.title}
                  readOnly
                />
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="selectedDate">{t("Date")} :</label>
              </th>
              <td>
                <textarea
                  id="selectedDate"
                  name="selectedDate"
                  value={selectedDate}
                  readOnly
                />
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="selectedTheater">{t("Theater")} :</label>
              </th>
              <td>
                <textarea
                  id="selectedTheater"
                  name="selectedTheater"
                  value={selectedTheater.theaterName}
                  readOnly
                />
              </td>
            </tr>
            <tr>
              <th>
                <label htmlFor="selectedShow">{t("Show")} : </label>
              </th>
              <td>
                <textarea
                  id="selectedShow"
                  name="selectedShow"
                  value={selectedShow.show}
                  readOnly
                />
              </td>
            </tr>

            <tr>
              <th>
                <label htmlFor="selectedSeats">{t("Selected seats")} :</label>
              </th>
              <td>
                <textarea
                  id="selectedSeats"
                  name="selectedSeats"
                  value={selectedSeats}
                  readOnly
                />
              </td>
            </tr>
            <tr>
              <th>{t("First Name")}</th>
              <td>
                <textarea
                  name="first"
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  readOnly
                />
                {/* <input name="first" type="text" placeholder="First Name" /> */}
              </td>
            </tr>
            <tr>
              <th>{t("Last Name")}</th>
              <td>
                <textarea
                  name="last"
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  readOnly
                />
                {/* <input name="last" type="text" placeholder="Last Name" /> */}
              </td>
            </tr>
            <tr>
              <th>{t("Email")}</th>
              <td>
                <textarea
                  name="user_email"
                  type="text"
                  placeholder="Email"
                  value={email}
                  readOnly
                />
                {/* <input name="user_email" type="text" placeholder="Email" /> */}
              </td>
            </tr>
            <tr>
              <th>Amount Paid</th>
              <td>
                <textarea
                  name="pricePaid"
                  type="text"
                  placeholder="pricePaid"
                  value={pricePaid}
                  readOnly
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button className="commonButton" type="submit">
          Send Email
        </button>
      </form>
      {/* {emailSent && (
        <div>
          {t("Email has been sent to")} {email}
        </div>
      )}
      {emailNotSent && (
        <div>
          {t("Email could not be sent to")} {email}
        </div>
      )} */}
      <button
        type="button"
        className="commonButton"
        onClick={() => {
          navigate("./");
        }}
      >
        Book My Movie
      </button>
    </div>
  );
}
export default Email;
