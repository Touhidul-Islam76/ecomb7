<template>
    <!-- START MAIN CONTENT -->
    <div class="main_content">

        <!-- START SECTION SHOP -->
        <div class="section">
            <div class="container">
                <div class="row">
                    <div class="col-12">
                        <div class="table-responsive shop_cart_table">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th class="product-thumbnail">&nbsp;</th>
                                        <th class="product-name">Product</th>
                                        <th class="product-price">Price</th>
                                        <th class="product-quantity">Quantity</th>
                                        <th class="product-subtotal">Total</th>
                                        <th class="product-remove">Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="item in cartStores.allCart" :key="item.id">
                                        <!-- Image (Fallback if image is null) -->
                                        <td class="product-thumbnail">
                                            <a href="#">
                                                <img :src="item.product?.image || '/placeholder.png'"
                                                    :alt="item.product?.title">
                                            </a>
                                        </td>

                                        <!-- Product Title -->
                                        <td class="product-name" data-title="Product">
                                            <a href="#">{{ item.product?.title }}</a>
                                        </td>

                                        <!-- Unit Price -->
                                        <td class="product-price" data-title="Price">
                                            ${{ item.price }}
                                        </td>

                                        <!-- Quantity Controls -->
                                        <td class="product-quantity" data-title="Quantity">
                                            <div class="quantity">
                                                <input type="button" value="-" class="minus" @click="decreaseQty(item)">
                                                <input type="text" name="quantity" v-model.number="item.quantity"
                                                    title="Qty" class="qty" size="4" readonly>
                                                <input type="button" value="+" class="plus" @click="increaseQty(item)">
                                            </div>
                                        </td>

                                        <!-- Line Item Total -->
                                        <td class="product-subtotal" data-title="Total">
                                            ${{ (item.price * item.quantity).toFixed(2) }}
                                        </td>

                                        <!-- Remove Button -->
                                        <td class="product-remove" data-title="Remove">
                                            <a href="#" @click.prevent="removeItem(item.id)">
                                                <i class="ti-close"></i>
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td colspan="6" class="px-0">
                                            <div class="row g-0 align-items-center">
                                                <div class="col-lg-4 col-md-6 mb-3 mb-md-0">
                                                    <div class="coupon field_form input-group">
                                                        <input type="text" v-model="couponCode"
                                                            class="form-control form-control-sm"
                                                            placeholder="Enter Coupon Code..">
                                                        <div class="input-group-append">
                                                            <button class="btn btn-fill-out btn-sm" type="button"
                                                                @click="applyCoupon">Apply Coupon</button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-lg-8 col-md-6 text-start text-md-end">
                                                    <button class="btn btn-line-fill btn-sm" type="button"
                                                        @click="clearCart">Clear Cart</button>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-12">
                        <div class="medium_divider"></div>
                        <div class="divider center_icon"><i class="ti-shopping-cart-full"></i></div>
                        <div class="medium_divider"></div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="heading_s1 mb-3">
                            <h6>Calculate Shipping</h6>
                        </div>
                        <form class="field_form shipping_calculator" @submit.prevent>
                            <div class="form-row">
                                <div class="form-group col-lg-12 mb-3">
                                    <div class="custom_select">
                                        <select class="form-control" v-model="selectedCountry">
                                            <option value="">Choose an option...</option>
                                            <option value="BD">Bangladesh</option>
                                            <option value="US">USA (US)</option>
                                            <option value="GB">United Kingdom (UK)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-lg-6 mb-3">
                                    <input required="required" placeholder="State / Country" class="form-control"
                                        name="state" type="text">
                                </div>
                                <div class="form-group col-lg-6 mb-3">
                                    <input required="required" placeholder="PostCode / ZIP" class="form-control"
                                        name="zipcode" type="text">
                                </div>
                            </div>
                            <div class="form-row">
                                <div class="form-group col-lg-12 mb-3">
                                    <button class="btn btn-fill-line" type="button">Update Totals</button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div class="col-md-6">
                        <div class="border p-3 p-md-4">
                            <div class="heading_s1 mb-3">
                                <h6>Cart Totals</h6>
                            </div>
                            <div class="table-responsive">
                                <table class="table">
                                    <tbody>
                                        <tr>
                                            <td class="cart_total_label">Cart Subtotal</td>
                                            <td class="cart_total_amount">${{ cartStores.subtotal }}</td>
                                        </tr>
                                        <tr>
                                            <td class="cart_total_label">Shipping</td>
                                            <td class="cart_total_amount">Free Shipping</td>
                                        </tr>
                                        <tr>
                                            <td class="cart_total_label">Total</td>
                                            <td class="cart_total_amount"><strong>$1200</strong></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <a href="#" class="btn btn-fill-out">Proceed To CheckOut</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- END SECTION SHOP -->

        <!-- START SECTION SUBSCRIBE NEWSLETTER -->
        <div class="section bg_default small_pt small_pb">
            <div class="container">
                <div class="row align-items-center">
                    <div class="col-md-6">
                        <div class="heading_s1 mb-md-0 heading_light">
                            <h3>Subscribe Our Newsletter</h3>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="newsletter_form">
                            <form @submit.prevent>
                                <input type="text" required class="form-control rounded-0"
                                    placeholder="Enter Email Address">
                                <button type="submit" class="btn btn-dark rounded-0" name="submit"
                                    value="Submit">Subscribe</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- START SECTION SUBSCRIBE NEWSLETTER -->

    </div>
    <!-- END MAIN CONTENT -->
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { cartStore } from '../../stores/Product/cartStore';
import http from '../../library/http';
import Toastify from 'toastify-js';

const cartStores = cartStore();
const cartItems = ref([cartStores.allCart || null]);
onMounted(async () => {
    cartItems.value = await cartStores.allCarts();
    console.log("fetching carts from page:", cartItems)
})

const removeItem = async(product_id)=> {
    const res = await http.post("cart/delete", {cart_id: product_id});
    if(res){
        Toastify({

            text: res.data.massage[0],

            duration: 3000

        }).showToast();
    }
}


const couponCode = ref('');
const selectedCountry = ref('BD');



// const subtotal = computed(() => {
//     return cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0);
// });

// const grandTotal = computed(() => {
//     return subtotal.value;
// });

const increaseQty = (item) => {
    item.quantity++;
};

const decreaseQty = (item) => {
    if (item.quantity > 1) {
        item.quantity--;
    }
};

// const removeItem = (id) => {
//     cartItems.value = cartItems.value.filter(item => item.id !== id);
// };

// const clearCart = () => {
//     cartItems.value = [];
// };
</script>