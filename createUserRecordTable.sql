use cs2803;
DROP TABLE IF EXISTS registeredUsrs;
create table registeredUsers(
    username varchar(60) primary key,
    password varchar(60) not null
) engine = innodb;


DROP TABLE IF EXISTS userRecord;
CREATE TABLE IF NOT EXISTS userRecord(
	username varchar(15),
    gameID int AUTO_INCREMENT,
    win varchar(1),
    formula varchar(30),
    PRIMARY KEY (gameID),
    CONSTRAINT user_record_fk1 FOREIGN KEY (username) REFERENCES registeredUsers(username)
) engine = innodb;

drop procedure if exists create_record;
delimiter //
create procedure create_record (in ip_username varchar(100), in ip_win varchar(5), in ip_formula varchar(30))
--     in ip_formula varchar(30), in ip_card1 varchar(2), in ip_card2 varchar(2),
--     in ip_card3 varchar(2), in ip_card4 varchar(2))
begin
	insert into userRecord(username, win, formula) values 
    (ip_username, ip_win, ip_formula);
end //
delimiter ;

call create_record("Lifu", "1", "1+1+2+3");