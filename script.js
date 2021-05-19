const form = document.querySelector("form");
const loading = document.querySelector(".loading");
const link = form.link;
const timePushAds = form.timePushAds;
const timeShowingPopUp = form.timeShowingPopUp;
const isPublic = form.isPublic;
const byClicking = form.byClicking;
const showPopUp = form.showPopUp;
let lengthImages = 1;
const crosHeader = "https://crossanywhereheaders.herokuapp.com/";

const contentType = "Application/json";
form.addEventListener("submit", async e => {
  e.preventDefault();
  // const files = document.getElementById("files");
  // const formData = new FormData();
  loading.classList.add("display");

  try {
    if (link) {
      res = await fetch(
        crosHeader + "https://monitizegame.herokuapp.com/cpa_monitize/edit",
        {
          method: "PUT",
          headers: {
            Accept: contentType,
            "Content-Type": contentType
          },
          body: JSON.stringify({
            link: link["value"],
            timePushAds: timePushAds["value"],
            timeShowingPopUp: timeShowingPopUp["value"],
            isPublic: isPublic["checked"],
            byClicking: byClicking["checked"],
            showPopUp: showPopUp["checked"]
          })
        }
      ).then(res => res.json());
      console.log(res);
      UpdateUi(res);
      loading.classList.remove("display");
    }
  } catch (e) {
    console.log(e);
    loading.classList.remove("display");
  }
});
async function fetchData() {
  try {
    loading.classList.add("display");
    res = await fetch(
      crosHeader + "https://monitizegame.herokuapp.com/cpa_monitize/"
    ).then(res => res.json());

    UpdateUi(res);
    loading.classList.remove("display");
  } catch (e) {
    loading.classList.remove("display");
    console.log(e);
  }
}
function UpdateUi(data) {
  link.value = data.link;
  timePushAds.value = data.timePushAds;
  timeShowingPopUp.value = data.timeShowingPopUp;
  isPublic.checked = data.isPublic;
  showPopUp.checked = data.showPopUp;
  byClicking.checked = data.byClicking;
  // checkByClicking();
}

byClicking.addEventListener("click", checkByClicking);
function checkByClicking() {
  console.log("check");
  if (byClicking.checked) {
    timePushAds.classList.add("disabled");
  } else {
    timePushAds.classList.remove("disabled");
  }
}
fetchData();
/////////////////Form file Uplode
// Select your input type file and store it in a variable
const files = document.getElementById("files");
// This will upload the file after having read it
const upload = () => {
  const formData = new FormData();
  loading.classList.add("display");
  formData.append("avatar", files.files[0]);
  fetch(
    crosHeader + "https://monitizegame.herokuapp.com/cpa_monitize/img_ads",
    {
      // Your POST endpoint
      method: "POST",

      body: formData // This is your file object
    }
  )
    .then(
      res => res.text()
      // if the response is a JSON object
    )
    .then(res => {
      lengthImages = res.length;
      console.log(res);
      loading.classList.remove("display");
    });
};

// Event handler executed when a file is selected
const onSelectFile = () => upload();

// Add a listener on your input
// It will be triggered when a file will be selected
files.addEventListener("change", onSelectFile, false);
