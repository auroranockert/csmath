/*
 * fma(a, b, c)
 *   - Calculates a * b + c with a single rounding, `a * b + c` in Javascript would otherwise round twice
 */

CSMath.fma = function(a, b, c) {
	<%= veltkamp_split('aHigh', 'aLow', 'a') %>
	<%= veltkamp_split('bHigh', 'bLow', 'b') %>
	
	<%= two_prod('r1', 'r2', 'aHigh', 'aLow', 'bHigh', 'bLow', 'a', 'b') %>
	
	<%= two_sum('s', 't', 'r1', 'c') %>
	
	return s + (t + r2)
}

/*
 * fms(a, b, c)
 *   - Calculates a * b - c with a single rounding, `a * b - c` in Javascript would otherwise round twice
 */

CSMath.fms = function(a, b, c) {
	<%= veltkamp_split('aHigh', 'aLow', 'a') %>
	<%= veltkamp_split('bHigh', 'bLow', 'b') %>
	
	<%= two_prod('r1', 'r2', 'aHigh', 'aLow', 'bHigh', 'bLow', 'a', 'b') %>
	
	<%= two_sum('s', 't', 'r1', '-c') %>
	
	return s + (t + r2)
}