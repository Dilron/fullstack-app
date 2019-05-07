insert into user_login (username, password)
values(
    ${username},
    ${hash}
);

insert into users (firstname, lastname, email, profile_ref)
values(
    ${firstname},
    ${lastname},
    ${email},
    ${profileRef}
) returning user_id;