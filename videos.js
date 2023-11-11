(function () {
  madeby.textContent = "Joonas Kiuru"; // eslint-disable-line

  // Header element with divider
  const element = `<div><h1>Videos</h1></div>
                 <hr class="solid">
                 <div><h2>Fireship</h2></div>`;
  content.innerHTML = element; // eslint-disable-line

  // All videos in an array
  const fireshipVideos = [
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/dWqNgzZwVJQ?si=ID65iTA82MTM6FMW" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/5ChkQKUzDCs?si=fR3klGmI_JGXqH_F" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/m4-HM_sCvtQ?si=Xdq4fItwVOnSAANR" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/pEfrdAtAmqk?si=cSfRxl5eqQweceKo" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/Ibjm2KHfymo?si=uRWoWDDbaulTWeAd" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/DHjqpvDnNGE?si=2IgtitsYT8KDEu_i" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/nAchMctX4YA?si=-zjn-O-5diyfCUSD" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/UYm0kfnRTJk?si=NkBcPbEmbJkwGH51" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>',
  ];

  // Loop to add all videos to site
  for (let i = 0; i < fireshipVideos.length; i++) {
    const video_link = fireshipVideos[i];
    const video_element = document.createElement("div");
    video_element.classList.add("video");
    video_element.innerHTML = video_link;
    content.appendChild(video_element); // eslint-disable-line
  }

  const divider = document.createElement("hr");
  divider.classList.add("solid");
  content.appendChild(divider); // eslint-disable-line
})();
