<%= file 'LICENSE' %> <%

# Note: Fast-two-sum isn't actually fast in JS, and on most pipelined processors
#
# I measured two-sum to be about 30% faster in Firefox and Chrome.
# 
# If we can know that a > b then fast is probably quicker again.

def fast_two_sum(s, t, a, b)
	return <<"END"
// Start fast-two-sum macro
var #{s} = #{a} + #{b}, #{t}

if (#{a} > #{b}) {
	#{t} = #{b} - (#{s} - #{a})
} else {
	#{s} = #{a} - (#{s} - #{b})
}
// End fast-two-sum macro
END
end

def two_sum(s, t, a, b)
	return <<"END"
// Start two-sum macro
var #{s} = #{a} + #{b}
var #{t} = (#{a} - (#{s} - #{b})) + (#{b} - (#{s} - #{a}))
// End two-sum macro
END
end

def veltkamp_split(high, low, a)
	return <<"END"
// Start veltkamp split macro
var #{high} = 134217729 * #{a}, #{low}

#{high} = #{high} + (#{a} - #{high})
#{low}  = #{a} - #{high}
// End veltkamp split macro
END
end

def two_prod(r1, r2, aHigh, aLow, bHigh, bLow, a, b)
	return <<"END"
// Start two-prod macro
var #{r1} = a * b
var #{r2} = -#{r1} + #{aHigh} * #{bHigh} + #{aHigh} * #{bLow} + #{aLow} * #{bHigh} + #{aLow} * #{bLow}
// End two-prod macro
END
end
%>

void function (global) {
	"use strict";

	var CSMath = {}

	<%= file 'accurate.js' %>

	<%= file 'abs.js' %>
	<%= file 'constants.js' %>
	<%= file 'exp.js' %>
	<%= file 'fma.erb.js', :erb %>
	<%= file 'hyperbolic.js' %>
	<%= file 'log.js' %>
	<%= file 'norm.erb.js', :erb %>
	<%= file 'round.js' %>
	<%= file 'sign.js' %>
	<%= file 'sqrt.js' %>
	<%= file 'trigonometric.js' %>

	global.CSMath = CSMath
}(this || global)
