// BASE CONVERSION VARIABLES
let conInput = document.getElementById("con-input")
let convert = document.getElementById("convert")
let conOutput = document.getElementById("con-output")
let dropdown = document.getElementById("choices")

// BASE NUMBER CALCULATOR VARIABLES
let calcInput = document.getElementById("calc-input")
let calculate = document.getElementById("calculate")
let calcOutput = document.getElementById("calc-output")
let calcDrop = document.getElementById("calcChoices")
let add = document.getElementById("add")

// OBJECT OF LETTER DIGITS
let digitLetters = {"10": "A", "11": "B", "12": "C", "13": "D", "14": "E", "15": "F"}

// CONVERT USER INPUT TO CHOSEN RADIX, RETURNS "baseStr", "decStr" and "decNumLength"
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

// CHECK USER INPUT, OUTPUT ACCORDINGLY (BASE CONVERSION)
convert.addEventListener("click", function() {
	conOutput.textContent = ""
	
    // Variables for baseConversion()
    let inputStr = String(conInput.value)
	let myNum = conInput.value
	let base = Number(String(dropdown.value).substring(String(dropdown.value).indexOf('-')+1))
	let finalConversion = ""

    if (inputStr.length == 0 || inputStr.match(/[a-zA-Z]/g)) {
        conOutput.textContent = "Please enter a valid decimal number!"
    } else {
        // i, n, b, dL
        // Returns "baseStr", "decStr" and "decNumLength"
        finalConversion = baseConversion(inputStr, myNum, base, digitLetters)
        if (finalConversion == 0) {
            conOutput.textContent = "Please choose a radix!"
        } else {
            baseStr = finalConversion[0]
            decStr = finalConversion[1]
            decNumLength = finalConversion[2]
            // Checks for decimal point, reverses strings and outputs accordingly
	        if (String(conInput.value).includes('.')) {
		        // Reverse baseStr for output (decimal point)
		        let ans = ""
		        for (let i = baseStr.length-1; i >= 0; i--) {
			        ans += baseStr[i]
		        }
		        if (dropdown.value == "base-2") {
			        conOutput.textContent = conInput.value + " in binary: " + ans + "." + decStr
		        } else if (base == 10) {
			        let decNumLength = inputStr.substring(inputStr.indexOf('.')).length-1
			        conOutput.textContent = conInput.value + " in base 10: " + ans + "." + decStr.substring(0, decNumLength)
		        } else {
			        conOutput.textContent = conInput.value + " in base " + base + ": " + ans + "." + decStr
		        }
	        } else {
		        // Reverse baseStr for output (no decimal point)
		        let ans = ""
		        for (let i = baseStr.length-1; i >= 0; i--) {
			        ans += baseStr[i]
		        }
		        if (dropdown.value == "base-2") {
			        conOutput.textContent = conInput.value + " in binary: " + ans
		        } else {
			        conOutput.textContent = conInput.value + " in base " + base + ": " + ans
		        }
	        }
        }
    }
	conInput.value = ""
})

let letterDigits = {"A": "10", "B": "11", "C": "12", "D": "13", "E": "14", "F": "15"} 
// ADD, SUBTRACT, MULTIPLY OR DIVIDE ANY MIX OF BASE NUMBERS
function calculateBases(n1, n2, o) {
    let radix = Number(String(calcDrop.value).substring(String(calcDrop.value).indexOf('-')+1))
    let num1Arr = []
    let num2Arr = []
    let iterations = 0

    // FIX: allow uppercase and lowercase inputs of digit symbols
    if (o == "+") {
        for (let i = num1.length-1; i >= 0; i--) {
            if (num1[i] in letterDigits) {
                if (Number(letterDigits[num1[i]]) > radix - 1) {
                    return  Number(letterDigits[num1[i]])
                } else {
                    num1Arr.push(Number(letterDigits[num1[i]]))
                }
            } else {
                if (Number(num1[i]) > radix - 1) {
                    return Number(num1[i])
                } else {
                    num1Arr.push(Number(num1[i]))
                }
            }
        }
        for (let i = num2.length-1; i >= 0; i--) {
            if (num2[i] in letterDigits) {
                if (Number(letterDigits[num2[i]]) > radix - 1) {
                    return Number(letterDigits[num2[i]])
                } else {
                    num2Arr.push(Number(letterDigits[num2[i]]))
                }
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

// BUTTON CLICK TO CALCULATE
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
            // FIX: convert invalid base number to letter digit symbol if necessary
            calcOutput.textContent = "Digit symbol '" + ans + "' is invalid in Base " + radix
            calcOutput.value = ""
        } else {
            calcOutput.textContent = calculateBases(num1, num2, op)
            calcInput.value = ""
        }
    }
})
