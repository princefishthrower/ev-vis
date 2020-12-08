import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Tesseract from "tesseract.js";

export interface ITitleProps {}

const months: Array<string> = [];
months[0] = "January";
months[1] = "February";
months[2] = "March";
months[3] = "April";
months[4] = "May";
months[5] = "June";
months[6] = "July";
months[7] = "August";
months[8] = "September";
months[9] = "October";
months[10] = "November";
months[11] = "December";

export function Title(props: ITitleProps) {
  const [ppm, setPPM] = useState<string>("");

  const fetchText = async () => {
    const response = await Tesseract.recognize("images/ppm-0400.png", "eng");
    setPPM(response.data.words[1].text.replace("L", "").replace("-", "."));
  };

  useEffect(() => {
    fetchText();
  });

  const year = new Date().getFullYear();
  const month = months[new Date().getMonth()];

  return (
    <div className="text-center">
      <h1>Electric Vehicle Tracker</h1>
      <p>
        It's {month} {year}.
      </p>
      <p>
        The current average CO2 PPM on planet earth is{" "}
        {ppm === "" ? "loading..." : ppm}.
      </p>
      <p>
        These are the planet's automobile manufacturers, and the progress of
        their migration to full EV fleets.
      </p>
    </div>
  );
}
