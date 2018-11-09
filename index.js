/**
 * @param {string} input String to check for binary.
 */
function isBinary(input){
    for(let i=0;i<input.length;i++){
        if(input.charAt(i)!='0' && input.charAt(i)!='1'){
            return false;
        }
        else return true;
    }
}

exports.getHex = /**
* 
* @param {string} dataString - String of certain encoding holding data
* @param {string} encoding - Character encoding of dataString
* @param {string} [separator] - An optional separator between bytes
*/
function(dataString,encoding,separator=''){
   let rBuf=Buffer.from(dataString,encoding);
   return [...rBuf].map(val=>val.toString(16).length==2?val.toString(16):'0'+val.toString(16)).join(separator);
};

exports.getBinary =  /**
* 
* @param {string} dataString - Data to be converted.
* @param {string} encoding - Encoding of the input data.
* @param {string} [separator] - Optional separator between bytes.
*/
(dataString,encoding,separator='') => {
   const buff=Buffer.from(dataString,encoding);
   return [...buff].map(val=>{
     const el=val.toString(2);
     const padding=8-el.length;
     return '0'.repeat(padding)+el;
 }).join(separator);
};

exports.binaryToHex = /**
* @param {string} binaryString A string of O's and 1's with length multiple of 8.
* @param {string} [separator] - An optional separator between bytes.
*/
function(binaryString,separator=''){
   if(binaryString.length%8!=0 || !isBinary(binaryString)){
       throw 'Parameter is not Binary String';
   }
   const ret=[];
   for(let i=0;i<binaryString.length/8;i++){
       let byte=binaryString.substr(i*8,8);
       ret.push(parseInt(byte,2));
   }
   //Convert each array element(num: Number) to hex string
  return ret.map(num=>{
      const n=num.toString(16);//convert number to string in base 16
      return n.length<2?'0'+n:n;//if single digit, complement the missing 0
  }).join(separator);//join to form single return string
};

exports.changeEncoding=
/**
 * @param {string} dataString - String data with known encoding to alter(input string)
 * @param {string} inputEncoding - Character encoding of dataString(input)
 * @param {string} outputEncoding - Character encoding of output
 * @returns {string}
*/function(dataString,inputEncoding,outputEncoding){
    return Buffer.from(dataString,inputEncoding).toString(outputEncoding);
}