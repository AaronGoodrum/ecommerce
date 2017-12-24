new Vue({
    el: '#app',
    data: {
        isShowingCart: false,
        cart: {
            items:[]
        },
        // Will need to be replace with a db of items
        products: [
            {
                id: 1,
                name: 'MacBook Pro (15 inch)',
                description: 'This laptop has a super crisp Retina display. Yes, we know that it\'s overpriced...',
                price: 2999,
                inStock: 50
            },
            {
                id: 2,
                name: 'Samsung Galaxy Note 7',
                description: 'Unlike the overpriced MacBook Pro, we\'re selling this one a bit cheap, as we heard it might explode...',
                price: 299,
                inStock: 755
            },
            {
                id: 3,
                name: 'HP Officejet 5740 e-All-in-One-printer',
                description: 'This one might not last for so long, but hey, printers never work anyways, right?',
                price: 149,
                inStock: 5
            },
            {
                id: 4,
                name: 'iPhone 7 cover',
                description: 'Having problems keeping a hold of that phone, huh? Ever considered not dropping it in the first place?',
                price: 49,
                inStock: 42
            },
            {
                id: 5,
                name: 'iPad Pro (9.7 inch)',
                description: 'We heard it\'s supposed to be pretty good. At least that\'s what people say.',
                price: 599,
                inStock: 0
            },
            {
                id: 6,
                name: 'OnePlus 3 cover',
                description: 'Does your phone spend most of its time on the ground? This cheap piece of plastic is the solution!',
                price: 19,
                inStock: 81
            }
        ]
    },

    methods:{
        // add 1 item product into cart
        addProductToCart: function(product){

            var cartItem = this.getCartItem(product);
            // If null add 1 to cart, If not Null add on to quantity
            if(cartItem != null){
                cartItem.quantity++
            } else {
                // if cartItem is null add 1 to carts
                this.cart.items.push({
                    product: product,
                    quantity: 1
                })
            }
        // remove 1 item from product.instock
            product.inStock--
        },
        // Loop for items in cart for same items returns # in cart
        getCartItem: function(product) {
            for (var i=0; i<this.cart.items.length; i++) {
                if (this.cart.items[i].product.id === product.id) {
                    return this.cart.items[i]
                }
            }

            return null;
        },
        // update Item.quantity in cart with ( inc+ , dec- )
        inc: function(cartItem){
            // Remove one inStock.qty
            cartItem.product.inStock--
            // Add one cart quantity
            cartItem.quantity++

        }, //End inc Item
        dec: function(cartItem){
            // ADD one inStock.qty
            cartItem.product.inStock++
            // remove one cart quantity
            cartItem.quantity--
            //Check if cart is zero
		    if (cartItem.quantity <= 0) {
			    //Remove 1 item from cart
			    this.cart.items.splice(cartItem, 1)
		    }
            
        }, //End dec Item
        checkout: function() {
            // Will loop cart putting back items,  Will need to be replace with a checkout payment..
            if (confirm('Complete Transaction?')){
            
                this.cart.items.forEach(function(item){
                    item.product.inStock += item.quantity
                })
                // setting the cart to null
                this.cart.items = []
            }
        }
    },
    computed: {
        cartTotal: function() {
            var total = 0
            // gets totals for items in cart and add price
            this.cart.items.forEach(function(item) {
                total += item.quantity * item.product.price
                
            })

            return total
        },
        // Get tax for items in cart total price
        taxAmount: function() {
           return ((this.cartTotal * 10) / 100) 
        }
    }
});