/*
 * Copyright (c) 2012, Jens Nockert
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met: 
 * 
 *  1. Redistributions of source code must retain the above copyright notice, 
 *     this list of conditions and the following disclaimer. 
 *  2. Redistributions in binary form must reproduce the above copyright notice,
 *     this list of conditions and the following disclaimer in the documentation
 * 	   and/or other materials provided with the distribution. 
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE 
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR 
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

void
function(global) {
    "use strict";

    var CSMath = {}

    if (navigator.userAgent.indexOf("Chrome") != -1) {
        CSMath.accurate = {
            exp: true,
            pow: true,
            log: true,
            sqrt: false
        }
    } else {
        CSMath.accurate = {
            exp: true,
            pow: true,
            log: true,
            sqrt: true
        }
    }

    CSMath.abs = Math.abs
    CSMath.E = Math.E
    CSMath.PI = Math.PI

    CSMath.LN2 = Math.LN2
    CSMath.LN10 = Math.LN10

    CSMath.LOG2E = Math.LOG2E
    CSMath.LOG10E = Math.LOG10E

    CSMath.SQRT2 = Math.SQRT2
    CSMath.SQRT1_2 = Math.SQRT1_2
    /* TODO: All exponential functions have low precision */

    CSMath.exp = Math.exp

    CSMath.exp1m = function(a) {
        return CSMath.exp(a - 1.0)
    }

    CSMath.pow = Math.pow
    /*
     * fma(a, b, c)
     *   - Calculates a * b + c with a single rounding, `a * b + c` in Javascript would otherwise round twice
     */

    CSMath.fma = function(a, b, c) {
        // Start veltkamp split macro
        var aHigh = 134217729 * a,
            aLow

            aHigh = aHigh + (a - aHigh)
            aLow = a - aHigh
            // End veltkamp split macro
            // Start veltkamp split macro
        var bHigh = 134217729 * b,
            bLow

            bHigh = bHigh + (b - bHigh)
            bLow = b - bHigh
            // End veltkamp split macro

            // Start two-prod macro
        var r1 = a * b
        var r2 = -r1 + aHigh * bHigh + aHigh * bLow + aLow * bHigh + aLow * bLow
        // End two-prod macro

        // Start two-sum macro
        var s = r1 + c
        var t = (r1 - (s - c)) + (c - (s - r1))
        // End two-sum macro

        return s + (t + r2)
    }

    /*
     * fms(a, b, c)
     *   - Calculates a * b - c with a single rounding, `a * b - c` in Javascript would otherwise round twice
     */

    CSMath.fms = function(a, b, c) {
        // Start veltkamp split macro
        var aHigh = 134217729 * a,
            aLow

            aHigh = aHigh + (a - aHigh)
            aLow = a - aHigh
            // End veltkamp split macro
            // Start veltkamp split macro
        var bHigh = 134217729 * b,
            bLow

            bHigh = bHigh + (b - bHigh)
            bLow = b - bHigh
            // End veltkamp split macro

            // Start two-prod macro
        var r1 = a * b
        var r2 = -r1 + aHigh * bHigh + aHigh * bLow + aLow * bHigh + aLow * bLow
        // End two-prod macro

        // Start two-sum macro
        var s = r1 + -c
        var t = (r1 - (s - -c)) + (-c - (s - r1))
        // End two-sum macro

        return s + (t + r2)
    }
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
    CSMath.norm2 = function() {
        var list = Array.prototype.slice.call(arguments).sort(function(a, b) {
            return Math.abs(b) - Math.abs(a)
        })

        var head = CSMath.abs(list[0]),
            s = 1.0,
            c = 0.0,
            n = list.length

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
        var list = Array.prototype.slice.call(arguments).sort(function(a, b) {
            return Math.abs(b) - Math.abs(a)
        })

        var head = CSMath.abs(list[0]),
            s = 1.0,
            c = 0.0,
            n = list.length

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
    /* TODO: The trigonometric functions have low precision */

    CSMath.round = Math.round

    // CSMath.trunc = ?
    CSMath.sign = function(a) {
        return a / Math.abs(a)
    }
    if (CSMath.accurate['sqrt']) {
        CSMath.sqrt = Math.sqrt
    } else {
        /* Algorithm from 'Divide, Square Root and Remainder Algorithms for the IA64 Architecture */

        Math.sqrt = function(a) {
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
    /* TODO: The trigonometric functions have low precision */

    CSMath.sin = Math.sin
    CSMath.cos = Math.cos
    CSMath.tan = Math.tan

    CSMath.asin = Math.asin
    CSMath.acos = Math.acos
    CSMath.atan = Math.atan

    CSMath.atan2 = Math.atan2

    global.CSMath = CSMath
}(this || global)