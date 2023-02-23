create type experience_type as enum ('Emprego', 'Curso', 'Acadêmico');
create type stack as enum ('Back-end', 'Front-end', 'Full-stack');
create type "level" as enum ('Avançado', 'Iniciante', 'Intermediário');

create table if not exists experiences (
	company varchar(100) not null,
	description text,
	end_date date,
	id serial primary key,
	"name" varchar(100) not null,
	start_date date,
	"type" experience_type not null
);

create table if not exists contacts (
	id serial primary key,
	icon varchar(100) not null,
	"name" varchar(20),
	url varchar(100) not null
);

create table if not exists projects (
	description text,
	id serial primary key,
	"name" varchar(50) not null,
	url varchar(100) not null,
	stack_name stack not null,
	highlight boolean
);

create table if not exists technologies (
	id serial primary key,
	level_name "level" not null,
	icon varchar(100) not null,
	"name" varchar(50) not null,
	stack_name stack not null
);

create table if not exists projects_technologies (
	project_id int not null,
	technology_id int not null
);

alter table projects_technologies
add constraint fk_project_id
foreign key (project_id)
references projects (id);

alter table projects_technologies
add constraint fk_technology_id
foreign key (technology_id)
references technologies (id);