var accentMap = {
	a: ['a', 'à', 'á', 'â', 'ä', 'æ', 'ã', 'å', 'ā'],
	c: ['c', 'ç', 'ć', 'č'],
	e: ['e', 'è', 'é', 'ê', 'ë', 'ē', 'ė', 'ę'],
	i: ['i', 'î', 'ï', 'í', 'ī', 'į', 'ì'],
	l: ['l', 'ł'],
	n: ['n', 'ñ', 'ń'],
	o: ['o', 'ô', 'ö', 'ò', 'ó', 'œ', 'ø', 'ō', 'õ'],
	s: ['s', 'ß', 'ś', 'š'],
	u: ['u', 'û', 'ü', 'ù', 'ú', 'ū'],
	y: ['y', 'ÿ'],
	z: ['z', 'ž', 'ź', 'ż']
}

function isAccent(letter, correctLetter) {

	var letter        = letter.toLowerCase();
	var correctLetter = correctLetter.toLowerCase();

	function letterKey(let) {

		for (key in accentMap) {
			if(accentMap[key].indexOf(let) > -1) {
				return key
			}
		}

	}

	if (letterKey(letter) === letterKey(correctLetter)) {
		return true
	}
	else {
		return false
	}

}

function compareEqualArrays(arrayA, arrayB, hasAlreadyMessedUp) {

	var hasAlreadyMessedUp = hasAlreadyMessedUp || false;

		for (var i = 0; i < arrayA.length; i++) {

			if (arrayA[i] !== arrayB[i] && hasAlreadyMessedUp !== false) {
				return false
			}
			else if (arrayA[i] !== arrayB[i]) {
				hasAlreadyMessedUp = arrayB[i];

				if(isAccent(arrayA[i], arrayB[i])) {
					var message = 'you typed ' + arrayA[i] + ' but the correct accent is ' + arrayB[i];
					return message
				}

			}

		}

		if(hasAlreadyMessedUp !== false) { return hasAlreadyMessedUp }
		return true
}

function compareStrings(a,b) {

	var arrayA = a.toLowerCase().split('');
	var arrayB = b.toLowerCase().split('');

	if ( Math.abs(arrayA.length - arrayB.length) > 1 ) {
		return false
	}

	else if (arrayA.length - arrayB.length === 0) {

		return compareEqualArrays(arrayA, arrayB)

	}

	else if (arrayA.length - arrayB.length === 1) {

		for (var i = 0; i < arrayA.length; i++) {

			var hasAlreadyMessedUp = false;

			if (arrayA[i] !== arrayB[i] && hasAlreadyMessedUp !== false) {
				return false;
			}
			else if (arrayA[i] !== arrayB[i]) {
				hasAlreadyMessedUp = arrayA[i];
				arrayB.splice(i, 0, arrayA[i]);
				return compareEqualArrays(arrayA, arrayB, hasAlreadyMessedUp)
			}
		}

	}

	else if (arrayB.length - arrayA.length === 1) {

		for (var i = 0; i < arrayB.length; i++) {

			var hasAlreadyMessedUp = false;

			if (arrayB[i] !== arrayA[i] && hasAlreadyMessedUp !== false) {
				return false;
			}
			else if (arrayB[i] !== arrayA[i]) {
				hasAlreadyMessedUp = arrayB[i];
				arrayA.splice(i, 0, arrayB[i]);
				return compareEqualArrays(arrayB, arrayA, hasAlreadyMessedUp)
			}
		}

	}

	else {
		return false
	}

}