const API_KEY = "0eb7fc14f5406dda79664c947e0416ab";

function sendRequest(city) {
	const URL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
	let promise = new Promise((resolve, reject) => {
		const req = new XMLHttpRequest();

		req.open("GET", URL);

		req.send();
		req.responseType = "json";
		req.onload = function () {
			if (req.readyState == 4 && req.status != 404) {
				resolve(req.response);
			} else {
				reject("Something Wents Wrong 🙀 ");
			}
		};
	});
	return promise;
}

function getDateString() {
	let days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];

	const date = new Date();

	let hr = date.getHours();
	let mm = date.getMinutes();
	let ampm = hr >= 12 ? "pm" : "am";

	return `${days[date.getDay()]}, ${hr % 12 == 0 ? 12 : hr % 12}:${mm} ${ampm}`;
}

function sample() {
	const city = document.querySelector(".form-input").value;
	const time = document.querySelector(".time");
	const icon = document.querySelector(".logo");
	const temp = document.querySelector(".temp");

	time.innerHTML = getDateString();

	if (city.length) {
		sendRequest(city)
			.then((data) => {
				let img = data.weather[0].icon;
				img = `http://openweathermap.org/img/wn/${img}@2x.png`;
				let temprature = Math.round(data.main.temp);

				icon.src = img;
				temp.innerHTML = temprature + "<sup>o</sup>";

				let card = document.querySelector(".card");
				card.style = "display : block;";
			})
			.catch((err) => {
				alert(err);
			});
	} else {
		alert("Please Enter Your City Name 😅 ");
	}
}

function closeBtn() {
	let card = document.querySelector(".card");
	card.style = "display : none;";
	const city = document.querySelector(".form-input");
	city.value = "";
}

document.querySelector(".form-btn").addEventListener("click", sample);

document.querySelector(".close-btn").addEventListener("click", closeBtn);
