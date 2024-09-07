void main(){

    // Lists in dart are basically arrays

    var myList = [1, 2, 3, 4];
    
    // Change an item
    myList[0] = 32;
    print('Changed: $myList');

    // Add item
    myList.add(54);

    // Add multiple items
    myList.addAll([46, 89, 12]);
    print('Multiple addition: $myList');

    // Insert at a specific position
    myList.insert(3, 900);
    
    // Insert many
    myList.insertAll(4, [90, 67, 53]);
    print('Many inserts: $myList');

    // Mixed list
    var mixedList = [1, 3, 4, 'Alpha', 'Theta'];
    print('Mixed List: $mixedList');

    // Remove item
    mixedList.remove('Theta');
    print('Removed: $mixedList');

    

}