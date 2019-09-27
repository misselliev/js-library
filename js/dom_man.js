//document.getElementById('label-center').innerHTML = 'TESTING';
//import Library from './script.js';
 const b = require('./script');
 'use strict';


b.add('hola', 'dulce', 1997, 120, 'read');
b.add('hola2', 'dulkkkce', 1397, 120, 'reading');

console.log(b.getCollection);
console.log('contr ========== ' + b.getCounter);

const test = b.getCollection[0];

b.delete(test);

console.log(b.getCollection());
console.log('contr' + b.getCounter);