async function generateJoke() {
    const jokeBox = document.getElementById("joke");
    const url = 'https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&format=xml';
    
    try {
        const response = await fetch(url);
        const text = await response.text();
        
        // Parsing the XML response
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "text/xml");
        
        // Check if the joke is in the XML and extract it properly
        const type = xmlDoc.getElementsByTagName("type")[0]?.textContent;

        let joke = '';
        
        if (type === "single") {
            joke = xmlDoc.getElementsByTagName("joke")[0]?.textContent;
        } else if (type === "twopart") {
            const setup = xmlDoc.getElementsByTagName("setup")[0]?.textContent;
            const delivery = xmlDoc.getElementsByTagName("delivery")[0]?.textContent;
            joke = setup + " " + delivery;
        }

        // Display the joke or error message
        if (joke) {
            jokeBox.textContent = joke;
        } else {
            jokeBox.textContent = "Sorry, couldn't fetch a joke right now.";
        }
    } catch (error) {
        jokeBox.textContent = "Error fetching joke: " + error.message;
    }
}