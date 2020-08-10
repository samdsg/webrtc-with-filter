// Global Vars

let width = 500,
  height = 0,
  filter = "none",
  streaming = false;

// Dom element
const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const photos = document.getElementById("photos");
const photoButton = document.getElementById("photo-button");
const clearButton = document.getElementById("clear-button");
const photoFilter = document.getElementById("photo-filter");

// Get media stream
navigator.mediaDevices
  .getUserMedia({
    video: true,
    audio: false,
  })
  .then(function (stream) {
    // Link to the vido source
    video.srcObject = stream;
    // Play Video;
    video.play();
  })
  .catch(function (err) {
    console.log(err);
  });

// Play when ready
video.addEventListener(
  "canplay",
  function (evt) {
    if (!streaming) {
      // Set Vido / canvas height
      height = video.videoHeight / (video.videoWidth / width);

      video.setAttribute("width", width);
      video.setAttribute("height", height);
      canvas.setAttribute("width", width);
      canvas.setAttribute("height", height);
      streaming = true;
    }
  },
  false
);

// Photo button event
photoButton.addEventListener(
  "click",
  function (evt) {
    evt.preventDefault();
    takePicture();
  },
  false
);

// Filter event
photoFilter.addEventListener("change", function (e) {
  // Set filter to chosen option
  filter = e.target.value;
  // Set filter to video
  video.style.filter = filter;

  e.preventDefault();
});

// Clear event
clearButton.addEventListener("click", function (evt) {
  evt.preventDefault();

  // Cleare the photos
  photos.innerHTML = "";
  // change filter back to normal
  filter = "none";
  video.style.filter = filter;

  // Reset select list
  photoFilter.selectedInde = 0;
});

// Take picture from canvas
function takePicture() {
  // creact canvas
  const context = canvas.getContext("2d");
  if (width && height) {
    // set canvas props
    canvas.width = width;
    canvas.height = height;
    // Draw an image of the video on the canvas
    context.drawImage(video, 0, 0, width, height);

    // Create image from the canvas
    const imgUrl = canvas.toDataURL("image/png");

    // Create img element
    const img = document.createElement("img");

    // Set img src
    img.setAttribute("src", imgUrl);

    // Set image filter
    img.style.filter = filter;

    // Add image to photos
    photos.appendChild(img);
  }
}
