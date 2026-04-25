const CAMBODIA_DATA = [
    { name: "Milk", shop: "Chip Mong Noro Mall", price: 2.60, location: "Phnom Penh", distance: 0.8, stock: "In Stock" },
    { name: "Milk", shop: "Aeon Mall 1", price: 2.50, location: "Phnom Penh", distance: 1.2, stock: "In Stock" },
    { name: "Milk", shop: "Lucky Supermarket", price: 2.35, location: "Sihanoukville", distance: 5.5, stock: "Low Stock" }
];

function runAISearch() {
    const input = document.getElementById('productInput').value.toLowerCase();
    const sort = document.getElementById('sortOption').value;
    const display = document.getElementById('resultsDisplay');
    
    let matches = CAMBODIA_DATA.filter(item => item.name.toLowerCase().includes(input));

    // AI Sorting
    if (sort === "price") matches.sort((a, b) => a.price - b.price);
    else if (sort === "distance") matches.sort((a, b) => a.distance - b.distance);

    display.innerHTML = ""; 

    matches.forEach(item => {
        display.innerHTML += `
            <div class="shop-item">
                <div class="info">
                    <h3 style="margin:0">${item.shop}</h3>
                    <p style="color: #666; font-size: 14px;">📍 ${item.location} (${item.distance}km away)</p>
                    <span style="color: ${item.stock === 'In Stock' ? '#28a745' : '#f39c12'}; font-weight: bold;">● ${item.stock}</span>
                </div>
                <div style="text-align: right;">
                    <div style="font-size: 22px; font-weight: bold; color: var(--aqua-primary); margin-bottom: 10px;">$${item.price.toFixed(2)}</div>
                    <button class="view-map-btn">View on Map</button>
                </div>
            </div>
        `;
    });
}

// Listen for file selection
document.getElementById('imageInput')?.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            document.getElementById('imagePreview').src = event.target.result;
            document.getElementById('imagePreviewContainer').style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});

function runImageAI() {
    const display = document.getElementById('resultsDisplay');
    
    // In a real app, you would send the image to an AI (like Google Lens or Gemini)
    // Here, we simulate the AI "recognizing" an item.
    alert("AI is analyzing your image...");
    
    setTimeout(() => {
        // Let's pretend the AI identified the image as "Milk"
        const detectedProduct = "Milk"; 
        
        // Put that name into the search bar and run the search automatically
        document.getElementById('productInput').value = detectedProduct;
        runAISearch(); 
        
        // Scroll down to results
        document.getElementById('resultsDisplay').scrollIntoView({ behavior: 'smooth' });
    }, 1500);
}