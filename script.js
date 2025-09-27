let base2Input = document.getElementById("base2-input");
let base2Convert = document.getElementById("base2");
let testPara = document.getElementById("test-para");

base2Convert.addEventListener("click", function() {
	testPara.textContent = "";
	let myNum = base2Input.value;

	// convert decimal to base 2
	/*
	let binary = "";
	let newNum = myNum;
	while (newNum > 1) {
		if (newNum % 2 == 1) {
			binary += 1;
			newNum = newNum - 1 / 2;
		} else if (newNum == 2) {
			binary += 0;
			return
		} else {
			binary += 0;
			newNum = newNum / 2;
		}
	}
	*/
	testPara.textContent = base2Input.value + " in binary: " + binary;

	base2Input.value = "";
})
// 250 % 2 = 0 - q = 125
// 125 % 2 = 1 - q =  62
// 	62 % 2 = 0 - q =  31
// 	31 % 2 = 1 - q =  15
// 	15 % 2 = 1 - q =   7
//   7 % 2 = 1 - q =   3
//   2 % 2 = 0 - q =   0

let binary = "";
let newNum = 250;
while (newNum > 1)
	if (newNum % 2 == 1) {
		binary += 1;
		newNum = newNum - 1 / 2;
	} else if (newNum == 2) {
		binary += 0;
	} else {
		binary += 0;
		newNum = newNum / 2;
	}
console.log(binary)