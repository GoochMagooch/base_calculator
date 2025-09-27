let base2Input = document.getElementById("base2-input")
let base2Convert = document.getElementById("base2")
let testPara = document.getElementById("test-para")

base2Convert.addEventListener("click", function() {
	testPara.textContent = ""
	let myNum = base2Input.value
	let binary = ""

	// convert decimal to base 2
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

	let ans = ""
	let counter = binary.length - 1
	for (let i = 0; i < binary.length; i++) {
		ans += binary[counter]
		counter -= 1
	}
	testPara.textContent = base2Input.value + " in binary: " + ans

	base2Input.value = ""
})