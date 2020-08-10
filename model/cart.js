module.exports = function Cart(cart) {
    this.items = cart.items || {};
    this.totalItems = cart.totalItems || 0;
    this.totalPrice = cart.totalPrice || 0;

    this.add = function (item, Id) {
        var cartItem = this.items[Id];
        if (!cartItem) {
            cartItem = this.items[Id] = {
                item: item,
                quantity: 0,
                price: 0
            };
        }
        cartItem.quantity++;
        cartItem.price = Number(cartItem.item.Prize) * cartItem.quantity;
        this.totalItems++;
        this.totalPrice += cartItem.item.Prize;
    };

    this.remove = function (id) {
        this.totalItems -= this.items[id].quantity;
        this.totalPrice -= this.items[id].price;
        delete this.items[id];
    };

    this.getItems = function () {
        var arr = [];
        for (var id in this.items) {
            arr.push(this.items[id]);
        }
        return arr;
    };
};