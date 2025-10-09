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

// OBJECT OF LETTER DIGIT SYMBOLS ASSIGNED TO NUMBERS
let digitLetters = {"10": "A", "11": "B", "12": "C", "13": "D", "14": "E", "15": "F"}
// OBJECT OF NUMBERS ASSIGNED TO LETTER DIGIT SYMBOLS
let letterDigits = {"A": "10", "B": "11", "C": "12", "D": "13", "E": "14", "F": "15"} 

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~      DECIMAL (base 10) NUMBER TO BASE NUMBER CONVERTER       ~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// RETURNS CONVERTED NUMBERS AND A LENGTH VALUE
function baseConversion(uin, uBase, digLet) {
    // n = Number(quotient with decimal)
    // i = quotient (no decimal)
    // replace any 'i' or 'n' with 'quotient'

    // quotient string
    let uinStr = String(uin)

    // renamed variables (base and quotient) for readability within baseConversion()
    let base = uBase
    let quotient = Number(uinStr)
    if (uinStr.includes('.')) {
		quotient = Number(uinStr.substring(0, uinStr.indexOf('.')))
	}

    // 'returned' will eventually store 'baseStr', 'decStr' and 'dNLength' to be returned
    let returned = []
    let baseStr = ""
    let decStr = ""

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

	// Example: uin = 23.30
	if (uinStr.includes('.')) {
		let decNum = Number(uinStr.substring(uinStr.indexOf('.'))) * base // decNum = .30 * base
		let dNLength = Number(uinStr.substring(uinStr.indexOf('.')).length-1) // dNLength = 2 (length of fractional)

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
        returned.push(decStr)
        returned.push(Number(dNLength))
	}
    return returned // Array of values to store into variables below
}

// CHECK USER INPUT - OUTPUT ACCORDINGLY
d2BaseBtn.addEventListener("click", function() {
	d2BaseOutput.textContent = ""
	
    // variables for baseConversion()
	let userNum = d2BaseInput.value
	let base = Number(String(d2BaseDropdown.value).substring(String(d2BaseDropdown.value).indexOf('-')+1))
	let finalConversion = ""

    if (userNum.length == 0 || userNum.match(/[a-zA-Z]/g)) {
        d2BaseOutput.textContent = "Please enter a valid decimal number!"
    } else {
        // final concatenation and output of converted decimal to base number
        finalConversion = baseConversion(userNum, base, digitLetters)
        if (finalConversion == 0) {
            d2BaseOutput.textContent = "Please choose a radix!"
        } else {
            baseStr = finalConversion[0]
            decStr = finalConversion[1]
            decNumLength = finalConversion[2]
	        if (userNum.includes('.')) {
		        // reverse baseStr for output (decimal point)
		        let ans = ""
		        for (let i = baseStr.length-1; i >= 0; i--) {
			        ans += baseStr[i]
		        }
		        if (d2BaseDropdown.value == "base-2") {
			        d2BaseOutput.textContent = userNum + " in binary: " + ans + "." + decStr
		        } else if (base == 10) {
			        let decNumLength = userNum.substring(userNum.indexOf('.')).length-1
			        d2BaseOutput.textContent = userNum + " in base 10: " + ans + "." + decStr.substring(0, decNumLength)
		        } else {
			        d2BaseOutput.textContent = userNum + " in base " + base + ": " + ans + "." + decStr
		        }
	        } else {
		        // reverse baseStr for output (no decimal point)
		        let ans = ""
		        for (let i = baseStr.length-1; i >= 0; i--) {
			        ans += baseStr[i]
		        }
		        if (d2BaseDropdown.value == "base-2") {
			        d2BaseOutput.textContent = userNum + " in binary: " + ans
		        } else {
			        d2BaseOutput.textContent = userNum + " in base " + base + ": " + ans
		        }
	        }
        }
    }
	userNum = ""
})

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// ~~~~~~~~~~                    BASE NUMBER CALCULATOR                    ~~~~~~~~~~
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// add, subtract, multipy or divide base numbers
function calculateBases(n1, n2, o) {
    let radix = Number(String(calcDrop.value).substring(String(calcDrop.value).indexOf('-')+1))
    let num1Arr = []
    let num2Arr = []
    let iterations = 0

    let invalidDigitSymbol = []
    if (o == "+") {
        for (let i = num1.length-1; i >= 0; i--) {
            let tempStr = num1[i]
            if (tempStr.toUpperCase() in letterDigits) {
                if (Number(letterDigits[tempStr.toUpperCase()]) > radix - 1) {
                    invalidDigitSymbol.push(digitLetters[letterDigits[tempStr.toUpperCase()]])
                    return invalidDigitSymbol
                } else {
                    num1Arr.push(Number(letterDigits[tempStr.toUpperCase()]))
                }
            } else if (typeof(num1[i] === "NaN")) {
                invalidDigitSymbol.push(num1[i])
                return invalidDigitSymbol
            } else {
                if (Number(num1[i]) > radix - 1) {
                    return Number(num1[i])
                } else {
                    num1Arr.push(Number(num1[i]))
                }
            }
        }
        for (let i = num2.length-1; i >= 0; i--) {
            let tempStr = num2[i]
            if (tempStr.toUpperCase() in letterDigits) {
                if (Number(letterDigits[tempStr.toUpperCase()]) > radix - 1) {
                    invalidDigitSymbol.push(digitLetters[letterDigits[tempStr.toUpperCase()]])
                    return invalidDigitSymbol
                } else {
                    num2Arr.push(Number(letterDigits[tempStr.toUpperCase()]))
                }
            } else if (typeof(num2[i] === "NaN")) {
                invalidDigitSymbol.push(num2[i])
                return invalidDigitSymbol
            } else {
                if (Number(num2[i]) > radix - 1) {
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

    let temp = ""
    let remainder = false
    // calculates expression
    for (let i = 0; i < iterations; i++) {
        if (remainder == true) {
            let sumR = num1Arr[i] + num2Arr[i] + 1 // sum with remainder
            if (sumR >= radix) {
                if (sumR - radix > 9) {
                    temp = digitLetters[sumR - radix] + temp
                } else {
                    temp = (String(sumR - radix)) + temp
                }
            } else {
                if (sumR - radix > 9) {
                    temp = String(sumR) + temp
                } else {
                    temp = (digitLetters[sumR]) + temp
                }
                temp = String(sumR) + temp
                remainder = false
            }
        } else {
            let sumNR = num1Arr[i] + num2Arr[i] // sum with no remainder
            if (sumNR >= radix) {
                remainder = true
                if (sumNR - radix > 9) {
                    temp = digitLetters[sumNR - radix] + temp
                } else {
                    temp = String(sumNR - radix) + temp
                }
            } else {
                temp = String(sumNR - radix) + temp
            }
        }
    }

    // pushes trailing '1' if necessary during final sum
    if (remainder == true) {
        temp = "1" + temp
    }

    return temp
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
    if (calcDrop.value == "") {
        num1 = ""
        num2 = ""
        calcInput.value = ""
        calcOutput.textContent = "Please choose a base!"
    } else {
        if (typeof(ans) === "number" && ans >= radix) {
            calcOutput.textContent = "Digit symbol '" + ans + "' is invalid in Base " + radix
            calcOutput.value = ""
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
    // FIX: Convert letter digits to check if they're greater than the base
    // FIX: Add functionality to convert base numbers with decimal points
    let input = b2DecIn
    let base = b
    let baseChecker = ""
    let position = 0
    let conversion = 0

    for (let i = input.length-1; i >= 0; i--) {
        if (input[i] > base-1) {
            baseChecker = input[i]
            break
        } else {
            conversion += input[i] * (base ** position)
            position += 1
        }
    }
    if (!baseChecker) {
        return Number(conversion)
    } else {
        return "Invalid digit symbol in base " + base + ": " + baseChecker
    }
}

// OUTPUT CONVERTED BASE NUMBER
b2DecBtn.addEventListener("click", function() {
    let base = Number(String(b2DecDropdown.value).substring(String(b2DecDropdown.value).indexOf('-')+1))
    let input = b2DecInput.value

    if (!input) {
        b2DecOutput.textContent = "Please enter your base number"
    } else if (!base) {
        b2DecOutput.textContent = "Please choose a valid base"
    } else {
        baseToDecimal(input, base)
        if (typeof(baseToDecimal(input, base)) === "number") {
            b2DecOutput.textContent = baseToDecimal(input, base)
        } else {
            b2DecOutput.textContent = baseToDecimal(input, base)
            input.value = ""
        }
    }
})
