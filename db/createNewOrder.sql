insert into orders(
    bid_id,
    post_id,
    client_id,
    ship_message,
    ship_img,
    processing,
    shipped,
    posted
)values(
    ${bidId},
    ${postId},
    ${userId},
    null,
    null,
    true,
    false,
    false
);

update orders
set seller_id = bid.bidder_id
from bid
where orders.bid_id = bid.bid_id;