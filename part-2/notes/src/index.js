import React from "react";
import ReactDOM from "react-dom/client";
// import axios from "axios";
import App from "./App";
import "./index.css";

// axios.get("http://localhost:3001/notes").then((response) => {
//   const notes = response.data;
//   ReactDOM.createRoot(document.getElementById("root")).render(
//     <App notes={notes} />
//   );
// });

ReactDOM.createRoot(document.getElementById("root")).render(<App />);

// const promise2 = axios.get("http://localhost:3001/foobar");
// console.log(promise2);

// const notes = [
//   {
//     id: 1,
//     content: "HTML is easy",
//     date: "2019-05-30T17:30:31.098Z",
//     important: true,
//   },
//   {
//     id: 2,
//     content: "Browser can execute only JavaScript",
//     date: "2019-05-30T18:39:34.091Z",
//     important: false,
//   },
//   {
//     id: 3,
//     content: "GET and POST are the most important methods of HTTP protocol",
//     date: "2019-05-30T19:20:14.298Z",
//     important: true,
//   },
// ];

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <App notes={notes} />
// );
