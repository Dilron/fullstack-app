select username, bid_id, post_id, bidder_id, poster_id, bid_message, bid_val, printer, est_processing_time
from bid
join user_login
on bidder_id = login_id
where post_id = ${id};