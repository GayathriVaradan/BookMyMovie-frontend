import React, { useContext, useState } from "react";
import { useNavigate } from "@reach/router";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
import { useTranslation } from "react-i18next";
import AppContext from "../../store/context";
import "./index.css";

function Payment() {
  const { t } = useTranslation();
  const [paymentStatus, setPaymentStatus] = useState("not paid");
  const { state, dispatch } = useContext(AppContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [firstNameValidation, setFirstNameValidation] = useState(false);
  const [lastNameValidation, setLastNameValidation] = useState(false);
  const [emailValidation, setEmailValidation] = useState(false);
  const [allOk, setAllOk] = useState(false);
  const {
    dataForBackend,
    selectedMovie,
    selectedTheater,
    selectedShow,
    selectedSeats,
    numberOfTickets,
    seatsUnavailableDetails,
  } = state;
  const price = 10000 * numberOfTickets;

  const navigate = useNavigate();
  const makePayment = async (token) => {
    try {
      const response = await axios.post("http://localhost:5050/payment", {
        token,
        price,
        selectedMovie,
      });
      setPaymentStatus(response.data.status);
      if (response.data.status === "success") {
        setTimeout(() => {
          dispatch({
            type: "setPaymentStatus",
            data: response.data.status,
          });
          dispatch({
            type: "setPricePaid",
            data: response.data.charge.amount / 10000,
          });
          navigate("./email");
        }, 2000);
      } else {
        navigate("./paymentFail");
      }
    } catch (error) {
      navigate("./paymentFail");
    }
  };
  const validateForm = () => {
    if (!firstName) {
      setFirstNameValidation(true);
    }
    if (!lastName) {
      setLastNameValidation(true);
    }
    if (!emailId) {
      setEmailValidation(true);
    }
    if (firstNameValidation && lastNameValidation && emailValidation) {
      setAllOk(true);
    }
    return allOk;
  };

  return (
    <div>
      <>
        <form
          className="contact-form"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <table className="emailtable">
            <tbody>
              <tr>
                <th>{t("First Name")}</th>
                <td>
                  <input
                    name="first"
                    type="text"
                    className="emailFormInputs"
                    placeholder="First Name"
                    onChange={(e) => {
                      setFirstName(e.target.value);
                      dispatch({ type: "setFirstName", data: e.target.value });
                    }}
                  />
                </td>
              </tr>
              <tr>
                {firstNameValidation && (
                  <label htmlFor="firstName" className="validation">
                    {t("Please enter a first name.")}
                  </label>
                )}
              </tr>
              <tr>
                <th>{t("Last Name")}</th>
                <td>
                  <input
                    name="last"
                    type="text"
                    className="emailFormInputs"
                    placeholder="Last Name"
                    onChange={(e) => {
                      setLastName(e.target.value);
                      dispatch({ type: "setLastName", data: e.target.value });
                    }}
                  />
                </td>
              </tr>
              <tr>
                {lastNameValidation && (
                  <label htmlFor="lastName" className="validation">
                    {t("Please enter a last name.")}
                  </label>
                )}
              </tr>
              <tr>
                <th>{t("Email")}</th>
                <td>
                  <input
                    name="user_email"
                    type="text"
                    className="emailFormInputs"
                    placeholder="Email"
                    onChange={(e) => {
                      setEmailId(e.target.value);
                      dispatch({ type: "setEmail", data: e.target.value });
                    }}
                  />
                </td>
              </tr>
              <tr>
                {emailValidation && (
                  <label htmlFor="emailId" className="validation">
                    {t("Please enter an email Id.")}
                  </label>
                )}
              </tr>
            </tbody>
          </table>

          <StripeCheckout
            stripeKey="pk_test_51HmbeNKaGaw448OOF6cpgckz29IJwEZoZRVZTsaD97tC1quYXeML6dd3auAjpO4wWEg1VDLlpiU3CxKSM2vjiM5z00Vuf0aY6t"
            token={makePayment}
            name="Book the Movie"
            amount={price}
            disable={validateForm}
          >
            <button
              className="commonButton"
              type="submit"
              value="Send"
              disable={allOk}
              onClick={() => {
                selectedSeats.forEach((selectedSeat) => {
                  seatsUnavailableDetails.seatsUnavailable.push(selectedSeat);
                });

                dispatch({
                  type: "setSeatsUnavailableDetails",
                  data: seatsUnavailableDetails,
                });
                if (dataForBackend._id) {
                  axios.patch(
                    `http://localhost:5050/api/v1/seatsUnavailable/theater_id/${dataForBackend._id}/theaterName/${selectedTheater.theaterName}/show/${selectedShow.show}`,
                    seatsUnavailableDetails.seatsUnavailable
                  );
                }
              }}
            >
              {t("Pay with Stripe")}
            </button>
          </StripeCheckout>
          <div>
            {t("Payment status")} :
            <textarea
              id="paymentStatus"
              name="paymentStatus"
              value={paymentStatus}
            />
          </div>
        </form>
      </>
    </div>
  );
}
export default Payment;
