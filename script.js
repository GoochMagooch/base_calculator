// DECIMAL NUMBER TO BASE CONVERSION VARIABLES
let d2BaseInput = document.getElementById("d2Base-input")
let d2BaseBtn = document.getElementById("d2Base-btn")
let d2BaseOutput = document.getElementById("d2Base-output")
let d2BaseDropdown = document.getElementById("d2Base-choices")

// BASE NUMBER CALCULATOR VARIABLES
let calcInput = document.getElementById("calc-input")
let calculate = document.getElementById("calculate")
let calcOutput = document.getElementById("calc-output")
let calcDrop = document.getElementById("calc-choices")
let add = document.getElementById("add")

// BASE NUMBER TO DECIMAL CONVERSION VARIABLES
let b2DecInput = document.getElementById("b2Dec-input")
let b2DecBtn = document.getElementById("b2Dec-btn")
let b2DecOutput = document.getElementById("b2Dec-output")
let b2DecDropdown = document.getElementById("b2Dec-choices")

// OBJECT OF ALPHA DIGIT SYMBOLS ASSIGNED TO NUMBERS
let digitLetters = {"10": "A", "11": "B", "12": "C", "13": "D", "14": "E", "15": "F"}
// OBJECT OF NUMBERS ASSIGNED TO ALPHA DIGIT SYMBOLS
let letterDigits = {"A": "10", "B": "11", "C": "12", "D": "13", "E": "14", "F": "15"}

function checkInput(i, b, f) {
    // i = input
    // b = base
    // f = determines if d2Base or b2Decimal are running this function
    // 0 for d2Base, 1 for b2Decimal

    if (i.length > 10) {
        return "Please enter a number with 10 digits or less"
    } else if (i == "") {
        return "Please enter a valid decimal number!"
    } else if (i.match(/\s/g)) {
        return "Please remove any spaces from your number!"
    } else if (f == "d2Base") {
        if (i.match(/[^0-9\.$]/g)) {
            return "Invalid digit symbol/s in Base 10: " + i.match(/[^0-9\.$]/g)
        } else if (b == "") {
            return "Please choose a radix!"
        } else {
            return 0
        }
    } else if (f == "b2Decimal") {
        if (b == "") {
            return "Please choose a radix!"
        } else if (b <= 9 && i.match(/[^0-9\.$]/g)) {
            return "Invalid digit symbol/s in Base " + b + ": " + i.match(/[^0-9\.$]/g)
        } else {
            return 0
        }
    }
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~      DECIMAL (base 10) NUMBER TO BASE NUMBER CONVERTER       ~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Suggestion: turn base8 and base16 to octal and hex
// RETURNS CONVERTED NUMBERS AND A LENGTH VALUE
function baseConversion(uin, uBase, digLet) {
    // quotient string
    let uinStr = String(uin)

    // renamed variables (base and quotient) for readability within baseConversion()
    let base = uBase
    let quotient = Number(uinStr)
    if (uinStr.includes('.')) {
		quotient = Number(uinStr.substring(0, uinStr.indexOf('.')))
	}

    let dec = false
    let returned = []
    let baseStr = ""
    let decStr = ""
    let dNLength = 0

    // convert quotient to chosen base from base 2 - base 10
	if (base >= 1 && base <= 10) {
		while (quotient > base-1) {
			if (quotient == base) {
				baseStr += 0
			    quotient = quotient / base
		    } else {
			    if (quotient % base == 0) {
				    baseStr += 0
					quotient = quotient / base
				} else {
				    baseStr += quotient % base
				    quotient = (quotient-quotient%base) / base
			    }
		    }
		}
	} else if (base >= 11 && base <= 16 ) {
	    // Convert quotient to chosen base from base 11 - base 16
		while (quotient > base-1) {
			if (quotient == base) {
				baseStr += 0
				quotient = quotient / base
			} else {
				if (quotient % base == 0) {
					baseStr += 0
					quotient = quotient / base
				} else if (String(quotient%base) in digLet) {
					baseStr += digLet[String(quotient%base)]
					quotient = (quotient-quotient%base) / base
				} else {
					baseStr += quotient % base
					quotient = (quotient-quotient%base) / base
				}
			}
		}
	} else {
        return 0
    }

	// append final non-zero remainder to base number
	if (String(quotient) in digLet) {
		baseStr += digLet[String(quotient)]
	} else {
		baseStr += quotient
	}
    returned.push(baseStr)

    // FIX: Add check for no input after decimal
	// Example: uin = 23.30
    if (uinStr.includes('.')) {
        if (uinStr.substring(uinStr.indexOf('.')+1) == "") {
            console.log(uinStr.substring(uinStr.indexOf('.')+1))
            return "Please enter number after decimal point!"
        } else {
		    let decNum = Number(uinStr.substring(uinStr.indexOf('.'))) * base // decNum = .30 * base
		    dNLength = Number(uinStr.substring(uinStr.indexOf('.')).length-1) // dNLength = 2 (length of fractional)

		    // Calculates number after decimal point
		    for (let i = 0; i < 6; i++) {
			    if (!String(decNum).includes('.')) {
				    decStr += decNum
				    break
			    } else {
				    // Appends fractional of quotient * radix
				    let wholeFrac = String(decNum).substring(0, String(decNum).indexOf('.'))
    				let fractional = String(decNum).substring(String(decNum).indexOf('.'))
                    if (Number(wholeFrac) > 9) {
		    			decStr += digLet[String(wholeFrac)]
			    		decNum = (Number(fractional) * base).toFixed(dNLength)
				    } else if (Number(wholeFrac) > 0) {
                        decStr += wholeFrac
    					decNum = (Number(fractional) * base).toFixed(dNLength)
                    } else {
                        decStr += 0
			    		decNum = (Number(fractional) * base).toFixed(dNLength)
                    }
    			}
	    	}
            dec = true
	    }
    }

    let ans = ""
	if (dec == true) {
		// reverse baseStr for output (decimal point)
	    for (let i = baseStr.length-1; i >= 0; i--) {
		    ans += baseStr[i]
		}
	    if (d2BaseDropdown.value == "base-2") {
           return uinStr + " in binary: " + ans + "." + decStr
	    } else if (base == 10) {
		    let decNumLength = uinStr.substring(userNum.indexOf('.')).length-1
           return uinStr + " in base 10: " + ans + "." + decStr.substring(0, decNumLength)
		} else {
           return uinStr + " in base " + base + ": " + ans + "." + decStr
        }
	} else {
        // reverse baseStr for output (no decimal point)
	    for (let i = baseStr.length-1; i >= 0; i--) {
	        ans += baseStr[i]
	    }
	    if (base == "base-2") {
		    return uinStr + " in binary: " + ans
		} else {
	        return uinStr + " in base " + base + ": " + ans
        }
    }

}

// CHECK USER INPUT - OUTPUT ACCORDINGLY
d2BaseBtn.addEventListener("click", function() {
	d2BaseOutput.textContent = ""
	
    // variables for baseConversion()
	let userNum = d2BaseInput.value
	let base = Number(String(d2BaseDropdown.value).substring(String(d2BaseDropdown.value).indexOf('-')+1))

    if (checkInput(userNum, base, "d2Base") == 0) {
        d2BaseOutput.textContent = baseConversion(userNum, base, digitLetters)
    } else {
        d2BaseOutput.textContent = checkInput(userNum, base, "d2Base")
        userNum = ""
    }
	userNum = ""
})

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~                    BASE NUMBER CALCULATOR                    ~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// add, subtract, multipy or divide base numbers
function calculateBases(n1, n2, o) {
    // FIX: add functionality for adding decimal numbers

    let radix = Number(String(calcDrop.value).substring(String(calcDrop.value).indexOf('-')+1))
    let num1Arr = []
    let num2Arr = []
    let iterations = 0 

    let invalidDigitSymbol = []
    if (o == "+") {
        for (let i = num1.length-1; i >= 0; i--) {
            let tempStr = num1[i]
            if (tempStr.match(/[a-zA-Z]/g)) {
                if (tempStr.toUpperCase() in letterDigits) {
                    if (letterDigits[tempStr.toUpperCase()] >= radix) {
                        invalidDigitSymbol.push(digitLetters[letterDigits[tempStr.toUpperCase()]])
                        return invalidDigitSymbol
                    } else {
                        num1Arr.push(Number(letterDigits[tempStr.toUpperCase()]))
                    }
                } else {
                    invalidDigitSymbol.push(num1[i])
                    return invalidDigitSymbol
                }
            } else {
                if (tempStr >= radix) {
                    return Number(num1[i])
                } else {
                    num1Arr.push(Number(num1[i]))
                }
            }
        }
        for (let i = num2.length-1; i >= 0; i--) {
            let tempStr = num2[i]
            if (tempStr.match(/[a-zA-Z]/g)) {
                if (tempStr.toUpperCase() in letterDigits) {
                    if (letterDigits[tempStr.toUpperCase()] > radix-1) {
                        invalidDigitSymbol.push(digitLetters[letterDigits[tempStr.toUpperCase()]])
                        return invalidDigitSymbol
                    } else {
                        num2Arr.push(Number(letterDigits[tempStr.toUpperCase()]))
                    }
                } else {
                    invalidDigitSymbol.push(Number(num2[i]))
                    return invalidDigitSymbol
                }
            } else {
                if (tempStr > radix-1) {
                    return Number(num2[i])
                } else {
                    num2Arr.push(Number(num2[i]))
                }
            }
        }
    }

    // set iterator and add trailing 0's for calculations
    if (num1Arr.length > num2Arr.length) {
        iterations = num1Arr.length
        for (let i = 0; i < (num1Arr.length-num2Arr.length); i++) {
            num2Arr.push(0)
        }
    } else if (num2Arr.length > num1Arr.length) {
        iterations = num2Arr.length
        for (let i = 0; i < (num2Arr.length-num1Arr.length); i++) {
            num1Arr.push(0)
        }
    } else {
        iterations = num1Arr.length
    }

    let ans = ""
    let remainder = false
    // calculates expression
    for (let i = 0; i < iterations; i++) {
        if (remainder == true) {
            let sumR = num1Arr[i] + num2Arr[i] + 1 // sum with remainder
            if (sumR >= radix) {
                if (sumR - radix > 9) {
                    ans = digitLetters[sumR - radix] + ans
                } else {
                    ans = (String(sumR - radix)) + ans
                }
            } else {
                if (sumR - radix > 9) {
                    ans = String(sumR) + ans
                } else {
                    ans = String(sumR) + ans
                }
                remainder = false
            }
        } else {
            let sumNR = num1Arr[i] + num2Arr[i] // sum with no remainder
            if (sumNR >= radix) {
                remainder = true
                if (sumNR - radix > 9) {
                    // key may need to be called as String
                    ans = digitLetters[sumNR - radix] + ans
                } else {
                    ans = String(sumNR - radix) + ans
                }
            } else {
                if (sumNR > 9) {
                    ans = digitLetters[String(sumNR)] + ans
                } else {
                    ans = String(radix - sumNR) + ans
                }
            }
        }
    }


    // pushes trailing '1' if necessary during final sum
    if (remainder == true) {
        ans = "1" + ans
    }
    return ans
}

let num1 = ""
let op = ""
let num2 = ""

add.addEventListener("click", function() {
    op = "+"
    num1 = calcInput.value
    calcInput.value = ""
})

// Outputs calculated base number
calculate.addEventListener("click", function() {
    num2 = calcInput.value
    let radix = Number(String(calcDrop.value).substring(String(calcDrop.value).indexOf('-')+1))
    let ans = calculateBases(num1, num2, op)
    calcOutput.textContent = ""
    if (num2 == "") {
        calcOutput.textContent = "Enter a second base number"
    } else if (calcDrop.value == "") {
        num1 = ""
        num2 = ""
        calcInput.value = ""
        calcOutput.textContent = "Please choose a base!"
    } else {
        if (typeof(ans) === "number" && ans >= radix) {
            calcOutput.textContent = "Digit symbol '" + ans + "' is invalid in Base " + radix
            calcOutput.value = ""
            num1 = ""
            num2 = ""
        } else if (typeof(ans) === "object") {
            calcOutput.textContent = "Digit symbol '" + ans[0] + "' is invalid in Base " + radix
            calcOutput.value = ""
        } else {
            calcOutput.textContent = calculateBases(num1, num2, op)
            calcInput.value = ""
        }
    }
})

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~          BASE NUMBER TO DECIMAL (base 10) CONVERTER          ~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// CALCULATE BASE NUMBER CONVERSION TO DECIMAL
function baseToDecimal(b2DecIn, b) {
    let input = b2DecIn
    let base = b
    let baseChecker = ""
    let position = 0
    let conversion = 0

    let fractionalStr = ""
    let fractional = 0
    if (b2DecIn.includes(".")) {
        fractionalStr = b2DecIn.substring(b2DecIn.indexOf('.')+1)
        input = b2DecIn.substring(0, b2DecIn.indexOf('.'))
        if (fractionalStr == "") {
            return "Please enter number after decimal point!"
        } else {
            for (let i = 0; i < fractionalStr.length; i++) {
                if (fractionalStr[i].match(/[a-zA-Z]/g)) {
                    if (String(fractionalStr[i]).toUpperCase() in letterDigits) {
                        if (letterDigits[String(fractionalStr[i].toUpperCase())] > base-1) {
                            return "Invalid digit symbol in base " + base + ": " + "'" + fractionalStr[i] + "'"
                        } else {
                            fractional += letterDigits[String(fractionalStr[i]).toUpperCase()] / base ** (i+1)
                        }
                    } else {
                        return "Invalid digit symbol in base " + base + ": " + "'" + fractionalStr[i] + "'"
                    }
                } else {
                    if (fractionalStr[i] > base-1) {
                        return "Invalid digit symbol in base " + base + ": " + "'" + fractionalStr[i] + "'"
                    } else {
                        fractional += fractionalStr[i] / base ** (i+1)
                    }
                }
            }
        }
    } else {
        input = b2DecIn
    }

    if (fractional > 0 && input.length == 0) {
        return Number(0 + fractional)
    }
    for (let i = input.length-1; i >= 0; i--) {
        if (String(input[i]).toUpperCase() in letterDigits) {
            if (letterDigits[String(input[i]).toUpperCase()] > base-1) {
                return "Invalid digit symbol in base " + base + ": " + "'" + input[i] + "'"
            } else {
                conversion += Number(letterDigits[String(input[i]).toUpperCase()]) * base ** position
                position += 1
            }
        } else if (input[i] >= 0 && input[i] <= 9) {
            if (input[i] > base-1) {
                return "Invalid digit symbol in base " + base + ": " + input[i]
            } else {
                conversion += input[i] * (base ** position)
                position += 1
            }
        } else {
            return "Invalid digit symbol in base " + base + ": " + "'" + input[i] + "'"
        }
    }
    if (fractional > 0) {
        return Number(conversion + fractional)
    }
    return Number(conversion)
}

// OUTPUT CONVERTED BASE NUMBER
b2DecBtn.addEventListener("click", function() {
    let input = b2DecInput.value
    let base = Number(String(b2DecDropdown.value).substring(String(b2DecDropdown.value).indexOf('-')+1))

    if (checkInput(input, base, "b2Decimal") == 0) {
        baseToDecimal(input, base)
        if (typeof(baseToDecimal(input, base)) === "number") {
            b2DecOutput.textContent = baseToDecimal(input, base)
        } else {
            b2DecOutput.textContent = baseToDecimal(input, base)
            input.value = ""
        }
    } else {
        b2DecOutput.textContent = checkInput(input, base, "b2Decimal")
        input.value = ""
    }
})
