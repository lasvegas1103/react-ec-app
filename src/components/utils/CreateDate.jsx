import React from "react";

const CreateDate = (date) => {
  let datetime =
    date.getFullYear() +
    "/" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "/" +
    ("0" + date.getDate()).slice(-2) +
    "/" +
    ("0" + date.getHours()).slice(-2) +
    ":" +
    ("0" + date.getMinutes()).slice(-2) +
    ":" +
    ("0" + date.getSeconds()).slice(-2);

  return datetime;
};

export default CreateDate;
