let input = document.getElementById("num-input")
let convert = document.getElementById("convert")
let output = document.getElementById("conversion-output")
let dropdown = document.getElementById("choices")

// Convert decimal to base 2
convert.addEventListener("click", function() {
	output.textContent = ""
	let inputStr = String(input.value)
	let myNum = input.value
	if (inputStr.includes('.')) {
		let numStr = inputStr.substring(0, inputStr.indexOf('.'))
		myNum = Number(numStr)
	}
	let baseStr = ""
	let base = Number(String(dropdown.value).substring(String(dropdown.value).indexOf('-')+1))
	let decStr = ""
	let letterDigits = {"10": "A", "11": "B", "12": "C", "13": "D", "14": "E", "15": "F"}

	// Convert user input to chosen base from base 2 - base 10
	if (base < 11) {
		while (myNum > base-1) {
			if (myNum == base) {
				baseStr += 0
				myNum = myNum / base
			} else {
				if (myNum % base == 0) {
					baseStr += 0
					myNum = myNum / base
				} else {
					baseStr += myNum % base
					myNum = (myNum-myNum%base) / base
				}
			}
		}
	} else {
		// Convert user input to chosen base from base 11 - base 16
		while (myNum > base-1) {
			if (myNum == base) {
				baseStr += 0
				myNum = myNum / base
			} else {
				if (myNum % base == 0) {
					baseStr += 0
					myNum = myNum / base
				} else if (String(myNum%base) in letterDigits) {
					baseStr += letterDigits[String(myNum%base)]
					myNum = (myNum-myNum%base) / base
				} else {
					baseStr += myNum % base
					myNum = (myNum-myNum%base) / base
				}
			}
		}
	}

	// Append final non-zero remainder to base string
	if (String(myNum) in letterDigits) {
		baseStr += letterDigits[String(myNum)]
	} else {
		baseStr += myNum
	}

	// Checks for decimal point
	if (inputStr.includes('.')) {
		let decNum = Number(inputStr.substring(inputStr.indexOf('.'))) * base
		let decNumLength = inputStr.substring(inputStr.indexOf('.')).length-1

		// Calculates number after decimal point
		for (let i = 0; i < 6; i++) {
			if (!String(decNum).includes('.')) {
				decStr += decNum
				break
			} else {
				// also eventually make sure base11 - base16 are appending
				// appropriate digit symbols for decimals (lol)
				let wholeNum = String(decNum).substring(0, String(decNum).indexOf('.'))
				let decimal = String(decNum).substring(String(decNum).indexOf('.'))
                if (Number(wholeNum) > 0) {
                    decStr += wholeNum
					decNum = (Number(decimal) * base).toFixed(decNumLength)
                } else {
                    decStr += 0
					decNum = (Number(decimal) * base).toFixed(decNumLength)
                }
			}
		}
	}

	// Checks for decimal point, reverses strings and outputs accordingly
	if (String(input.value).includes('.')) {
		// Reverse baseStr for output (decimal point)
		let ans = ""
		for (let i = baseStr.length-1; i >= 0; i--) {
			ans += baseStr[i]
		}

		if (dropdown.value == "base-2") {
			output.textContent = input.value + " in binary: " + ans + "." + decStr
		} else if (base == 10) {
			let decNumLength = inputStr.substring(inputStr.indexOf('.')).length-1
			output.textContent = input.value + " in base 10: " + ans + "." + decStr.substring(0, decNumLength)
		} else {
			output.textContent = input.value + " in base " + base + ": " + ans + "." + decStr
		}
	} else {
		// Reverse baseStr for output (no decimal point)
		let ans = ""
		for (let i = baseStr.length-1; i >= 0; i--) {
			ans += baseStr[i]
		}

		if (dropdown.value == "base-2") {
			output.textContent = input.value + " in binary: " + ans
		} else {
			output.textContent = input.value + " in base " + base + ": " + ans
		}
	}
	input.value = ""
	
})
