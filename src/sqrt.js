if (CSMath.accurate['sqrt']) {
	CSMath.sqrt = Math.sqrt
} else {
	/* Algorithm from 'Divide, Square Root and Remainder Algorithms for the IA64 Architecture */
	
	var sqrtApproximation = Math.sqrt
	
	CSMath.sqrt = function (a) {
		var y0 = 1.0 / sqrtApproximation(a)

		var H0 = 0.5 * y0,
			S0 = (a * y0)

		var d0 = -CSMath.fms(S0, H0, 0.5)
	
		var H1 = CSMath.fma(d0, H0, H0),
			S1 = CSMath.fma(d0, S0, S0)

		var d1 = -CSMath.fms(S1, H1, 0.5)

		var H2 = CSMath.fma(d1, H1, H1),
			S2 = CSMath.fma(d1, S1, S1)

		var d2 = -CSMath.fms(S2, H2, 0.5),
			e2 = -CSMath.fms(S2, S2, a)

		var H3 = CSMath.fma(d2, H2, H2),
			S3 = CSMath.fma(e2, H2, S2)
	
		var e3 = -CSMath.fms(S3, S3, a)

		return CSMath.fma(e3, H3, S3)
	}
}

/* TODO: The root functions have low precision */

CSMath.cbrt = function(a) {
	return Math.pow(a, 1.0 / 3.0)
}