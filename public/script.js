const postBtn = document.getElementById("submit");
const input = document.getElementById("input");
const baseUrl = "http://localhost:5001/";
      postBtn.addEventListener("click", postPict);
      async function postPict(e) {
        e.preventDefault();
        const fileInput = document.getElementById("input");
        var formData = new FormData();
        formData.append("parcel", fileInput.files[0]);
        try {
          const res = await fetch(baseUrl, {
            method: "POST",
            body: formData,
          });
          if (res.ok) {
            alert("File successfully uploaded!");
          } else {
            alert("Error uploading file. Please try again.");
          }
        } catch (error) {
          console.error("Error:", error);
          alert("An error occurred. Please try again later.");
        }
      }