export default {
    // URLs  
    loginPageUrl: 'https://www.saucedemo.com/',
    inventoryPageUrl: '/inventory.html',
    detailProductUrl: '/inventory-item.html?id=4', 
    cartPageUrl: '/cart.html',
    checkoutStepOnePageUrl: '/checkout-step-one.html',
    checkoutStepTwoPageUrl: '/checkout-step-two.html',  
    checkoutCompletePageUrl: '/checkout-complete.html',  

    // Login data (usernames and passwords)
    validUsr: 'standard_user',
    invalidUsr: 'invalid_user',
    lockedOutUsr: 'locked_out_user',
    validPwd: 'secret_sauce',
    invalidPwd: 'password',

    // Error messages on the login page
    msgWrongLoginData: 'Epic sadface: Username and password do not match any user in this service',
    msgRequiredUsr: 'Epic sadface: Username is required',
    msgRequiredPwd: 'Epic sadface: Password is required',
    msgRequiredLockedUsr: 'Epic sadface: Sorry, this user has been locked out.',

    // Error messages on the checkout page
    fnErrCheckoutPage: 'Error: First Name is required',
    lnErrCheckoutPage: 'Error: Last Name is required',
    zcErrCheckoutPage: 'Error: Postal Code is required',

    // Checkout user information
    fn: 'Anna',
    ln: 'Fox',
    zc: '33-333',
    
    // Various devices to check responsiveness
    viewports: [
      { device: 'mobile', width: 375, height: 667 },
      { device: 'tablet', width: 768, height: 1024 },
      { device: 'desktop', width: 1440, height: 900 }
    ],

    // Detail information about products
    orderOfProducts: [
      'Sauce Labs Backpack', 'Sauce Labs Bike Light',  'Sauce Labs Bolt T-Shirt', 
      'Sauce Labs Fleece Jacket', 'Sauce Labs Onesie', 'Test.allTheThings() T-Shirt (Red)'
    ],
    
    productsPrice: ['29.99', '9.99'],

    // Other data
    rate: 0.08,
    remove: 'Remove',
    msgThankYouForOrder: 'Thank you for your order!',
    titleYourInformation: 'Checkout: Your Information',
    labelProducts: 'Products',  
}