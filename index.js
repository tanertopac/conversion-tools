/**
 * @param {string} input String to check for binary.
 */
function testBinary(input){
    for(let i=0;i<input.length;i++){
        if(input.charAt(i)!='0' && input.charAt(i)!='1'){
            return false;
        }
        else return true;
    }
}

exports.getHex = /**
* 
* @param {string} data 
* @param {string} encoding
* @param {string} [separator] - An optional separator between bytes
*/
function(data,encoding,separator=''){
   let rBuf=Buffer.from(data,encoding);
   return [...rBuf].map(val=>val.toString(16).length==2?val.toString(16):'0'+val.toString(16)).join(separator);
};

exports.getBinary =  /**
* 
* @param {string} data - Data to be converted.
* @param {string} encoding - Encoding of the input data.
* @param {string} [separator] - Optional separator between bytes.
*/
(data,encoding,separator='') => {
   const buff=Buffer.from(data,encoding);
   return [...buff].map(val=>{
     const el=val.toString(2);
     const padding=8-el.length;
     return '0'.repeat(padding)+el;
 }).join(separator);
};

exports.binaryToHex = /**
* @param {string} binary A binary string with length multiple of 8.
* @param {string} [separator] - An optional separator between bytes.
*/
function(binary,separator=''){
   if(binary.length%8!=0 || !testBinary(binary)){
       throw 'Parameter is not Binary Data';
   }
   const ret=[];
   for(let i=0;i<binary.length/8;i++){
       let byte=binary.substr(i*8,8);
       ret.push(parseInt(byte,2));
   }
   //Convert each array element(num: Number) to hex string
  return ret.map(num=>{
      const n=num.toString(16);//convert number to string in base 16
      return n.length<2?'0'+n:n;//if single digit, complement the missing 0
  }).join(separator);//join to form single return string
};