void main(){

    // for loop
    var num = 5;
    for (var i = num; i > 0; i--){
        print(i);
    }

    // infinit loop
    /*
    for (var i = num; i > 0; i++){
        print(i);
    }
    */

    // for in loop
    var names = ["Alpha", "Nana", "Mireya"];
    for (var name in names){
        print('Name: $name');
    }

    // while loop
    while (num > 0){
        print(num);
        num--;
    }

    
}