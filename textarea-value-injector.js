

let nameAttrPattern = /\sname=["'](.*?)["']/i
let valAttrPattern = /\svalue=["'](.*?)["']/i
let typeAttrPattern = /\stype=["'](.*?)["']/i
let textareaPattern = /(<textarea[\w\W]*?textarea\w*>)/im
let selectedAttrPattern = /\sselected(=["'](.*?)["'])?/i


let evalFunction = new Function('data',
	`with (data.context) {
		try {
			return eval(data.expression);
		} catch (e) {
			return null;
		}
	}`
)

function fetchValue(obj, path) {
	return evalFunction.call(this, {
		context: obj
		, expression: path
	})
}

function escForRegex(val) {
	if(val && val.replace) {
		return val.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
	}
	else {
		return val;
	}
}

function isOrContains(target, possible) {
	if(typeof possible == 'array') {
		possible.includes(target)
	}
	else {
		return target == possible
	}
}


let injectValues = function(text, values) {
	
	let result = ''
	
	text.split(textareaPattern).forEach((item) => {
		if(item.toLowerCase().indexOf('<textarea') == 0) {
			let r = item.match(nameAttrPattern)
			let name = r ? r[1] : null
			
			if(name) {
				let newVal = fetchValue(values, name)
				if(typeof newVal != 'undefined' && newVal !== null) {
					let startTagEnd = item.indexOf('>')
					let endTagStart = item.lastIndexOf('<')
					item = item.substring(0, startTagEnd + 1) + newVal + item.substring(endTagStart)
				}
			}
			
			result += item
		}
		else {
			result += item
		}
	})
	
	return result
}


module.exports = injectValues