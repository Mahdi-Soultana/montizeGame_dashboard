const form = document.querySelector("form");
const isPublic = form.isPublic;
const link = form.link;
const crosHeader = "https://crossanywhereheaders.herokuapp.com/";
console.log(form);
const contentType = "Application/json";
form.addEventListener("submit", async e => {
  e.preventDefault();
  console.log("submit");

  console.log(link.value);
  console.dir(isPublic);
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
          isPublic: isPublic["checked"]
        })
      }
    ).then(res => res.json());
    console.log(res);
  }
});
async function fetchData() {
  try {
    res = await fetch(
      crosHeader + "https://monitizegame.herokuapp.com/cpa_monitize/"
    ).then(res => res.json());
    console.log(res);
    link.value = res.link;
    isPublic.checked = res.isPublic;
  } catch (e) {
    console.log(e);
  }
}

fetchData();
