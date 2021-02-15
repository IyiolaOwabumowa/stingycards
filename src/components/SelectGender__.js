import React, { useEffect, useState } from "react";
import { Grid, Segment, Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import MetaTags from "react-meta-tags";

function SelectGender() {
  const history = useHistory();
  const [selected, setSelected] = useState(null);
  const [width, setWidth] = useState(window.innerWidth);
  const [device, setDevice] = useState(null);
  const breakpoint = 480;

  useEffect(() => {
    const handleWindowResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", () => handleWindowResize);

    if (width <= breakpoint) {
      setDevice("mobile");
    } else {
      setDevice("desktop");
    }

    return () => window.removeEventListener("resize", handleWindowResize);
  }, [width]);

  return (
    //     <meta name="twitter:card" content="summary_large_image">
    // <meta name="twitter:site" content="iyiol_a">
    // <meta name="twitter:title" content="I have a Stingy Card">
    // <meta name="twitter:description" content="I got a stingy man association card in 10 seconds, hop on the trend and generate your card here https://zanny.ng !!">
    // <meta name="twitter:image" content="http://161.35.141.162/media/files/images/49a3874c-7353-464a-95e5-2d9c553c0ad7.JPG">

    <>
      <MetaTags>
        <title>Stingy Cards</title>
        <meta
          name="description"
          content="It's just fun for us honestly, lol."
        />
        <meta property="og:title" content="Stingy Cards" />
      </MetaTags>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="male-block"
        >
          <p style={{ fontFamily: "Axiforma", fontSize: 50, color: "white" }}>
            Male
          </p>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          className="female-block"
        >
          <p style={{ fontFamily: "Axiforma", fontSize: 50, color: "white" }}>
            Female
          </p>
        </div>
      </div>
    </>
  );
}

export default SelectGender;
