void main(){

    Person p1 = Person('Nana', 'Female', 3);
    p1.showData();

    // You can use a variable too
    var p2 = Person('Mireaya', 'Female', 2);
    p2.showData();
    
}

class Person {
    String? name, sex;
    int? age;

    // Constructor
    Person(String name, sex, int age){
        this.name = name;
        this.sex = sex;
        this.age = age;
    }

    // Method
    void showData(){
        print('Name: $name');
        print('Age: $age');
        print('Sex: $sex');
    }
}