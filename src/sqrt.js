/* TODO: The root functions have low precision */

CSMath.sqrt = Math.sqrt

CSMath.cbrt = function(a) {
	return Math.pow(a, 1.0 / 3.0)
}