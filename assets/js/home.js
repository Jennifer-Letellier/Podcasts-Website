const x2js = new X2JS();
const days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
const months = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "décembre"];

var xmlHttp = new XMLHttpRequest();
xmlHttp.open("GET", "https://feeds.redcircle.com/abde4d54-c06a-4ab0-86e5-b6daceede88f", false);
xmlHttp.send(null);

const rawFeed = xmlHttp.responseText.split("\n").slice(1).join('\n');
const jsonFeed = x2js.xml_str2json(rawFeed);
const items = jsonFeed.rss.channel.item;

window.onload = function () {
    items.forEach(item => {
        const newElement = document.createElement("div");
        newElement.className = "episodeItem";
        newElement.innerHTML = `
            <img class="cover" src="${(item.image) ? item.image._href : jsonFeed.rss.channel.image._href}">
            <div class="meta">
                <h2>${item.title[1]}</h2>
                <p>${days[new Date(item.pubDate).getDay()]} ${new Date(item.pubDate).getDate()} ${months[new Date(item.pubDate).getMonth()]} ${new Date(item.pubDate).getFullYear()}</p>
            </div>
        `;
        newElement.onclick = function () { document.location.href = `/episode/?episode=${item.enclosure._url.split("/")[4]}`; };

        document.getElementById("episodesList").appendChild(newElement);
    });
}