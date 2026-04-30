// Database of shops in Phnom Penh for the demo
const PHNOM_PENH_SHOPS = [
    { name: "Aeon Mall 1 (Sothearos)", price: "$2.50", dist: "1.2km", lat: 11.5501, lng: 104.9282 },
    { name: "Chip Mong Noro Mall", price: "$2.65", dist: "0.8km", lat: 11.5540, lng: 104.9250 },
    { name: "Lucky Supermarket (Sihanouk Blvd)", price: "$2.35", dist: "2.5km", lat: 11.5683, lng: 104.9224 },
    { name: "Makro Sen Sok", price: "$2.10", dist: "8.5km", lat: 11.5960, lng: 104.8720 }
];

// Function to display the list of shops
function showShopList(containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = `<h3 style="color: #852df2; margin-top:20px;">Available in Phnom Penh</h3>`;
    
    PHNOM_PENH_SHOPS.forEach(shop => {
        container.innerHTML += `
            <div class="shop-card">
                <div style="text-align: left;">
                    <strong style="font-size: 18px;">${shop.name}</strong><br>
                    <span style="color: #00ced1; font-weight: bold;">Price: ${shop.price}</span> | 📍 ${shop.dist} away
                </div>
                <button class="btn-pill" onclick="openMap(${shop.lat}, ${shop.lng})">View Location</button>
            </div>
        `;
    });
}

// Function to open Google Maps in a popup
function openMap(lat, lng) {
    const overlay = document.getElementById('mapOverlay');
    overlay.style.display = 'block';
    overlay.innerHTML = `
        <div style="background: white; padding: 20px; border-radius: 20px; height: 90%;">
            <button onclick="document.getElementById('mapOverlay').style.display='none'" 
                    class="btn-pill" style="float: right; margin-bottom: 10px;">Close Map</button>
            <iframe width="100%" height="85%" frameborder="0" style="border-radius: 15px;"
                src="https://maps.google.com/maps?q=${lat},${lng}&hl=en&z=15&output=embed">
            </iframe>
        </div>
    `;
}

// AI Analysis for Image (Talking to Python)
async function analyzeImage() {
    const file = document.getElementById('imageInput').files[0];
    if (!file) return alert("Please select an image first.");
    
    const formData = new FormData();
    formData.append('file', file);
    
    document.getElementById('result').innerText = "AI is identifying product...";
    
    try {
        const response = await fetch('http://localhost:5000/analyze', { method: 'POST', body: formData });
        const data = await response.json();
        
        if (data.status === "match") {
            document.getElementById('result').innerHTML = `✅ Detected: ${data.item}`;
            showShopList('result'); // Automatically show the Phnom Penh list
        } else {
            document.getElementById('result').innerHTML = `❌ ${data.message}`;
        }
    } catch (err) {
        document.getElementById('result').innerText = "Error: Is the Python AI Server running?";
    }
}

// Add this at the top of app.js
window.addEventListener('beforeunload', function () {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s';
});

async function analyzeImage() {
    const fileInput = document.getElementById('imageInput');
    const resultDiv = document.getElementById('result');

    if (fileInput.files.length > 0) {
        resultDiv.innerHTML = "🤖 AI is scanning the pixels...";

        // 1. Convert the uploaded file into an image the AI can see
        const img = new Image();
        img.src = URL.createObjectURL(fileInput.files[0]);

        img.onload = async () => {
            // 2. Load the MobileNet AI model
            const model = await mobilenet.load();

            // 3. Ask the AI: "What is this?"
            const predictions = await model.classify(img);

            // 4. Check the results
            // predictions[0] is the AI's best guess
            const topGuess = predictions[0].className.toLowerCase();
            const confidence = Math.round(predictions[0].probability * 100);

            if (topGuess.includes("milk") || topGuess.includes("carton") || topGuess.includes("bottle")) {
                resultDiv.innerHTML = `✅ <b>Match Found:</b> This looks like Milk (${confidence}% sure).`;
                showShopList('result'); // Triggers your Phnom Penh shop list
            } else {
                resultDiv.innerHTML = `❓ AI thinks this is a <b>${topGuess}</b>. Please upload a clearer photo of milk.`;
            }
        };
    } else {
        alert("Please select an image first.");
    }
}