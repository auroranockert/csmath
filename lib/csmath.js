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
    /*
     * fma(a, b, c)
     *   - Calculates a * b + c with a single rounding, `a * b + c` in Javascript would otherwise round twice
     */

    function fma(a, b, c) {
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

    function fms(a, b, c) {
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

    CSMath.fma = fma
    CSMath.fms = fms

    function sqrt(a) {
        var g = Math.sqrt(a)
        var h = g / 2

        for (var i = 0; i < 10; i++) {
            var r = fms(g, h, 0.5),
                old = g

                console.log('Intermediates', r, g, h)

                g = fma(g, -r, g)
                h = fma(h, -r, h)
        }

        console.log('Final', g, h)

        return g
    }

    CSMath.sqrt = sqrt

    function sum(list) {
        list = list.sort(function(a, b) {
            return Math.abs(b) - Math.abs(a)
        })

        var s = list[0],
            c = 0.0,
            n = list.length

        for (var i = 1; i < n; i++) {
            var value = list[i]

            var y = c + value
            var u = value - (y - c)

            var t = s + y
            var v = y - (t - s)

            var z = u + v

            s = t + z
            c = z - (s - t)
        }

        return s
    }

    CSMath.sum = sum

    function norm2() {
        var list = Array.prototype.slice.call(arguments).sort(function(a, b) {
            return Math.abs(b) - Math.abs(a)
        })

        console.log(list)

        var head = Math.abs(list[0]),
            s = 1.0,
            c = 0.0,
            n = list.length

        for (var i = 1; i < n; i++) {
            var value = Math.abs(list[i]) / head

            value = value * value

            var y = c + value
            var u = value - (y - c)

            var t = s + y
            var v = y - (t - s)

            var z = u + v

            s = t + z
            c = z - (s - t)
        }

        return Math.sqrt(s * head)
    }

    CSMath.hypot = norm2
    CSMath.norm2 = norm2

    function sign(a) {
        return a / Math.abs(a)
    }

    CSMath.sign = sign

    global.CSMath = CSMath
}(this || global)