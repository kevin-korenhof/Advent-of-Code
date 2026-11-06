import { testInput, input } from "./input.ts";

/**
 * calculate the shortest distance to visit all places.
 */

const data = input.split("\n").map((route) => route.split(" "));

// Get all places

const firstPlace = data[0][0];

const places = data.filter((route) => route[0] === firstPlace).map((place) => place[2]!);

places.push(firstPlace!);

// Get all distances from all places.
let distances: Record<string, any> = {};

places.forEach((place) => {
  distances[place] = new Array();
});

data.forEach((route) => {
  distances[route[0]].push([route[2], Number(route[4])]);
  distances[route[2]].push([route[0], Number(route[4])]);
});

// sort all distances from each place
Object.entries(distances).forEach(([place, distances]) => {
  3;
  distances.sort((a, b) => a[1] - b[1]);
});

let shortestDistance = 99999999999;

// add a place to where we are now and check if it is not to long yet.
function nextRouteStep(currentDistance: Number, visitedPlaces: (keyof typeof distances)[]) {
  const placesLeft = [];

  if (visitedPlaces) {
    const lastPlace = visitedPlaces[visitedPlaces.length - 1];

    distances[lastPlace!].forEach((place) => {
      if (!visitedPlaces.find((p) => p === place[0])) {
        placesLeft.push(place);
      }
    });
  }

  // Add new place and rerun function until all places are visited
  // OR stop this flow if total distance exceeds shortest distance.

  placesLeft.forEach((placeLeft) => {
    const visitPlace = placeLeft[0];
    const distanceToPlace = placeLeft[1];

    const newVisitedPlaces = [...visitedPlaces];
    newVisitedPlaces.push(visitPlace);

    const newDistance = currentDistance + distanceToPlace;

    if (newDistance > shortestDistance) {
      return "Distance to long";
    }

    if (newVisitedPlaces.length === places.length) {
      shortestDistance = newDistance;

      return "New shortest distance";
    }

    if (newVisitedPlaces.length < places.length) {
      nextRouteStep(newDistance, [...newVisitedPlaces]);
    }
  });
}

// Start creating possible routes from each startpoint to find the shortest route possible
places.forEach((place) => {
  nextRouteStep(0, [place]);
});

console.log(shortestDistance);
