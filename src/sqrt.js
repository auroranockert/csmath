if (CSMath.accurate['sqrt']) {
	CSMath.sqrt = Math.sqrt
} else {
	/* Algorithm from 'Divide, Square Root and Remainder Algorithms for the IA64 Architecture */
	
	Math.sqrt = function (a) {
		var y0 = 1.0 / Math.sqrta(a)

		var H0 = 0.5 * y0,
			S0 = (a * y0)

		var d0 = -Math.fms(S0, H0, 0.5)
	
		var H1 = Math.fma(d0, H0, H0),
			S1 = Math.fma(d0, S0, S0)

		var d1 = -Math.fms(S1, H1, 0.5)

		var H2 = Math.fma(d1, H1, H1),
			S2 = Math.fma(d1, S1, S1)

		var d2 = -Math.fms(S2, H2, 0.5),
			e2 = -Math.fms(S2, S2, a)

		var H3 = Math.fma(d2, H2, H2),
			S3 = Math.fma(e2, H2, S2)
	
		var e3 = -Math.fms(S3, S3, a)

		return Math.fma(e3, H3, S3)
	}
}

/* TODO: The root functions have low precision */

CSMath.cbrt = function(a) {
	return Math.pow(a, 1.0 / 3.0)
}