var CLOUDINARY_URL = "	https://api.cloudinary.com/v1_1/dknooppbu/upload";
var CLOUDINARY_UPLOAD_PRESET = "oyu3rd0y";

var imgPreview = document.getElementById("img-preview");
var fileUpload = document.getElementById("file-upload");
var fileUpload2 = document.getElementById("file-upload2");

fileUpload.addEventListener("change", function (event) {

    var file = event.target.files[0];
    var formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    axios({
        url: CLOUDINARY_URL,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: formData
    }).then(function (res) {
        console.log(res);
        imgPreview.src = res.data.secure_url;
        $.ajax("api/user/imgurl", {
            type: "PUT",
            data: {
                id: localStorage.getItem("id"),
                imgUrl: res.data.secure_url
            }
        }).then(function () {
            console.log("img saved")
        })
    }).catch(function (err) {
        console.error(err);
    })
});

fileUpload2.addEventListener("change", function (event) {

    var file = event.target.files[0];
    var formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    axios({
        url: CLOUDINARY_URL,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: formData
    }).then(function (res) {
        console.log(res);
        imgPreview.src = res.data.secure_url;
        $.ajax("api/user/imgurl", {
            type: "PUT",
            data: {
                id: localStorage.getItem("id"),
                imgUrl: res.data.secure_url
            }
        }).then(function () {
            console.log("img saved")
        })
    }).catch(function (err) {
        console.error(err);
    })
});