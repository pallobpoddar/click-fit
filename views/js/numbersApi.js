$(document).ready(function () {
	var apiUrl = "http://numbersapi.com/1/30/date?json";

	$.ajax({
		url: apiUrl,
		method: "GET",
		dataType: "json",
		success: function (data) {
			var content = data.text;
			$(".apiResponse").text(content);
		},
		error: function (error) {
			console.error("Error:", error);
		},
	});
});
