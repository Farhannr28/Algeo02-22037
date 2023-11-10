const postBtn = document.getElementById("submit");

const baseUrl = "http://localhost:5001/";
// fetch input image value to local database
      postBtn.addEventListener("click", postPict);
      async function postPict(e) {
        e.preventDefault();
        const fileInput = document.getElementById("input");
        const toggleValue = document.getElementById("toggle").checked?
        document.getElementById("toggleValue").getAttribute("on"):
        document.getElementById("toggleValue").getAttribute("off")
        var formData = new FormData();
        formData.append("parcel", fileInput.files[0]);
        formData.append("toggle", toggleValue)
        try {
          const res = await fetch(baseUrl+"uploads/client_image", {
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
// fetch toggle value to server
// postBtn.addEventListener('click',postToggle)
//       async function postToggle(e){
//         e.preventDefault()
//         const toggleValue = document.getElementById("toggleValue").checked?
//         document.getElementById("toggleValue").getAttribute("data-on"):
//         document.getElementById("toggleValue").getAttribute("data-off")
//         fetch(baseUrl + "uploads/client_image",{
//           method : 'POST',
//           headers : {
//             'Content-Type' : 'application/json',
//           },
//           body : toggleValue,
//         })
//         .then(response => response.json())
//         .then(data =>{
//           console.log('Respone from server: ', data);
//         })
//         .catch(error=>{console.error('Error: ', error)})

//       }