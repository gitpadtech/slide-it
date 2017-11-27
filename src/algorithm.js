export function clamp(min, max) {
  return function(v) {
    return v < min ? min :  v > max ? max : v;
  }
}

export function mapDistance(touchMoveDistance) {
  return touchMoveDistance / 3;
}

mapDistance.reverse = function (viewDistance) {
  return viewDistance * 3;
}