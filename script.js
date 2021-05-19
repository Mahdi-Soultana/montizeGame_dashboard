const form = document.querySelector("form");
const loading = document.querySelector(".loading");
const urlContainer = document.querySelector(".urlContainer");
let links = form.querySelectorAll(".link");
let timePushAds = form.timePushAds;
let timeShowingPopUp = form.timeShowingPopUp;
let isPublic = form.isPublic;
let byClicking = form.byClicking;
let showPopUp = form.showPopUp;
let length = 1;
const crosHeader = "https://crossanywhereheaders.herokuapp.com/";

const contentType = "Application/json";
form.addEventListener("submit", async e => {
  e.preventDefault();
  // const files = document.getElementById("files");
  // const formData = new FormData();
  let linksArr = grapValuesLink();
  console.log(linksArr);
  loading.classList.add("display");

  try {
    if (links[0].value) {
      res = await fetch(
        crosHeader + "https://monitizegame.herokuapp.com/cpa_monitize/edit",
        {
          method: "PUT",
          headers: {
            Accept: contentType,
            "Content-Type": contentType
          },
          body: JSON.stringify({
            links: linksArr,
            timePushAds: timePushAds["value"],
            timeShowingPopUp: timeShowingPopUp["value"],
            isPublic: isPublic["checked"],
            byClicking: byClicking["checked"],
            showPopUp: showPopUp["checked"]
          })
        }
      )
        .then(res => res.json())
        .then(res => {
          console.log(res);

          UpdateUi(res);
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
});
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
  // createUrlHtml(data.imgAds.length, data.links);
  timePushAds.value = data.timePushAds;
  timeShowingPopUp.value = data.timeShowingPopUp;
  isPublic.checked = data.isPublic;
  showPopUp.checked = data.showPopUp;
  byClicking.checked = data.byClicking;
  checkByClicking();
}

byClicking.addEventListener("click", checkByClicking);
function checkByClicking() {
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
  for (let i = 0; i < files.files.length; i++) {
    const file = files.files[i];
    formData.append("avatar", file);
  }
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
      length = res.length;
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

// function createUrlHtml(length, dataLinks) {
//   let urlTags = "";
//   for (let i = 0; i < length; i++) {
//     urlTags += `<div>
//                  <label for="link">URL</label>
//                  <input type="url" id="link" class="link" required placeholder="your Link Here !" value="${dataLinks[i]}" />
//                 </div>`;
//   }
//   urlContainer.innerHTML = urlTags;
// }
// createUrlHtml(length);
///////////Values Links
function grapValuesLink(e) {
  links = [...form.querySelectorAll(".link")];
  const linksValue = [...form.querySelectorAll(".link")].map(
    link => link.value
  );

  return linksValue;
}
