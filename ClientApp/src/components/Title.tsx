import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Tesseract from "tesseract.js";

export interface ITitleProps {}

export function Title(props: ITitleProps) {
  const [ppm, setPPM] = useState<string>("");

  const fetchText = async () => {
    const response = await Tesseract.recognize('https://localhost:5001/images/ppm-0030.png', "eng");
    console.log(response);
  }

  useEffect(() => {
    fetchText();
  });

  const year = new Date().getFullYear();
  return (
    <>
      <h1>It's {year}.</h1>
      <h2>
        The current average CO2 PPM on planet earth is{" "}
        {ppm === "" ? ppm : "loading..."}.
      </h2>
      <h3>
        These are the planet's automobile manufacturers, and the progress of
        their migration to full EV fleets.
      </h3>
    </>
  );
}
