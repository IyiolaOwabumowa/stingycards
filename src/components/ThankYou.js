import React, { useEffect, useState } from "react";
import { Button, Icon, Grid } from "semantic-ui-react";
import { useLocation, useHistory, Redirect } from "react-router-dom";
import MetaTags from "react-meta-tags";
import axios from "axios";
import constants from "./constants";

function ThankYou() {
  const location = useLocation();
  const history = useHistory();
  const [buttonLoader, setButtonLoader] = useState(false);
  const [showCantDownload, setShowCantDownload] = useState(false);
  const [image, setImage] = useState(null);
  var fileDownload = require("js-file-download");

  useEffect(() => {}, [location]);

  const downloadCard = () => {
    setButtonLoader(true);
    const fullname = location.state && location.state.card_details.fullname;
    const position = location.state && location.state.card_details.position;
    const branch = location.state && location.state.card_details.branch;
    const motto = location.state && location.state.card_details.motto;
    const picture =
      location.state &&
      location.state.card_details.display_picture.replace(
        "http://stingycards.com/media/files/images/",
        ""
      );

    const id = location.state && location.state.card_details.sman_id;
    const gender = location.state && location.state.bg;
    // console.log(
    //   `http://stingycards.com/card/${id}/${fullname}/${position}/${branch}/${motto}/${gender}/${picture}`
    // );
    if (id && fullname && position && branch && motto && gender && picture) {
      handleSumbitTextLink(
        `http://stingycards.com/card/${id}/${fullname}/${position}/${branch}/${motto}/${gender}/${picture}`
      );
    }

    function handleSumbit(url) {
      axios
        .get(
          `https://api.apiflash.com/v1/urltoimage?access_key=f8dcf1d229e24377961b49bff4431923&url=${url}&response_type=json&format=jpeg`,
          { responseType: "blob" }
        )
        .then((res) => {
        
          setShowCantDownload(true);
          fileDownload(res.data, `${fullname}'s Stingy Card.jpeg`);
          // window.open(res.data);
        })
        .catch((e) => {
          setButtonLoader(false);
          
          console.log(e);
        });
    }

    function handleSumbitTextLink(url) {
      axios
        .get(
          `https://api.apiflash.com/v1/urltoimage?access_key=f8dcf1d229e24377961b49bff4431923&url=${url}&response_type=json&format=jpeg`
        )
        .then((res) => {
          fetch(res.data.url)
            .then((res) => res.blob())
            .then((blob) => {
              fileDownload(blob, `${fullname}'s Stingy Card.jpeg`);
            });

          setImage(res.data.url);
          setShowCantDownload(true)
          // console.log(res.data.url);
          setButtonLoader(false);
          // window.open(res.data);
        })
        .catch((e) => {
          setButtonLoader(false);
          setShowCantDownload(true)
          console.log(e);
        });
    }
  };

  if (location.state === undefined) {
    return <Redirect to="/" />;
  }

  if (
    location.state.card_details === undefined &&
    location.state !== undefined
  ) {
    return <Redirect to="/generate-card" />;
  }

  const whatsappShare = () => {
    if (location.state.bg === "male") {
      window.open(
        "https://wa.me/?text=I%20just%20got%20a%20stingy%20men%20association%20card%20in%20ten%20seconds%20.%20Try%20yours%20here-->%20http://stingycards.com"
      );
    } else {
      window.open(
        "https://wa.me/?text=I%20just%20got%20a%20stingy%20women%20association%20card%20in%20ten%20seconds%20.%20Try%20yours%20here-->%20http://stingycards.com"
      );
    }
  };

  const twitterShare = () => {
    if (location.state.bg === "male") {
      window.open(
        "https://wa.me/?text=I%20just%20got%20a%20stingy%20men%20association%20card%20in%20ten%20seconds%20.%20Try%20yours%20here-->%20http://stingycards.com"
      );
    } else {
      window.open(
        "https://wa.me/?text=I%20just%20got%20a%20stingy%20women%20association%20card%20in%20ten%20seconds%20.%20Try%20yours%20here-->%20http://stingycards.com"
      );
    }
  };
  return (
    <div
      className={
        location.state.bg === "female" ? "centerItemSwan" : "centerItemSman"
      }
    >
      <strong>#WahalaBeLikeBicycle</strong>
      <br />
      <br />
      <p style={{ fontFamily: "Axiforma", fontSize: 30, textAlign: "center" }}>
        Share your Stingy Card with your friends.
      </p>

      {location.state.device === "mobile" ? (
        <>
          <Grid columns={1}></Grid>

          <Grid columns={1}>
            <Grid.Column>
              <Button
                style={{
                  width: 200,
                  height: 60,
                  backgroundColor: "#25D366",
                  color: "white",
                }}
                onClick={() => {
                  whatsappShare();
                }}
              >
                Brag on Whatsapp!
              </Button>
            </Grid.Column>
          </Grid>
        </>
      ) : (
        <Grid columns={2}>
          {/* <Grid.Column>
            <Button onClick={() => {}} style={{ width: 200 }} color="twitter">
              Twitter
            </Button>
          </Grid.Column> */}
          <Grid.Column>
            <Button
              style={{
                width: 200,
                height: 60,
                backgroundColor: "#25D366",
                color: "white",
              }}
              onClick={() => {
                whatsappShare();
              }}
            >
              Brag on Whatsapp!
            </Button>
          </Grid.Column>
        </Grid>
      )}
      <p style={{ fontSize: 15, marginBottom: 10, textAlign: "center" }}>
        <Button
          style={{
            width: 300,
            height: 60,
            marginTop: 50,
            backgroundColor: "#000",
            color: "white",
          }}
          onClick={() => {
            downloadCard();
          }}
          loading={buttonLoader}
        >
          Click to Download Your Card
        </Button>
      </p>
      {showCantDownload ? (
        <p style={{ fontSize: 15, marginBottom: 10, textAlign: "center" }}>
          Can't access your download?{" "}
          <a
            href={`${image}`}
            className="download-link"

            // onClick={() => {
            //   window.open(`${image}`);
            // }}
          >
            {" "}
            Click here
          </a>
        </p>
      ) : null}

      <Button
        content={"Create another stingy card"}
        primary
        style={{
          width: 300,
          height: 60,
          marginTop: 10,
          backgroundColor: "#000",
          color: "white",
        }}
        onClick={(e) => {
          history.push("/");
        }}
      />

      <p style={{ marginTop: 70, textAlign: "center", lineHeight: 2 }}>
        Follow the Nigerian creators on twitter: <br />
        <a href="https://twitter.com/iyiol_a">
          {" "}
          Iyiola Owabumowa (Product Lead, Frontend Dev. & UI/UX Designer)
        </a>
        , <br />
        <a href="https://twitter.com/thrillee_">
          {" "}
          Oluwatobi Bello (Backend Dev.)
        </a>
        , <br />
        <a href="https://twitter.com/jessejoe__">
          {" "}
          Nosike-Imala Jesse (Visual Artist / Graphics Designer)
        </a>
      </p>
    </div>
  );
}

export default ThankYou;
