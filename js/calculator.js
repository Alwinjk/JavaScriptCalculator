
var $ = function (id){
	return document.getElementById(id);
};


window.onload = function(){

	$("equal").onclick = calculateAns;
	$("cancel-entry").onclick = cancelEntry;
	$("clear").onclick = clear;
	$("pi").onclick = calcPi;
	$("eulers").onclick = calcEulers;
	$("nlog").onclick = calcnLog;
	$("log").onclick = calcLog;
	$("sin").onclick = calcSin;
	$("cos").onclick = calcCos;
	$("tan").onclick = calcTan;
	$("sqrt").onclick = calcSqrt;
	$("display").value = 0;
	$("display").focus();
	
};

var collectCharacters = function(char){
	

	if($("display").value.length == 1 && $("display").value == 0){
		
		if(char == "+" || char == "/" || char == "*" || char == "%" || char == "^" || char == "."){
			$("display").value = "0" + char;
		}
		else
			$("display").value = "";
	}
	
	if($("display").value == "Invalid Expression")
		$("display").value = char;
	else{
		$("display").value = $("display").value + char;
	}
	
	var checkCharArr = $("display").value;
	console.log(checkCharArr);
	var checkChar = checkCharArr[checkCharArr.length - 1];
	var checkCharPrev = checkCharArr[checkCharArr.length - 2];
	if( checkChar == "+" || checkChar == "-" || checkChar == "/" || checkChar == "*" || checkChar == "%" || checkChar == "^" || checkChar == "."){
		if(checkCharPrev == "+" || checkCharPrev == "-" || checkCharPrev == "/" || checkCharPrev == "*" || checkCharPrev == "%" || checkCharPrev == "^" || checkCharPrev == "."){
			$("display").value = checkCharArr.substring(0, checkCharArr.length - 1);
		}
			
	}
	$("display").focus();
};

var calculateAns = function() {

	var expression = $("display").value;
	if(isNaN(expression)){
		try{
			if(expression.includes("+") || expression.includes("-") || expression.includes("*") || expression.includes("/")){
				$("display").value = eval(expression);
			}
			
			
			
			
			//To find percentage
			if(expression.includes("%")){
				var charCheck = false, charCount = 0;
				for(var i=0;i<expression.length;i++){
					if(expression[i] == "%")
						charCount++;
					if(isNaN(expression[i]) && expression[i] != "%")
						charCheck = true;
				}
				if(charCheck == true || charCount > 1){
					$("display").value = "Invalid Expression";
				}else{
					var index = expression.indexOf("%");
					var lhs = parseFloat(expression.substring(0, index));
					var percent = lhs / 100;
					if(index != expression.length - 1){
						var rhs = parseFloat(expression.substring(index + 1));
						percent = percent * rhs;
					}
					$("display").value = percent;
				}
			}

			//To find power
			if(expression.includes("^")){
				var charCheck = false, charCount = 0;
				for(var i=0;i<expression.length;i++){
						if(expression[i] == "^")
							charCount++;
						if(isNaN(expression[i]) && expression[i] != "^")
							charCheck = true;
					}
					if(charCheck == true || charCount > 1){
						$("display").value = "Invalid Expression";
					}else{
						var index = expression.indexOf("^");
						var ans = parseFloat(expression.substring(0, index));
						var powVal = Math.pow(ans, 2);
						if(index != expression.length - 1){
							var rhs = parseFloat(expression.substring(index + 1));
							powVal = Math.pow(ans, rhs);
						}
						$("display").value = powVal;
					}
			}	
		}catch(err) {
			$("display").value = "Invalid Expression";
		}
	}
	$("display").focus();
};

var calcPi = function (){
	var arrRhs = findRhs(), value = arrRhs[0], index = arrRhs[1], expression = arrRhs[2];
	if(value == true){
		var rhs = expression.substring(index + 1);
		var pi = (parseFloat(rhs) * Math.PI.toFixed(8));
		$("display").value = expression.substring(0, index + 1) + pi;
	} else {
		if(expression == 0){
			$("display").value = Math.PI.toFixed(8);
		}else{
			var pi = (expression * Math.PI.toFixed(8));
			$("display").value = pi;
		}
	}
	$("display").focus();
}; 

var calcEulers = function (){
	var arrRhs = findRhs(), value = arrRhs[0], index = arrRhs[1], expression = arrRhs[2];
	if(value == true){
		var rhs = parseFloat(expression.substring(index + 1));
		var eulersVal = Math.exp(1) * rhs;
		$("display").value = expression.substring(0, index + 1) + eulersVal;
	} else {
		if(expression == 0){
			$("display").value = Math.exp(1);
		}
		else{
			var eulersVal = Math.exp(1) * (parseFloat(expression));
			$("display").value = eulersVal;
		}
	}
	$("display").focus();
};

var calcnLog = function (){
	var arrRhs = findRhs(), value = arrRhs[0], index = arrRhs[1], expression = arrRhs[2];
	if(value == true){
		var rhs = parseFloat(expression.substring(index + 1));
		var logVal = Math.log(rhs);
		$("display").value = expression.substring(0, index + 1) + logVal;
	} else {
		var logVal = Math.log(parseFloat(expression));
		$("display").value = logVal;
	}
	$("display").focus();
};

var calcLog = function (){
	var arrRhs = findRhs(), value = arrRhs[0], index = arrRhs[1], expression = arrRhs[2];
	if(value == true){
		var rhs = parseFloat(expression.substring(index + 1));
		var logVal = Math.log10(rhs);
		$("display").value = expression.substring(0, index + 1) + logVal;
	} else {
		var logVal = Math.log10(parseFloat(expression));
		$("display").value = logVal;
	}
	$("display").focus();
};

var calcSqrt = function (){
	var arrRhs = findRhs(), value = arrRhs[0], index = arrRhs[1], expression = arrRhs[2];
	if(value == true){
		var lhs = parseFloat(expression.substring(index + 1));
		var sqrtVal = Math.sqrt(lhs);
		$("display").value = (expression.substring(0, index + 1) + sqrtVal);
	} else {
		var sqrtVal = Math.sqrt(parseFloat(expression));
		$("display").value = sqrtVal;
	}
	$("display").focus();
};




var calcSin = function (){
	var arrRhs = findRhs(), value = arrRhs[0], index = arrRhs[1], expression = arrRhs[2];
	if(value == true){
		
		var lhs = parseFloat(expression.substring(index + 1));
		var sinVal = Math.sin(lhs);
		if(isNaN(sinVal)){
			$("display").value;
		}else{
			$("display").value = expression.substring(0, index + 1) + sinVal;
		}
	} else {
		var sinVal = Math.sin(parseFloat(expression));
		$("display").value = sinVal;
	}
	$("display").focus();
};

var calcCos = function (){
	var arrRhs = findRhs(), value = arrRhs[0], index = arrRhs[1], expression = arrRhs[2];
	if(value == true){
		var lhs = parseFloat(expression.substring(index + 1));
		var cosVal = Math.cos(lhs);
		if(isNaN(cosVal))
			$("display").value;
		else
			$("display").value = expression.substring(0, index + 1) + cosVal;
	} else {
		var cosVal = Math.cos(parseFloat(expression));
		$("display").value = cosVal;
	}
	$("display").focus();
};

var calcTan = function (){
	var arrRhs = findRhs(), value = arrRhs[0], index = arrRhs[1], expression = arrRhs[2];
	if(value == true){
		var lhs = parseFloat(expression.substring(index + 1));
		var tanVal = Math.tan(lhs);
		if(isNaN(cosVal))
			$("display").value;
		else
			$("display").value = expression.substring(0, index + 1) + tanVal;
	} else {
		var tanVal = Math.tan(parseFloat(expression));
		$("display").value = tanVal;
	}
	$("display").focus();
};

function findRhs(){
	var expression = $("display").value;
	var count = expression.length - 1;
	var value = false;
	for(var i = count; i >= 0; i--){
		if(expression[i] == "+" || expression[i] == "-" || expression[i] == "*" || expression[i] == "/"){
			var index = i;
			value = true;
			break;
		}
		else{
			var index = i;
		}
	}
	var arrRhs = [value, index, expression];
	return arrRhs;
}

var cancelEntry = function (){
	var expression = $("display").value;
    expression = expression.substring(0, expression.length - 1);
    $("display").value = expression;
	console.log(expression);
	if(expression == ""){
		$("display").value = 0;
	}
	$("display").focus();
};

var clear = function(){
	$("display").value = 0;
	$("display").focus();
};


