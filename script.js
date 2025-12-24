const uploadBtn = document.getElementById("uploadBtn");
const imageInput = document.getElementById("imageInput");
const status = document.getElementById("uploadStatus");

uploadBtn.addEventListener("click", async () => {
  status.textContent = "Uploading...";
  status.className = "status";

  if (!imageInput.files.length) {
    status.textContent = "Please select an image.";
    return;
  }

  const formData = new FormData();
  formData.append("file", imageInput.files[0]);

  try {
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.error || "Upload failed");
    }

    status.innerHTML = `
      ✅ Upload successful<br>
      <a href="${data.url}" target="_blank">${data.url}</a>
    `;
  } catch (err) {
    console.error(err);
    status.textContent = "❌ Error uploading image";
  }
});
