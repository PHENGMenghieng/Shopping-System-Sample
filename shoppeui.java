public class shoppeui {
    // This allows you to change the "vibes" based on holidays or trends
    public String[] getBackgroundIcons(String theme) {
        if (theme.equals("technology")) {
            return new String[] {"📱", "💻", "🎧", "🔋"};
        } else if (theme.equals("grocery")) {
            return new String[] {"🥛", "🍎", "🥚", "🍞"};
        }
        return new String[] {"🛒", "🛍️", "💸", "📍"};
    }
}
    
}
