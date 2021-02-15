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

    <div
      className={selected === "female" ? "centerItemSwan" : "centerItemSman"}
    >
      <MetaTags>
        <title>Stingy Cards</title>
        <meta
          name="description"
          content="It's just fun for us honestly, lol."
        />
        <meta property="og:title" content="Stingy Cards" />
      </MetaTags>
      <Grid columns={1} padded="vertically">
        <Grid.Column>
          <p style={{ fontFamily: "Axiforma", fontSize: 30 }}>
            Select Your Gender
          </p>
        </Grid.Column>
      </Grid>

      {device === "mobile" ? (
        <>
          <Grid columns={1}>
            <Grid.Column>
              <div
                onClick={() => {
                  setSelected("male");
                }}
                className={
                  selected !== "male" ? "genderBoxMale" : "genderBoxMaleClicked"
                }
              >
                <p
                  style={{
                    fontFamily: "Axiforma",
                    color: selected !== "male" ? "black" : "white",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  MALE
                </p>
              </div>
            </Grid.Column>
          </Grid>
          <Grid columns={1}>
            <Grid.Column>
              <div
                className={
                  selected !== "female"
                    ? "genderBoxFemale"
                    : "genderBoxFemaleClicked"
                }
                onClick={() => {
                  setSelected("female");
                }}
              >
                <p
                  style={{
                    fontFamily: "Axiforma",
                    color: selected !== "female" ? "black" : "white",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  FEMALE
                </p>
              </div>
            </Grid.Column>
          </Grid>
        </>
      ) : (
        <Grid columns={2}>
          <Grid.Column>
            <div
              onClick={() => {
                setSelected("male");
              }}
              className={
                selected !== "male" ? "genderBoxMale" : "genderBoxMaleClicked"
              }
            >
              <p
                style={{
                  fontFamily: "Axiforma",
                  color: selected !== "male" ? "black" : "white",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                MALE
              </p>
            </div>
          </Grid.Column>
          <Grid.Column>
            <div
              className={
                selected !== "female"
                  ? "genderBoxFemale"
                  : "genderBoxFemaleClicked"
              }
              onClick={() => {
                setSelected("female");
              }}
            >
              <p
                style={{
                  fontFamily: "Axiforma",
                  color: selected !== "female" ? "black" : "white",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                FEMALE
              </p>
            </div>
          </Grid.Column>
        </Grid>
      )}
      <Grid columns={1} padded="vertically">
        <Grid.Column>
          <Button
            content="CONTINUE"
            primary
            onClick={() => {
              history.push({
                pathname: "/generate-card",
                state: {
                  detail: selected,
                  device: device,
                },
              });
            }}
            style={{
              backgroundColor: "black",
              width: device === "mobile" ? 300 : 460,
              height: 70,
              marginTop: 20,
            }}
          />
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default SelectGender;
