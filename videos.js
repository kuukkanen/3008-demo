(function () {
  let element = `<div id="video_container"><h1>Videos</h1></div>`;
  content = document.getElementById("content"); // eslint-disable-line
  content.innerHTML = element; // eslint-disable-line
  let videos = [
    "https://www.youtube.com/embed/dWqNgzZwVJQ?si=jAjCQI34pe47FcQH",
    "https://www.youtube.com/embed/5ChkQKUzDCs?si=GJdf4fDM66FkKiMe",
  ];

  for (let i = 0; i < videos.length; i++) {
    let video_link = `<iframe width="560" height="315" src=${videos[i]} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> `;
    let video_element = document.createElement("div");
    video_element.innerHTML = video_link;
    content.appendChild(video_element);
    console.log(videos[i]);
  }
})();
