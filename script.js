console.log("Script.js working")

const populate = async (value, currency) => {
    let myStr = ""
    const apiKey = "cur_live_9APIzitHrmYJAHXaOt8r8Tl2V0qxeZtqSSWGhimC"
    const url = `https://api.currencyapi.com/v3/latest?apikey=${apiKey}&base_currency=${currency}`
    
    try {
        const response = await fetch(url)
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const rJson = await response.json()
        
        if (!rJson.data) {
            throw new Error('No data received from API')
        }
        
        // Create table rows for each currency
        for (let key of Object.keys(rJson.data)) {
            myStr += `
                <tr>
                    <td>${key}</td>
                    <td>${rJson.data[key].code}</td>
                    <td>${Math.round(rJson.data[key].value * value)}</td>
                </tr>
            `
        }
        
        const tableBody = document.querySelector("tbody");
        tableBody.innerHTML = myStr;
        
        // Show the output section
        document.querySelector(".output").style.display = "block";
    } catch (error) {
        console.error("Error fetching currency data:", error);
        // Show error message to user
        const tableBody = document.querySelector("tbody");
        tableBody.innerHTML = `
            <tr>
                <td colspan="3">Error loading currency data. Please check your API key and try again.</td>
            </tr>
        `;
        document.querySelector(".output").style.display = "block";
    }
}

const btn = document.querySelector(".btn")
btn.addEventListener("click", (e) => {
    e.preventDefault()
    const value = parseInt(document.querySelector("input[name='quantity']").value);
    const currency = document.querySelector("select[name='currency']").value
    populate(value, currency)
})

// Hide output section initially
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".output").style.display = "none";
})