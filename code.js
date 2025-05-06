function tsp_hk(distance_matrix) {
    // Number of cities
    const n = distance_matrix.length;

    // Edge cases
    if (n == 0 || n == 1) {
        return 0;
    }

    // Start at infinity so next compared value becomes the "smallest total dist"
    let min_tour_dist = Infinity;

    // Try all possible start cities
    for (let index = 0; index < n; index++) {
        const memory = new Map();

        // Recursive Search with memoization
        // Return distance cost to reach 'current' from 'visited' cities
        function get_shortest_path(unvisited_mask, current) {
            const key = `${unvisited_mask},${current}`;

            // Already have this city pair in memory, return cached answer
            if (memory.has(key)) {
                return memory.get(key);
            }

            // Base case: If only cities checked so far are starting city (index)
            // and current city, then only cost is directly traveling between these 2 cities
            // In bit terms the bitmask representing this situation is (1 << index) | (1 <<  current)
            if (unvisited_mask == ((1 << index) | (1 << current))) {
                const base_cost = distance_matrix[index][current]
                return base_cost;
            }

            // Prepare to find min cost from all the ways we could have arrived at current city
            let min_dist = Infinity;

            // Try every city that was visited before getting to current
            for (let index_j = 0; index_j < n; index_j++) {

                // Skip if:
                // 1. city is the same as current, we can't travel to a city from itself
                // 2. city isnt in unvisited_mask, since we haven't gotten that comparison yet
                // unvisited_mask & (1 << index_j) = 0 if city's bit is 0
                if (index_j == current || (unvisited_mask & (1 << index_j)) == false) {
                    continue;
                }

                // Remove current city to get subset of cities that lead up to prev city.
                // current city is removed by toggling its bit off
                // Example: visited = 0b10111 (cities {0, 1, 2, 4}), current = 2
                // 1 << 2 = 0b00100
                // visited ^ (1 << 2) = 0b10011 (city 2 set as cleared)
                const prev_checked = unvisited_mask ^ (1 << current);
                const recursive_cost = get_shortest_path(prev_checked, index_j);
                const travel_cost = distance_matrix[index_j][current];
                const total_cost = recursive_cost + travel_cost;

                min_dist = Math.min(min_dist, total_cost);
            }

            // Cache result to not do this comparison again
            memory.set(key, min_dist);
            return min_dist;
        }

        // Create bitmask with all n cities present: 0b111 ... 1
        // (1 << n) outputs b100 ... 0, and then minus 1 creates the desired binary mask
        // For example a 3x3 matrix would result in all_cities_mask = 0b111
        const all_cities_mask = (1 << n) - 1;

        // Try all possible end destination cities
        for (let end_index = 0; end_index < n; end_index++) {
            if (end_index == index) {
                continue;
            }

            const cost = get_shortest_path(all_cities_mask, end_index);
            min_tour_dist = Math.min(min_tour_dist, cost);
        }
    }

    return min_tour_dist;
}