# conversion-tools

Suppose you have some data (ssh public key e.g.) encoded with some encoding(base64 e.g.). To see the actual data in other forms (perhaps binary data in actual bytes, or hex), this package provides simple tools to convert between each other.

### Binary representation

To get a binary string(a string of 0's and ones, "10001011" e.g.) representing the data in some string with a **known** character encoding, simply use the function `getBinary(encodedString,encoding[,optionalSeperator])`. *encoding* variable should be one of these values:
 - 'ascii'
 - 'utf8'
 - 'utf16le' or alias of it, 'ucs2'
 - 'base64'
 - 'latin1' or its alias, 'binary' [^1]
 - 'hex' Hexadecimal
which are encoding values supported by Buffer object which this Module employs. For more information: [Node.js Buffer Documentation](http://nodejs.org/api/buffer.html#buffer_buffers_and_character_encodings). *optionalSeperator* variable is used in output to seperate each byte, and when omited the returned string will contain only the data. 

### Hexadecimal encoding

To convert strings from one of the above encodings into *hex* encoding, use `getHex(encodedString,encoding)`. This gives a string of form: 'ffe13dd01891' each two characters, representing a byte of the original data contained by *encodedString* variable.

 #### From Binary string to Hexadecimal encoding:

 To convert binary strings of form '0011111011110000' into hex encoding, the Module provides a simple function called `binaryToHex(binary[,separator])` where *binary* variable is a string of 0's and 1's of length multiple of 8(each 8 chars representing a byte of the original data), and optional *separator* variable is used to seperate bytes in the output string. For instance if `var separator=':';` is used in the function as `binaryToHex('0010111100000110',separator);` the output returned would be: '2f:06'.



[^1]: Note that 'binary' here is a mere alias for the encoding 'latin1', refering not to a binary string of 0's and 1's representing each bit of original data encoded in the variable *encodedString*, the first parameter of the function, but to a regular string of encoding 'latin1'.