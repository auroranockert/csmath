/* TODO: The hyperbolic functions have low precision */

CSMath.sinh = function(a) {
	return (CSMath.exp(a) - CSMath.exp(-a)) / 2.0
}

CSMath.cosh = function(a) {
	return (CSMath.exp(a) + CSMath.exp(-a)) / 2.0
}

CSMath.tanh = function(a) {
	return (CSMath.exp(a) - CSMath.exp(-a)) / (CSMath.exp(a) + CSMath.exp(-a))
}

CSMath.asinh = function(a) {
	return CSMath.log(a + CSMath.sqrt(1.0 + a * a))
}

CSMath.acosh = function(a) {
	return 2.0 * CSMath.log(CSMath.sqrt((a + 1.0) / 2.0) + CSMath.sqrt((a - 1.0) / 2.0))
}

CSMath.atanh = function(a) {
	return (CSMath.log(1.0 + a) - CSMath.log(1.0 - a)) / 2.0
}