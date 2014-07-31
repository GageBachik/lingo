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

// helper function used in compareEqualArrays
// - tells if letters are different because of an accent (true)
//   or actually different letters (false)
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

// helper function used in CompareStrings
// - compares arrayified strings of the same length
// 	 - returns true if ===
// 	 - returns false if more than 1 mistake
//	 - returns letter of mistake if 1 mistake
//	 - returns message if 1 mistake && mistake is accent
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

// compares 2 strings
// - makes strings into arrays of equal length,
//   then runs compareEqualArrays() on them
// - tolerates 1 mistake, with custom return
function compareStrings(a,b) {

	var arrayA = a.toLowerCase().split('');
	var arrayB = b.toLowerCase().split('');

	if ( Math.abs(arrayA.length - arrayB.length) > 1 ) {
		return false
	}

	else if (arrayA.length - arrayB.length === 0) {

		return compareEqualArrays(arrayA, arrayB)

	}

	//todo: refactor this and next else if to be one statement
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

$(function() {
	
	$('h2').click(function() {
			$(this).toggleClass('failed')
		})

});