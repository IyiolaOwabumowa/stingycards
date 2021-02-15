import React, { useEffect, useState, useRef } from "react";
import { Button, Icon, Grid } from "semantic-ui-react";
import MetaTags from "react-meta-tags";

import { useHistory, useLocation } from "react-router-dom";
import {
  exportComponentAsJPEG,
  exportComponentAsPDF,
  exportComponentAsPNG,
} from "react-component-export-image";

import "../App.css";

function Card(props) {
  const [selected, setSelected] = useState(null);
  const [width, setWidth] = useState(window.innerWidth);
  const [device, setDevice] = useState(null);
  const [croppedImage, setCroppedImage] = useState(
    "http://stingycards.com/media/files/images/" + props.match.params.picture
  );
  
  const breakpoint = 480;
  const componentRef = useRef();
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  const id = props.match.params.id;
  const name = props.match.params.fullname;
  const position = props.match.params.position;
  const branch = props.match.params.branch;
  const motto = props.match.params.motto;
  const gender = props.match.params.gender;
  const image =
    "http://stingycards.com/media/files/images/" + props.match.params.picture;
  // http://161.35.141.162/card?id=9939&position=tititi&branch=ikeja&name=838388&motto=idj3i3&image=https://ndjjjbjbjrbjbj

  useEffect(() => {
    // {id}/:${fullname}/:${position}/:${branch}/:${motto}/:${gender}/:${picture}`

    const handleWindowResize = () => setWidth(window.innerWidth);

    window.addEventListener("resize", () => {
      handleWindowResize();
    });

    if (width <= breakpoint) {
      setDevice("mobile");
    } else {
      setDevice("desktop");
    }

    return () => window.removeEventListener("resize", handleWindowResize);
  }, [width]);
  return (
    <div className={gender === "female" ? "cardTempFemale" : "cardTempMale"}>
      <MetaTags>
        <title>Card</title>
        {/* <meta name="description" content="Some description." />
            <meta property="og:title" content="MyApp" />
            <meta property="og:image" content="path/to/image.jpg" /> */}
      </MetaTags>
      <p
        style={{
          marginLeft: "75%",
          marginTop: "4.8%",
          marginBottom: "-8.1%",

          fontSize: 30,
        }}
      >
        Generate yours for free <br /> at <strong> stingycards.com</strong>
      </p>

      {gender === "male" ? (
        <p
          style={{
            marginLeft: "43%",
            marginTop: "12.8%",
            letterSpacing: 2.5,
            fontSize: 45,
            fontWeight: "bold",
            fontStyle: "italic",
          }}
        >
          {motto}
        </p>
      ) : (
        <p
          style={{
            marginLeft: "43%",
            marginTop: "12.5%",
            marginBottom: 50,
            letterSpacing: 2.5,
            fontSize: 45,
            fontWeight: "bold",
            fontStyle: "italic",
          }}
        >
          {motto}
        </p>
      )}

      <p
        style={{
          marginLeft: "42%",
          marginTop: "4.6%",
          letterSpacing: 2.5,
          fontSize: 48,
          fontWeight: "700",
        }}
      >
        {name}
      </p>

      <p
        style={{
          marginLeft: "46%",
          marginTop: "-1.7%",
          letterSpacing: 2.5,
          fontSize: 48,
          fontWeight: "700",
        }}
      >
        {position}
      </p>

      <p
        style={{
          marginLeft: "45%",
          marginTop: "-1.7%",
          letterSpacing: 2.5,
          fontSize: 48,
          fontWeight: "700",
        }}
      >
        {branch}
      </p>

      <p
        style={{
          marginLeft: "41%",
          marginTop: "-1.6%",
          letterSpacing: 2.5,
          fontSize: 48,
          fontWeight: "700",
        }}
      >
        {id}
      </p>
      <div style={{ marginLeft: "75%", marginTop: "-25%" }}>
        <img src={`${image}`} alt="kk" width="300" />
       
      </div>
      {/* <button onClick={() => exportComponentAsPNG(componentRef)}>
        Export As PNG
      </button> */}
    </div>
  );
}

export default Card;
