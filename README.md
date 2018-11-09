# conversion-tools

Suppose you have some data (ssh public key e.g.) encoded with some encoding(base64 e.g.). To see the actual data in other forms (perhaps binary data in actual bytes, or hex), this package provides simple tools to convert between each other.

## Binary representation

To get a binary string(a string of 0's and ones, "10001011" e.g.) representing the data in some string with a **known** character encoding, simply use the function `getBinary(encodedString,encoding[,optionalSeperator])`. *encoding* variable should be one of these values:
 - 'ascii'
 - 'utf8'
 - 'utf16le' or alias of it, 'ucs2'
 - 'base64'
 - 'latin1' or its alias, 'binary' [^1]
 - 'hex' Hexadecimal
which are encoding values supported by Buffer object which this Module employs. For more information: [Node.js Buffer Documentation](http://nodejs.org/api/buffer.html#buffer_buffers_and_character_encodings). *optionalSeperator* variable is used in output to seperate each byte, and when omited the returned string will contain only the data.

```
getBinary('This is my string','utf8',' '); // ='01010100 01101000 01101001 01110011 00100000 01101001 01110011 00100000 01101101 01111001 00100000 01110011 01110100 01110010 01101001 01101110 01100111'
```

## Hexadecimal encoding

To convert strings from one of the above encodings into *hex* encoding, use `getHex(encodedString,encoding)`. This gives a string of form: 'ffe13dd01891' each two characters, representing a byte of the original data contained by *encodedString* variable.

```
getHex('This is my string','utf8'); // ='54686973206973206d7920737472696e67'
```

 ### From Binary string to Hexadecimal encoding
 
 To convert binary strings of form '0011111011110000' into hex encoding, the Module provides a simple function called `binaryToHex(binaryString[,separator])` where *binary* variable is a string of 0's and 1's of length multiple of 8(each 8 chars representing a byte of the original data), and optional *separator* variable is used to seperate bytes in the output string. For instance if `var separator=':';` is used in the function as `binaryToHex('0010111100000110',separator);` the output returned would be: '2f:06'.
 
 The following code returns commented values respectively:

 ```
 let binStr='0101010001101000011010010111001100100000011010010111001100100000011011010111100100100000011100110111010001110010011010010110111001100111';
 binaryToHex(binStr);     // ='54686973206973206d7920737472696e67'
 binaryToHex(binStr,':'); // ='54:68:69:73:20:69:73:20:6d:79:20:73:74:72:69:6e:67'
 ```

## Change the encoding of a string

To change a string's encoding, use the function `changeEncoding(text,encodingIn,encodingOut)`, where text is a string of certain encoding(*encodingIn*), and the output is of *encodingOut*.

Following code returns commented values respectively:

```
changeEncoding('This is my string','utf8','base64');  // ='VGhpcyBpcyBteSBzdHJpbmc='
changeEncoding('This is my string','utf8','hex');     // ='54686973206973206d7920737472696e67'
changeEncoding('This is my string','utf8','ascii');   // ='This is my string'
changeEncoding('This is my string','utf8','utf16le'); // ='桔獩椠⁳祭猠牴湩'
```

[^1]: Note that 'binary' here is a mere alias for the encoding 'latin1', refering not to a binary string of 0's and 1's(what we desire to get as return value) representing each bit of original data encoded in the variable *encodedString*, the first parameter of the function, but to a regular string of encoding 'latin1'.