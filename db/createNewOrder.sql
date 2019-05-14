insert into orders (
    bid_id,
    message,
    order_img,
    processing,
    shipped,
    posted
)values(
    ${bidId},
    null,
    null,
    true,
    false,
    false
)