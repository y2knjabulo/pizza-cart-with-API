document.addEventListener("alpine:init", () => {
    Alpine.data("pizzaCart", () => {
        return {
            title: "Pizza Cart API",
            pizzas: [],
            username: "njabuloy2k",
            cartId: "",
            cartPizzas: [],
            cartTotal: 0.00,
            paymentAmount: 0,
            message: "",


           createCart() {
                const createCartURL = `https://pizza-api.projectcodex.net/api/pizza-cart/create?username=${this.username}`
                return axios.get(createCartURL)
                    .then(result => {
                        this.cartId = result.data.cart_code;

                    });
            },

            getCart() {
                const getCartURL = `https://pizza-api.projectcodex.net/api/pizza-cart/${this.cartId}/get`
                return axios.get(getCartURL);
            },

            addPizza(pizzaId) {
                // console.log(pizzaId);   
                return axios.post("https://pizza-api.projectcodex.net/api/pizza-cart/add", {
                    cart_code: this.cartId,
                    pizza_id: pizzaId
                })
                //.then(res=>{
                //  return ;}
            // return .then(res=>{


        },

          removePizza(pizzaId) {

            return axios.post("https://pizza-api.projectcodex.net/api/pizza-cart/remove", {
                "cart_code": this.cartId,
                "pizza_id": pizzaId
            })


        },

        pay(amount) {

            return axios.post("https://pizza-api.projectcodex.net/api/pizza-cart/pay",
                {
                    "cart_code": this.cartId,
                     amount
                });




        },

        showCartData() {
            this.getCart().then(result => {
                console.log(result);
                const cartData = result.data;
                this.cartPizzas = cartData.pizzas;
                this.cartTotal = cartData.total.toFixed(2);
                //alert(this.cartTotal);
            });
        },

        init() {
            axios
                .get('https://pizza-api.projectcodex.net/api/pizzas')
                .then(result => {
                    this.pizzas = result.data.pizzas
                });
                
            if (!this.cartId) {
                this
                    .createCart()
                    .then(() => {
                        this.showCartData();
                    })
            
            }



        },

        addPizzaToCart(pizzaId) {
            // alert(pizzaId)

            console.log(this.addPizza(pizzaId)
                .then(() => {
                    this.showCartData();
                    this.cartPizzas.push(this.addPizza(pizzaId))
                }));

        },

        removePizzaFromCart(pizzaId) {
            //alert(pizzaId)
            this.removePizza(pizzaId)
                .then(() => {
                    this.showCartData();
                })
        },

        payForCart() {
           alert("Pay Now : " + this.paymentAmount);
            this
                .pay(this.paymentAmount)
                .then(result => {
                    if ( result.data.status ="failure") {
                        this.message = result.data.message;
                        setTimeout(() => this.message = "", 3000);
                    } else {
                        this.message = "Payment received!";
                        setTimeout(() => {
                            this.message = "";
                            this.cartPizzas = [];
                            this.cartTotal = 0.00
                            this.cartId = '',
                            this.paymentAmount = 0,
                            this.createCart();
                        }, 3000)

                    }
                })
        }

    }
    });
});