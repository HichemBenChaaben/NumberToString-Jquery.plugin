// jquery plugin to convert numbers to String 
// multilanguage support 
// Author Hichem Ben Chaabene 

// usage 
// select a div 
// apply goString 

(function($) {
// What does the numbertoString plugin do?
$.fn.numbertoString = function(options) {
  if (!this.length) { return this; }
  var opts = $.extend(true, {}, $.fn.numbertoString.defaults, options);

  this.each(function() {
    var e = $(this);

    $(opts.trigger).click(function(){

    	$(opts.divMessage).text('plugin working fine 1!! ') ; 
    	var a= $(opts.theNumber).val();
    		a = getNumber(a); 

    	mapping() ; 

    }); // end click function 
    	function mapping(){

    	 var mappingNumber = $(opts.dictionnary1), 
    	 	 mappingString = $(opts.dictionnary2), 
    	 	 myValue 	   = getNumber($(opts.theNumber).val()), 
			 textprefix    = ' and ', 
			 many 	 	   = 's', 
			 stringOutput  = '', 
			 mappedvalue   = '';

			// m will hold how many numbers are in the string actually 
 			
 			var m = getHighestMultiplier(myValue); 

 		     detectNumber (m,myValue); // passing the offset and the value 


    	}
    	function detectNumber (offset,argument) {
    		// body...
    		var offsetNumber = offset, 
    			original_number = argument, 
    			prefix = '' ; 
    		// i will start building the number from 
    		// hundreds only  
    		// as  
    			var tmp_num = getUnits(original_number); 
    			alert('the units are ' + tmp_num); 


    	}
    	function getHighestMultiplier (argument) {
    		var loops = argument;
    			loops = new Number(loops); 
    			loops = loops.toString(); 
    			return loops.length; 
    			// now we have the range of the number 
    			// we can use a reverse loop for the offset 
    	}
    	function mappingString (unitString) {
			var a,
				c = unitString,
				val; // closing the vars ici 
			var  a = $.inArray(c,obj.dictionnary1);
				 val = obj.dictionnary2[a];   
					 return (val);
		}
    	function getThousands(num) {
			return num/1000; 
		}
		function getHundreds(num) {
			return num/100;
		}
		function getDecimals(num) {
			return num/10; 
		}
		function getUnits(num) {
			return num%10; 
		} 
	    function displayerror (argument) {
	    	var errorMessage = ' please choose a valid number ';
	 		argument.text('').text(errorMessage);
	    	// body...
	    }
	    function getNumber (argument) {
 			return argument  ; 
	    }

  });

  return this;
};

// default options
$.fn.numbertoString.defaults = {
  trigger: '#getSting',
  theNumber : '#my_number',
  divMessage:'#messages', 
  dictionnary1:[0,1,
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
};

})(jQuery);




//
/*
(function($)  {
  $.fn.goString = function(options)  {
	var defaults =  {
		console_message : '#pluginMessages',
		trigger: '#getSting',
		the_number: '#my_number',
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
	return  this.each(function() {
	var e = $(this); 
	
	e.obj.trigger.click(function () {
		// body...
		e.obj.console_message.innerHTML[0] = 'plugin is working correctly';
	}); 
	/*	e.click(function() {
			var a = getNumber(); 
			var t = getThousands(a); 
			var h = getHundreds(a);
			var finalText = mapit(t)+mapit(h); 
			
			$(obj.finalStringOutput)[0].innerHTML = finalText;

		});
	
		function getNumber() {
			var d = $the_number.val();
			return d; 
		}
		/*function mapit(myValue) {
			var myValue = myValue, 
				textprefix = ' and ', 
				many = 's', 
				stringOutput = '', 
				mappedvalue = '';

			if(myValue>99&&myValue<999) {// map thousands 
				if(myValue = = 1) {
					stringOutput = mappedvalue+textprefix; 
				} 
			}else if (myValue>9&&myValue<99) { // map hundreds
				if(myValue = 1) {
					stringOutput = mappedvalue+textprefix; 
				}
			}else {// in this case we are mapping units
				var unitString = getUnits(myValue);// get the value and then map it  
					stringOutput = mappingString(unitString);
					alert('the units string output is '+stringOutput);// will display the mapped units  
				return stringOutput; 
			} 

			return stringOutput; 
		}

		function mappingString (unitString) {
			var a,
				c = unitString,
				val; // closing the vars ici 
			var  a = $.inArray(c,obj.dictionnary1);
				 val = obj.dictionnary2[a];  
				 alert('the value to be returned is '+val); 
					 return (val);
		}
		function getThousands(num) {
			return num/1000; 
		}
		function getHundreds(num) {
			return num/100;
		}
		function getDecimals(num) {
			return num/10; 
		}
		function getUnits(num) {
			return num%10; 
		}
		// validate function 
		function validate(a) {
			 var isaValidNumber = a ; 
			 return isNaN(isaValidNumber) ? null : result;
		}
		function unvalidNumber() {
			alert('the number you entered is not valid, please enter a valid number '); 
		
	}); 
	}
  }

})(jQuery);
*/












