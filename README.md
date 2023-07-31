
                                            PLOTLINE ASSIGNMENT- BACKEND

I have created a server with the following features-
Register a user
Login a user(using JWT sign and returning access token)
Create a cart using User id
Add , delete and edit products
Add , delete and edit services
View all the products and services
Add services and products to the cart(with total bill of the cart)
Remove services and products from the cart(with total bill of the cart)
Clear the cart using Cart Id
Different API for admin to see all the orders(with verification)
Create an order from the cart with total amount
Total bill of the order(with cart details, total amount with taxes, original price of the products without taxes, quantity of products and price)
Confirmation of order

The JWT secrets and mongoDB id are in the code.
Below are the credentials of the server-

Credentials-

Admin-

_id-64c74abf763ae2a7db754346
username-"admin"
email-"admin@gmail.com"
password-"heyy"
isAdmin-true

User-

_id-64c749ac763ae2a7db75433a
username-"testuser89"
email-"testuser89@gmail.com"
password-"heyy"
isAdmin-false



_id-64c74cf9763ae2a7db754373
username-"tuser2"
email-"tuser2@gmail.com"
password-"heyy"
isAdmin-false


_id-64c74ab0763ae2a7db754344
username-"testuser1"
email-"testuser1@gmail.com",
password-"heyy"

Products-

_id-64c74a09763ae2a7db754340
title-"testproductss09"
desc-"desc89"


_id-64c74b38763ae2a7db75434d
title-"testproductss5"
desc-"desc85"

Services-

_id-64c749cb763ae2a7db75433d
title-"testservices49"
desc-"desc19"

_id-64c74b1b763ae2a7db75434b
title-"testservices4"
desc-"desc1"


Carts-

_id-64c74a28763ae2a7db754342
userId-"64c749ac763ae2a7db75433a"
totalsum -1700

_id-64c74d23763ae2a7db754375
userId-"64c74cf9763ae2a7db754373"
totalsum- 0

Order-

_id-64c74e4a763ae2a7db754390
userId-"64c749ac763ae2a7db75433a"
amount-1700
address-"testaddress"
status-"done"


