insert into post(
    user_id, 
    title, 
    message, 
    img_ref,
    link_ref, 
    request, 
    bid_accepted 
)values(
    ${userId},
    ${newPostTitle},
    ${newPostMessage},
    ${newPostImg},
    ${newReqLink},
    true,
    false
);

insert into shipping(
    user_id,
    street,
    city,
    state,
    zip
)values(
    ${userId},
    ${newReqStreet},
    ${newReqCity},
    ${newReqState},
    ${newReqZIP}
);