const form = document.querySelector("form");
const loading = document.querySelector(".loading");

let link = form.link;
let timePushAds = form.timePushAds;
let timeShowingPopUp = form.timeShowingPopUp;
let isPublic = form.isPublic;
let byClicking = form.byClicking;
let showPopUp = form.showPopUp;
let length = 1;
const crosHeader = "https://crossanywhereheaders.herokuapp.com/";

const contentType = "Application/json";
form.addEventListener("submit", HandelSubmit);

async function HandelSubmit(e) {
  e.preventDefault();

  console.log(link);
  loading.classList.add("display");

  try {
    if (link.value) {
      fetch(
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
      )
        .then(res => res.json())
        .then(data => {
          console.log(data);

          UpdateUi(data);
          loading.classList.remove("display");
        })
        .catch(e => {
          loading.classList.remove("display");
          console.log(e);
        });
    }
  } catch (e) {
    console.log(e);
    loading.classList.remove("display");
  }
}

async function fetchData() {
  console.log("fetching ....");
  loading.classList.add("display");

  fetch(crosHeader + "https://monitizegame.herokuapp.com/cpa_monitize/")
    .then(res => {
      console.log(res);
      let datajson = res.json();
      console.log(datajson);
      return datajson;
    })
    .then(dataa => {
      console.log(dataa);
      UpdateUi(dataa);
      loading.classList.remove("display");
    })
    .catch(e => {
      loading.classList.remove("display");
      console.log(e);
    });
}
function UpdateUi(data) {
  timePushAds.value = data.timePushAds;
  timeShowingPopUp.value = data.timeShowingPopUp;
  isPublic.checked = data.isPublic;
  showPopUp.checked = data.showPopUp;
  byClicking.checked = data.byClicking;
  link.value = data.link;
  checkByClicking();
}

function checkByClicking() {
  if (byClicking.checked) {
    timePushAds.classList.add("disabled");
  } else {
    timePushAds.classList.remove("disabled");
  }
}
let startTimeOut = setTimeout(() => {
  fetchData();
}, 1000);

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
      res => res.json()
      // if the response is a JSON object
    )
    .then(res => {
      // createUrlHtml(length, res.data);
      console.log(res);
      loading.classList.remove("display");
    });
};

// Event handler executed when a file is selected
const onSelectFile = () => upload();

// Add a listener on your input
// It will be triggered when a file will be selected
files.addEventListener("change", onSelectFile, false);
byClicking.addEventListener("click", checkByClicking);
