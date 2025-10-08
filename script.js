// DECIMAL NUMBER TO BASE CONVERSION VARIABLES
let d2BaseInput = document.getElementById("d2Base-input")
let d2BaseBtn = document.getElementById("d2Base-btn")
let d2BaseOutput = document.getElementById("d2Base-output")
let d2BaseDropdown = document.getElementById("d2Base-choices")

// BASE NUMBER CALCULATOR VARIABLES
let calcInput = document.getElementById("calc-input")
let calculate = document.getElementById("calculate")
let calcOutput = document.getElementById("calc-output")
let calcDrop = document.getElementById("calcChoices")
let add = document.getElementById("add")

// BASE NUMBER TO DECIMAL CONVERSION VARIABLES
let b2DecInput = document.getElementById("b2Dec-input")
let b2DecBtn = document.getElementById("b2Dec-btn")
let b2DecOutput = document.getElementById("b2Dec-output")
let b2DecDropdown = document.getElementById("b2Dec-choices")

// OBJECT OF LETTER DIGITS
let digitLetters = {"10": "A", "11": "B", "12": "C", "13": "D", "14": "E", "15": "F"}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//                 DECIMAL (base 10) NUMBER TO BASE NUMBER CONVERTER
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Convert user input to chose base number, returns "baseStr", "decStr" and "decNumLength"
function baseConversion(i, n, b, dL) {
    let returnedValues = []
    let bS = ""
    let dS = ""

    if (i.includes('.')) {
		let numStr = i.substring(0, i.indexOf('.'))
		n = Number(numStr)
	}

    // Convert user input to chosen base from base 2 - base 10
	if (b >= 1 && b <= 10) {
		while (n > b-1) {
			if (n == b) {
				bS += 0
			    n = n / b
		    } else {
			    if (n % b == 0) {
				    bS += 0
					n = n / b
				} else {
				    bS += n % b
				    n = (n-n%b) / b
			    }
		    }
		}
	} else if (b >= 11 && b <= 16 ) {
	    // Convert user input to chosen base from base 11 - base 16
		while (n > b-1) {
			if (n == b) {
				bS += 0
				n = n / b
			} else {
				if (n % b == 0) {
					bS += 0
					n = n / b
				} else if (String(n%b) in dL) {
					bS += dL[String(n%b)]
					n = (n-n%b) / b
				} else {
					bS += n % b
					n = (n-n%b) / b
				}
			}
		}
	} else {
        return 0
    }

	// Append final non-zero remainder to base string
	if (String(n) in lD) {
		bS += dL[String(n)]
	} else {
		bS += n
	}
    returnedValues.push(bS)

	// Checks for decimal point
	if (i.includes('.')) {
		let decNum = Number(i.substring(i.indexOf('.'))) * b
		let dNL = i.substring(i.indexOf('.')).length-1

		// Calculates number after decimal point
		for (let i = 0; i < 6; i++) {
			if (!String(decNum).includes('.')) {
				dS += decNum
				break
			} else {
				// Appends .quotient * radix
				let wholeNum = String(decNum).substring(0, String(decNum).indexOf('.'))
				let decimal = String(decNum).substring(String(decNum).indexOf('.'))
                if (Number(wholeNum) > 9) {
					dS += lD[String(wholeNum)]
					decNum = (Number(decimal) * b).toFixed(dNL)
				} else if (Number(wholeNum) > 0) {
                    dS += wholeNum
					decNum = (Number(decimal) * b).toFixed(dNL)
                } else {
                    dS += 0
					decNum = (Number(decimal) * b).toFixed(dNL)
                }
			}
		}
        returnedValues.push(dS)
        returnedValues.push(Number(dNL))
	}
    return returnedValues
}

// Check user input, output accordingly
d2BaseBtn.addEventListener("click", function() {
	d2BaseOutput.textContent = ""
	
    // Variables for baseConversion()
    let inputStr = String(d2BaseInput.value)
	let myNum = d2BaseInput.value
	let base = Number(String(d2BaseDropdown.value).substring(String(d2BaseDropdown.value).indexOf('-')+1))
	let finalConversion = ""

    if (inputStr.length == 0 || inputStr.match(/[a-zA-Z]/g)) {
        d2BaseOutput.textContent = "Please enter a valid decimal number!"
    } else {
        // i, n, b, dL
        // Returns "baseStr", "decStr" and "decNumLength"
        finalConversion = baseConversion(inputStr, myNum, base, digitLetters)
        if (finalConversion == 0) {
            d2BaseOutput.textContent = "Please choose a radix!"
        } else {
            baseStr = finalConversion[0]
            decStr = finalConversion[1]
            decNumLength = finalConversion[2]
            // Checks for decimal point, reverses strings and outputs accordingly
	        if (String(d2BaseInput.value).includes('.')) {
		        // Reverse baseStr for output (decimal point)
		        let ans = ""
		        for (let i = baseStr.length-1; i >= 0; i--) {
			        ans += baseStr[i]
		        }
		        if (d2BaseDropdown.value == "base-2") {
			        d2BaseOutput.textContent = d2BaseInput.value + " in binary: " + ans + "." + decStr
		        } else if (base == 10) {
			        let decNumLength = inputStr.substring(inputStr.indexOf('.')).length-1
			        d2BaseOutput.textContent = d2BaseInput.value + " in base 10: " + ans + "." + decStr.substring(0, decNumLength)
		        } else {
			        d2BaseOutput.textContent = d2BaseInput.value + " in base " + base + ": " + ans + "." + decStr
		        }
	        } else {
		        // Reverse baseStr for output (no decimal point)
		        let ans = ""
		        for (let i = baseStr.length-1; i >= 0; i--) {
			        ans += baseStr[i]
		        }
		        if (d2BaseDropdown.value == "base-2") {
			        d2BaseOutput.textContent = d2BaseInput.value + " in binary: " + ans
		        } else {
			        d2BaseOutput.textContent = d2BaseInput.value + " in base " + base + ": " + ans
		        }
	        }
        }
    }
	d2BaseInput.value = ""
})

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
//                               BASE NUMBER CALCULATOR
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// Object of numbers assigned to letter digit symbols
let letterDigits = {"A": "10", "B": "11", "C": "12", "D": "13", "E": "14", "F": "15"} 

// Add, subtract, multipy or divide base numbers
function calculateBases(n1, n2, o) {
    let radix = Number(String(calcDrop.value).substring(String(calcDrop.value).indexOf('-')+1))
    //FIX: Convert arrays to strings for less mem usage
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
//                     BASE NUMBER TO DECIMAL (base 10) CONVERTER
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
b2DecBtn.addEventListener("click", function() {
    b2DecOutput.textContent = "Test complete"
})
