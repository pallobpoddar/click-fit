function handleDragOver(event) {
	event.preventDefault();
	event.dataTransfer.dropEffect = "copy";
}

function handleDrop(event) {
	event.preventDefault();
	var files = event.dataTransfer.files;
	if (files.length > 0) {
		var fileInput = document.getElementById("fileInput");
		fileInput.files = files;
	}
	handleFiles(files);
}

function handleFileSelect() {
	var files = fileInput.files;
	handleFiles(files);
}

function handleFiles(files) {
	var dropText = document.getElementById("dropText");
	var output = [];

	for (var i = 0; i < files.length; i++) {
		var file = files[i];
		var fileSizeInMB = (file.size / 1048576).toFixed(2);
		output.push(
			"<strong>",
			encodeURIComponent(file.name),
			"</strong>&emsp;",
			fileSizeInMB,
			" mb"
		);
	}

	dropText.innerHTML = "";
	dropText.innerHTML = "<ul>" + output.join("") + "</ul>";
}
