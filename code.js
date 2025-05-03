function tsp_hk(distance_matrix) {
    // Number of cities
    const n = distance_matrix.length;

    // Edge cases
    if (n == 0 || n == 1) {
        console.log(`DEBUG: TRIVIAL CASE DETECTED WITH ${n} CITIES`);
        return 0;
    }

    // Start at infinity so next compared value becomes the "smallest total dist"
    let min_tour_dist = Infinity;

    // Try all possible start cities
    for (let index = 0; index < n; index++) {
        console.log(`\nDEBUG: STARTING TOUR FROM CITY ${index}`);
        const memory = new Map();

        // Recursive Search with memoization
        // Return distance cost to reach 'current' from 'visited' cities
        function get_shortest_path(visited, current) {
            const key = `${visited},${current}`;

            // Already have this city pair in memory, return cached answer
            if (memory.has(key)) {
                console.log(`DEBUG: MEMO HIT FOR (${visited}, ${current}) -> ${memory.get(key)}`);
                return memory.get(key);
            }

            // Base case: If only cities visted so far are starting city (index)
            // and current city, then only cost is directly traveling between these 2 cities
            if (visited == ((1 << index) | (1 << current))) {
                const base_cost = distance_matrix[index][current]
                console.log(`DEBUG: BASE CASE FROM CITY ${index} TO CITY ${current}: COST = ${base_cost}`);
                return base_cost;
            }

            // Prepare to find min cost from all the ways we could have arrived at current city
            let min_dist = Infinity;

            // Try every city that was visited before getting to current
            for (let index_j = 0; index_j < n; index_j++) {

                // Skip if:
                // 1. city is the same as current, we can't travel to a city from itself
                // 2. city isnt in visited, since we haven't gotten that comparison yet
                if (index_j == current || (visited & (1 << index_j)) == false) {
                    continue;
                }

                // Remove current city from visted to get subset of cities that lead up
                // to prev city
                const prev_visited = visited ^ (1 << current);
                const recursive_cost = get_shortest_path(prev_visited, index_j);
                const travel_cost = distance_matrix[index_j][current];
                const total_cost = recursive_cost + travel_cost;

                console.log(`DEBUG: TRYING PATH FROM CITY ${index_j} TO ${current}, VISITED MASK = ${visited.toString(2)}`);
                console.log(`DEBUG: RECURSIVE COST = ${recursive_cost}, TRAVEL COST = ${travel_cost}, TOTAL = ${total_cost}`);

                min_dist = Math.min(min_dist, total_cost);
            }

            // Cache result to not do this comparison again
            memory.set(key, min_dist);
            console.log(`DEBUG: MEMO SET FOR (${visited}, ${current}) -> ${min_dist}`);
            return min_dist;
        }

        const full_visited = (1 << n) - 1;

        // Try all possible end destination cities
        for (let end_index = 0; end_index < n; end_index++) {
            if (end_index == index) {
                continue;
            }

            const cost = get_shortest_path(full_visited, end_index);
            console.log(`DEBUG: TOUR FROM CITY ${index} TO CITY ${end_index} HAS COST ${cost}`);
            min_tour_dist = Math.min(min_tour_dist, cost);
        }
    }

    console.log(`\nDEBUG: SHORTEST TOUR DISTANCE FOUND: ${min_tour_dist}`);
    return min_tour_dist;
}