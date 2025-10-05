// BASE CONVERSION VARIABLES
let conInput = document.getElementById("con-input")
let convert = document.getElementById("convert")
let conOutput = document.getElementById("con-output")
let dropdown = document.getElementById("choices")

let calcInput = document.getElementById("calc-input")
let calculate = document.getElementById("calculate")
let calcOutput = document.getElementById("calc-output")

// OBJECT OF LETTER DIGITS
let letterDigits = {"10": "A", "11": "B", "12": "C", "13": "D", "14": "E", "15": "F"}

// comment to test ssh key validation

// CONVERT USER INPUT TO CHOSEN RADIX, RETURNS "baseStr", "decStr" and "decNumLength"
function baseConversion(i, n, b, lD) {
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
				} else if (String(n%b) in lD) {
					bS += lD[String(n%b)]
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
		bS += lD[String(n)]
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
        // i, n, b, bS, dS, lD
        // Returns "baseStr", "decStr" and "decNumLength"
        finalConversion = baseConversion(inputStr, myNum, base, letterDigits)
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

// MULTIPLY, ADD, SUBTRACT OR DIVIDE ANY MIX OF BASE NUMBERS
function calculateBases() {
    return
}

// BUTTON CLICK TO CALCULATE
calculate.addEventListener("click", function() {
    calcOutput.textContent = "Test complete!"
})
