// jquery plugin to convert numbers to String 
// multilanguage support 
// Author Hichem Ben Chaabene 
// usage 
// select a div 
// apply goString 
;(function($) {
// What does the numbertoString plugin do?
$.fn.numbertoString = function(options) {
  if (!this.length) { return this; }
  var opts = $.extend(true, {}, $.fn.numbertoString.defaults, options);
  this.each(function() {
    var e = $(this), 
        dict_display_lang = opts.lang,
        dict_syntax_lang = ''; 

        switch ( dict_display_lang.toUpperCase() ){
            case 'AR' :
                dict_display_lang = $(opts.dict_ar);
                dict_syntax_lang  = $(opts.dict_syntax_ar); 
                break;
            case 'EN':
                dict_display_lang = $(opts.dict_eng); 
                dict_syntax_lang  = $(opts.dict_syntax_eng); 
                break;
            case 'FR' :
                dict_display_lang = $(opts.dict_fr);
                dict_syntax_lang  = $(opts.dict_syntax_fr); 
                break;
            case 'GER' :
                dict_display_lang = $(opts.dict_ger);
                dict_syntax_lang  = $(opts.dict_syntax_ger); 
                break;
            case 'IT' :
                dict_display_lang = $(opts.dict_it);
                dict_syntax_lang  = $(opts.dict_syntax_it); 
                break;
            default:
                dict_display_lang = $(opts.dict_eng);
                dict_syntax_lang  = $(opts.dict_syntax_en); 
        }
    // build the var dictionnary multiple hundred thousands and the seperator 
    var lang_seperator = dict_syntax_lang[0],  
        lang_hundred   = dict_syntax_lang[1], 
        lang_thousand  = dict_syntax_lang[2], 
        lang_multiple  = dict_syntax_lang[3]; 

    /// in this case the default dictionnary is eng
    // window.onerror = showError();  // handle the errors on the window 

    $(opts.trigger).click(function(){ 
    	var a = $(opts.theNumber).val() ; 
    		a = getNumber(a); 
        	mapping() ; //main function to trigger all functions 

    }); // end click function 

        function buildUpperCase(argument){
            return argument.toUpperCase(); 
        }
        function eval_lang(argument){

        }
        function showError(){ 
            displayOutput('there is errors on the page,check the script'); 
        }
    	function mapping(){ 	
    	 var mappingNumber = $(opts.dict_numbers), // only one dictionnary 
    	 	 mappingString = dict_display_lang,  // choose the selected language 
    	 	 myValue 	   = getNumber($(opts.theNumber).val()), 
			 textprefix    = ' and ', 
			 stringOutput  = 'this is going to be the final output',
			 stringLength  = 0, // by default this element is set to 0
			 mappedvalue   = '';
			
			// m will hold how many numbers are in the string actually 

 			var val = buildHundreds(myValue); 
 				displayOutput(val);
                testCase(0,999); //going to test the numbers from 0 to 999 
 			//building a test case  
			/*	var val = buildDecimals(myValue);
					  displayOutput(val); 
					  */
    	}
    	// take the full number check how many thousands in there 
    	// and gives the 0 00 two last digits to buildDecimals 
    	// receive the full number  
    	// then return a bigger string to display 
        function testCase (min,max){
          for (var i = min; i < max; i++) {
            var val = buildHundreds(i); 
            displayOutput(val);
          };  
        }
        function buildThousands(argument){
            var tmp_string = '',
                thousands_string = '',
            tmp_string = parseString(argument); 
            s_lenght = tmp_string.length;
            // test the length of the string if its less than a thousand 
            // send the thing to the other function 
            // otherwise manipulate the big numbers seperately 
            if( s_lenght > 4 ) { 
                thousands_string = buildHundreds(thousands_string)
             } else {
                var thousand_stringp1 = tmp_string.split(), // split at characted 4 
                    thousand_stringp2 = tmp_string.split(); // split at the rest of the rest of the characters 

                thousand_stringp2 = buildHundreds(thousand_stringp2) ; 
                thousand_stringp1 = buildHundreds(thousand_stringp1) ; 
                return thousand_stringp2 + thousand_stringp1; 
             }
        }
    	function buildHundreds(argument){
    		var tmp_string = '',
    			hundreds_string = '',
    			decimals_string = '',
    			decimals_number , 
    			stringtoDisplay = ''; 

    		tmp_string = parseString(argument); 
    		s_lenght = tmp_string.length; 

    		if( (s_lenght > 0 ) && (s_lenght <= 2)){

    			//displayOutput('we are in a case where there is no hundreds ') ; 
   
    			decimals_string = buildDecimals(argument); 

    			return decimals_string;
    		}  
    		if( (s_lenght > 2 ) && (s_lenght < 4)){
    			
    			//displayOutput('we are in a case where there is only one hundred  ') ;
    			
    			// it has at least a hundred in there 
    			// tmp_string = reverseString(tmp_string);  
    			 // now we have a reversed string  ....  
    			 // we are trying to find how many hundreds are there 
    			 // so we should take only the 4th caracter as string 
    			 // and the rest will be sent to the decimals function

    			 hundreds_string = tmp_string.substring(0,1);
    			 hundreds_number = parseInt(hundreds_string);
    			 hundreds_string = buildDecimals(hundreds_number);
 				 hundreds_string = hundreds_string + lang_hundred ;
    			 tmp_string = reverseString(tmp_string) ; 
    			 decimals_string = tmp_string.substring(0,2); 
    			 decimals_string = reverseString(tmp_string); 
    			 decimals_number = parseInt(decimals_string); 
    			 decimals_string = buildDecimals(decimals_number);
    			 // now we send the numbers  to the other function
    			 // and it will take care of it  
  				return hundreds_string+lang_seperator+decimals_string; 
    			 
    		} else {
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
    	
    	function reverseString (argument) {
    		// body...
    		return argument.split("").reverse().join("");
    	}
    	function simpleFindNumber(argument){
    		var number = parseInt(argument);
    		if(number>0){
    			var resultString= findNumber(number,$(opts.dict_numbers),dict_display_lang);	 
    			return (resultString) ; // twenty thousands 
    		}else {
    			return undefined;
    		}
    	}
    	function builThousandsFinalText(number,prefix){
    		if(number>0){
    			number= findNumber(number,$(opts.dict_numbers),dict_display_lang);
    			return (number + prefix ) ; // twenty thousands 
    		}else {
    			return undefined;
    		}
    	}
    	function findNumber (argument,dict_numbers,dict_display_lang) {
    		// return the value from array 2 passed by array 
			var  positionArray1 = $.inArray ( argument ,dict_numbers,dict_display_lang);
			var  val = dict_display_lang[positionArray1];
				 return (val);
    	}
    	function displayOutput (argument) {
    		// body... 
    		//$(opts.divMessage).text(''); 
    		$(opts.divMessage).prepend(argument) ; 
    		$(opts.divMessage).prepend('</hr><br/>') ; 
    		return ;// exit fromt the function 
    	}
    	// get the length of the converted number to string 
    	function parseString (argument) {
    		var st = argument;
    			st = new Number(st); 
    			st = st.toString(); 
    			return st; 
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
  lang : '',  // no language you need to set it up  
  dict_numbers:[0,1,
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
dict_syntax_eng:[
    ' and ', // seperator
    'hundred', // hundreds
    'thousand', // thousand
    's' // multiple units 
    ],
dict_syntax_ar:[
    ' and ', // seperator
    'hundred', // hundreds
    'thousand', // thousand
    's' // multiple units 
], 
dict_syntax_fr:[
    ' et ', // seperator
    'cent', // hundreds
    'mille', // thousand
    's' // multiple units 
], 
dict_syntax_ger:[
    ' and ', // seperator
    'hundred', // hundreds
    'thousand', // thousand
    's' // multiple units 
], 
dict_syntax_it:[
    ' and ', // seperator
    'hundred', // hundreds
    'thousand', // thousand
    's' // multiple units 
],
dict_eng:[
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
						],    
dict_ar:[
        'واحد', 
        'اثنين',
        'ثلاثة',
        'أربعة',
        'خمسة',
        'ستة',
        'سبعة',
        'ثمانية',
        'تسعة',
        'عشرة',
        'أحد عشر',
        'الاثني عشر',
        'ثلاثة عشر',
        'أربعة عشر',
        'خمسة عشر',
        'ست عشرة',
        'سبعة عشر',
        'ثمانية عشر',
        'تسعة عشر', // nineteen is wrong 
        'عشرون',
        'ثلاثون',
        'أربعين',
        'خمسون',
        'ستون',
        'سبعون',
        'ثمانون',
        'تسعون',
        'مئات',
        'ألف',
        'مليون',
        'بليون'
    ], 
dict_fr :[
    "zéro",
    "un",
    "deux",
    "trois",
    "quatre",
    "cinq",
    "six",
    "sept",
    "huit",
    "neuf",
    "dix",
    "onze",
    "douze",
    "treize",
    "quatorze",
    "quinze",
    "seize",
    "dix-sept",
    "dix-huit",
    "dix-neuf",
    "vingt",
    "trente",
    "quarante",
    "cinquante",
    "soixante",
    "soixante-dix",
    "quatre-vingts",
    "quatre vingt dix",
    "cent",
    "mille",
    "million",
    "milliard"
]
};
})(jQuery);