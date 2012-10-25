// jquery plugin to convert numbers to String 
// multilanguage support 
// Author Hichem Ben Chaabene 

// usage 
// select a div 
//
//
(function($) {
  $.fn.goString = function(options) {
	var defaults = {
		dictionnary1:[
					0,
					1,
					2,
					3,
					4,
					5,
					6,
					7,
					8,
					9,
					10,
					11,
					12,
					13,
					14,
					15,
					16,
					17,
					18,
					19,
					20,
					30,
					40,
					50,
					60,
					70,
					80,
					90,
					100,
					1000,
					10000,
					100000], 
					dictionnary2:[
						's',
						'one', 
						'two',
						'three',
						'four',
						'five',
						'six',
						'seven',
						'eight',
						'nine',
						'ten',
						'eleven',
						'twelve',
						'thirteen',
						'fourteen',
						'fifteen',
						'sixteen',
						'seventeen',
						'eighteen',
						'nineteen',
						'twenty',
						'thirty',
						'fourty',
						'fifty',
						'sixty',
						'seventy',
						'eighty',
						'ninety',
						'hundren',
						'thousand',
						'million',
						'billion'
						]
					, 
					humanText:'zero',
					messageNumber:'the number is : ',
					displayValue:0,
					humanTextField:'myNumber',
					finalStringOutput:'#finalStringOutput',
					trigguer:'#goString', 	
	};
	var obj = $.extend(defaults,options);
	return  this.each(function(){
	var e = $(this); 
		e.click(function(){
			var a = getNumber(); 
			var t = getThousands(a); 
			var h = getHundreds(a);
			var finalText = mapit(t)+mapit(h); 
			
			$(obj.finalStringOutput)[0].innerHTML = finalText;

		});
		function getNumber(){
			var d = $('#myNumber').val();
			return d; 
		}
		function mapit(myValue){
			var myValue = myValue;
			var textprefix = ' and ', 
				many = 's', 
				stringOutput = '';  

			if(myValue>99&&myValue<999){// map thousands 
				if(myValue = = 1){
					stringOutput = mappedvalue+textprefix; 
				} 
			}else if (myValue>9&&myValue<99){ // map hundreds
				if(myValue = 1){
					stringOutput = mappedvalue+textprefix; 
				}
			}else{// in this case we are mapping units
				var unitString = getUnits(myValue);// get the value and then map it  
					stringOutput = mappingString(unitString);
					alert('the units string output is '+stringOutput);// will display the mapped units  
				return stringOutput; 
			} 

			return stringOutput; 
		}

		function mappingString (unitString){
			var a,
				c = unitString,
				val; // closing the vars ici 
			var  a = $.inArray(c,obj.dictionnary1);
				 val = obj.dictionnary2[a];  
				 alert('the value to be returned is '+val); 
					 return (val);
		}
		function getThousands(num){
			return num/1000; 
		}
		function getHundreds(num){
			return num/100;
		}
		function getDecimals(num){
			return num/10; 
		}
		function getUnits(num){
			return num%10; 
		}
		// validate function 
		function validate(a){
			 var isaValidNumber = a ; 
			 return isNaN(isaValidNumber) ? null : result;
		}
		function unvalidNumber(){
			alert('the number you entered is not valid, please enter a valid number '); 
		}
	});
  }
})(jQuery);












