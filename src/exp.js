/* TODO: All exponential functions have low precision */

CSMath.exp = Math.exp

CSMath.exp1m = function(a) {
	return CSMath.exp(a - 1.0)
}

CSMath.pow = Math.pow