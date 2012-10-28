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
			 stringOutput  = 'this is going to be the final output',
			 stringLength  = 0, // by default this element is set to 0
			 mappedvalue   = '';
			
			// m will hold how many numbers are in the string actually 
 			
 			var stringArray = parseString(myValue); 

 			var unitsString = stringArray ; 
 				unitsString = unitsString.substring(0,2);

 			var hundredsString = reverseString(stringArray); 
 				hundredsString = hundredsString.substring(2, 3); 

 			var thousandsString = reverseString(stringArray); 
 				thousandsString = thousandsString.substring(3,6);
 			
 			alert('the units are '+unitsString);
 			alert('the hundreds are '+hundredsString) ;
 			alert('the thousands are '+thousandsString); 
 			 
 			 for (var i = 0 ; i < stringArray.length; i++) { 
 			 
 			 	var counter = 0 ,
 			 		prefix_thousands = ' thousands', 
 			 		prefix_hundreds = ' hundreds '; 
 			 		num_thousands = getThousands(parseInt(stringArray));
 			 		//alert('the numbers there are '+ stringArray[i]); 
 			 }; 

 			 // mapping the number with the table 
 			 // building the string output
 			 stringOutput =  buildText(num_thousands,prefix_thousands);
 			 // will return how many thousands on the string 
 			 // display the full string output 
 			 displayOutput(stringOutput);

    	}
    	function reverseString (argument) {
    		// body...
    		return argument.split("").reverse().join("");
    	}
    	function buildText(number,prefix){
    		if(number>0){
    			number= findNumber(number,$(opts.dictionnary1),$(opts.dictionnary2));
    			return (number + prefix ) ; // twenty thousands 
    		}else {
    			return NaN;
    		}
    	}
    	function findNumber (argument,dictionnary1,dictionnary2) {
    		// return the value from array 2 passed by array 
			var  positionArray1 = $.inArray ( argument ,dictionnary1,dictionnary2);
			var  val = dictionnary2[positionArray1];
				 return (val);
		
    	}

    	function displayOutput (argument) {
    		// body... 
    		$(opts.divMessage).text(''); 
    		$(opts.divMessage).text(argument) ;  
    		return ;// exit fromt the function 

    	}
    	function detectNumber (offset,argument) {
    		// body...
    		var offsetNumber = offset, 
    			original_number = argument; 
    			var tmp_unit = getUnits(original_number);

    			alert('the units are ' + tmp_unit); 

    	}
    	
    	// get the length of the converted number to string 
    	
    	function parseString (argument) {
    		var loops = argument;
    			loops = new Number(loops); 
    			loops = loops.toString(); 
    			return loops; 
    			// now we have the range of the number 
    			// we can use a reverse loop for the offset 
    	}
 	
		function getUnits(num) {
			return num%10; 
		}
		function getThousands (argument) {
		 	// body...
		 	return ((argument / 1000) >0 ? argument /1000 : 0); 
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
						]};

})(jQuery);