void main(){

    // Person p1 = Person('Nana', 'Female', 3);
    // p1.showData();

    // Classes without initialization - We get rid of the contructor
    Person p1 = Person();
    p1.addData('Nana', 'Female', 3);
    p1.showData();

    Person p2 = Person();
    p2.name = 'Mireya';
    p2.showData();
    
}

class Person {
    String? name, sex;
    int? age;

    // Constructor
    void addData(String name, sex, int age){
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