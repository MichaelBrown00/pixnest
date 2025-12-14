const darkBtn = document.getElementById("darkModeBtn");
const uploadBtn = document.getElementById("uploadBtn");
const input = document.getElementById("imageInput");
const status = document.getElementById("uploadStatus");
const preview = document.getElementById("previewImg");

darkBtn.onclick = () => {
  document.body.classList.toggle("dark");
};

uploadBtn.onclick = async () => {
  const file = input.files[0];
  if (!file) {
    alert("Choose an image first");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  status.innerText = "Uploading...";

  try {
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData
    });

    const data = await res.json();

    if (!data.secure_url) {
      status.innerText = "Upload failed";
      return;
    }

    preview.src = data.secure_url;
    preview.style.display = "block";
    status.innerText = "Upload successful!";
  } catch (err) {
    console.error(err);
    status.innerText = "Error uploading image";
  }
};
