select username, order_id, ship_message, ship_img
from orders o
join user_login ul
on o.seller_id = ul.login_id
where posted = true and shipped = true
order by o.order_id desc
limit 3;