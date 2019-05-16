update orders
set ship_message = ${shipFormMessage},
    ship_img = ${shipFormImg},
    shipped = true,
    posted = ${shipFormPost}
where order_id = ${orderId}
returning ship_message, ship_img, shipped, posted;