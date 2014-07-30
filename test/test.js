var assert = require('assert');
var controller = require('../controllers/controller.js');
// mocha doesn't work on frontend js?
// var translate = require('../public/js/translate.js');

describe('Controllers', function(){
  describe('controllers should be functions', function(){
    it('should be of the correct type', function(){
      assert.equal(typeof controller, 'object');
      assert.equal(typeof controller.index, 'function');
      assert.equal(typeof controller.login, 'function');
      assert.equal(typeof controller.quiz, 'function');
      assert.equal(typeof controller.translate, 'function');
      assert.equal(typeof controller.progress, 'function');
    })
  })
})

// frontend js...
// --------------------------------------------------------
// describe('Translate', function(){
//   describe('should work', function(){
//     it('should be of the correct type', function(){
//       assert.equal(typeof translate, 'object');
//     })
//   })
// })


