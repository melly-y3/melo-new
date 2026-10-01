/* =========================
   MELO NEW SITE
========================= */


/* =========================
   RELATIONSHIP COUNTER
========================= */


/*
   Başlangıç tarihi henüz kesin olmadığı için
   şimdilik süreyi göstermiyoruz.
   Gerçek tarihi belirlediğimizde buraya ekleyeceğiz.
*/
function calculateRelationshipTime() {

    const startDate = new Date(2025, 7, 16, 21, 46);
    const now = new Date();

    let difference = now - startDate;

    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    difference -= days * 1000 * 60 * 60 * 24;

    const hours = Math.floor(
        difference / (1000 * 60 * 60)
    );

    difference -= hours * 1000 * 60 * 60;

    const minutes = Math.floor(
        difference / (1000 * 60)
    );

    const mainCounter =
        document.getElementById("daysTogether");

    const circleCounter =
        document.getElementById("circleDays");


    if (mainCounter) {
        mainCounter.textContent =
            `${days} gün ${hours} saat ${minutes} dakika`;
    }

    if (circleCounter) {
        circleCounter.textContent = days;
    }
}

calculateRelationshipTime();


/* =========================
   FALLING HEARTS
========================= */

const heartsContainer =
    document.getElementById("fallingHearts");


function createHeart() {

    const heart = document.createElement("span");

    heart.className = "falling-heart";

if (document.body.classList.contains("light-theme")) {
    heart.textContent =
        Math.random() > 0.45 ? "♡" : "♥";
} else {
    heart.textContent =
        ["⋆", "⭒", "✰", "✮"][Math.floor(Math.random() * 4)];
}
    heart.style.left =
        Math.random() * 100 + "%";

    heart.style.fontSize =
        8 + Math.random() * 13 + "px";

    heart.style.animationDuration =
        8 + Math.random() * 12 + "s";

    heart.style.animationDelay =
        Math.random() * 5 + "s";

    heart.style.opacity =
        0.08 + Math.random() * 0.28;

    heartsContainer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 22000);
}


for (let i = 0; i < 35; i++) {
    createHeart();
}


setInterval(createHeart, 700);


/* =========================
   THEME
========================= */

const themeButton =
    document.getElementById("themeButton");

const modalThemeButton =
    document.getElementById("modalThemeButton");


function updateThemeButton() {

    if (document.body.classList.contains("light-theme")) {

        themeButton.textContent = "☀";

    } else {

        themeButton.textContent = "☾";

    }

}


function toggleTheme() {

    document.body.classList.toggle("light-theme");

const moon = document.querySelector(".celestial-moon");
const sun = document.querySelector(".celestial-sun");

const isLight = document.body.classList.contains("light-theme");

if (isLight) {
    sun.classList.add("orbit-in");
    } else {
    moon.classList.add("orbit-in");
}

    localStorage.setItem(
        "meloTheme",
        document.body.classList.contains("light-theme")
            ? "light"
            : "dark"
    );

    document.querySelectorAll(".falling-heart").forEach(heart => {
    heart.textContent = document.body.classList.contains("light-theme")
        ? (Math.random() > 0.45 ? "♡" : "♥")
        : ["⋆", "⭒", "✰", "✮"][Math.floor(Math.random() * 4)];
});

    updateThemeButton();
}


themeButton.addEventListener(
    "click",
    toggleTheme
);


modalThemeButton.addEventListener(
    "click",
    toggleTheme
);


if (
    localStorage.getItem("meloTheme") === "light"
) {

    document.body.classList.add("light-theme");

}


updateThemeButton();


/* =========================
   SETTINGS MODAL
========================= */

const settingsButton =
    document.getElementById("settingsButton");

const settingsModal =
    document.getElementById("settingsModal");

const closeSettings =
    document.getElementById("closeSettings");


settingsButton.addEventListener(
    "click",
    () => {
        settingsModal.classList.add("show");
    }
);


closeSettings.addEventListener(
    "click",
    () => {
        settingsModal.classList.remove("show");
    }
);


settingsModal.addEventListener(
    "click",
    (event) => {

        if (event.target === settingsModal) {
            settingsModal.classList.remove("show");
        }

    }
);


/* =========================
   ANIMATIONS
========================= */

const animationButton =
    document.getElementById("animationButton");

let animationsEnabled = true;


animationButton.addEventListener(
    "click",
    () => {

        animationsEnabled =
            !animationsEnabled;

        animationButton.textContent =
            animationsEnabled
                ? "açık"
                : "kapalı";

        if (!animationsEnabled) {

            heartsContainer.style.display = "none";

        } else {

            heartsContainer.style.display = "block";

        }

    }
);

/* =========================
   SPOTIFY
========================= */

let spotifyPlayer = null;
let spotifyDeviceId = null;
let spotifyAccessToken = null;
let muzikDurumu = null;

const spotifyClientId = "717c1e4800ca417285b51d4919bab47b";
const spotifyRedirectUri = "http://127.0.0.1:3000/callback";
const spotifyScope =
    "streaming user-read-email user-read-private user-modify-playback-state";

function spotifyGiris() {
    const authUrl =
        "https://accounts.spotify.com/authorize" +
        "?client_id=" + encodeURIComponent(spotifyClientId) +
        "&response_type=code" +
        "&redirect_uri=" + encodeURIComponent(spotifyRedirectUri) +
        "&scope=" + encodeURIComponent(spotifyScope);

    window.location.href = authUrl;
}
const spotifyLoginButton = document.getElementById("spotifyLoginButton");

if (spotifyLoginButton) {
    spotifyLoginButton.onclick = spotifyGiris;
}

async function spotifyGiris() {

    const verifier =
        crypto.randomUUID() + crypto.randomUUID();

    const challengeBuffer =
        await crypto.subtle.digest(
            "SHA-256",
            new TextEncoder().encode(verifier)
        );

    const challenge =
        btoa(
            String.fromCharCode(
                ...new Uint8Array(challengeBuffer)
            )
        )
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");

    localStorage.setItem(
        "spotify_verifier",
        verifier
    );

console.log("VERIFIER KAYDEDİLDİ");

    console.log("Spotify giriş butonu bağlandı");
    const authUrl =
        "https://accounts.spotify.com/authorize" +
        "?client_id=" +
        encodeURIComponent(spotifyClientId) +
        "&response_type=code" +
        "&redirect_uri=" +
        encodeURIComponent(spotifyRedirectUri) +
        "&code_challenge_method=S256" +
        "&code_challenge=" +
        encodeURIComponent(challenge) +
        "&scope=" +
        encodeURIComponent(spotifyScope);

    window.location.href = authUrl;
}

window.onSpotifyWebPlaybackSDKReady = () => {

    spotifyPlayer =
        new Spotify.Player({

            name: "Melo ♡",

            getOAuthToken: callback => {

                callback(
                    localStorage.getItem(
                        "spotify_access_token"
                    )
                );
            },

            volume: 0.5
        });

spotifyPlayer.addListener(
    "ready",
    ({ device_id }) => {

        spotifyDeviceId =
            device_id;

        console.log(
            "Spotify oynatıcısı hazır!"
        );
    }
);

spotifyPlayer.addListener(
    "player_state_changed",
    state => {

        if (!state) return;

        muzikDurumu = state;

        const currentTime =
            document.getElementById("currentTime");

        const duration =
            document.getElementById("duration");

        const progressFill =
            document.getElementById("progressFill");

        if (currentTime) {

            const dakika =
                Math.floor(state.position / 60000);

            const saniye =
                Math.floor(
                    (state.position % 60000) / 1000
                );

            currentTime.textContent =
                dakika +
                ":" +
                String(saniye).padStart(2, "0");
        }

        if (duration) {

            const dakika =
                Math.floor(state.duration / 60000);

            const saniye =
                Math.floor(
                    (state.duration % 60000) / 1000
                );

            duration.textContent =
                dakika +
                ":" +
                String(saniye).padStart(2, "0");
        }

        if (progressFill && state.duration > 0) {

            progressFill.style.width =
                (state.position / state.duration * 100) +
                "%";
        }

        playButton.textContent =
            state.paused
                ? "▶"
                : "Ⅱ";
    }
);

setInterval(
    async () => {

        if (
            !spotifyPlayer ||
            !muzikDurumu ||
            muzikDurumu.paused
        ) {
            return;
        }

        const state =
            await spotifyPlayer.getCurrentState();

        if (!state) return;

        muzikDurumu = state;

        const currentTime =
            document.getElementById("currentTime");

        const progressFill =
            document.getElementById("progressFill");

        if (currentTime) {

            const dakika =
                Math.floor(state.position / 60000);

            const saniye =
                Math.floor(
                    (state.position % 60000) / 1000
                );

            currentTime.textContent =
                dakika +
                ":" +
                String(saniye).padStart(2, "0");
        }

        if (progressFill && state.duration > 0) {

            progressFill.style.width =
                (state.position / state.duration * 100) +
                "%";
        }

    },
    1000
);

    spotifyPlayer.addListener(
        "initialization_error",
        ({ message }) => {

            console.log(
                "Spotify başlatma hatası:",
                message
            );
        }
    );

    spotifyPlayer.addListener(
        "account_error",
        ({ message }) => {

            console.log(
                "Spotify hesap hatası:",
                message
            );
        }
    );

    spotifyPlayer.addListener(
        "authentication_error",
        ({ message }) => {

            console.log(
                "Spotify kimlik doğrulama hatası:",
                message
            );
        }
    );

    spotifyPlayer.addListener(
        "playback_error",
        ({ message }) => {

            console.log(
                "Spotify oynatma hatası:",
                message
            );
        }
    );

    spotifyPlayer.connect();
};

async function spotifyKodunuAl() {

    const params =
        new URLSearchParams(
            window.location.search
        );

    const code = params.get("code");

    if (!code) return;

    const verifier =
        localStorage.getItem(
            "spotify_verifier"
        );

    if (!verifier) {
        console.log("Spotify verifier bulunamadı.");
        return;
    }

    const response =
        await fetch(
            "https://accounts.spotify.com/api/token",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded"
                },

                body: new URLSearchParams({

                    client_id:
                        spotifyClientId,

                    grant_type:
                        "authorization_code",

                    code:
                        code,

                    redirect_uri:
                        spotifyRedirectUri,

                    code_verifier:
                        verifier
                })
            }
        );

    const data =
        await response.json();

    console.log("Spotify cevap:", data);

    if (data.access_token) {

        localStorage.setItem(
            "spotify_access_token",
            data.access_token
        );

        localStorage.removeItem(
            "spotify_verifier"
        );

        window.history.replaceState(
            {},
            document.title,
            "/"
        );

        console.log(
            "Spotify bağlantısı başarılı!"
        );
    }
}

spotifyKodunuAl();

const spotifyToken =
    localStorage.getItem(
        "spotify_access_token"
    );

if (!spotifyToken) {
    spotifyGiris();
}

function initializeSpotify() {
    console.log("Spotify oynatıcı başlatılıyor...");
}

/* =========================
   SONGS
========================= */

const songs = [

    {
        title: "Sana Kıyamam",
        artist: "Joker",
        spotifyId: "1Ww5yAsmnjaij3DopLpf3h"
    },

    {
        title: "Uyu Bebeğim",
        artist: "Anıl Emre Daldal",
        spotifyId: "0sA3vc7xKaSzyrCR6yJ69A"
    },

    {
        title: "Aşk",
        artist: "Gökhan Türkmen",
        spotifyId: "3mKROVyu4lbpYoSfJYCJvQ"
    },

    {
        title: "Beraber Büyüdük",
        artist: "Anıl Piyancı",
        spotifyId: "1AlG0sHFDQJP2HdXyQb8bL"
    },

    {
        title: "İstanbul Beyefendisi",
        artist: "Yaşlı Amca",
        spotifyId: "1XJN6kQ2Qkxgsf2pL9Xfmy"
    },

    {
        title: "Herşeyim Oldun",
        artist: "Güllü",
        spotifyId: "6I9yI70lWJS28G8dJWzHPn"
    }

];


const songList =
    document.getElementById("songList");


function createSongList() {

    songList.innerHTML = "";

    songs.forEach((song, index) => {

        const item =
            document.createElement("div");

        item.className = "song-item";

        item.dataset.index = index;

        item.innerHTML = `

            <span class="song-number">
                ${String(index + 1).padStart(2, "0")}
            </span>

            <h3>
                ${song.title}
            </h3>

            <p>
                ${song.artist}
            </p>

        `;

        item.addEventListener(
            "click",
            () => {

                selectSong(index);

                document
                    .querySelector("#home")
                    .scrollIntoView({
                        behavior: "smooth"
                    });

            }
        );

        songList.appendChild(item);

    });

}


createSongList();


/* =========================
   PLAYER
========================= */

let currentSong = 0;
let isPlaying = false;


const trackTitle =
    document.getElementById("trackTitle");

const trackArtist =
    document.getElementById("trackArtist");

const playButton =
    document.getElementById("playButton");


function updateSongInfo() {

    const song = songs[currentSong];

    trackTitle.textContent =
        song.title;

    trackArtist.textContent =
        song.artist;

    document
        .querySelectorAll(".song-item")
        .forEach((item, index) => {

            item.classList.toggle(
                "active",
                index === currentSong
            );

        });

}


function selectSong(index) {

    currentSong = index;

    updateSongInfo();

    isPlaying = false;

    playButton.textContent = "▶";

    if (
        spotifyPlayer &&
        spotifyDeviceId
    ) {

        const token =
            localStorage.getItem(
                "spotify_access_token"
            );

        fetch(
            "https://api.spotify.com/v1/me/player/play?device_id=" +
            spotifyDeviceId,
            {
                method: "PUT",

                headers: {
                    "Authorization":
                        "Bearer " + token,

                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({
                    uris: [
                        "spotify:track:" +
                        songs[currentSong].spotifyId
                    ]
                })
            }
        );
    }
}

updateSongInfo();


playButton.addEventListener(
    "click",
    async () => {

        if (!spotifyPlayer || !spotifyDeviceId) {
            console.log(
                "Spotify oynatıcı henüz hazır değil."
            );
            return;
        }

        const token =
            localStorage.getItem(
                "spotify_access_token"
            );

        if (!muzikDurumu) {

            await fetch(
                "https://api.spotify.com/v1/me/player/play?device_id=" +
                spotifyDeviceId,
                {
                    method: "PUT",

                    headers: {
                        "Authorization":
                            "Bearer " + token,

                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        uris: [
                            "spotify:track:" +
                            songs[currentSong].spotifyId
                        ]
                    })
                }
            );

        } else if (muzikDurumu.paused) {

            await spotifyPlayer.resume();

        } else {

            await spotifyPlayer.pause();
        }
    }
);


document
    .getElementById("previousButton")
    .addEventListener(
        "click",
        () => {

            currentSong--;

            if (currentSong < 0) {
                currentSong = songs.length - 1;
            }

            selectSong(currentSong);

        }
    );


document
    .getElementById("nextButton")
    .addEventListener(
        "click",
        () => {

            currentSong++;

            if (currentSong >= songs.length) {
                currentSong = 0;
            }

            selectSong(currentSong);

        }
    );


/* =========================
   FAVORITE
========================= */

const favoriteButton =
    document.getElementById("favoriteButton");


favoriteButton.addEventListener(
    "click",
    () => {

        favoriteButton.textContent =
            favoriteButton.textContent === "♡"
                ? "♥"
                : "♡";

    }
);


/* =========================
   PLANS
========================= */

const planInput =
    document.getElementById("planInput");

const addPlan =
    document.getElementById("addPlan");

const plansList =
    document.getElementById("plansList");


function addNewPlan() {

    const value =
        planInput.value.trim();

    if (!value) return;

    const item =
        document.createElement("div");

    item.className = "plan-item";

    item.innerHTML = `

        <input type="checkbox">

        <span>
            ${value}
        </span>

    `;

    const checkbox =
        item.querySelector("input");

    checkbox.addEventListener(
        "change",
        () => {

            item.classList.toggle(
                "completed",
                checkbox.checked
            );

        }
    );

    plansList.appendChild(item);

    planInput.value = "";

}


addPlan.addEventListener(
    "click",
    addNewPlan
);


planInput.addEventListener(
    "keydown",
    event => {

        if (event.key === "Enter") {
            addNewPlan();
        }

    }
);


/* =========================
   NOTE
========================= */

const notes = [
    "Seni sevmek kalbimin en güzel alışkanlığı oldu.",
    "Senin yanında kendimi olduğum halimle sevebiliyorum.",
    "Hayatıma girdiğinden beri bazı şeylerin anlamı değişti.",
    "Sana baktığımda içimde tarif edemediğim bir huzur oluşuyor.",
    "Sen benim için sadece sevdiğim biri değil, kalbimin en özel yerisin.",
    "Varlığın bile günümün güzel geçmesi için yetiyor.",
    "Seni düşündüğümde yüzümün istemsizce gülmesine engel olamıyorum.",
    "Kalbimin sana bu kadar kolay alışmasına hâlâ şaşırıyorum.",
    "Seninle konuşmak günün en sevdiğim kısmı.",
    "Bazen hiçbir şey söylemeden bile beni anlayabilmeni seviyorum.",
    "Sen benim için tesadüften çok daha güzel bir şeysin.",
    "Hayatımda olmanı her düşündüğümde içimden iyi ki diyorum.",
    "Senin sevginde kendimi eksik değil, tamamlanmış hissediyorum.",
    "Sana olan sevgimi anlatmaya çalıştıkça kelimeler yetersiz kalıyor.",
    "Seninle ilgili en sevdiğim şeylerden biri, yanında kendim olabilmem.",
    "Kalbimde sana ait olan yeri kimse dolduramaz.",
    "Sen benim en güzel denk gelişimsin.",
    "Gülüşünün bende bıraktığı etkiyi hiçbir şey bırakmıyor.",
    "Seninle geçen sıradan bir gün bile benim için özel.",
    "Sana duyduğum şey sadece özlemekle anlatılabilecek kadar basit değil.",
    "Seni sevdiğimi her fark ettiğimde içimde yeniden aynı heyecan oluşuyor.",
    "Sen benim hayatımın en güzel ayrıntılarından birisin.",
    "Sesini duymak bile bazen bütün günümü değiştirebiliyor.",
    "Senin yanında zamanın nasıl geçtiğini unutmayı seviyorum.",
    "Kalbimin en sakin köşesinde bile sen varsın.",
    "Seninle konuşurken saatlerin ilerlemesini hiç umursamıyorum.",
    "Bana hissettirdiğin değer, kelimelerden çok daha büyük.",
    "Senin varlığın hayatımda güzel bir iz değil, kocaman bir anlam.",
    "Seni sevmek bana kalbimin sandığımdan daha büyük olduğunu gösterdi.",
    "Seninle ilgili küçücük bir şey bile benim için kocaman bir mutluluk olabiliyor.",
    "Beni ben olduğum için sevmeni dünyanın en güzel şeylerinden biri olarak görüyorum.",
    "Sana baktığımda içimden seni korumak ve hep mutlu görmek geliyor.",
    "Senin mutluluğun benim için gerçekten önemli.",
    "Hayatımda senin kadar içime dokunan çok az insan oldu.",
    "Seninle kurduğum her güzel anıyı kalbimde ayrı bir yere koyuyorum.",
    "Seni özlemek bile sana ne kadar değer verdiğimi hatırlatıyor.",
    "Seninle konuştuğumda dünyanın geri kalanını bir süreliğine unutabiliyorum.",
    "Kalbimin seni seçmesinde hiçbir zorunluluk yoktu, sadece seni istedi.",
    "Sen benim için alışılmış bir sevgi değil, her gün yeniden hissettiğim bir şeysin.",
    "Seninle ilgili güzel bir şey düşündüğümde içimde küçük bir mutluluk beliriyor.",
    "Bana kendimi değerli hissettirdiğin her anı unutmuyorum.",
    "Senin varlığın hayatımda sessiz ama çok güzel bir fark yarattı.",
    "Seni düşündüğümde aklıma önce huzur geliyor.",
    "Sen benim için sadece bugünümü değil, hayallerimi de güzelleştiriyorsun.",
    "Kalbimde sana ayırdığım yer zaman geçtikçe küçülmüyor, büyüyor.",
    "Seninle konuşmak bazen ihtiyacım olduğunu bile bilmediğim bir şeymiş gibi geliyor.",
    "Sen benim en sevdiğim iyi ki'lerden birisin.",
    "Gözlerindeki o ifadeyi gördüğümde bütün dikkatimi kaybediyorum.",
    "Sana olan sevgimde en güzel şey, bunun zorlanmış değil kendiliğinden olması.",
    "Senin yanında kendimi saklamak zorunda hissetmiyorum.",
    "Seni sevmenin bana verdiği huzuru başka hiçbir şeyle karıştırmıyorum.",
    "Sen benim kalbimin en güzel alışkanlığı değil, en güzel sebebisin.",
    "Seninle ilgili her küçük ayrıntıyı önemsemek hoşuma gidiyor.",
    "Bazen sadece adını görmek bile yüzümü güldürüyor.",
    "Senin bana verdiğin güveni kelimelerle anlatmak zor.",
    "Sen benim için sıradan bir insanın hayatımdaki sıradan yeri değilsin.",
    "Seni sevdiğimde kendimi daha gerçek hissediyorum.",
    "Seninle yaşadığım güzel anların hiçbirini değiştirmek istemiyorum.",
    "Hayatımın içinde senin de olma ihtimali bile beni mutlu ediyor.",
    "Senin varlığını düşündüğümde içimde garip bir sıcaklık oluşuyor.",
    "Beni tanıyan biri değil, beni gerçekten anlayan biri olmanı seviyorum.",
    "Seninle konuşurken kendimi hiç yabancı hissetmiyorum.",
    "Bana hissettirdiğin o özel duyguyu başka hiç kimsede bulmadım.",
    "Seni sevdiğim için hayatımdaki bazı şeylere daha güzel bakıyorum.",
    "Sen benim için bir kişinin ötesinde, çok özel bir duygusun.",
    "Sana sarılma düşüncesi bile içimi rahatlatıyor.",
    "Seninle paylaşacak bir şey bulmak için bahane aradığım oluyor.",
    "Senin sesinde bana iyi gelen bir şey var.",
    "Sana olan sevgim gösterişten uzak ama içimde çok büyük.",
    "Seni düşündüğümde aklıma hep güzel şeyler geliyor.",
    "Sen benim kalbimde açıklamasını yapamadığım kadar özel bir yerdesin.",
    "Senin yanında geçirdiğim zamanın değerini her geçen gün daha iyi anlıyorum.",
    "Sana duyduğum sevgi bazen tek bir cümleye sığmayacak kadar büyüyor.",
    "Seninle konuştuğumda kendimi daha hafif hissediyorum.",
    "Hayatımda seni tanımış olmak bile benim için büyük bir şans.",
    "Senin küçücük bir ilgin bile benim için çok anlamlı.",
    "Seni sevmenin en güzel tarafı, bunu düşünürken bile mutlu olmam.",
    "Senin gözünde değerli olduğumu hissetmek bana çok iyi geliyor.",
    "Sen benim için kalabalığın içindeki en tanıdık yüz gibisin.",
    "Bazen seni anlatmak yerine sadece sevmenin daha güzel olduğunu düşünüyorum.",
    "Seninle ilgili en sevdiğim şeylerden biri, hayatımda kendine ait bir iz bırakmış olman.",
    "Seni özlediğimde aslında hayatımda ne kadar büyük bir yerin olduğunu anlıyorum.",
    "Senin varlığın benim için hiçbir zaman sıradanlaşsın istemiyorum.",
    "Sana baktığımda içimden iyi ki benim hayatımdasın demek geliyor.",
    "Seninle ilgili kurduğum her hayalin içinde yüzüm gülüyor.",
    "Sen benim için huzurun bir insandaki hali gibisin.",
    "Sana duyduğum sevgi zamanla azalan değil, anlamı değişerek büyüyen bir şey.",
    "Seninle konuşmadığım zamanlarda bile aklımın bir köşesinde oluyorsun.",
    "Beni gerçekten gördüğünü hissettirdiğin anları çok seviyorum.",
    "Senin sevginde kendime daha yakın hissediyorum.",
    "Sen benim için unutulmayacak insanlardan biri değil, unutmak istemeyeceğim insansın.",
    "Seninle ilgili bir şey anlatırken bile sesimin değiştiğini fark ediyorum.",
    "Hayatıma kattığın güzelliklerin farkında olduğunu umuyorum.",
    "Senin yanında kalbim gereksiz yere tetikte olmuyor.",
    "Sana duyduğum sevgide en çok doğallığı seviyorum.",
    "Sen benim için güzel bir anı değil, devam etmesini istediğim bir hikâyesin.",
    "Seninle ilgili düşündüğüm en küçük şey bile bazen günümü güzelleştiriyor.",
    "Sana değer vermek benim için hiçbir zaman yük olmadı.",
    "Senin varlığını hayatımın güzel bir parçası olarak görüyorum.",
    "Kalbimde senin adının olduğu yeri hiçbir kelime tarif edemez.",
    "Seninle konuşurken zamanın yavaşlamasını isterdim.",
    "Senin yanında kendimi daha cesur hissediyorum.",
    "Sana baktığımda içimde açıklayamadığım bir yakınlık hissediyorum.",
    "Seninle paylaşmak istediğim o kadar çok küçük an var ki.",
    "Sen benim için sadece sevilen değil, özlenen de birisin.",
    "Seninle kurduğum bağın değerini her geçen gün daha fazla hissediyorum.",
    "Bazen hiçbir şey yapmadan yanımda olman bile bana yeter.",
    "Senin varlığın benim için bir alışkanlık değil, bir ayrıcalık.",
    "Sana olan sevgim tek bir ana değil, sayısız küçük ana dayanıyor.",
    "Seninle ilgili güzel olan şeyleri saymaya kalksam gece biter.",
    "Seni sevdiğimde içimde bir şeylerin yerine oturduğunu hissediyorum.",
    "Sen benim için kalabalık bir dünyadaki en özel kişisin.",
    "Sana anlatmak istediğim ilk şeylerden biri hep senin ne kadar değerli olduğun.",
    "Senin yanında kendimi anlatmak zorunda kalmadan anlaşılmayı seviyorum.",
    "Seninle geçen zamanın miktarından çok bana hissettirdiklerini önemsiyorum.",
    "Senin gözlerindeki mutluluğu görmek benim de yüzümü güldürüyor.",
    "Sana olan sevgim gösterişli değil ama derin.",
    "Seninle ilgili en sevdiğim şeylerden biri, seni düşünmenin bile güzel hissettirmesi.",
    "Sen benim kalbimin acele etmeden ama emin olarak seçtiği kişisin.",
    "Bazen seni özlediğimi söylemek, hissettiğimin yanında çok küçük kalıyor.",
    "Seninle konuşmak benim için günün küçük mutluluklarından biri.",
    "Senin varlığını düşündüğümde geleceğe dair güzel şeyler hayal ediyorum.",
    "Bana hissettirdiğin yakınlığı başka hiçbir şeye benzetemiyorum.",
    "Seninle kurduğum her bağın daha da güçlenmesini istiyorum.",
    "Senin değerini sadece güzel günlerde değil, her zaman bilmek istiyorum.",
    "Sen benim için sevginin sakin ve güzel tarafısın.",
    "Sana duyduğum şey bir heves olsaydı çoktan geçerdi, ama hâlâ buradayım.",
    "Seninle ilgili hislerimin en güzel tarafı, onları planlamamış olmam.",
    "Seni hayatımda görmek bana gerçekten iyi geliyor.",
    "Seninle ilgili bir mesaj geldiğinde yüzümün değiştiğini inkâr edemem.",
    "Sen benim için kalbimin evet dediği insansın.",
    "Seni düşündüğümde içimde küçücük bir bahar açıyor.",
    "Senin yanındayken en sevdiğim halime dönüşüyorum.",
    "Sana duyduğum sevgi beni senden çok kendim hakkında da düşündürüyor.",
    "Sen benim hayatımdaki en güzel tesadüflerden birisin.",
    "Seninle ilgili anılarımı düşünmek bana hiçbir zaman sıkıcı gelmiyor.",
    "Sana değer vermek için özel bir sebebe ihtiyacım yok.",
    "Senin varlığın başlı başına benim için yeterince özel.",
    "Seninle konuştuğumda bazen bütün günün yorgunluğu gidiyor.",
    "Seni sevmenin ne kadar güzel olduğunu bazen sessizce düşünüyorum.",
    "Sen benim için sadece kalbimi hızlandıran değil, sakinleştiren birisin.",
    "Seninle aynı dünyada olduğumuzu bilmek bile bazen hoşuma gidiyor.",
    "Sana duyduğum sevgiyi her gün başka bir ayrıntıda fark ediyorum.",
    "Senin değerini anlatmaya çalışırken cümlelerim hep yarım kalıyor.",
    "Sen benim için biri değil, doğrudan sensin.",
    "Seni sevmek hayatımın en doğal hislerinden biri oldu.",
    "Senin yanında kusursuz olmaya çalışmak zorunda hissetmiyorum.",
    "Seninle konuşurken içimdeki bütün gürültü biraz susuyor.",
    "Sen benim için güzel hislerin en tanıdık adresisin.",
    "Sana olan sevgim kelimelerden önce kalbimde vardı.",
    "Seninle ilgili bir şey öğrendiğimde seni biraz daha tanımış gibi hissediyorum.",
    "Senin en küçük mutluluğun bile beni ilgilendiriyor.",
    "Seni sevdiğim için hayatımda daha çok güzel anı birikti.",
    "Sen benim için yalnızca sevdiğim kişi değil, önem verdiğim bir dünyasın.",
    "Seninle konuşmanın verdiği rahatlığı hiçbir sohbetle karşılaştırmıyorum.",
    "Senin varlığın hayatımın ritmine güzelce karıştı.",
    "Seni düşündüğümde aklıma gelen ilk şeylerden biri huzur.",
    "Sana olan sevgim bazen sessizce yanımda duran bir ışık gibi.",
    "Seninle ilgili her güzel ayrıntıyı içimde saklamak istiyorum.",
    "Sen benim için anlatması zor ama hissetmesi çok kolay bir sevgisin.",
    "Seninle geçen küçük bir an bile hafızamda uzun süre kalabiliyor.",
    "Sana bakarken içimden kötü hiçbir şey geçmiyor.",
    "Seninle kurduğum bağın benim için ne kadar kıymetli olduğunu bilmeni istiyorum.",
    "Seni sevdiğimde dünya biraz daha güzel görünüyor.",
    "Seninle konuşmak bazen kendime dönmek gibi hissettiriyor.",
    "Sen benim için bir kalp çarpıntısından çok daha fazlasısın.",
    "Sana değer vermek içimden gelen en kolay şeylerden biri.",
    "Seninle ilgili düşündüğüm her güzel şey yüzüme yansıyor.",
    "Sen benim için bir insanın başka bir insanın hayatını ne kadar değiştirebileceğinin kanıtısın.",
    "Sana olan sevgimi korumak istediğim kadar seni de korumak istiyorum.",
    "Senin yanında kendimi daha anlaşılmış hissediyorum.",
    "Sen benim için her zaman özel kalacak birisin.",
    "Seni özlediğimde içimdeki boşluğu başka hiçbir şey doldurmuyor.",
    "Seninle konuşmak için bazen konuya bile ihtiyacım olmuyor.",
    "Senin varlığını bilmek bana tahmin ettiğinden daha çok iyi geliyor.",
    "Sana olan sevgimde beni en çok etkileyen şey, bunun içimden kendiliğinden gelmesi.",
    "Seninle ilgili her anı kalbimde ayrı bir çekmeceye koyuyorum.",
    "Sen benim için güzel bir duygunun insan olmuş halisin.",
    "Sana duyduğum sevgi bir anda başlamış olabilir ama her gün biraz daha büyüyor.",
    "Seninle ilgili hayaller kurarken zamanın nasıl geçtiğini anlamıyorum.",
    "Senin sesini duyduğumda içimde tanıdık bir sıcaklık oluşuyor.",
    "Senin yanında kendimi değerli hissetmem benim için çok kıymetli.",
    "Seni sevdiğimde kalbim sanki doğru yerdeymiş gibi hissediyor.",
    "Sen benim için hayatın güzel sürprizlerinden birisin.",
    "Seninle paylaştığım şeylerin değerini hiçbir zaman küçümsemiyorum.",
    "Seni hayatımda görmek benim için gerçekten önemli.",
    "Seninle konuşurken bazen söyleyeceklerimi unutuyorum çünkü seni dinlemek daha güzel geliyor.",
    "Senin sevgini hissettiğim anlarda içimde tarifsiz bir rahatlık oluyor.",
    "Sen benim için bir alışkanlıktan çok daha derin bir bağsın.",
    "Sana olan sevgim her geçen gün daha sakin ama daha güçlü bir hale geliyor.",
    "Senin varlığını hiçbir zaman sıradanlaştırmak istemiyorum.",
    "Sen benim için kalbimin en güzel hikâyelerinden birisin.",
    "Seni düşündüğümde içimde bir şeylerin güzelce kıpırdadığını hissediyorum.",
    "Seninle ilgili güzel şeyler anlatmak bana hiçbir zaman fazla gelmiyor.",
    "Sen benim için sevilmesi kolay değil, sevilmesi kaçınılmaz birisin.",
    "Sana değer verdiğimi hissettirebildiğim her an beni mutlu ediyor.",
    "Seninle birlikte büyüyen anılarımızı çok değerli buluyorum.",
    "Sen benim için hayatın içinde kaybolduğumda dönmek istediğim bir his gibisin.",
    "Seni sevdiğimi söylemek bazen hissettiğim şeyin sadece küçük bir kısmı.",
    "Senin varlığın kalbimde güzel bir iz bırakmaktan çok daha fazlasını yaptı.",
    "Seninle ilgili düşündüğümde geleceğin korkutucu değil, güzel taraflarını görüyorum.",
    "Sana duyduğum sevgi bana sabretmeyi ve anlamayı da öğretiyor.",
    "Sen benim için bir insanın değerinin ne kadar büyük olabileceğini gösterdin.",
    "Seninle konuşurken en sevdiğim şey, olduğum kişi gibi kalabilmem.",
    "Senin mutluluğunu kendi mutluluğum kadar önemsemek bana doğal geliyor.",
    "Senin yanında içimdeki çocuk bile mutlu oluyor.",
    "Seninle geçirdiğim hiçbir zamanı boşa geçmiş gibi görmüyorum.",
    "Seni sevmenin bende bıraktığı his tarif edilemeyecek kadar gerçek.",
    "Sen benim için güzel bir başlangıçtan çok daha fazlasısın.",
    "Sana olan sevgimi gösterebildiğim her an kendimi şanslı hissediyorum.",
    "Seninle ilgili sevdiğim şeylerin başında seni değiştirmeden sevebilmek geliyor.",
    "Sen benim için kendimi güvende hissettiğim güzel bir duyguya benziyorsun.",
    "Seninle ilgili en güzel şeylerden biri, bana kendimi özel hissettirebilmen.",
    "Sana bakınca aklıma iyi ki kelimesi geliyor.",
    "Senin hayatımda olman bana bazen dünyanın hâlâ güzel bir yer olduğunu hatırlatıyor.",
    "Seninle konuşmak içimdeki bütün düşünceleri biraz daha sessiz hale getiriyor.",
    "Seni sevmek bana kalbimin ne kadar derin hissedebildiğini gösterdi.",
    "Senin varlığın benim için hiçbir zaman küçük bir şey olmadı.",
    "Sen benim için sevginin sadece sözlerden oluşmadığını gösteren kişisin.",
    "Sana duyduğum hislerin içinde hayranlık, özlem, huzur ve sevgi aynı anda var.",
    "Seninle ilgili en güzel şeylerden biri, seni her tanıdığımda başka bir yanını sevmem.",
    "Sen benim için her gün yeniden keşfetmek istediğim birisin.",
    "Sana olan sevgim bir yere sığmıyor ama kalbimde kendine mükemmel bir yer buluyor.",
    "Senin yanında geçen birkaç dakika bile bazen bütün günümü güzelleştiriyor.",
    "Sen benim için sadece kalbimde değil, düşüncelerimde de çok özel bir yerdesin.",
    "Seni sevdiğimde hiçbir şeyi kanıtlamak zorunda hissetmiyorum.",
    "Seninle ilgili güzel bir şey düşündüğümde içimde sessiz bir mutluluk oluşuyor.",
    "Sen benim için özlediğimde eksikliğini gerçekten hissettiğim birisin.",
    "Sana verdiğim değerin ölçüsü yok çünkü bunu sayılarla anlatamam.",
    "Seninle konuşurken bazen hayatın en güzel tarafının basit şeyler olduğunu düşünüyorum.",
    "Sen benim için sevginin sakin ama güçlü tarafısın.",
    "Seni sevmenin en güzel taraflarından biri, bunu sana hissettirmek istemem.",
    "Seninle ilgili her güzel ayrıntı benim için ayrı bir anlam taşıyor.",
    "Sen benim kalbimde yalnızca bir yer edinmedin, orayı güzelleştirdin.",
    "Sana olan sevgim bazen tek bir bakışta bile kendini belli ediyor.",
    "Senin yanında olmak için özel bir güne ihtiyacım yok.",
    "Sen benim için her gün sevilebilecek kadar özelsin.",
    "Seni düşündüğümde içimde bir şeylerin yoluna girdiğini hissediyorum.",
    "Seninle ilgili en sevdiğim şeylerden biri, seni sevmenin bana ağır gelmemesi.",
    "Sana değer vermek benim için görev değil, içimden gelen bir şey.",
    "Sen benim için bir insanın hayatındaki güzel şanslardan birisin.",
    "Seni sevdiğim için pişman olabileceğim tek bir an bile düşünemiyorum.",
    "Seninle paylaştığım duyguların benim için çok gerçek bir anlamı var.",
    "Sen benim için kalabalığın içindeki sessiz huzursun.",
    "Sana duyduğum sevgiyi her düşündüğümde biraz daha büyümüş buluyorum.",
    "Senin yanında kendimi anlatırken kelimeleri seçmek zorunda kalmıyorum.",
    "Sen benim için yalnızca sevgi değil, aynı zamanda bağlılık ve değer demeksin.",
    "Seni hayatımda gördüğüm her anı kıymetli buluyorum.",
    "Seninle ilgili en güzel hayallerimin içinde hep bir gülüşün var.",
    "Sen benim kalbimde geçici bir yer değil, özel bir iz bıraktın.",
    "Seninle ilgili konuşurken gözlerimin parladığını saklayamam.",
    "Sana olan sevgim bana bazen hiç bilmediğim kadar güzel hisler yaşatıyor.",
    "Seninle kurduğumuz bağın her küçük parçası benim için değerli.",
    "Sen benim için seviyorum demenin yetmediği kişisin.",
    "Seni tanımak hayatımın güzel dönemeçlerinden biri oldu.",
    "Seninle konuşurken içimde bir güven duygusu oluşuyor.",
    "Senin yanında olduğumda kendimi daha az yalnız hissediyorum.",
    "Sana duyduğum sevgide en çok gerçekliğini seviyorum.",
    "Sen benim için kalbimin en sevdiği insansın.",
    "Seni özlemek bile bana senin ne kadar önemli olduğunu hatırlatıyor.",
    "Seninle ilgili küçük ayrıntıları hatırlamak hoşuma gidiyor.",
    "Sen benim için sadece sevdiğim biri değil, hayatımda iz bırakan birisin.",
    "Sana duyduğum sevgiyi anlatırken hep eksik kalıyormuşum gibi hissediyorum.",
    "Seninle konuşmak için bahaneye ihtiyaç duymuyorum çünkü sen zaten bahanesin.",
    "Sen benim için günün en güzel tesadüflerinden birisin.",
    "Seninle ilgili güzel düşüncelerim hiçbir zaman tükenmiyor.",
    "Sana baktığımda içimde güzel bir sakinlik oluşuyor.",
    "Senin varlığın bana kendimi önemli hissettiren şeylerden biri.",
    "Seni sevdiğimde hayatın bazı ayrıntıları daha anlamlı geliyor.",
    "Sen benim için kalbimin sessizce seçtiği en güzel kişisin.",
    "Sana duyduğum sevgide acele yok ama vazgeçmek de yok.",
    "Seninle geçirdiğim zamanın her dakikasında ayrı bir anlam bulabiliyorum.",
    "Sen benim için güzel bir şarkının en sevdiğim kısmı gibisin.",
    "Seni düşündüğümde istemsizce gülümsüyorsam suç sende.",
    "Seninle ilgili bir mesaj görmek bile bazen bütün modumu değiştiriyor.",
    "Sen benim için birinin iyi ki varsın demesini hak eden kişisin.",
    "Sana değer vermek bana hiçbir zaman zor gelmedi.",
    "Seninle kurduğum hayallerin en güzel tarafı içinde senin olman.",
    "Sen benim için kalbimin acele etmeden bağlandığı birisin.",
    "Seni sevmek bana kendimde bile fark etmediğim güzel tarafları gösterdi.",
    "Senin yanında susmak bile bana güzel geliyor.",
    "Sen benim için huzurun, heyecanın ve sevginin aynı yerde buluştuğu kişisin.",
    "Sana duyduğum sevgi bazen hiç konuşmadan bile kendini belli ediyor.",
    "Senin hayatımdaki yerini başka hiçbir şeyle değiştirmek istemem.",
    "Sen benim için bir anlık mutluluk değil, sürekli içimde taşıdığım bir güzelliksin.",
    "Seni düşündüğümde aklıma hep kalbimi yumuşatan şeyler geliyor.",
    "Seninle konuşmak bazen dünyanın bütün karmaşasından uzaklaşmak gibi.",
    "Sen benim için sıradan bir seviyorumun çok ötesindesin.",
    "Sana duyduğum sevgi, seni her gün biraz daha tanımak istememe neden oluyor.",
    "Senin yanında olduğumda zamanın hızlı geçmesine sinir oluyorum.",
    "Sen benim için kalbimdeki en güzel ayrıcalıksın.",
    "Seni sevmenin bana verdiği huzuru hiçbir şey taklit edemez.",
    "Seninle ilgili her güzel anıyı tekrar tekrar hatırlayabilirim.",
    "Sana baktığımda içimden seni ne kadar sevdiğimi söylemek geliyor.",
    "Sen benim için hayatın içindeki en güzel denk gelmelerden birisin.",
    "Seninle konuşmak bazen ihtiyacım olan tek şey olabiliyor.",
    "Sana verdiğim değer herhangi bir şartla ölçülemeyecek kadar içten.",
    "Sen benim için yalnızca kalbimi değil, günlerimi de güzelleştirdin.",
    "Seni sevdiğim için kendimi hiç eksik hissetmedim.",
    "Sen benim için güzel bir duygunun en gerçek halisin.",
    "Seninle ilgili düşündüğüm her şeyin içinde biraz huzur var.",
    "Seni sevmek kalbimde ağır bir yük değil, güzel bir hafiflik.",
    "Senin yanında kendimi olduğum kişiden utanmadan var edebiliyorum.",
    "Sen benim için hayatın güzel tarafını hatırlatan insanlardan birisin.",
    "Sana olan sevgim zaman geçtikçe alışkanlığa değil, daha derin bir bağa dönüşüyor.",
    "Seninle ilgili bir şey anlatırken yüzümdeki gülümsemeyi kontrol edemiyorum.",
    "Sen benim için bir insanın özel kelimesini hak edebileceğinin kanıtısın.",
    "Seni düşündüğümde içimde güzel bir beklenti oluşuyor.",
    "Seninle paylaşmak istediğim daha çok anı olması beni mutlu ediyor.",
    "Sana duyduğum sevgi bazen içimde sessizce büyüyen bir şey gibi.",
    "Sen benim için sadece bugünümde değil, düşüncelerimde de varsın.",
    "Seninle konuştuğumda kendimi daha anlaşılır hissediyorum.",
    "Seni hayatımın içinde görmek benim için gerçekten değerli.",
    "Senin varlığınla bazı günler daha katlanılır, bazı günler daha güzel oluyor.",
    "Sen benim için sevgiyi düşününce aklıma gelen ilk kişilerden birisin.",
    "Sana değer vermemin sebebi sadece seni sevmem değil, seni gerçekten önemsemem.",
    "Senin yanında kendimi bir başkasına dönüştürmeye çalışmıyorum.",
    "Seni sevdiğimde içimde bir şeyler doğru yere oturuyor.",
    "Sen benim için bir kalp atışından çok daha derin bir his oldun.",
    "Sana olan sevgimin içinde sana duyduğum saygı da var.",
    "Seninle ilgili en sevdiğim şey, seni tanıdıkça sevgimin azalmak yerine değişerek büyümesi.",
    "Sen benim için güzel bir başlangıcın en güzel devamısın.",
    "Sana duyduğum sevgiyi bazen sadece gözlerim anlatabiliyor.",
    "Seninle konuşurken bazen söyleyecek hiçbir şeyim olmasa bile kalmak istiyorum.",
    "Sen benim için bir yere değil, doğrudan kalbime ait gibisin.",
    "Seni özlediğimde ilk aklıma gelen şey sana sarılmak oluyor.",
    "Seninle ilgili güzel bir anıyı hatırlamak bile içimi ısıtıyor.",
    "Sen benim için hayatın içindeki en güzel detaylardan birisin.",
    "Sana olan sevgim başkalarının anlamasına ihtiyaç duymuyor.",
    "Seninle ilgili hislerimin gerçekliğini en iyi kalbim biliyor.",
    "Sen benim için iyi ki tanımışım dediğim insanlardan birisin.",
    "Seni sevmek bana bazen dünyanın bütün gürültüsünü unutturuyor.",
    "Senin varlığın bana kendimi daha özel hissettiriyor.",
    "Sana değer verdiğimi söylemekten hiçbir zaman sıkılmayacağım.",
    "Sen benim için bir insanın kalbe ne kadar güzel dokunabileceğinin örneğisin.",
    "Seni düşündüğümde içimdeki bütün sertlik yumuşuyor.",
    "Seninle ilgili güzel şeyleri fark etmek bana çok kolay geliyor.",
    "Sen benim için sevgiyi anlatmak yerine yaşatan kişisin.",
    "Sana duyduğum hislerimin en güzel tarafı, onları saklamak istememem.",
    "Seninle ilgili her küçük şey bende büyük bir iz bırakabiliyor.",
    "Sen benim için bir hayal değil, gerçek olduğu için şükrettiğim birisin.",
    "Seni sevdiğimde kalbim sanki kendine ait bir dil buluyor.",
    "Senin yanında zaman geçirmek bana hiçbir zaman yetmiyor.",
    "Sana olan sevgimi tek bir güne sığdırmak mümkün değil.",
    "Sen benim için hayatımın güzel bir parçası değil, önemli bir parçasısın.",
    "Seni düşündüğümde içimde küçük bir mutluluk patlıyor.",
    "Seninle konuşurken kendimi dünyanın en şanslı insanı gibi hissettiğim anlar oluyor.",
    "Sana değer vermek benim için doğal olduğu kadar özel.",
    "Sen benim için sevginin güven veren yüzüsün.",
    "Seni sevmek hayatımın en güzel hislerinden biri.",
    "Seninle ilgili en sevdiğim şeylerden biri, seni anlatırken ne kadar çok şey söylemek istediğimi fark etmem.",
    "Sana olan sevgim bazen bir cümleye sığmayacak kadar sessiz ve derin.",
    "Sen benim için kalbimin en sevdiği tesadüfsün.",
    "Seni gördüğümde bütün dikkatimin sana kaymasını seviyorum.",
    "Seninle konuşmak bana bazen evimdeymişim gibi hissettiriyor.",
    "Sana verdiğim değerin farkında olmanı gerçekten isterim.",
    "Sen benim için unutulmayacak anıların çoğunda bulunan kişisin.",
    "Seni sevdiğimde kendimi daha açık ve gerçek hissediyorum.",
    "Senin yanında küçük şeylerden bile mutlu olabiliyorum.",
    "Sen benim için sevginin karmaşık değil, gerçek olan tarafısın.",
    "Sana duyduğum sevgi sadece kalbimde değil, bütün güzel düşüncelerimde var.",
    "Seninle ilgili bir şey gördüğümde aklıma gelmen artık hayatımın tatlı bir parçası.",
    "Sen benim için günün sonunda konuşmak istediğim kişisin.",
    "Sana değer verdiğimi sana hissettirebilmek benim için önemli.",
    "Senin yanında kendimi olduğumdan daha az değil, daha çok hissediyorum.",
    "Seni sevdiğim için bazı anların daha özel hale geldiğini fark ettim.",
    "Sen benim için bir insanın hayatına bırakabileceği en güzel izlerden birisin.",
    "Sana duyduğum sevgi her zaman aynı şekilde görünmese bile hep çok gerçek.",
    "Seninle ilgili hayal kurmak bile benim için güzel bir kaçış.",
    "Sen benim için kalbimin en güzel köşesine yerleşmiş birisin.",
    "Seni düşündüğümde içimde bir iyi ki yankılanıyor.",
    "Seninle ilgili hislerimi anlatmak yerine bazen sana sadece sarılmak isterdim.",
    "Sen benim için güzel bir günün sebebi olabilecek kadar özelsin.",
    "Sana duyduğum sevgide en çok seni olduğun kişi olarak sevmeyi seviyorum.",
    "Seninle kurduğum bağın benim için ne kadar kıymetli olduğunu bilmeni isterim.",
    "Sen benim için birinin hayatında bulunmasından çok daha fazlasını ifade ediyorsun.",
    "Seni sevmenin en güzel tarafı, bunu düşünürken bile içimin ısınması.",
    "Senin yanında kendimi kanıtlamak zorunda hissetmiyorum.",
    "Sen benim için kalbimin güvenerek açıldığı birisin.",
    "Sana olan sevgim bir kelimeden çok daha büyük bir his.",
    "Seninle konuşurken bazen saatlerin durmasını istiyorum.",
    "Seni özlediğimde kalbimdeki yerini daha net anlıyorum.",
    "Sen benim için güzel anıların değil, güzel geleceklerin de içindesin.",
    "Sana değer verdiğim kadar seni anlamayı da istiyorum.",
    "Senin varlığın bana tahmin ettiğinden daha çok huzur veriyor.",
    "Sen benim için kalbimin en güzel sırrı gibisin.",
    "Seni sevdiğimi her söylediğimde aynı kelime olsa da hissettiğim şey biraz daha büyüyor.",
    "Seninle ilgili düşündüğümde içimde bir sakinlik oluyor.",
    "Sen benim için hayatımın güzel taraflarından birini değil, birkaçını aynı anda temsil ediyorsun.",
    "Sana duyduğum sevgi bazen gözlerimde, bazen sesimde, bazen sessizliğimde oluyor.",
    "Sen benim için her halinle değerli olan birisin.",
    "Seni tanıdıkça sana olan merakım hiç azalmıyor.",
    "Senin yanında kendimi daha özgür hissediyorum.",
    "Sana olan sevgim bir anlık heyecan değil, içimde yer etmiş gerçek bir bağ.",
    "Sen benim için güzel hislerin başlangıç noktası gibisin.",
    "Seni sevdiğimde içimde bir şeylerin daha güzel olduğuna inanıyorum.",
    "Seninle ilgili en sevdiğim şeylerden biri, seni düşündüğümde yüzümün gülmesi.",
    "Sana verdiğim değeri kelimelerden çok davranışlarımla göstermek istiyorum.",
    "Sen benim için hayatın içinde karşıma çıkan en özel insanlardan birisin.",
    "Seni sevmek benim için hiçbir zaman sıradan bir şey olmayacak.",
    "Seninle konuşurken dünyanın geri kalanının sesini kısmak istiyorum.",
    "Sen benim için kalbimin en güzel alışkanlığından çok daha fazlasısın.",
    "Sana duyduğum sevgi bazen bana bile fazla büyük geliyor.",
    "Senin yanında kendimi daha güzel hissetmemin sebebi senin bana bakışın.",
    "Sen benim için sadece sevdiğim kişi değil, değer verdiğim bir hayat parçasısın.",
    "Seni düşündüğümde aklıma gelen şeylerin çoğu gülümsememe sebep oluyor.",
    "Seninle ilgili hiçbir güzel ayrıntıyı küçük görmüyorum.",
    "Sana duyduğum sevgiyi zaman değil, yaşadığımız şeyler büyütüyor.",
    "Sen benim için kalbimin en uzun süre dinlemek istediği şarkı gibisin.",
    "Seni sevmek bana bazen kelimesiz bir mutluluk veriyor.",
    "Senin yanında kendimi olduğum gibi gösterebilmek benim için çok kıymetli.",
    "Sana olan sevgimin içinde sana duyduğum hayranlık da saklı.",
    "Sen benim için hayatın içinde bulduğum en güzel hislerden birisin.",
    "Seni özlediğimde aslında sadece seni değil, seninle hissettiğim her şeyi özlüyorum.",
    "Seninle konuşmak bazen günün bütün ağırlığını üzerimden alıyor.",
    "Sen benim için kalbimde kolay kolay değişmeyecek bir yere sahipsin.",
    "Sana değer vermek benim için düşünmeden yaptığım güzel şeylerden biri.",
    "Seninle ilgili düşündüğümde içimde hep bir sıcaklık oluyor.",
    "Seni sevmenin en güzel tarafı, sana bunu hissettirmek istemem.",
    "Sen benim için birinin varlığının başka birinin hayatını nasıl güzelleştirebileceğinin örneğisin.",
    "Sana duyduğum sevgi beni senden uzaklaştırmıyor, seni daha iyi tanımaya yaklaştırıyor.",
    "Seninle birlikte geçirdiğim zamanın her halini seviyorum.",
    "Sen benim için yalnızca güzel günlerin değil, zor anların da yanında olmasını istediğim kişisin.",
    "Sana olan sevgim bazen sessiz kalıyor ama asla yok olmuyor.",
    "Senin yanında kalbimin daha rahat attığını hissediyorum.",
    "Seni hayatımda tutan şey sadece aşk değil, sana duyduğum büyük değer.",
    "Sen benim için kalbimin burası güzel dediği yer gibisin.",
    "Sana duyduğum sevgiyi her geçen gün başka bir açıdan keşfediyorum.",
    "Seninle ilgili konuşurken zamanın nasıl geçtiğini fark etmiyorum.",
    "Sen benim için güzel bir anın kendisi kadar değerli birisin.",
    "Seni sevdiğimde hayatımda eksik olan bir şeyin adını bulmuş gibi hissettim.",
    "Senin varlığını düşünmek bile içimde umut bırakıyor.",
    "Sana duyduğum sevgi bazen anlatmaktan çok hissettirmek istediğim bir şey.",
    "Sen benim için her gün yeniden değerini fark ettiğim birisin.",
    "Seninle ilgili en güzel şey, kalbimde kendine özel bir yer oluşturmuş olman.",
    "Seni düşündüğümde içimden sana iyi şeyler dilemek geliyor.",
    "Sen benim için hayatımın güzel tesadüflerinden biri değil, en anlamlılarından birisin.",
    "Sana duyduğum sevgi hiçbir zaman sadece güzel sözlerden ibaret olmadı.",
    "Seninle ilgili hissettiğim şeyin en güzel tarafı, sana yaklaştıkça daha da gerçek gelmesi.",
    "Sen benim için sevginin anlatılmasından çok yaşanması gereken halisin.",
    "Seni gördüğümde içimde oluşan mutluluğu başka hiçbir şey tam olarak açıklayamıyor.",
    "Sana değer vermek kalbimin kendiliğinden yaptığı bir şey.",
    "Seninle konuşmak bana kendimi daha iyi hissettiren küçük mucizelerden biri.",
    "Sen benim için hayatımın içindeki en güzel sensin.",
    "Seni sevdiğim için hayatımda daha fazla güzel şey fark etmeye başladım.",
    "Senin yanında kendimi saklamadan var olmayı seviyorum.",
    "Sana olan sevgim bazen kelimelerden önce gözlerime geliyor.",
    "Sen benim için birinin hayatına girdiğinde ne kadar derin iz bırakabileceğinin kanıtısın.",
    "Seni düşündüğümde içimde hem huzur hem de tatlı bir heyecan oluyor.",
    "Seninle ilgili hissettiğim şeyin adı sevgi ama içinde bundan çok daha fazlası var.",
    "Sen benim için kalbimin her seferinde yeniden seçtiği kişisin.",
    "Sana olan sevgim bir yere ulaşmak için değil, seninle birlikte yürümek için var.",
    "Senin yanında geçen sıradan dakikalar bile benim için kıymetli.",
    "Seni sevdiğimde içimde bir şeylerin daha anlamlı olduğunu hissediyorum.",
    "Sen benim için kalbimin en güzel taraflarını ortaya çıkaran kişisin.",
    "Sana duyduğum sevgi bazen sadece seni düşünmemle bile kendini belli ediyor.",
    "Senin varlığın benim için hayatın güzel bir ayrıntısı değil, büyük bir anlamı.",
    "Seni tanımakla başlayan şeyin bu kadar güzel bir yere gelmesine bayılıyorum.",
    "Sen benim için sevginin en samimi halisin.",
    "Sana değer verdiğimi söylemekten çok, bunu her fırsatta göstermek istiyorum.",
    "Seninle ilgili güzel şeyleri düşündükçe kalbimde sana biraz daha yer açılıyor.",
    "Sen benim için sadece özlediğimde hatırladığım değil, gün içinde kendiliğinden aklıma gelen kişisin.",
    "Seni sevmenin bende oluşturduğu huzur hiçbir şeye benzemiyor.",
    "Senin yanında kendimi olduğumdan daha fazla ben gibi hissediyorum.",
    "Sana duyduğum sevgide en güzel şeylerden biri, seni değiştirmeden sevebilmek.",
    "Sen benim için hayatımda bulunmasını isteyeceğim en güzel insanlardan birisin.",
    "Seni düşündüğümde içimde bir gülümseme beliriyor ve bunun sebebi tamamen sensin.",
    "Seninle ilgili kurduğum her güzel hayalin merkezinde senin mutluluğun da var.",
    "Sana olan sevgim bana bazen kalbin gerçekten kendi yolunu seçebildiğini gösteriyor.",
    "Sen benim için sadece bir sevgili değil, kalbimin çok değer verdiği birisin.",
    "Seni sevdiğim için değil, sen olduğun için sana değer veriyorum.",
    "Seninle geçirdiğim zamanın hiçbir dakikasını sıradan kabul etmiyorum.",
    "Sen benim için kalbimde yer açtığım değil, kalbimde kendine yer bulan kişisin.",
    "Sana duyduğum sevgi her şeyi mükemmel yapmıyor ama güzel şeyleri daha anlamlı yapıyor.",
    "Sen benim için sevgiyi düşündüğümde aklıma gelen sıcaklık gibisin.",
    "Senin yanında kendimi değerli hissetmekten çok, seni değerli hissettirebilmek de benim için önemli.",
    "Seni düşündüğümde içimde oluşan huzurun bir sebebi varsa o da sensin.",
    "Sen benim için güzel bir hikâyenin karakteri değil, hikâyenin kendisindeki en güzel kısımsın.",
    "Sana duyduğum sevgi günler geçtikçe eskimiyor, derinleşiyor.",
    "Sen benim için kalbimin en sevdiği ihtimalsin.",
    "Seni sevdiğimi bazen söylemeden de anlatabildiğimi düşünüyorum.",
    "Seninle ilgili en güzel şey, seni sevdikçe kendimi de daha iyi tanımam.",
    "Sen benim için hayatın içinde karşıma çıkabilecek en güzel duygulardan birisin.",
    "Sana olan sevgim sadece sana baktığımda değil, senden bahsederken de kendini belli ediyor.",
    "Senin varlığın bana bazen hiçbir şeyin mükemmel olmasına gerek olmadığını hatırlatıyor.",
    "Seni özlediğimde kalbimdeki yerini daha çok hissediyorum.",
    "Sen benim için bir günün güzel geçmesi için gereken küçük ama çok değerli sebeplerden birisin.",
    "Sana duyduğum sevgi bana seni her halinle tanımak isteme isteği veriyor.",
    "Senin yanında kendimi tamamlamaya değil, kendim olmaya çalışıyorum.",
    "Sen benim için sevginin hem huzur veren hem kalbi hızlandıran halisin.",
    "Seni hayatımda gördüğüm için gerçekten mutlu olduğumu bilmeni isterim.",
    "Sana olan sevgimin en güzel tarafı, her güzel anımızda biraz daha anlam kazanması.",
    "Sen benim için kalbimin unutmak istemediği en güzel şeylerden birisin.",
    "Seni düşündüğümde geleceğe dair içimde güzel bir his oluşuyor.",
    "Sen benim için sevmenin ötesinde, gerçekten önem vermenin ne demek olduğunu hissettiren kişisin.",
    "Sana duyduğum sevgiyi anlatacak kadar büyük bir kelime bulamadım, o yüzden seni her gün biraz daha seviyorum.",
    "Sen benim için hayatımın en güzel cümlelerinden biri değil, devamını yazmak istediğim bütün hikâyesisin.",
    "Kalbimde sana ayırdığım yerin neden bu kadar özel olduğunu bazen ben bile açıklayamıyorum.",
    "Seni sevmek benim için bir sonuca ulaşmak değil, her gün yeniden güzel bir şey hissetmek.",
    "Ve bütün bu cümlelerin sonunda söyleyebileceğim en basit şey şu: sen benim için düşündüğünden çok daha değerlisin."
];

const getNoteButton =
    document.getElementById("getNote");

const randomNote =
    document.getElementById("randomNote");


if (getNoteButton && randomNote) {

    getNoteButton.addEventListener(
        "click",
        () => {

            const randomIndex =
                Math.floor(
                    Math.random() * notes.length
                );

            randomNote.textContent =
                notes[randomIndex];

        }
    );

}

/* =========================
   NAV ACTIVE STATE
========================= */

const sections =
    document.querySelectorAll("section[id]");

const navLinks =
    document.querySelectorAll(".nav-link");


window.addEventListener(
    "scroll",
    () => {

        let current = "home";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 180;

            if (
                window.scrollY >= sectionTop
            ) {

                current =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                "#" + current
            ) {

                link.classList.add("active");

             }
        });
    }
);

