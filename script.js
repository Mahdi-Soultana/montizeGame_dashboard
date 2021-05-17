const form = document.querySelector("form");
const loading = document.querySelector(".loading");
const link = form.link;
const timePushAds = form.timePushAds;
const isPublic = form.isPublic;
const byClicking = form.byClicking;
const crosHeader = "https://crossanywhereheaders.herokuapp.com/";

const contentType = "Application/json";
form.addEventListener("submit", async e => {
  e.preventDefault();

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
            isPublic: isPublic["checked"],
            byClicking: byClicking["checked"]
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
    console.log(res);
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
  isPublic.checked = data.isPublic;
  byClicking.checked = data.byClicking;
  // checkByClicking();
}

// byClicking.addEventListener("click", checkByClicking);
// function checkByClicking() {
//   console.log("check");
//   if (byClicking.checked) {
//     timePushAds.classList.add("disabled");
//   } else {
//     timePushAds.classList.remove("disabled");
//   }
// }
fetchData();
