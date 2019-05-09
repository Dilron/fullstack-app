select post_id, user_id, username, title, message, img_ref, request, bid_accepted, link_ref 
from post p
join user_login ul
on p.user_id = ul.login_id
order by post_id desc
limit 5 offset ${offset};