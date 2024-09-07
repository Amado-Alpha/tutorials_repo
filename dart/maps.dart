void main(){
    
    // Maps: key - value pairs

    var favBrand = {"John":"HP", "Mary":"Dell"};
    print(favBrand);

    print('John\'s brand: ${favBrand['John']}');

    // values
    print('values: ${favBrand.values}');

    // keys
    print('keys: ${favBrand.keys}');

    // Length
    print('length ${favBrand.length}');

    // Add item
    favBrand["Alpha"] = "Mac";
    print('Alpha added: $favBrand'); 

    // Add many
    favBrand.addAll({"Mireya":"Microsoft", "Nana":"Google PC"});
    print('Many additions: $favBrand');

    // Remove item
    favBrand.remove("John");

    // Remove everything
    favBrand.clear();
    print('Empty: $favBrand');
    

}