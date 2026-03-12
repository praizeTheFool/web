/* Constants and DOM Elements =============================================== */

const lastFmUser = "LASTFMUSER";

// Static song display
(function() {
  function setStaticSong() {
    const title = document.getElementById('player-title');
    const artist = document.getElementById('player-artist');
    const link = document.getElementById('player-go');
    const lastPlayed = document.getElementById('last-played');
    const nowPlaying = document.getElementById('now-playing');
    const cover = document.getElementById('cover');
    if (title) title.textContent = 'Andaaz E Karam';
    if (artist) artist.textContent = 'Darshan Raval';
    if (link) link.href = 'https://music.apple.com/in/album/andaaz-e-karam/1845803336?i=1845803343';
    if (lastPlayed) { lastPlayed.style.display = 'inline'; }
    if (nowPlaying) { nowPlaying.style.display = 'none'; }
    if (cover) cover.src = '/home/andaaz-cover.jpg';
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setStaticSong);
  } else {
    setStaticSong();
  }
})();

const lastFmApiKey = "LASTFMAPIKEY";
const lastFmPlayer = document.getElementById("player");
const lastFmCover = document.getElementById("cover");
const lastFmTitle = document.getElementById("player-title");
const lastFmTitleContainer = document.getElementById("player-title-container");
const lastFmArtist = document.getElementById("player-artist");
const lastFmArtistContainer = document.getElementById("player-artist-container");
const lastFmLink = document.getElementById("player-go");

const discordStatus = document.getElementById("online-indicator");
const discordStatusText = document.getElementById("online-indicator-text");
const clock = document.getElementById("clock");

// Axenide's Discord ID from config.toml
const discordUserId = "294856304969908224";

let lastTrackID = null;
let lastDiscordStatus = "";
let lastTime = "";

/* Functions ================================================================ */

// Last.fm
async function fetchLastFm() {
	if (lastFmUser === "LASTFMUSER" || lastFmApiKey === "LASTFMAPIKEY") {
		console.warn("Last.fm user or API key not set.");
		return;
	}

	try {
		const res = await fetch(`https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${lastFmUser}&api_key=${lastFmApiKey}&format=json&limit=1`);
		const data = await res.json();
		const track = data.recenttracks?.track?.[0];
		if (!track) return;

		const trackID = track.mbid || track.url;
		const isPlaying = track["@attr"]?.nowplaying === "true";

		if (trackID !== lastTrackID || isPlaying !== lastFmPlayer.classList.contains("playing")) {
			lastTrackID = trackID;

			lastFmTitle.textContent = track.name;
			lastFmArtist.textContent = track.artist["#text"];
			// Handle image size, prefer medium
			lastFmCover.src = track.image.find(img => img.size === "medium")?.["#text"] || "/images/image-missing.svg";
			lastFmLink.href = track.url;

			lastFmPlayer.classList.toggle("playing", isPlaying);

			// Call updateMarquees if it exists (from marquee.js)
			if (typeof updateMarquees === 'function') {
				updateMarquees();
			}
		}
	} catch (e) {
		console.error("Failed to fetch now playing track:", e);
	}
}

// Discord status
async function fetchDiscordStatus() {
	if (!discordStatus || !discordStatusText) return;

	try {
		const res = await fetch(`https://api.lanyard.rest/v1/users/${discordUserId}`);
		const data = await res.json();
		// Lanyard returns data.data if successful
		if (!data.success) throw new Error(data.error?.message || "Lanyard error");
		
		const status = data.data.discord_status;

		if (status !== lastDiscordStatus) {
			lastDiscordStatus = status;

			discordStatus.classList.remove("online", "idle", "dnd", "offline");
			discordStatus.classList.add(status);

			switch (status) {
				case "online":
					discordStatusText.innerHTML = "Online";
					break;
				case "idle":
					discordStatusText.innerHTML = "Idle";
					break;
				case "dnd":
					discordStatusText.innerHTML = "DND";
					break;
				case "offline":
					discordStatusText.innerHTML = "Offline";
					break;
				default:
					discordStatusText.innerHTML = status;
			}
		}
	} catch (error) {
		console.error("Error fetching Lanyard data:", error);
		discordStatusText.innerHTML = "N/A";
	}
}

// Clock
function updateClock() {
	if (!clock) return;

	const options = {
		timeZone: "Asia/Kolkata",
		hour: "2-digit",
		minute: "2-digit",
		hour12: false,
	};

	const localTime = new Date().toLocaleString("en-IE", options);

	if (localTime !== lastTime) {
		clock.textContent = localTime;
		lastTime = localTime;
	}
}

/* Initialization and Event Listeners ======================================= */

document.addEventListener("DOMContentLoaded", function () {
	if (lastFmPlayer) {
		fetchLastFm();
		setInterval(fetchLastFm, 10000);
	}

	if (clock) {
		updateClock();
		setInterval(updateClock, 1000);
	}

	if (discordStatus) {
		fetchDiscordStatus();
		setInterval(fetchDiscordStatus, 10000);
	}
});
