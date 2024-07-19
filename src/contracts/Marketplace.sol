//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Marketplace {
    struct Product{
        uint256 id;
        string name;
        string description;
        uint256 price;
        address payable owner;
        bool purchased;
    }

    event ProductCreated(
        uint id,
        string name,
        string description,
        uint price,
        address payable owner,
        bool purchased
    );

    event ProductPurchased(
        uint id,
        string name,
        string description,
        uint price,
        address payable owner,
        bool purchased
    );

    mapping(uint256 => Product) public products;
    uint public productCount;

    function createProduct(string memory _name, string memory _description, uint256 _price) public {
        require(bytes(_name).length > 0, "Product name cant be empty.");
        require(bytes(_description).length > 0, "Product description cant be empty.");
        require(_price > 0, "Price cant be zero.");

        productCount ++;
        products[productCount] = Product(productCount, _name, _description, _price, payable(msg.sender), false);
        emit ProductCreated(productCount, _name, _description, _price, payable(msg.sender), false);
    }

    function purchaseProduct(uint256 _id) public payable {
        Product memory _product = products[_id];

        require(_product.id > 0 && _product.id <= productCount, "Invalid product id.");
        require(_product.purchased == false, "Product already selled.");
        require(msg.value >= _product.price, "Insufficient balance.");
        require(_product.owner != msg.sender, "You cant buy your own product.");

        _product.owner.transfer(msg.value);

        _product.owner = payable(msg.sender);
        _product.purchased = true;

        products[_id] = _product;

        emit ProductPurchased(_id, _product.name, _product.description, _product.price, _product.owner, true);
    }
}