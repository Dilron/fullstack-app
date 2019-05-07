insert into post(
    user_id, 
    title, 
    message, 
    img_ref, 
    request, 
    bid_accepted, 
    link_ref
    address, 
    city, 
    state, 
    zip
) values(
    ${userId},
    ${newPostTitle},
    ${newPostMessage},
    ${newPostImg},
    true,
    false,
    ${newReqLink}
    ${newReqAddress},
    ${newReqCity},
    ${newReqState},
    ${newReqZIP},
)