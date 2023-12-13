$(document).ready(function () {
	$("#uploadButton").on("click", function (event) {
		var fileInput = document.getElementById("fileInput");
		var fileName = fileInput.files[0].name;
		var newFileName = fileName.replace(/ /g, "_");
		fileInput.files[0].name = newFileName;
		var file = fileInput.files[0];
		var formData = new FormData();
		formData.append("image", file);

		$.ajax({
			url: "http://127.0.0.1:8000/api/images/upload",
			type: "POST",
			data: formData,
			processData: false,
			contentType: false,
			success: function (data) {
				console.log("Image uploaded successfully:", data);
			},
			error: function (error) {
				console.error("Error uploading image:", error);
			},
		});
	});
});
