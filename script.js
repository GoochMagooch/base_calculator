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

	// Convert decimal to chosen base from base 2 - base 10
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
		// Convert decimal to chosen base from base 11 - base 16
		while (myNum > base-1) {
			if (myNum == base) {
				baseStr += 0
				myNum = myNum / base
			} else {
				if (myNum % base == 0) {
					baseStr += 0
					myNum = myNum / base
				/*
				else {
					dictionary{A: 10, B: 11, etc}
					match value of myNum%base to key
				}
				*/
				} else if (myNum % base == 10) {
					baseStr += "A"
					myNum = (myNum-myNum%base) / base
				} else if (myNum % base == 11) {
					baseStr += "B"
					myNum = (myNum-myNum%base) / base
				} else if (myNum % base == 12) {
					baseStr += "C"
					myNum = (myNum-myNum%base) / base
				} else if (myNum % base == 13) {
					baseStr += "D"
					myNum = (myNum-myNum%base) / base
				} else if (myNum % base == 14) {
					baseStr += "E"
					myNum = (myNum-myNum%base) / base
				} else if (myNum % base == 15) {
					baseStr += "F"
					myNum = (myNum-myNum%base) / base
				} else {
					baseStr += myNum % base
					myNum = (myNum-myNum%base) / base
				}
			}
		}
	}

	// Checks for decimal point
	if (inputStr.includes('.')) {
		let decNum = Number(inputStr.substring(inputStr.indexOf('.'))) * base
		console.log("decNum: " + decNum)
		console.log("decNum * base: " + decNum * base)

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
					decNum = Number(decimal) * base
                } else {
                    decStr += 0
					decNum = Number(decimal) * base
                }
			}
		}
	}
	console.log(decStr)

	// Append final non-zero remainder to base string
	if (myNum < base) {
		if (myNum == 10) {
			baseStr += "A"
		} else if (myNum == 11) {
			baseStr += "B"
		} else if (myNum == 12) {
			baseStr += "C"
		} else if (myNum == 13) {
			baseStr += "D"
		} else if (myNum == 14) {
			baseStr += "E"
		} else if (myNum == 15) {
			baseStr += "F"
		} else {
			baseStr += myNum
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
