let input = document.getElementById("num-input")
let convert = document.getElementById("convert")
let output = document.getElementById("conversion-output")
let dropdown = document.getElementById("choices")

// Returns "baseStr", "decStr" and "decNumLength"
function baseConversion(i, n, b, bS, dS, lD) {
    let returnedValues = []

    if (i.includes('.')) {
		let numStr = i.substring(0, i.indexOf('.'))
		n = Number(numStr)
	}

    // Convert user input to chosen base from base 2 - base 10
	if (b < 11) {
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
	} else {
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
	}

	// Append final non-zero remainder to base string
	if (String(n) in lD) {
		bS += lD[String(n)]
	} else {
		bS += n
	}
    returnedValues.push(Number(bS))

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
        returnedValues.push(Number(dS))
        returnedValues.push(Number(dNL))
	}
    return returnedValues
}

// Convert decimal to base 2
convert.addEventListener("click", function() {
	output.textContent = ""
	
    // Variables for baseConversion()
    let inputStr = String(input.value)
	let myNum = input.value
	let baseStr = ""
	let base = Number(String(dropdown.value).substring(String(dropdown.value).indexOf('-')+1))
	let decStr = ""
	let letterDigits = {"10": "A", "11": "B", "12": "C", "13": "D", "14": "E", "15": "F"}

    if (inputStr.includes("u")) {
        output.textContent = "Please enter a valid base number"
    } else {
        // i, n, b, bS, dS, lD
        baseConversion(inputStr, myNum, base, baseStr, decStr, letterDigits)
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
    }
	    console.log(baseConversion(inputStr, myNum, base, baseStr, decStr, letterDigits))
		input.value = ""
	
})
