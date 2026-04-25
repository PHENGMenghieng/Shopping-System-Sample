public class manager {
    // This represents the data that would be "Trained" or fetched from Google Maps
    public String processQuery(String userQuery) {
        if(userQuery.contains("milk")) {
            return "AI Analysis: Found 3 shops in Phnom Penh selling Milk. Best Price: $2.35 at Lucky.";
        }
        return "AI Analysis: Product not found in local Cambodia database.";
    }
}