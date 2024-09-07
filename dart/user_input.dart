import 'dart:io';

void main(){

   print('Hello enter your name:');

   var name = stdin.readLineSync();
   /*
    readLineSync takes only a string input, not an integer or any
    other data type. If we want to input a string we would write
    something like String? name = stdin.readLineSync(); otherwise
    it would return an error.
   */
   
   print('Hello $name'); 
}