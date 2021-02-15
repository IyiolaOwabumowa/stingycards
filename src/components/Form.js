import React, { useEffect, useState, useCallback } from "react";
import { Grid, Segment, Input, Button } from "semantic-ui-react";
import { useHistory, useLocation, Redirect } from "react-router-dom";
import imageCompression from "browser-image-compression";
import Cropper from "react-easy-crop";
import getCroppedImg from "./CropImage";
import "../App.css";
import axios from "axios";
import constants from "./constants";
import MetaTags from "react-meta-tags";

function Form() {
  const [name, setName] = useState("");
  const [nameE, setNameE] = useState(false);
  const [branch, setBranch] = useState("");
  const [branchE, setBranchE] = useState(false);

  const [position, setPosition] = useState("");
  const [positionE, setPositionE] = useState(false);

  const [motto, setMotto] = useState("");
  const [mottoE, setMottoE] = useState(false);

  const [smanId, setSmanId] = useState("");
  const [smanIdE, setSmanIdE] = useState(false);

  const [file, setFile] = useState(null);
  const [fileURL, setFileURL] = useState(null);
  const [loadingFile, setLoadingFile] = useState(false);
  const [fileE, setFileE] = useState(null);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  // const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
  //   setCroppedAreaPixels(croppedAreaPixels);
  // }, []);

  // const showCroppedImage = useCallback(async () => {
  //   try {
  //     const croppedImage = await getCroppedImg(fileURL, croppedAreaPixels);
  //     console.log("donee", { croppedImage });
  //     setCroppedImage(croppedImage);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }, [croppedAreaPixels, rotation]);

  // const onClose = useCallback(() => {
  //   setCroppedImage(null);
  // }, []);

  const history = useHistory();
  const location = useLocation();

  //   <Redirect to={{ pathname: "/", state: { from: location } }} />;

  if (location.state === undefined) {
    return <Redirect to="/" />;
  }

  function handleImageUpload(event) {
    var imageFile = event.target.files[0];
    // console.log(imageFile);
    // console.log("originalFile instanceof Blob", imageFile instanceof Blob);
    // console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);

    var options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    imageCompression(imageFile, options)
      .then(function (compressedFile) {
        console.log(
          "compressedFile instanceof Blob",
          compressedFile instanceof Blob
        );

        setFileE(false);
        setLoadingFile(false);
        setFile(compressedFile);
        // setFileURL(URL.createObjectURL(file));
        // console.log(
        //   `compressedFile size ${compressedFile.size / 1024 / 1024} MB`
        // );
      })
      .catch(function (error) {
        setLoadingFile(false);
        console.log(error.message);
      });
  }

  const handleSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    var fd = new FormData();
    if (
      name.length > 1 &&
      branch.length > 1 &&
      position.length > 1 &&
      motto.length > 1 &&
      file != null
    ) {
      fd.append("fullname", name);
      fd.append("position", position);
      fd.append("branch", branch);
      fd.append("motto", motto);
      fd.append("sman_id", smanId);
      fd.append("display_picture", file, file.name);

      axios
        .post(
          location.state.detail === "male"
            ? `http://stingycards.com/api/v1/accounts/stingman/`
            : `http://stingycards.com/api/v1/accounts/stingwoman/`,
          fd
        )
        .then((res) => {
          setLoading(false);
          //window.alert(res.data);
          //console.log(res.data);
          history.push({
            pathname: "/thank-you",
            state: {
              detail: res.data,
              bg: location.state.detail,
              device: location.state.device,
              card_details: res.data,
            },
          });
        })
        .catch((e) => {
          setLoading(false);
          console.log(e);

          setError("Ooops! Something went wrong. Try again later.");
        });
    } else {
      if (name.length < 2) {
        setNameE(true);
      }
      if (branch.length < 2) {
        setBranchE(true);
      }
      if (position.length < 2) {
        setPositionE(true);
      }
      if (motto.length < 2) {
        setMottoE(true);
      }
      if (smanId.length < 2) {
        setSmanIdE(true);
      }
      if (file == null) {
        setFileE(true);
      }
      setLoading(false);
    }
  };

  return (
    <div
      className={
        location.state.detail === "female" ? "centerItemSwan" : "centerItemSman"
      }
    >
      <MetaTags>
        <title>Generate Your Card</title>
        <meta
          name="description"
          content="It's just fun for us honestly, lol."
        />
        <meta property="og:title" content="Stingy Cards" />
      </MetaTags>
      <div
        className={
          location.state.device === "mobile" ? "formBgMobile" : "formBg"
        }
      >
        {/* <div
          style={{
            position: "relative",
            width: "100%",
            height: 200,
            background: "#333",

            height: 1000,
          }}
        >
          <Cropper
            image={fileURL}
            crop={crop}
            zoom={zoom}
            aspect={4 / 3}
            onCropChange={setCrop}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div> */}

        <p style={{ textAlign: "center", marginBottom: 40 }}>
          {location.state.device === "mobile" ? (
            <>
              Fill your details <br /> <strong>and we do the magic ✨</strong>
            </>
          ) : (
            <>
              Fill your details <strong>and we do the magic ✨</strong>
            </>
          )}
        </p>

        <form>
          <div pseudo="-webkit-date-and-time-container">
            {loadingFile ? null : (
              <input
                type="file"
                name="file"
                id="file"
                className="inputfile"
                accept="image/*"
                onChange={(e) => {
                  // setFileE(false);
                  // setFile(e.target.files[0]);

                  setLoadingFile(true);
                  handleImageUpload(e);
                }}
              />
            )}

            <div style={{ marginTop: 20 }}></div>
            <Input
              placeholder="Your Name"
              style={{ width: "100%", height: 50 }}
              value={name}
              maxLength="17"
              onChange={(e) => {
                if (e.target.value.length < 2) {
                  setNameE(true);
                } else {
                  setNameE(false);
                }
                setName(e.target.value);
              }}
              error={nameE}
            />
            <Input
              placeholder={
                location.state.detail == "male"
                  ? "Stingy Men Association Branch"
                  : "Stingy Women Association Branch"
              }
              style={{ width: "100%", marginTop: 20, height: 50 }}
              value={branch}
              maxLength="17"
              onChange={(e) => {
                if (e.target.value.length < 2) {
                  setBranchE(true);
                } else {
                  setBranchE(false);
                }
                setBranch(e.target.value);
              }}
              error={branchE}
            />
            <Input
              placeholder="Your position here"
              style={{ width: "100%", marginTop: 20, height: 50 }}
              value={position}
              maxLength="17"
              onChange={(e) => {
                if (e.target.value.length < 2) {
                  setPositionE(true);
                } else {
                  setPositionE(false);
                }
                setPosition(e.target.value);
              }}
              error={positionE}
            />
            <Input
              placeholder="Your motto"
              style={{ width: "100%", marginTop: 20, height: 50 }}
              value={motto}
              maxLength="25"
              onChange={(e) => {
                if (e.target.value.length < 2) {
                  setMottoE(true);
                } else {
                  setMottoE(false);
                }
                setMotto(e.target.value);
              }}
              error={mottoE}
            />
            <Input
              placeholder="Type your unique ID Number"
              style={{ width: "100%", marginTop: 20, height: 50 }}
              value={smanId}
              maxLength="7"
              onChange={(e) => {
                if (e.target.value.length < 2) {
                  setSmanIdE(true);
                } else {
                  setSmanIdE(false);
                }
                setSmanId(e.target.value);
              }}
              error={smanIdE}
            />
          </div>
          {/* <Button
            content="Select Your Display Picture"
            primary
            style={{backgroundColor:"black", height:60, width: "100%", marginTop: 20 }}
            
          /> */}

          {/* <input
            id="select-dp"
            className="input-file"
            type="file"
            placeholder="Select a display picture"
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
            hidden
          /> */}

          {/* <label for="select-dp">No file chosen</label> */}
          {fileE ? (
            <>
              <div style={{ marginTop: 20 }}> </div>
              <label className="dp-error">
                Please choose a display picture
              </label>{" "}
            </>
          ) : null}
          <div style={{ textAlign: "center", alignItems: "center" }}>
            <label for="file" className="uploadImage">
              {loadingFile ? (
                "Please Wait ..."
              ) : (
                <>
                  {file == null
                    ? "Select your display picture"
                    : "DP Selected. Click here to change"}
                </>
              )}
            </label>
          </div>

          <Button
            content={"Generate Your Stingy Card"}
            primary
            style={{
              backgroundColor: "black",
              height: 60,
              width: "100%",
              marginTop: 20,
            }}
            onClick={(e) => {
              handleSubmit(e);
            }}
            loading={loading ? loading : false}
            disabled={loadingFile ? true : false}
          />

          {error && (
            <>
              <p style={{ textAlign: "center", marginTop: 40 }}>{error}</p>
            </>
          )}
        </form>
      </div>
      {/* <Grid columns={1} padded="vertically">
        <Grid.Column>
          <p style={{ fontFamily: "Axiforma", fontSize: 30 }}>
            Select Your Gender
          </p>
        </Grid.Column>
       
      </Grid>
      <Grid columns={2} padded="vertically">
        <Grid.Column>
          <div onClick={()=>{
              
          }} className="genderBoxMale"></div>
        </Grid.Column>
        <Grid.Column>
          <div className="genderBoxFemale"></div>
        </Grid.Column>
      </Grid> */}
    </div>
  );
}

export default Form;
