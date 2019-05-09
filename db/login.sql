select user_id, username, password, firstname, lastname, profile_ref 
from user_login ul
join users u
on u.user_id = ul.login_id
where username = ${username};