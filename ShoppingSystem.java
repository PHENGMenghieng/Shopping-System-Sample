import java.util.*;
import java.util.stream.Collectors;

public class ShoppingSystem {

    // Represents a shop entry found via Google Maps
    static class Shop {
        String name;
        String location; // e.g., "Phnom Penh, Riverside"
        double price;
        double distanceKm; // Calculated via Google Maps API
        int stockCount;

        Shop(String n, String l, double p, double d, int s) {
            this.name = n;
            this.location = l;
            this.price = p;
            this.distanceKm = d;
            this.stockCount = s;
        }
    }

    public List<Shop> getSortedResults(String product, String sortType) {
        // Mock data representing stores in Cambodia
        List<Shop> results = new ArrayList<>();
        results.add(new Shop("Aeon Mall Mean Chey", "Phnom Penh", 1200.00, 2.5, 5));
        results.add(new Shop("Lucky Supermarket", "Sihanoukville", 1150.00, 150.0, 2));
        results.add(new Shop("Chip Mong 271 Mega Mall", "Phnom Penh", 1250.00, 4.2, 10));
        results.add(new Shop("Macro Market", "Siem Reap", 1100.00, 320.0, 1));

        // AI Sorting Logic
        if (sortType.equals("price_low")) {
            results.sort(Comparator.comparingDouble(s -> s.price));
        } else if (sortType.equals("availability")) {
            results.sort((s1, s2) -> s2.stockCount - s1.stockCount);
        } else {
            // Default: Sort by Closeness (Distance)
            results.sort(Comparator.comparingDouble(s -> s.distanceKm));
        }

        return results;
    }

    public static void main(String[] args) {
        ShoppingSystem system = new ShoppingSystem();
        // Example: Searching for "iPhone" sorted by closeness
        List<Shop> nearest = system.getSortedResults("iPhone", "distance");
        
        System.out.println("Results for Cambodia (Sorted by Distance):");
        for (Shop s : nearest) {
            System.out.println(s.name + " - " + s.price + "$ - " + s.distanceKm + "km away");
        }
    }
}