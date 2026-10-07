create  table  tbl_todo (
    id serial primary key,
    title varchar(1000) not null,
    description varchar(1000) not null,
    is_completed integer default 0,
    created_date timestamp not null default current_timestamp,
    modified_date timestamp
);

create table tbl_todo_log (
    id serial primary key,
    todo_id int,
    title varchar(1000) not null,
    description varchar(1000) not null,
    is_completed integer default 0,
    created_date timestamp not null default current_timestamp
);