select * 
from post
join user_login
on post.user_id = user_login.login_id
where user_id = ${id} and bid_accepted = false;