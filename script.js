const fileInput = document.getElementById("imageInput");
const uploadBtn = document.getElementById("uploadBtn");
const statusText = document.getElementById("uploadStatus");
const darkModeBtn = document.getElementById("darkModeBtn");

let selectedFile = null;

/* ---------- Dark Mode ---------- */
darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

/* ---------- File Selection ---------- */
fileInput.addEventListener("change", () => {
  selectedFile = fileInput.files[0];
});

/* ---------- Upload ---------- */
uploadBtn.addEventListener("click", async () => {
  if (!selectedFile) {
    statusText.textContent = "Please select an image first.";
    return;
  }

  statusText.textContent = "Uploading… please wait.";

  const reader = new FileReader();

  reader.onloadend = async () => {
    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: reader.result,
        }),
      });

      // Handle non-JSON responses safely
      const text = await response.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Server returned invalid response");
      }

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Upload failed");
      }

      statusText.innerHTML = `
        ✅ Upload successful<br>
        <a href="${data.url}" target="_blank">View Image</a>
      `;
    } catch (err) {
      console.error(err);
      statusText.textContent = "❌ Error uploading image";
    }
  };

  reader.readAsDataURL(selectedFile);
});
