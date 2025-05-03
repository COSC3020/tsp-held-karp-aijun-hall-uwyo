# Traveling Salesperson Problem -- Held-Karp Algorithm

This exercise is about the Traveling Salesperson Problem I mentioned in the
lecture on NP-hard problems -- given a set of cities, determine the length of
the shortest tour that visits all of them. We can get from any city to any other
city, i.e. the graph of cities is completely connected. We consider the version
of the Traveling Salesperson Problem that finds the shortest tour to visit $n$
cities, starting at a city and ending at the $n$ th city; it *does not* go
back to the start. The start city may be any of the cities. Remember that the
graph for a TSP is undirected, i.e. the cost is the same in either direction.

The Held-Karp algorithm for solving the Traveling Salesperson Problem is a
recursive algorithm that considers every subset of cities and finds shortest
tours within them. It takes advantage of the fact that every subroute of a route
of minimum length is of minimum length itself. The main idea is that to solve
the problem of finding the shortest route for $n$ cities, we first solve the
problem of finding the shortest route for $n-1$ cities, and then find the
shortest route from the $n-1$st city to the $n$th city. The pseudocode for the
algorithm is as follows:

```javascript
// cities is the set of cities not visited so far, including start
heldKarp(cities, start)
  if |cities| == 2
    return length of tour that starts at start, goes directly to other city in cities
  else
    return the minimum of
      for each city in cities, unless the city is start
        // reduce the set of cities that are unvisited by one  (the old start), set the new start, add on the distance from old start to new start
        heldKarp(cities - start, city) + distance from start to city
```

Implement a dynamic programming version (which could use memoization) of the
Held-Karp algorithm. If you use memoization, make sure that the cache is reset
every time the function is called such that multiple calls do not end up using
old and incorrect values. Start with the template I provided in `code.js`.

The function takes a distance matrix (the adjacency matrix for the graph where
the values in the cells are the distances between the corresponding cities) and
returns the length of the shortest tour (not the tour itself).

Test your new function; I've provided some basic testing code in `code.test.js`.

## Runtime Analysis

What is the worst-case asymptotic time complexity of your implementation? What
is the worst-case asymptotic memory complexity? Add your answer, including your
reasoning, to this markdown file.

<hr>

Start from first city and check all subsets of visited cities:

```
for (let index = 0; index < n; index++) {
  ...
  function get_shortest_path(visited, current) {
```

$O(2^n)$ since there are $2^n$ subsets of cities (since we are using bitmasking)

For each subset of visited cities, we consider every possible "current" city. In other words each subset of visited cities can end at any city in that specific subset
`const key = ${visited},${current}`

This solves a subproblem for each visited, current pair in linear time:
$O(n)$

For each visited, current pair, we then loop through all possible previous cities to find the minimum distance.
```
for (let index_j = 0; index_j < n; index_j++) {
    if (index_j == current || !(visited & (1 << index_j))) {
        continue;
    }
    ...
    const recursive_cost = get_shortest_path(prev_visited, index_j);
}
```

The inner loop runs $O(n)$ in the worst case

Therefore the total runtime in the worst case is:
$O(2^n * n^2)$

For the worst-case asymptotic memory complexity, we store results for each unique visited, current pair to avoid recomputation (memoization). There are $2^n$ possible subsets and $n$ options for the current city:

```
const memory = new Map();
memory.set(key, min_dist);
```

$O(2^n * n)$

- Used chatgpt to help debug code specifically. All code was written by me, but used chatgpt to write debug statements and work through getting `get_shortest_path()` to work properly.

- Referenced https://www.geeksforgeeks.org/traveling-salesman-problem-tsp-implementation/ for algorithm analysis and Javascript code reference. All code written by me.

- Referenced https://www.geeksforgeeks.org/travelling-salesman-problem-using-dynamic-programming/ for algorithm analysis and Javascript code reference. All code written by me.

"I certify that I have listed all sources used to complete this exercise, including the use of any Large Language Models. All of the work is my own, except where stated otherwise. I am aware that plagiarism carries severe penalties and that if plagiarism is suspected, charges may be filed against me without prior notice."