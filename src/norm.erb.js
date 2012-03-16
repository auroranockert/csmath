CSMath.norm2 = function() {
	var list = Array.prototype.slice.call(arguments).sort(function (a, b) { return Math.abs(b) - Math.abs(a) })

	var head = CSMath.abs(list[0]), s = 1.0, c = 0.0, n = list.length

	for (var i = 1; i < n; i++) {
        var value = CSMath.abs(list[i]) / head

		value = value * value

        var y = c + value
        var u = value - (y - c)

        var t = s + y
        var v = y - (t - s)

        var z = u + v

        s = t + z
        c = z - (s - t)
	}

	return CSMath.sqrt(s * head)
}

CSMath.hypot2 = function() {
	var list = Array.prototype.slice.call(arguments).sort(function (a, b) { return Math.abs(b) - Math.abs(a) })

	var head = CSMath.abs(list[0]), s = 1.0, c = 0.0, n = list.length

	for (var i = 1; i < n; i++) {
        var value = CSMath.abs(list[i]) / head

		value = value * value

        var y = c + value
        var u = value - (y - c)

        var t = s + y
        var v = y - (t - s)

        var z = u + v

        s = t + z
        c = z - (s - t)
	}

	return s * head
}

CSMath.min = Math.min
CSMath.max = Math.max

CSMath.hypot = norm2