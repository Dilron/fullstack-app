select order_id, shipped, ship_message, ship_img, username, title, message, img_ref, link_ref, bid_message, bid_val, printer, est_processing_time, street, city, state, zip
from orders o
join user_login ul
on o.client_id = ul.login_id
join post p
on o.post_id = p.post_id
join bid b
on o.bid_id = b.bid_id
join shipping s
on o.post_id = s.shipping_id
where seller_id = ${userId};