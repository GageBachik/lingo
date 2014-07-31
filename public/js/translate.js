/*

overall:

	- langsData: array of language pairing arrays (slightly less shitty than API output)
			- in this format: [[{translatesFrom}, {translatesTo}],[{translatesFrom}, {translatesTo}], ...]
			- mainly used to make better arrays later on

	- fromLangsArrayMaker: helper function.
			- makes array of `from` language strings, but you choose the key it searches for.
				eg. pass it 'code' and it returns 'eng', but pass it 'name' and it returns 'English'

	- makeLangMap() returns array of objects like...
			{
				fromLang: 'spa', // api code for spanish
				toLangs: [['eng', 'English'], ['fra', 'French'], ['ger', 'German']]
				// need both ^ and ^ because... <option value='eng'>English</option>
			}

	- makeFromOptions populates <select id="from-language">

	- makeToOptions populates <select id="to-language">
			but changes every time the from language changes

*/


// helper function to sort alphabetically
// not called anywhere, used it manually
// function sorter(array) {

// 	// sort by fromLang
// 	return JSON.stringify(array.sort(function(a,b) {

// 		if (a[0].name === b[0].name) {

// 			// secondary sort by toLang
// 			if (a[1].name > b[1].name)       { return 1 }
// 			else if (a[1].name < b[1].name)  { return -1 }
// 			else                             { return 0 }
			
// 		}
// 		else if(a[0].name > b[0].name) {
// 			return 1
// 		}
// 		else if (a[0].name < b[0].name) {
// 			return -1
// 		}

// 	}));

// }


var translate = {
	
	langsData: [[{"code":"ara","name":"Arabic"},{"code":"eng","name":"English"}],[{"code":"ara","name":"Arabic"},{"code":"fra","name":"French"}],[{"code":"ara","name":"Arabic"},{"code":"spa","name":"Spanish"}],[{"code":"ben","name":"Bengali"},{"code":"eng","name":"English"}],[{"code":"bul","name":"Bulgarian"},{"code":"eng","name":"English"}],[{"code":"chi","name":"Chinese (Simplified)"},{"code":"eng","name":"English"}],[{"code":"cht","name":"Chinese (Traditional)"},{"code":"eng","name":"English"}],[{"code":"cze","name":"Czech"},{"code":"eng","name":"English"}],[{"code":"dan","name":"Danish"},{"code":"eng","name":"English"}],[{"code":"fad","name":"Dari"},{"code":"eng","name":"English"}],[{"code":"dut","name":"Dutch"},{"code":"eng","name":"English"}],[{"code":"eng","name":"English"},{"code":"ara","name":"Arabic"}],[{"code":"eng","name":"English"},{"code":"ben","name":"Bengali"}],[{"code":"eng","name":"English"},{"code":"bul","name":"Bulgarian"}],[{"code":"eng","name":"English"},{"code":"chi","name":"Chinese (Simplified)"}],[{"code":"eng","name":"English"},{"code":"cht","name":"Chinese (Traditional)"}],[{"code":"eng","name":"English"},{"code":"cze","name":"Czech"}],[{"code":"eng","name":"English"},{"code":"dan","name":"Danish"}],[{"code":"eng","name":"English"},{"code":"fad","name":"Dari"}],[{"code":"eng","name":"English"},{"code":"dut","name":"Dutch"}],[{"code":"eng","name":"English"},{"code":"est","name":"Estonian"}],[{"code":"eng","name":"English"},{"code":"fin","name":"Finnish"}],[{"code":"eng","name":"English"},{"code":"fra","name":"French"}],[{"code":"eng","name":"English"},{"code":"ger","name":"German"}],[{"code":"eng","name":"English"},{"code":"gre","name":"Greek"}],[{"code":"eng","name":"English"},{"code":"hau","name":"Hausa"}],[{"code":"eng","name":"English"},{"code":"heb","name":"Hebrew"}],[{"code":"eng","name":"English"},{"code":"hin","name":"Hindi"}],[{"code":"eng","name":"English"},{"code":"hun","name":"Hungarian"}],[{"code":"eng","name":"English"},{"code":"ind","name":"Indonesian"}],[{"code":"eng","name":"English"},{"code":"ita","name":"Italian"}],[{"code":"eng","name":"English"},{"code":"jpn","name":"Japanese"}],[{"code":"eng","name":"English"},{"code":"kor","name":"Korean"}],[{"code":"eng","name":"English"},{"code":"lit","name":"Lithuanian"}],[{"code":"eng","name":"English"},{"code":"may","name":"Malay"}],[{"code":"eng","name":"English"},{"code":"nor","name":"Norwegian"}],[{"code":"eng","name":"English"},{"code":"pus","name":"Pashto"}],[{"code":"eng","name":"English"},{"code":"per","name":"Persian"}],[{"code":"eng","name":"English"},{"code":"pol","name":"Polish"}],[{"code":"eng","name":"English"},{"code":"por","name":"Portuguese"}],[{"code":"eng","name":"English"},{"code":"rum","name":"Romanian"}],[{"code":"eng","name":"English"},{"code":"rus","name":"Russian"}],[{"code":"eng","name":"English"},{"code":"srp","name":"Serbian"}],[{"code":"eng","name":"English"},{"code":"slo","name":"Slovak"}],[{"code":"eng","name":"English"},{"code":"slv","name":"Slovenian"}],[{"code":"eng","name":"English"},{"code":"som","name":"Somali"}],[{"code":"eng","name":"English"},{"code":"spa","name":"Spanish"}],[{"code":"eng","name":"English"},{"code":"swe","name":"Swedish"}],[{"code":"eng","name":"English"},{"code":"tha","name":"Thai"}],[{"code":"eng","name":"English"},{"code":"tur","name":"Turkish"}],[{"code":"eng","name":"English"},{"code":"ukr","name":"Ukrainian"}],[{"code":"eng","name":"English"},{"code":"urd","name":"Urdu"}],[{"code":"eng","name":"English"},{"code":"vie","name":"Vietnamese"}],[{"code":"est","name":"Estonian"},{"code":"eng","name":"English"}],[{"code":"fin","name":"Finnish"},{"code":"eng","name":"English"}],[{"code":"fra","name":"French"},{"code":"ara","name":"Arabic"}],[{"code":"fra","name":"French"},{"code":"eng","name":"English"}],[{"code":"fra","name":"French"},{"code":"ger","name":"German"}],[{"code":"fra","name":"French"},{"code":"spa","name":"Spanish"}],[{"code":"ger","name":"German"},{"code":"eng","name":"English"}],[{"code":"ger","name":"German"},{"code":"fra","name":"French"}],[{"code":"ger","name":"German"},{"code":"spa","name":"Spanish"}],[{"code":"gre","name":"Greek"},{"code":"eng","name":"English"}],[{"code":"hau","name":"Hausa"},{"code":"eng","name":"English"}],[{"code":"heb","name":"Hebrew"},{"code":"eng","name":"English"}],[{"code":"hin","name":"Hindi"},{"code":"eng","name":"English"}],[{"code":"hun","name":"Hungarian"},{"code":"eng","name":"English"}],[{"code":"ind","name":"Indonesian"},{"code":"eng","name":"English"}],[{"code":"ita","name":"Italian"},{"code":"eng","name":"English"}],[{"code":"ita","name":"Italian"},{"code":"spa","name":"Spanish"}],[{"code":"jpn","name":"Japanese"},{"code":"eng","name":"English"}],[{"code":"kor","name":"Korean"},{"code":"eng","name":"English"}],[{"code":"lit","name":"Lithuanian"},{"code":"eng","name":"English"}],[{"code":"may","name":"Malay"},{"code":"eng","name":"English"}],[{"code":"nor","name":"Norwegian"},{"code":"eng","name":"English"}],[{"code":"pus","name":"Pashto"},{"code":"eng","name":"English"}],[{"code":"per","name":"Persian"},{"code":"eng","name":"English"}],[{"code":"pol","name":"Polish"},{"code":"eng","name":"English"}],[{"code":"por","name":"Portuguese"},{"code":"eng","name":"English"}],[{"code":"rum","name":"Romanian"},{"code":"eng","name":"English"}],[{"code":"rus","name":"Russian"},{"code":"eng","name":"English"}],[{"code":"srp","name":"Serbian"},{"code":"eng","name":"English"}],[{"code":"slo","name":"Slovak"},{"code":"eng","name":"English"}],[{"code":"slv","name":"Slovenian"},{"code":"eng","name":"English"}],[{"code":"som","name":"Somali"},{"code":"eng","name":"English"}],[{"code":"spa","name":"Spanish"},{"code":"ara","name":"Arabic"}],[{"code":"spa","name":"Spanish"},{"code":"eng","name":"English"}],[{"code":"spa","name":"Spanish"},{"code":"fra","name":"French"}],[{"code":"spa","name":"Spanish"},{"code":"ger","name":"German"}],[{"code":"spa","name":"Spanish"},{"code":"ita","name":"Italian"}],[{"code":"swe","name":"Swedish"},{"code":"eng","name":"English"}],[{"code":"tha","name":"Thai"},{"code":"eng","name":"English"}],[{"code":"tur","name":"Turkish"},{"code":"eng","name":"English"}],[{"code":"ukr","name":"Ukrainian"},{"code":"eng","name":"English"}],[{"code":"urd","name":"Urdu"},{"code":"eng","name":"English"}],[{"code":"vie","name":"Vietnamese"},{"code":"eng","name":"English"}]],

	fromLangsArrayMaker: function(key) {
		var fromLangs = [];

		for (var i=0, len=translate.langsData.length; i<len; i++) {

			if ( $.inArray(translate.langsData[i][0][key], fromLangs) === -1) {
				fromLangs.push(translate.langsData[i][0][key])
			}

		}
		return fromLangs;
	},

	makeLangMap: function() {

		// array of unique `from languages`
		var fromLangs = translate.fromLangsArrayMaker('code');

		// contains one object for each pair
		// (so, {spa>eng}, {spa>fra}, {fra>ara}, ...)
		var verboseLangMap = [];

		for (var i=0, len=translate.langsData.length; i<len; i++) {

				verboseLangMap.push({
					fromLang: translate.langsData[i][0].code,
					toLang: [translate.langsData[i][1].code, translate.langsData[i][1].name]
				})

		}	

		// contains one object for each fromLang
		// (eliminates duplicate fromLangs from verboseLangMap
		// by finding duplicate toLangs and adding them to an array)
		var langMap = []

		for (var i=0, len=fromLangs.length; i<len; i++) {

			var fromObjs =_.where(verboseLangMap, {fromLang: fromLangs[i]})
			var toLangsInFroms = [];

			for (var j=0; j<fromObjs.length; j++) {
				toLangsInFroms.push(fromObjs[j].toLang)
			}

			langMap.push({
				fromLang: fromLangs[i],
				toLangs: toLangsInFroms
			})

		}

		return langMap;

	},

	makeFromOptions: function() {

		// array of unique `from language` short codes
		var fromLangsCode = translate.fromLangsArrayMaker('code');
		// array of unique `from language` names
		var fromLangsName = translate.fromLangsArrayMaker('name');

		// append an <option value="{code}">{name}</option> for each fromLang
		for (var i=0, len=fromLangsName.length; i<len; i++) {
			var option = $('<option value="' + fromLangsCode[i] + '">' + fromLangsName[i] + '</option>')
			$('#from-language').append(option)
		}
		

	},

	makeToOptions: function() {

		var langMap = translate.makeLangMap();
		var currentFromLang = $('#from-language').val();
		var currentToLangs = _.findWhere(langMap, {fromLang: currentFromLang }).toLangs;
		var select = $('#to-language')
		// reset <select> so it can be appended to
		select.empty();

		// append an <option value="{code}">{name}</option> for each toLang
		for (var i=0, len=currentToLangs.length; i<len; i++) {
			var option = $('<option value="' + currentToLangs[i][0] + '">' + currentToLangs[i][1] + '</option>')
			select.append(option)
		}

	}

}


$(function() {
	
	// initialize page with fromOptions
	translate.makeFromOptions();
	// set default fromLang to english
	$('#from-language').val('eng')
	// initialize page with toOptions for english fromLang
	translate.makeToOptions();
	// change toOptions when fromLang changes
	$('#from-language').change(translate.makeToOptions);

});