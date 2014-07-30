// API key for translation service:
// oHXJOmw0m6ko6yR6%2BmTImg%3D%3D
var languageList = require('./languagelist.js')
for (var i=0, len=languageList.length; i<len; i++) {
	console.log(languageList[i].languagePair.from.name + ' to ' + languageList[i].languagePair.to.name)
}