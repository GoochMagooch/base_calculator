let input = document.getElementById("num-input")
let convert = document.getElementById("convert")
let output = document.getElementById("conversion-output")
let dropdown = document.getElementById("choices")

// Convert decimal to base 2
convert.addEventListener("click", function() {
	output.textContent = ""
	let myNum = input.value
	let baseStr = ""
	let base = 0

	// Choose base conversion
	if (dropdown.value == "base-2") {
		base = 2
	} else if (dropdown.value == "base-3") {
		base = 3
	} else if (dropdown.value == "base-4") {
		base = 4
	} else if (dropdown.value == "base-5") {
		base = 5
	} else if (dropdown.value == "base-6") {
		base = 6
	} else if (dropdown.value == "base-7") {
		base = 7
	} else if (dropdown.value == "base-8") {
		base = 8
	} else if (dropdown.value == "base-9") {
		base = 9
	} else if (dropdown.value == "base-10") {
		base = 10
	} else if (dropdown.value == "base-11") {
		base = 11
	} else if (dropdown.value == "base-12") {
		base = 12
	} else if (dropdown.value == "base-13") {
		base = 13
	} else if (dropdown.value == "base-14") {
		base = 14
	} else if (dropdown.value == "base-15") {
		base = 15
	} else if (dropdown.value == "base-16") {
		base = 16
	}

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
		
	}
	if (myNum < base) {
		baseStr += myNum
	}

	// Reverse base string for output
	let ans = ""
	for (let i = baseStr.length-1; i >= 0; i--) {
		ans += baseStr[i]
	}

	// Output depending on base conversion
	if (dropdown.value == "base-2") {
		output.textContent = input.value + " in binary: " + ans
	} else {
		output.textContent = input.value + " in base " + base + ": " + ans
	}
	input.value = ""
})