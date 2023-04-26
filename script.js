addEventListener("load", async () => {
    let time = document.getElementById("time");
    setData(time);
    let main = setInterval(async () => {
        if (setData(time) == -1) {
            clearInterval(main);
        }
    }, 1800 * 1000);
})

let setData = async (time) => {
    console.log("Updating data...");
    let ctime = new Date();
    console.log(ctime);
    let data = await (await fetch("https://raw.githubusercontent.com/Kanzaji/MMC-Last-Drama/master/data.json")).json();
    if (data == NaN) {
        console.error("Data fetch failed?!");
        time.innerHTML = "An error has occured. Github might be down?";
        return -1;
    } else {
        console.log("Data fetched!");
        console.log(data);
        let days = Math.floor((Date.now() - Date.parse(data.data))/86400000);
        if (days < 0) {
            console.error("Days are below zero! Wrong time zone lol. Resetting to zero");
            days = 0;
        }
        console.log(days + " days since last drama.");
        time.innerHTML = days;
    }
} 