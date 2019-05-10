insert into bid (post_id, bidder_id, poster_id, bid_message, bid_val, printer, est_processing_time)
values(
    ${post_id},
    ${bidderId},
    ${user_id},
    ${newBidMessage},
    ${newBidVal},
    ${newBidPrinter},
    ${newBidDaysEst}
);