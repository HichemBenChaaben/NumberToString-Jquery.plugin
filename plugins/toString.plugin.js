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

  	 window.onerror=function(){
  	 	displayOutput('there is some errors on the webpage '); 
  	 } 
    var e = $(this);

    $(opts.trigger).click(function(){ 
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
 			

 			var val = buildHundreds(myValue); 

 			displayOutput(val);

			/*	var val = buildDecimals(myValue);
					  displayOutput(val); 
					  */
    	}

    	// take the full number check how many thousands in there 
    	// and gives the 0 00 two last digits to buildDecimals 
    	// receive the full number  
    	// then return a bigger string to display 

    	function buildHundreds(argument){

    		var tmp_string = '',
    			hundreds_string = '',
    			decimals_string = '',
    			decimals_number , 
    			stringtoDisplay = ''; 

    		tmp_string = parseString(argument); 

    		if(tmp_string.length > 0 && tmp_string.length < 2){
    			displayOutput('we are in a case where there is no hundreds ') ; 
    			decimals_number  = argument ; 
    			decimals_string = buildDecimals(decimals_number); 

    			return hundreds_string+''+decimals_number;
    		}  
    		if (tmp_string.length > 2 && tmp_string.length < 4){
    			displayOutput('we are in a case where there is only one hundred  ') ;
    			// it has at least a hundred in there 
    			// tmp_string = reverseString(tmp_string);  
    			 // now we have a reversed string  ....  
    			 // we are trying to find how many hundreds are there 
    			 // so we should take only the 4th caracter as string 
    			 // and the rest will be sent to the decimals function
    			 hundreds_string = tmp_string; 
    			 hundreds_string = tmp_string.substring(0,1);
    			 tmp_string = reverseString(tmp_string) ; 
    			 tmp_string = tmp_string.substring(0,2);
    			 // now we send the numbers  to the other function
    			 // and it will take care of it  
    			 decimals_number = parseInt(tmp_string); 
    			 hundreds_number = parseInt(hundreds_string);


    			 decimals_string = buildDecimals(decimals_number); 
    			 hundreds_string = buildDecimals(hundreds_number); 

				// we should have something like five hundred and twenty 
    		
    			 return hundreds_string+''+decimals_number; 

    		}else{
    			// in this case the decimals function will take 
    			// care on the concept 
    			// then we will send just the number 
    			 stringtoDisplay = buildDecimals(argument); 
    		} 



    	}
    	// take the full number and return only a string to display for 
    	// numbers between 0 and 99  
    	function buildDecimals(argument){
    		var tmp_string,
    			units,
    			decimals, 
    			stringtoDisplay=''; // final string that should be returned 

			// convert the number to a string and take only numbers less than 99 
			tmp_string = parseString(argument);
			//now we have a string we will subsString the two first and then reverse them
			tmp_string = reverseString(tmp_string); // we have the number 
			tmp_string = tmp_string.substring(0, 2);
			tmp_string =reverseString(tmp_string); 

			// now as we have the number we will try to map it with 
			// and find the matching string on the table 
			// if we found the match we will return the string like it is 
			// if we dont find the match its a value that should be combined 
			// the units and the decimals will get values and then 
			// we will concatenate them and return them in one string
			//alert('tmp_string value before simple find value is '+tmp_string); 
			tmp_string =simpleFindNumber(tmp_string); 
			//alert('tmp_string value after simple find value is '+tmp_string);
			// if we found the number then we will return it ! 
			// we will check if now tmp_string is not Nan using isNan(); 
			if (typeof(tmp_string)!== 'undefined' ){
				// then we will return the tmp_string and we are done  
				return tmp_string; 
				// the function will stop running here 
			}		
			// then we will return the combined strings 
			var tmp = parseString(argument); 
				tmp = reverseString(tmp);

			units = tmp.substring(0,1) ;
			decimals = tmp.substring(1,2);
			decimals = decimals+'0' ; // adding zero for mapping 
			units = simpleFindNumber(units); 
			decimals = simpleFindNumber(decimals);
			tmp_string = decimals+' '+units;  
			return tmp_string; 
			// now we have something like twenty one !!
			// or something like ninety three 
    	} 
    	function buildStringOutput(a,b,c,d){
    		//a = units
    		//b= hundreds 
    		//c = thousands
    		//d =milions
    		var output = ''; 
    			output = d +' thousands '+c+' hundred ';

    			//displayOutput(output); 
    	}

    	function reverseString (argument) {
    		// body...
    		return argument.split("").reverse().join("");
    	}
    	function simpleFindNumber(argument){
    		var number = parseInt(argument);
    		if(number>0){
    			var resultString= findNumber(number,$(opts.dictionnary1),$(opts.dictionnary2));	 
    			return (resultString) ; // twenty thousands 
    		}else {
    			return undefined;
    		}
    	}
    	function builThousandsFinalText(number,prefix){
    		if(number>0){
    			number= findNumber(number,$(opts.dictionnary1),$(opts.dictionnary2));
    			return (number + prefix ) ; // twenty thousands 
    		}else {
    			return undefined;
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
						'zero',
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