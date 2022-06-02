import React from "react";
import Moment from "moment";

export default function DateFormat({time}) {
  Moment.locale("en");
  return <span> {Moment(time).format("MM-DD-YYYY")} </span>;
}
