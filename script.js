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
let mul = document.getElementById("mul")
let div = document.getElementById("div")
let add = document.getElementById("add")
let sub = document.getElementById("sub")

// BASE NUMBER TO DECIMAL CONVERSION VARIABLES
let b2DecInput = document.getElementById("b2Dec-input")
let b2DecBtn = document.getElementById("b2Dec-btn")
let b2DecOutput = document.getElementById("b2Dec-output")
let b2DecDropdown = document.getElementById("b2Dec-choices")

// OBJECT OF ALPHA DIGIT SYMBOLS ASSIGNED TO NUMBERS
let digitLetters = {"10": "A", "11": "B", "12": "C", "13": "D", "14": "E", "15": "F"}
// OBJECT OF NUMBERS ASSIGNED TO ALPHA DIGIT SYMBOLS
let letterDigits = {"A": "10", "B": "11", "C": "12", "D": "13", "E": "14", "F": "15"}

// CHECKS INITIAL INPUTS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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

// RETURNS CONVERTED NUMBERS AND A LENGTH VALUE ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
		    let decNumLength = uinStr.substring(uinStr.indexOf('.')).length-1
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

// CHECK USER INPUT - OUTPUT ACCORDINGLY ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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

// RETURNS PRODUCT OF n1 AND n2
function calcMul(iMul, mulArr1, mulArr2, mulR, mulDec) {

    let product = ""
    let prodArr = []
    let carry = 0
    let multiplicand = 0
    let multiplier = 0
    let multCount = 0
    const multiplierCount = mulArr2.length-1
    let finalIterator = 0

    for (let i = 0; i < iMul; i++) {
        let tempArr = []
        multiplier = mulArr2[i]
        let tempProd = ""
        if (multiplier == 0) {
            multCount += 1
            continue
        } else {
            for (let j = 0; j < iMul; j++) {
                multiplicand = mulArr1[j]
                let temp = multiplicand * multiplier
                if (carry > 0) {
                    temp = temp + carry
                    if (temp >= mulR) {
                        tempArr.push(temp % mulR)
                        if ((temp/mulR) >= 1 && String(temp/mulR).includes('.')) {
                            carry = Number(String(temp/mulR).substring(0, String(temp/mulR).indexOf('.')))
                        } else if ((temp/mulR) >= 1) {
                            carry = temp/mulR
                        }
                    } else {
                        tempArr.push(temp)
                        carry = 0
                    }
                } else {
                    if (temp >= mulR) {
                        tempArr.push(temp % mulR)
                        if ((temp/mulR) >= 1 && String(temp/mulR).includes('.')) {
                            carry = Number(String(temp/mulR).substring(0, String(temp/mulR).indexOf('.')))
                        } else if ((temp/mulR) >= 1) {
                            carry = temp/mulR
                        }
                    } else {
                        tempArr.push(temp)
                    }
                }
            }
        }
        for (let k = 0; k < multCount; k++) {
            tempArr.unshift(0)
        }
        if (carry > 0) {
            tempArr.push(carry)
        }
        carry = 0
        multCount += 1
        finalIterator += 1

        prodArr.push(tempArr)
    }

    let addZero = prodArr[prodArr.length-1].length
    for (let i = 0; i < prodArr.length-1; i++) {
        let iterate = addZero - prodArr[i].length
        for (let j = 0; j < iterate; j++) {
            prodArr[i].push(0)
        }
    }

    let param1 = Number(prodArr[0].length)
    let param2 = prodArr[0]
    let param3 = prodArr[1]
    const param4 = Number(mulR)

    // returns product with 1 multipler
    multiplier = mulArr2[0]
    if (prodArr.length == 1 && multiplier == 1) {
        for (let i = prodArr[0].length-1; i >= 0; i--) {
            if (prodArr[0][i] > 9) {
                product = product + digitLetters[String(prodArr[0][i])]
            } else {
                product = product + String(prodArr[0][i])
            }
        }
    } else if (prodArr.length == 1) {
        for (let i = prodArr[0].length-1; i >= 0; i--) {
            if (prodArr[0][i] > 9) {
                product = product + digitLetters[prodArr[0][i]]
            } else {
                product = product + String(prodArr[0][i])
            }
        }
    // returns product with 2 multiplers
    } else if (prodArr.length == 2) {
        // TODO: shave off leading 0's
        product = calcAdd(param1, param2, param3, param4)
    // return product with > 2 multipliers
    } else {
        product = calcAdd(param1, param2, param3, param4)
        for (let i = 0; i < finalIterator - 2; i++) {
            let tempProdArr = []
            for (let j = product.length-1; j >= 0; j--) {
                if (String(product[j]) in letterDigits) {
                    tempProdArr.push(Number(letterDigits[product[j]]))
                } else {
                    tempProdArr.push(Number(product[j]))
                }
            }
            param2 = tempProdArr
            param3 = prodArr[i+2]
            product = calcAdd(param1, param2, param3, param4)
        }
    }
    if (mulDec > 0) {
        for (let i = 0; i < mulDec; i++) {
            product = product.substring(0, product.length-1)
        }
    }
    return product
}

function calcDiv() {
    return "test div"
}

// RETURNS SUM OF n1 AND n2 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function calcAdd(iAdd, addArr1, addArr2, addR) {

    let sum = ""
    let remainder = false

    // calculates sums and appends to 'ans'
    // assigns alpha digit symbols
    for (let i = 0; i < iAdd; i++) {
        if (remainder == true) {
            let sumR = addArr1[i] + addArr2[i] + 1 // sum with remainder
            if (sumR >= addR) {
                if (sumR - addR > 9) {
                    sum = digitLetters[sumR - addR] + sum
                } else {
                    sum = (String(sumR - addR)) + sum
                }
            } else {
                if (sumR > 9) {
                    sum = digitLetters[String(sumR)] + sum
                } else {
                    sum = String(sumR) + sum
                }
                remainder = false
            }
        } else {
            let sumNR = addArr1[i] + addArr2[i] // sum with no remainder
            if (sumNR >= addR) {
                remainder = true
                if (sumNR - addR > 9) {
                    sum = digitLetters[sumNR - addR] + sum
                } else {
                    sum = String(sumNR - addR) + sum
                }
            } else {
                if (sumNR > 9) {
                    sum = digitLetters[String(sumNR)] + sum
                } else {
                    sum = String(sumNR) + sum
                }
            }
        }
    }

    // assigns leading 1 digit symbol to 'ans'
    if (remainder == true) {
        sum = "1" + sum
    }
    return sum
}

// RETURNS DIFFERENCE OF n1 AND n2
function calcSub(iSub, subArr1, subArr2, subR) {
    // FIX: account for minuends that are less than subtrahend
    // FIX: numbers > base 10 don't subtract properly:
    //      15 - A in Hex will convert to [5, 1] - [10, 0] instead of 21 - 10
    let diff = ""

    for (let i = 0; i < iSub; i++) {
        let minuend = subArr1[i]
        let subtrahend = subArr2[i]

        if (minuend < subtrahend) {
            let traverse = (i+1)
            let borrow = false
            while (borrow == false) {
                if (subArr1[traverse] > subArr2[traverse]) {
                    subArr1[traverse] -= 1
                    borrow = true
                } else {
                    subArr1[traverse] = (subArr1[traverse] + subR - 1) + diff
                    traverse += 1
                }
            }
            diff = ((minuend + subR) - subtrahend) + diff
        } else {
            diff = (minuend - subtrahend) + diff
        }
    }
    return diff
}

// CONVERTS INPUTS TO NECESSARY STRINGS AND RETURNS FORMATTED CALCULATIONS ~~~~~~~~~~
function calculateBases(n1, n2, o) {

    let radix = Number(String(calcDrop.value).substring(String(calcDrop.value).indexOf('-')+1))
    let num1Arr = []
    let num2Arr = []
    let n1decLen = 0
    let n2decLen = 0
    let mulDecPlaces = 0
 
    // separates whole numbers and fractionals into strings
    if (n1.includes('.') && n2.includes('.')) {
        n1decLen = n1.substring(n1.indexOf('.')+1).length
        n2decLen = n2.substring(n2.indexOf('.')+1).length
        n1 = n1.substring(0, n1.indexOf('.')) + n1.substring(n1.indexOf('.')+1)
        n2 = n2.substring(0, n2.indexOf('.')) + n2.substring(n2.indexOf('.')+1)
    } else if (n1.includes('.')) {
        n1decLen = n1.substring(n1.indexOf('.')+1).length
        n1 = n1.substring(0, n1.indexOf('.')) + n1.substring(n1.indexOf('.')+1)
    } else if (n2.includes('.')) {
        n2decLen = n2.substring(n2.indexOf('.')+1).length
        n2 = n2.substring(0, n2.indexOf('.')) + n2.substring(n2.indexOf('.')+1)
    }

    // properly sets decimal point for multiplication
    mulDecPlaces = n1decLen + n2decLen

    if (n1decLen > 0 || n2decLen > 0) {
        if (n1decLen > n2decLen) {
            multiplierDecimal = n1decLen
        } else {
            multiplierDecimal = n2decLen
        }
    }

    // set trailing 0s to n1, n2 or neither
    if (n1decLen > 0 && n1decLen > 0) {
        if (n1decLen > n2decLen) {
            for (let i = 0; i < n1decLen-n2decLen; i++) {
                n2 += "0"
            }
        } else {
            for (let i = 0; i < n2decLen-n1decLen; i++) {
                n1 += "0"
            }
        }
    } else if (n1decLen > 0) {
        for (let i = 0; i < n1decLen; i++) {
            n2 += "0"
        }
    } else {
        for (let i = 0; i < n2decLen; i++) {
            n1 += "0"
        }
    }

    // set leading 0s to n1, n2 or neither
    let tempIterator = 0
    if (n1.length > n2.length) {
        tempIterator = (n1.length-n2.length)
    } else if (n2.length > n1.length) {
        tempIterator = (n2.length-n1.length)
    }
    const lead = tempIterator

    if (n1.length > n2.length) {
        for (let i = 0; i < lead; i++) {
            n2 = "0" + n2
        }
        iterator = n1.length
    } else if (n2.length > n1.length) {
        for (let i = 0; i < lead; i++) {
            n1 = "0" + n1
        }
        iterator = n2.length
    } else {
        iterator = n1.length
    }

    // Allocates n1 and n2 to arrays to be calculated
    let invalidDigitSymbol = []
    for (let i = n1.length-1; i >= 0; i--) {
        let tempStr = n1[i]
        if (tempStr.match(/[a-zA-Z]/g)) {
            if (tempStr.toUpperCase() in letterDigits) {
                if (letterDigits[tempStr.toUpperCase()] >= radix) {
                    invalidDigitSymbol.push(digitLetters[letterDigits[tempStr.toUpperCase()]])
                    return invalidDigitSymbol
                } else {
                    num1Arr.push(Number(letterDigits[tempStr.toUpperCase()]))
                }
            } else {
                invalidDigitSymbol.push(n1[i])
                return invalidDigitSymbol
            }
        } else {
            if (tempStr >= radix) {
                return Number(n1[i])
            } else {
                num1Arr.push(Number(n1[i]))
            }
        }
    }
    for (let i = n2.length-1; i >= 0; i--) {
        let tempStr = n2[i]
        if (tempStr.match(/[a-zA-Z]/g)) {
            if (tempStr.toUpperCase() in letterDigits) {
                if (letterDigits[tempStr.toUpperCase()] > radix-1) {
                    invalidDigitSymbol.push(digitLetters[letterDigits[tempStr.toUpperCase()]])
                    return invalidDigitSymbol
                } else {
                    num2Arr.push(Number(letterDigits[tempStr.toUpperCase()]))
                }
            } else {
                invalidDigitSymbol.push(Number(n2[i]))
                return invalidDigitSymbol
            }
        } else {
            if (tempStr > radix-1) {
                return Number(n2[i])
            } else {
                num2Arr.push(Number(n2[i]))
            }
        }
    }

    let multplicationDecimal = 0
    if (n1decLen > 0 || n2decLen > 0) {
        if (n1decLen > n2decLen) {
            multplicationDecimal = n1decLen - n2decLen
        } else if (n2decLen > n1decLen) {
            multplicationDecimal = n2decLen - n1decLen
        } else {
            multiplierDecimal = n1decLen
        }
    }

    let limit = 0
    let ans = ""
    if (o == "*") {
        ans = calcMul(iterator, num1Arr, num2Arr, radix, multplicationDecimal)
        if (mulDecPlaces > 0) {
            limit = mulDecPlaces
        }
    } else if (o == "/") {
        ans = calcDiv(iterator, num1Arr, num2Arr, radix)
    } else if (o == "+") {
        ans = calcAdd(iterator, num1Arr, num2Arr, radix)
        if (n1decLen > n2decLen) {
            limit = n1decLen
        } else if (n2decLen > n1decLen) {
            limit = n2decLen
        } else {
            limit = n1decLen
        }
    } else {
        ans = calcSub(iterator, num1Arr, num2Arr, radix)
    }

    let comma = 0
    let space = 0
    if (radix == 10 && ans.length > 3) {
        for (let i = ans.length-(1+limit); i >= 0; i--) {
            comma += 1
            if (comma % 3 == 0 && i != 0) {
                ans = ans.substring(0, i) + "," + ans.substring(i)
            }
        }
    } else if (radix == 2 && ans.length > 4) {
        for (let i = ans.length-1; i >= 0; i--) {
            space += 1
            if (space % 4 == 0) {
                ans = ans.substring(0, i) + " " + ans.substring(i)
            }
        }
    } else if (radix == 16 && ans.length > 2) {
        for (let i = ans.length-(1+limit); i >= 0; i--) {
            space += 1
            if (space % 2 == 0 && i != 0) {
                ans = ans.substring(0, i) + "_" + ans.substring(i)
            }
        }
        ans = "0x" + ans
    }

    if (n1decLen > 0 || n2decLen > 0) {
        if (op == '*') {
            return ans.substring(0, (ans.length-mulDecPlaces)) + "." + ans.substring(ans.length-mulDecPlaces)
        } else if (op == '/') {
            // TODO: set division formatting
            return "division formatting coming soon..."
        } else if (op == '+') {
            if (n1decLen > n2decLen) {
                return ans.substring(0, ans.length-n1decLen) + "." + ans.substring(ans.length-n1decLen)
            } else {
                return ans.substring(0, ans.length-n2decLen) + "." + ans.substring(ans.length-n2decLen)
            }
        } else {
            // TODO: set subtraction formatting
            return "subtraction formatting coming soon..."
        }
    } else {
        return ans
    }
}

let num1 = ""
let op = ""
let num2 = ""

mul.addEventListener("click", function() {
    op = "*"
    num1 = calcInput.value
    calcInput.value = ""
})

div.addEventListener("click", function() {
    op = "/"
    num1 = calcInput.value
    calcInput.value = ""
})

add.addEventListener("click", function() {
    op = "+"
    num1 = calcInput.value
    calcInput.value = ""
})

sub.addEventListener("click", function() {
    op = "-"
    num1 = calcInput.value
    calcInput.value = ""
})

// OUTPUTS CALCULATIONS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
calculate.addEventListener("click", function() {
    num2 = calcInput.value
    let radix = Number(String(calcDrop.value).substring(String(calcDrop.value).indexOf('-')+1))
    let ans = calculateBases(num1, num2, op)
    calcOutput.textContent = ""

    // TODO: Add checks to checkInput()
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

// CONVERT BASE NUMBER TO DECIMAL ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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

// OUTPUT CONVERTED BASE NUMBER ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
