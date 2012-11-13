// jquery plugin to convert numbers to String 
// multilanguage support 
// Author Hichem Ben Chaabene 
// supported languages for the moment 
// english 
//  more updates are coming up 
;(function($) {
// What does the numbertoString plugin do?
$.fn.numbertoString = function(options) {
  if (!this.length) { return this; }
  var opts = $.extend(true, {}, $.fn.numbertoString.defaults, options);
  this.each(function() { 
    var e = $(this),   
        dict_display_lang = opts.lang, //language shoosen 
        lang = opts.lang.toUpperCase(), 
        dict_syntax_lang ,// dictionnary syntax choosen  
        total_thousands, // the unit translated 
        total_hundreds,    // the unit translated
        total_decimals,  // the unit translatd
        lang_thousand, // the one from dictionnary 
        lang_millions,
        lang_hundred, // the one from dictionnary 
        lang_decimals, // the one from the dictionnary
        lang_seperator, 
        lang_multiple;
        // picking the english syntax dictionnary 
        // and then making the numbers available in english 
        // and then here we go 
        
        dict_display_lang = $(opts.dict_eng); 
        dict_syntax_lang  = $(opts.dict_syntax_eng);
        
        // picking the seperators 
        // from the dictionnary lang  
        // and doing some awesome stuff 

        lang_seperator = opts.dict_syntax_eng [0];// the one from dictionnary 
        lang_hundred = opts.dict_syntax_eng [1] ;// the one from dictionnary 
        lang_thousand = opts.dict_syntax_eng [2] ; // the one from the dictionnary
        lang_multiple = opts.dict_syntax_eng [3];
        lang_millions = opts.dict_syntax_eng [4] ;

        // we have variables ready 
        // now we can build the string in any different language 
        // depends on what is the language selected  

    $(opts.trigger).click(function(){ 
        //var a = $(opts.theNumber).val() ; 
           // a = getNumber(a); 
            mapping() ; //main function to trigger all functions 
            // building the final string in selected language  
            // using the dictionnary and the results and the input language 
    }); // end click function 


        function mapping(){     
         var mappingNumber = $(opts.dict_numbers), // only one dictionnary 
             mappingString = dict_display_lang,  // choose the selected language 
             myValue       = getNumber($(opts.theNumber).val()), 
             textprefix    = lang_seperator, // ' and '
             stringOutput  = 'this is going to be the final output',
             stringLength  = 0, // by default this element is set to 0
             mappedvalue   = '';
            // m will hold how many numbers are in the string actually 

            var val = buildThousands(myValue); // build thousands will handle all numbers 
                displayOutput(val);
               // testCase(1,6000); //going to test the numbers from 0 to 999 
            //building a test case  
            /*  var val = buildDecimals(myValue);
                      displayOutput(val); 
                      */
        }
        // take the full number check how many thousands in there 
        // and gives the 0 00 two last digits to buildDecimals 
        // receive the full number  
        // then return a bigger string to display 

        function buildUpperCase(argument){
            return argument.toUpperCase(); 
        }
        function showError(){ 
            displayOutput('there is errors on the page,check the script'); 
        }
        function testCase (min,max){
          for (var i = min; i < max; i++) {
            var val = buildThousands(i); 
            displayOutput(val);
          };  
        }
        function buildMilions(argument){
         var tmp_string = parseString(argument),  
            s_length = tmp_string.length,
            millions_string,
            thousands_string,
            millions_number,
            thousands_number; 
            if(s_length < 7 ){
              millions_string = buildThousands(argument);
              return thousands_string ; 
            }
            else{ 
                // pick up the millions 
                // the rest will be handled by the other function  
                tmp_string  = reverseString( tmp_string); 
                thousands_string = tmp_string.substring(0,6); 
                console.log(thousands_string);
                thousands_number = parseInt(thousands_string);

                // we will pick up the milions now 
                millions_string = tmp_string.substring(0,s_length - 6 ) ; 
                millions_string = reverseString (millions_string); 
                millions_number = parseInt(millions_string);
                thousands_string = buildHundreds (thousands_number); 
                millions_number = buildHundreds(millions_string) ; 
                return millions_string + lang_millions +lang_multiple + lang_seperator + thousands_string; // return the full result 
             }
        }
        function buildThousands(argument){
            
            // argument comes as an int  number

            var tmp_string = parseString(argument),  
                s_length = tmp_string.length,
                thousands_string,
                hundreds_string,
                thousands_number,
                hundreds_number; 
                //some tests 

                if(s_length < 4 ){

                  thousands_string = buildHundreds(argument);
                  return thousands_string ; 
                  

                }
                else{  
                    if ( s_length < 7){ 
                        
                        // a number with 6 digits or 5 digits  500 000  
                        // we will split the string into 2 
                        // the first part will handeled completely by buildHundreds function 
                        // the second part is the same but we will add a 'thousand' to it 
                        // tmp_string = reverseString(tmp_string);

                        tmp_string = reverseString (tmp_string); 
                        hundreds_string  = tmp_string.substring(0,3); // it will have the first part of the string 
                        hundreds_string = reverseString(hundreds_string); 

                        tmp_string = reverseString (tmp_string); 
                        thousands_string = tmp_string.substring(0,s_length-3); ; // it will have the rest of the string 

                        hundreds_number  = parseInt(hundreds_string);
                        thousands_number = parseInt(thousands_string); 

                        console.log('the thousands string value is '+thousands_string);
                        console.log('the thousands number is +'+thousands_number);
                
                        thousands_string = buildHundreds (thousands_number);
                        hundreds_string  = buildHundreds (hundreds_number);
                       
                        if(thousands_number == 1){
                            lang_multiple ='' ;
                        }
                      hundreds_string = addSeperator(hundreds_string);      
                    return thousands_string + lang_thousand + lang_multiple + hundreds_string; // return the full result 

                    } else { 
                        // do nothing for the moment 
                        console.log (' out of range') ; 
                    }
                }

        }
        function buildHundreds(argument){
            var sefl = this,
                tmp_string = '',
                hundreds_string = '',
                decimals_string = '',
                decimals_number , 
                stringtoDisplay = ''; 

            tmp_string = parseString(argument); 
            s_lenght = tmp_string.length; 

            if( (s_lenght > 0 ) && (s_lenght <= 2)){
                //displayOutput('we are in a case where there is no hundreds ') ; 
                decimals_string = buildDecimals(argument); 
                decimals_string = purify(decimals_string); 
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
                 hundreds_string = hundreds_string ;
                 tmp_string = reverseString(tmp_string) ; 
                 decimals_string = tmp_string.substring(0,2); 
                 decimals_string = reverseString(tmp_string); 
                 decimals_number = parseInt(decimals_string); 
                 decimals_string = buildDecimals(decimals_number);

                // decimals_string  = (typeof(decimals_string)==undefined ? '' : lang_seperator + decimals_string);
                 // now we send the numbers  to the other function
                 // and it will take care of it  
                 decimals_string = addSeperator(decimals_string);

                return hundreds_string+lang_hundred+decimals_string; 
                 
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
            tmp_string  = purify (tmp_string) ;
            // then we will return the combined strings 
            var tmp = parseString(argument); 
                tmp = reverseString(tmp);
                units = tmp.substring(0,1) ;
                decimals = tmp.substring(1,2);
                decimals = decimals+'0' ; // adding zero for mapping 
                units = simpleFindNumber(units); 
                decimals = simpleFindNumber(decimals);
                decimals = purify( decimals ) ;
                units = purify (units); 
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
        function purify(args){ 
            var type = typeof(args); 
            return ( type == 'undefined' ? '' : args ); // return  an empty value if its nan 
        }
        function addSeperator (argument) {
           return  argument = (argument.length > 2 ? lang_seperator + argument : argument ) ; 
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
dict_syntax_eng:[
    ' and ', // seperator
    ' hundred', // hundreds
    ' thousand ', // thousand
    's', // multiple units 
    ' millions '
    ],
dict_syntax_ar:[
    ' و ', // seperator
    ' مئة', // hundreds
    ' ألف ', // thousand
    '' // multiple units 
], 
dict_syntax_fr:[
    ' et ', // seperator
    ' cent ', // hundreds
    ' mille ', // thousand
    's' // multiple units 
], 
dict_syntax_ger:[
    ' and ', // seperator
    ' hundred', // hundreds
    'thousand', // thousand
    's' // multiple units 
], 
dict_syntax_it:[
    ' and ', // seperator
    ' hundred', // hundreds
    ' thousand', // thousand
    's' // multiple units 
], 
  dict_numbers:[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,30,40,50,60,70,80,90,100,1000,10000,100000],
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
        ]};
})(jQuery);