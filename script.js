let input = document.getElementById("num-input")
let convert = document.getElementById("convert")
let output = document.getElementById("conversion-output")

// Convert decimal to base 2
convert.addEventListener("click", function() {
	output.textContent = ""
	let myNum = input.value
	let binary = ""

	while (myNum > 1) {
		if (myNum == 2) {
			binary += 0
			myNum = myNum / 2
		} else {
			if (myNum % 2 == 0) {
				binary += 0
				myNum = myNum / 2
			} else {
				binary += 1
				myNum = (myNum-1) / 2
			}
		}
	}
	if (myNum == 1) {
		binary += 1
		myNum = myNum - 1 / 2
	}

	// Reverse base 2 string for output
	let ans = ""
	let counter = binary.length - 1
	for (let i = 0; i < binary.length; i++) {
		ans += binary[counter]
		counter -= 1
	}
	output.textContent = input.value + " in binary: " + ans
	input.value = ""
})

// Convert decimal to base 3
