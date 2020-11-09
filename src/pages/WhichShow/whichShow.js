/* eslint-disable react/jsx-indent */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-one-expression-per-line */
import React from "react";
// import styled from "styled-components";
// import { useNavigate } from "@reach/router";
// import axios from "axios";
// import AppContext from "../../store/context";

// const Button = styled.button`
//   cursor: pointer;
//   background: transparent;
//   font-size: 16px;
//   border-radius: 3px;
//   color: palevioletred;
//   border: 2px solid palevioletred;
//   margin: 0 1em;
//   padding: 0.25em 1em;
//   transition: 0.5s all ease-out;

//   &:hover {
//     background-color: palevioletred;
//     color: white;
//   }
// `;
function WhichShow({ options }) {
  // const { state, dispatch } = useContext(AppContext);
  // const { selectedMovie, selectedTheater } = state;
  // const { theaters } = state;
  // const [count, setCount] = useState(0);
  // const [showDate, setShowDate] = useState(false);
  // const navigate = useNavigate();

  // const increment = () => {
  //   setCount(count + 1);
  // };

  // const decrement = () => {
  //   if (count === 0) {
  //     setCount(0);
  //   } else {
  //     setCount(count - 1);
  //   }
  // };
  return (
    <div>
      <div>
        <label>
          <h4>Choose a Date:&nbsp;</h4>
        </label>
        <select>
          <option>--select Date--</option>
          {options.dates.map((eachShow) => (
            <option value={eachShow.date} key={eachShow.date}>
              {eachShow.date}
            </option>
          ))}
        </select>
        <div>
          <p>Example of ordered lists:</p>
          <ol>
            {options.dates.map((eachShow) =>
              eachShow.shows.map((one) => <li>{one.show}</li>)
            )}
          </ol>
        </div>
        {/* <div>
          Number Of tickets :<Button onClick={decrement}> -</Button> {count}
          <Button onClick={increment}>+</Button>
        </div>
        <Button
          type="button"
          label="button"
          value={selectedMovie._id}
          onClick={() => {
            dispatch({ type: "setSelectedTheater", data: selectedTheater });
            // navigate("./whichShow");
          }}
        >
          Select Number Of Tickets
        </Button> */}
      </div>
    </div>
  );
}
export default WhichShow;
