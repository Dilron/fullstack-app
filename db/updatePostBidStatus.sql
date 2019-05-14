update post
set bid_accepted = true
from bid
where bid.bid_id = ${bidId} and bid.post_id = post.post_id