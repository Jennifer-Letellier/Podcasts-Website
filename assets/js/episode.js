const x2js = new X2JS();
const days = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
const months = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "décembre"];

var xmlHttp = new XMLHttpRequest();
xmlHttp.open("GET", "https://feeds.redcircle.com/abde4d54-c06a-4ab0-86e5-b6daceede88f", false);
xmlHttp.send(null);

const rawFeed = xmlHttp.responseText.split("\n").slice(1).join('\n');
const jsonFeed = x2js.xml_str2json(rawFeed);
const items = jsonFeed.rss.channel.item;

const item = items[document.location.search.split("=")[1]];
console.log(item)

window.onload = function() {
    document.title = `${item.title[1]} | Jennifer Letellier`;
    document.getElementById("audio").src = item.enclosure._url;
    document.getElementById("title").innerText = item.title[1];
    document.getElementById("description").innerHTML = item.description.split("------")[0].slice(0, -3);
    document.getElementById("date").innerText = `${days[new Date(item.pubDate).getDay()]} ${new Date(item.pubDate).getDate()} ${months[new Date(item.pubDate).getMonth()]} ${new Date(item.pubDate).getFullYear()}`;
}