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