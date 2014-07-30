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

	todo: alphabetize langsData into new array, then delete original langsData
				- also remove 'id' since api makes it optional and 3char code is easier

*/

var translate = {
	
	langsData: [[{"code":"spa","name":"Spanish","id":"505037985fe01ac20407b81f"},{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"}],[{"code":"fra","name":"French","id":"505037985fe01ac20407b800"},{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"}],[{"code":"ger","name":"German","id":"505037985fe01ac20407b803"},{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"}],[{"code":"rum","name":"Romanian","id":"505037985fe01ac20407b817"},{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"}],[{"code":"ara","name":"Arabic","id":"505037985fe01ac20407b7f2"},{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"}],[{"code":"chi","name":"Chinese (Simplified)","id":"505037985fe01ac20407b7f5"},{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"}],[{"code":"rus","name":"Russian","id":"505037985fe01ac20407b818"},{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"}],[{"code":"jpn","name":"Japanese","id":"505037985fe01ac20407b80b"},{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"}],[{"code":"cht","name":"Chinese (Traditional)","id":"505037985fe01ac20407b7f6"},{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"}],[{"code":"dan","name":"Danish","id":"505037985fe01ac20407b7f8"},{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"}],[{"code":"dut","name":"Dutch","id":"505037985fe01ac20407b7fa"},{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"}],[{"code":"hin","name":"Hindi","id":"505037985fe01ac20407b807"},{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"}],[{"code":"kor","name":"Korean","id":"505037985fe01ac20407b80c"},{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"}],[{"code":"per","name":"Persian","id":"505037985fe01ac20407b812"},{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"}],[{"code":"pol","name":"Polish","id":"505037985fe01ac20407b813"},{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"}],[{"code":"cze","name":"Czech","id":"505037985fe01ac20407b7f7"},{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"}],[{"code":"swe","name":"Swedish","id":"505037985fe01ac20407b822"},{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"}],[{"code":"por","name":"Portuguese","id":"505037985fe01ac20407b814"},{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"}],[{"code":"ita","name":"Italian","id":"505037985fe01ac20407b80a"},{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"}],[{"code":"hau","name":"Hausa","id":"505037985fe01ac20407b805"},{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"}],[{"code":"gre","name":"Greek","id":"505037985fe01ac20407b804"},{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"}],[{"code":"nor","name":"Norwegian","id":"505037985fe01ac20407b810"},{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"}],[{"code":"urd","name":"Urdu","id":"505037985fe01ac20407b825"},{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"}],[{"code":"hun","name":"Hungarian","id":"505037985fe01ac20407b808"},{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"}],[{"code":"tha","name":"Thai","id":"505037985fe01ac20407b823"},{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"}],[{"code":"heb","name":"Hebrew","id":"505037985fe01ac20407b806"},{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"}],[{"code":"tur","name":"Turkish","id":"505037985fe01ac20407b824"},{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"}],[{"code":"bul","name":"Bulgarian","id":"505037985fe01ac20407b7f4"},{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"}],[{"code":"srp","name":"Serbian","id":"505037985fe01ac20407b819"},{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"}],[{"code":"fin","name":"Finnish","id":"505037985fe01ac20407b7ff"},{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"}],[{"code":"pus","name":"Pashto","id":"505037985fe01ac20407b811"},{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"}],[{"code":"ind","name":"Indonesian","id":"505037985fe01ac20407b809"},{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"}],[{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"},{"code":"spa","name":"Spanish","id":"505037985fe01ac20407b81f"}],[{"code":"fra","name":"French","id":"505037985fe01ac20407b800"},{"code":"spa","name":"Spanish","id":"505037985fe01ac20407b81f"}],[{"code":"ara","name":"Arabic","id":"505037985fe01ac20407b7f2"},{"code":"spa","name":"Spanish","id":"505037985fe01ac20407b81f"}],[{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"},{"code":"fra","name":"French","id":"505037985fe01ac20407b800"}],[{"code":"spa","name":"Spanish","id":"505037985fe01ac20407b81f"},{"code":"fra","name":"French","id":"505037985fe01ac20407b800"}],[{"code":"ger","name":"German","id":"505037985fe01ac20407b803"},{"code":"fra","name":"French","id":"505037985fe01ac20407b800"}],[{"code":"ara","name":"Arabic","id":"505037985fe01ac20407b7f2"},{"code":"fra","name":"French","id":"505037985fe01ac20407b800"}],[{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"},{"code":"ger","name":"German","id":"505037985fe01ac20407b803"}],[{"code":"spa","name":"Spanish","id":"505037985fe01ac20407b81f"},{"code":"ger","name":"German","id":"505037985fe01ac20407b803"}],[{"code":"fra","name":"French","id":"505037985fe01ac20407b800"},{"code":"ger","name":"German","id":"505037985fe01ac20407b803"}],[{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"},{"code":"rum","name":"Romanian","id":"505037985fe01ac20407b817"}],[{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"},{"code":"ara","name":"Arabic","id":"505037985fe01ac20407b7f2"}],[{"code":"spa","name":"Spanish","id":"505037985fe01ac20407b81f"},{"code":"ara","name":"Arabic","id":"505037985fe01ac20407b7f2"}],[{"code":"fra","name":"French","id":"505037985fe01ac20407b800"},{"code":"ara","name":"Arabic","id":"505037985fe01ac20407b7f2"}],[{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"},{"code":"chi","name":"Chinese (Simplified)","id":"505037985fe01ac20407b7f5"}],[{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"},{"code":"rus","name":"Russian","id":"505037985fe01ac20407b818"}],[{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"},{"code":"jpn","name":"Japanese","id":"505037985fe01ac20407b80b"}],[{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"},{"code":"cht","name":"Chinese (Traditional)","id":"505037985fe01ac20407b7f6"}],[{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"},{"code":"dan","name":"Danish","id":"505037985fe01ac20407b7f8"}],[{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"},{"code":"dut","name":"Dutch","id":"505037985fe01ac20407b7fa"}],[{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"},{"code":"hin","name":"Hindi","id":"505037985fe01ac20407b807"}],[{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"},{"code":"som","name":"Somali","id":"505037985fe01ac20407b81e"}],[{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"},{"code":"kor","name":"Korean","id":"505037985fe01ac20407b80c"}],[{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"},{"code":"per","name":"Persian","id":"505037985fe01ac20407b812"}],[{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"},{"code":"pol","name":"Polish","id":"505037985fe01ac20407b813"}],[{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"},{"code":"cze","name":"Czech","id":"505037985fe01ac20407b7f7"}],[{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"},{"code":"swe","name":"Swedish","id":"505037985fe01ac20407b822"}],[{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"},{"code":"por","name":"Portuguese","id":"505037985fe01ac20407b814"}],[{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"},{"code":"ita","name":"Italian","id":"505037985fe01ac20407b80a"}],[{"code":"spa","name":"Spanish","id":"505037985fe01ac20407b81f"},{"code":"ita","name":"Italian","id":"505037985fe01ac20407b80a"}],[{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"},{"code":"hau","name":"Hausa","id":"505037985fe01ac20407b805"}],[{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"},{"code":"gre","name":"Greek","id":"505037985fe01ac20407b804"}],[{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"},{"code":"nor","name":"Norwegian","id":"505037985fe01ac20407b810"}],[{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"},{"code":"urd","name":"Urdu","id":"505037985fe01ac20407b825"}],[{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"},{"code":"hun","name":"Hungarian","id":"505037985fe01ac20407b808"}],[{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"},{"code":"tha","name":"Thai","id":"505037985fe01ac20407b823"}],[{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"},{"code":"heb","name":"Hebrew","id":"505037985fe01ac20407b806"}],[{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"},{"code":"tur","name":"Turkish","id":"505037985fe01ac20407b824"}],[{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"},{"code":"bul","name":"Bulgarian","id":"505037985fe01ac20407b7f4"}],[{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"},{"code":"srp","name":"Serbian","id":"505037985fe01ac20407b819"}],[{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"},{"code":"fin","name":"Finnish","id":"505037985fe01ac20407b7ff"}],[{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"},{"code":"pus","name":"Pashto","id":"505037985fe01ac20407b811"}],[{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"},{"code":"fad","name":"Dari","id":"505037985fe01ac20407b7f9"}],[{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"},{"code":"ind","name":"Indonesian","id":"505037985fe01ac20407b809"}],[{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"},{"code":"ben","name":"Bengali","id":"505037985fe01ac20407b7f3"}],[{"code":"ben","name":"Bengali","id":"505037985fe01ac20407b7f3"},{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"}],[{"code":"est","name":"Estonian","id":"505037985fe01ac20407b7fe"},{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"}],[{"code":"fad","name":"Dari","id":"505037985fe01ac20407b7f9"},{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"}],[{"code":"lit","name":"Lithuanian","id":"505037985fe01ac20407b80e"},{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"}],[{"code":"slo","name":"Slovak","id":"505037985fe01ac20407b81c"},{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"}],[{"code":"slv","name":"Slovenian","id":"505037985fe01ac20407b81d"},{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"}],[{"code":"som","name":"Somali","id":"505037985fe01ac20407b81e"},{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"}],[{"code":"ukr","name":"Ukrainian","id":"505037985fe01ac20407b9c1"},{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"}],[{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"},{"code":"est","name":"Estonian","id":"505037985fe01ac20407b7fe"}],[{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"},{"code":"lit","name":"Lithuanian","id":"505037985fe01ac20407b80e"}],[{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"},{"code":"slo","name":"Slovak","id":"505037985fe01ac20407b81c"}],[{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"},{"code":"slv","name":"Slovenian","id":"505037985fe01ac20407b81d"}],[{"code":"ger","name":"German","id":"505037985fe01ac20407b803"},{"code":"spa","name":"Spanish","id":"505037985fe01ac20407b81f"}],[{"code":"ita","name":"Italian","id":"505037985fe01ac20407b80a"},{"code":"spa","name":"Spanish","id":"505037985fe01ac20407b81f"}],[{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"},{"code":"ukr","name":"Ukrainian","id":"505037985fe01ac20407b9c1"}],[{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"},{"code":"may","name":"Malay","id":"505037985fe01ac20407b920"}],[{"code":"may","name":"Malay","id":"505037985fe01ac20407b920"},{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"}],[{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"},{"code":"vie","name":"Vietnamese","id":"505037985fe01ac20407b9c7"}],[{"code":"vie","name":"Vietnamese","id":"505037985fe01ac20407b9c7"},{"code":"eng","name":"English","id":"505037985fe01ac20407b7fb"}]],

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

	// dev stuff for testing. will remove.
	$('#translate-submit').click(function(e) {
		var formData = 'WORD: ' + $('#translate-word').val() + '\nFROM: ' + $('#from-language').val() + '\nTO: ' + $('#to-language').val()
		alert(formData)
		e.preventDefault();
	});

});