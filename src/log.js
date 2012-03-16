/* TODO: All logarithm functions have low precision */

CSMath.log = Math.log

CSMath.log2 = function(a) {
	return CSMath.log(a) / CSMath.LN2
}

CSMath.log10 = function(a) {
	return CSMath.log(a) / CSMath.LN10
}

CSMath.log1p = function(a) {
	return CSMath.log(1.0 + a)
}