select username, password, firstname, lastname, profile_ref, user_id
from user_login ul
join users u
on u.user_id = ul.login_id
where username = ${username};