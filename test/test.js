
require('mocha')
var expect = require('chai').expect
var assert = require('chai').assert

let valueInjector = require('../textarea-value-injector')


let testData1 = {
	businessName: 'Emergent Ideas',
	alternateName: '',
	alternateName2: 'Emergent\nIdeas',
	whenDate: new Date(2017, 10, 16, 14, 20, 30, 700),
	thenDate: new Date(2017, 10, 16, 14, 20, 30, 700).toString(),
	timeAndLabor: 'two',
	timeAndLabor2: true,
	timeAndLabor4: false,
	timeAndLabor3: 'two'
}

describe("standard parsing and execution", function() {
	
	it('text values', function() {
		
		assert.equal(
			'<textarea class="form-control" type="text" id="businessName" placeholder="" name="businessName" >Emergent Ideas</textarea>',
			valueInjector(
				'<textarea class="form-control" type="text" id="businessName" placeholder="" name="businessName" >Test Business</textarea>',
				testData1
			)
		)
		
		assert.equal(
			'<textarea class="form-control" type="text" id="alternateName2" placeholder="" name="alternateName2" >Emergent\nIdeas</textarea>',
			valueInjector(
				'<textarea class="form-control" type="text" id="alternateName2" placeholder="" name="alternateName2" >Test \n \r\n Business</textarea>',
				testData1
			)
		)
		
		assert.equal(
			'<textarea class="form-control" type="text" id="alternateName4" placeholder="" name="alternateName4" >Test \n \r\n Business</textarea>',
			valueInjector(
				'<textarea class="form-control" type="text" id="alternateName4" placeholder="" name="alternateName4" >Test \n \r\n Business</textarea>',
				testData1
			)
		)
	})
})
		
