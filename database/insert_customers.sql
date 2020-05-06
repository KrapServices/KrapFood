-- customer 1
BEGIN;
INSERT INTO users
    (user_id, email, password, created_at)
VALUES
    (1, 'c0', 'p0', '2020-03-15 12:00:00');

INSERT INTO customers
    (customer_id, name)
VALUES
    (1, 'Bob Burgers');

INSERT INTO cards
    (card_number, expiry_month, expiry_year, customer_id, name_card)
VALUES
    ('1234567812345678', 5, 2022, 1, 'Main card');
COMMIT;

-- customer 2
BEGIN;
INSERT INTO users
    (user_id, email, password, created_at)
VALUES
    (2, 'c1', 'p1', '2020-03-15 12:00:00');

INSERT INTO customers
    (customer_id, name)
VALUES
    (2, 'Alice Wonderland');

INSERT INTO cards
    (card_number, expiry_month, expiry_year, customer_id, name_card)
VALUES
    ('1234567812345679', 5, 2022, 2, 'Main card');
COMMIT;

--customer 3
BEGIN;
INSERT INTO users
    (user_id, email, password, created_at)
VALUES
    (3, 'c2', 'p2', '2020-03-15 12:00:00');

INSERT INTO customers
    (customer_id, name)
VALUES
    (3, 'Charlie Chocolate');

INSERT INTO cards
    (card_number, expiry_month, expiry_year, customer_id, name_card)
VALUES
    ('1234567812345670', 5, 2022, 3, 'Main card');
COMMIT;

--customer 4
BEGIN;
INSERT INTO users
    (user_id, email, password, created_at)
VALUES
    (4, 'c3', 'p3', '2020-03-15 12:00:00');

INSERT INTO customers
    (customer_id, name)
VALUES
    (4, 'Diana Princess');
    
INSERT INTO cards
    (card_number, expiry_month, expiry_year, customer_id, name_card)
VALUES
    ('1234567812345671', 5, 2022, 4, 'Main card');
COMMIT;

--customer 5
BEGIN;
INSERT INTO users
    (user_id, email, password, created_at)
VALUES
    (5, 'c4', 'p4', '2020-03-15 12:00:00');

INSERT INTO customers
    (customer_id, name)
VALUES
    (5, 'Eggy Azalea');
    
INSERT INTO cards
    (card_number, expiry_month, expiry_year, customer_id, name_card)
VALUES
    ('1234567812345672', 5, 2022, 5, 'Main card');
COMMIT;

--customer 6
BEGIN;
INSERT INTO users
    (user_id, email, password, created_at)
VALUES
    (6, 'c5', 'p5', '2020-03-15 12:00:00');

INSERT INTO customers
    (customer_id, name)
VALUES
    (6, 'Feather Lim');
    
INSERT INTO cards
    (card_number, expiry_month, expiry_year, customer_id, name_card)
VALUES
    ('1234567812345673', 5, 2022, 6, 'Main card');
COMMIT;


--customer 7
BEGIN;
INSERT INTO users
    (user_id, email, password, created_at)
VALUES
    (7, 'c6', 'p6', '2020-03-15 12:00:00');

INSERT INTO customers
    (customer_id, name)
VALUES
    (7, 'Grace Grape');
    
INSERT INTO cards
    (card_number, expiry_month, expiry_year, customer_id, name_card)
VALUES
    ('1234567812345674', 5, 2022, 7, 'Main card');
COMMIT;

--customer 8
BEGIN;
INSERT INTO users
    (user_id, email, password, created_at)
VALUES
    (8, 'c7', 'p7', '2020-03-15 12:00:00');

INSERT INTO customers
    (customer_id, name)
VALUES
    (8, 'Heng Sui Kyet');
    
INSERT INTO cards
    (card_number, expiry_month, expiry_year, customer_id, name_card)
VALUES
    ('1234567812345675', 5, 2022, 8, 'Main card');
COMMIT;

--customer 9
BEGIN;
INSERT INTO users
    (user_id, email, password, created_at)
VALUES
    (9, 'c8', 'p8', '2020-03-15 12:00:00');

INSERT INTO customers
    (customer_id, name)
VALUES
    (9, 'John Doe');
    
INSERT INTO cards
    (card_number, expiry_month, expiry_year, customer_id, name_card)
VALUES
    ('1234567812345676', 5, 2022, 9, 'Main card');
COMMIT;


--customer 10
BEGIN;
INSERT INTO users
    (user_id, email, password, created_at)
VALUES
    (10, 'c9', 'p9', '2020-03-15 12:00:00');

INSERT INTO customers
    (customer_id, name)
VALUES
    (10, 'Kaya Lee');
    
INSERT INTO cards
    (card_number, expiry_month, expiry_year, customer_id, name_card)
VALUES
    ('1234567812345677', 5, 2022, 10, 'Main card');
COMMIT;

--customer 11
BEGIN;
INSERT INTO users
    (user_id, email, password, created_at)
VALUES
    (11, 'c10', 'p10', '2020-04-15 12:00:00');

INSERT INTO customers
    (customer_id, name)
VALUES
    (11, 'Leonard');
    
INSERT INTO cards
    (card_number, expiry_month, expiry_year, customer_id, name_card)
VALUES
    ('2234567812345677', 5, 2022, 11, 'Main card');
COMMIT;



--customer 12
BEGIN;
INSERT INTO users
    (user_id, email, password, created_at)
VALUES
    (12, 'c11', 'p11', '2020-04-15 12:00:00');

INSERT INTO customers
    (customer_id, name)
VALUES
    (12, 'Mary');
    
INSERT INTO cards
    (card_number, expiry_month, expiry_year, customer_id, name_card)
VALUES
    ('2234567812345678', 5, 2022, 12, 'Main card');
COMMIT;

--customer 13
BEGIN;
INSERT INTO users
    (user_id, email, password, created_at)
VALUES
    (13, 'c12', 'p12', '2020-04-15 12:00:00');

INSERT INTO customers
    (customer_id, name)
VALUES
    (13, 'Mary Two');
    
INSERT INTO cards
    (card_number, expiry_month, expiry_year, customer_id, name_card)
VALUES
    ('2234567812345679', 5, 2022, 13, 'Main card');
COMMIT;


--customer 14
BEGIN;
INSERT INTO users
    (user_id, email, password, created_at)
VALUES
    (14, 'c13', 'p13', '2020-04-15 12:00:00');

INSERT INTO customers
    (customer_id, name)
VALUES
    (14, 'Nicki Minaj');
    
INSERT INTO cards
    (card_number, expiry_month, expiry_year, customer_id, name_card)
VALUES
    ('2234567812345670', 5, 2022, 14, 'Main card');
COMMIT;

--customer 15
BEGIN;
INSERT INTO users
    (user_id, email, password, created_at)
VALUES
    (15, 'c14', 'p14', '2020-04-15 12:00:00');

INSERT INTO customers
    (customer_id, name)
VALUES
    (15, 'Olivia');
    
INSERT INTO cards
    (card_number, expiry_month, expiry_year, customer_id, name_card)
VALUES
    ('2234567812345671', 5, 2022, 15, 'Main card');
COMMIT;

--customer 16
BEGIN;
INSERT INTO users
    (user_id, email, password, created_at)
VALUES
    (16, 'c15', 'p15', '2020-04-15 12:00:00');

INSERT INTO customers
    (customer_id, name)
VALUES
    (16, 'Bob');
    
INSERT INTO cards
    (card_number, expiry_month, expiry_year, customer_id, name_card)
VALUES
    ('2234567812345672', 5, 2022, 16, 'Main card');
COMMIT;

--customer 17
BEGIN;
INSERT INTO users
    (user_id, email, password, created_at)
VALUES
    (17, 'c16', 'p16', '2020-04-15 12:00:00');

INSERT INTO customers
    (customer_id, name)
VALUES
    (17, 'Jane');
    
INSERT INTO cards
    (card_number, expiry_month, expiry_year, customer_id, name_card)
VALUES
    ('2234567812345673', 5, 2022, 17, 'Main card');
COMMIT;

--customer 18
BEGIN;
INSERT INTO users
    (user_id, email, password, created_at)
VALUES
    (18, 'c17', 'p17', '2020-04-15 12:00:00');

INSERT INTO customers
    (customer_id, name)
VALUES
    (18, 'Janet');
    
INSERT INTO cards
    (card_number, expiry_month, expiry_year, customer_id, name_card)
VALUES
    ('2234567812345674', 5, 2022, 18, 'Main card');
COMMIT;

--customer 19
BEGIN;
INSERT INTO users
    (user_id, email, password, created_at)
VALUES
    (19, 'c18', 'p18', '2020-04-15 12:00:00');

INSERT INTO customers
    (customer_id, name)
VALUES
    (19, 'Elenaor');
    
INSERT INTO cards
    (card_number, expiry_month, expiry_year, customer_id, name_card)
VALUES
    ('2234567812345675', 5, 2022, 19, 'Main card');
COMMIT;

--customer 20
BEGIN;
INSERT INTO users
    (user_id, email, password, created_at)
VALUES
    (20, 'c19', 'p19', '2020-04-16 12:00:00');

INSERT INTO customers
    (customer_id, name)
VALUES
    (20, 'Michael');
    
INSERT INTO cards
    (card_number, expiry_month, expiry_year, customer_id, name_card)
VALUES
    ('2234567812345676', 5, 2022, 20, 'Main card');
COMMIT;

-- customer 21
BEGIN;
INSERT INTO users
    (user_id,email,password,created_at) 
VALUES 
    (21,'orci.Phasellus@Pellentesquetincidunt.net','ODX17QKZ9MG','2020-04-16 12:00:00');

INSERT INTO customers 
    (name,customer_id) 
VALUES 
    ('Echo',21);

INSERT INTO cards 
    (card_number,expiry_month,expiry_year,customer_id,name_card) 
VALUES 
    ('6477062937271105', 7, 2022, 21, 'Main Card');
COMMIT;


-- customer 22
BEGIN;
INSERT INTO users 
    (user_id,email,password,created_at) 
VALUES 
    (22,'id@ipsumdolorsit.edu','NYW36HFY8AR','2020-04-16 12:00:00');
INSERT INTO customers 
    (name,customer_id) 
VALUES 
    ('Kai',22);
INSERT INTO cards 
    (card_number,expiry_month,expiry_year,customer_id,name_card) 
VALUES 
    ('6470973098594233',8,2022,22,'Main Card');
COMMIT;

-- customer 23
BEGIN;
INSERT INTO users 
    (user_id,email,password,created_at) 
VALUES 
    (23,'lectus.a.sollicitudin@elitEtiam.net','KJV31DMS9DZ','2020-04-16 12:00:00');
INSERT INTO customers 
    (name,customer_id)
VALUES
    ('Demetrius',23);

INSERT INTO cards 
    (card_number,expiry_month,expiry_year,customer_id,name_card) 
VALUES 
    ('6472196653156358',12,2022,23,'Main Card');
COMMIT;

-- customer 24
BEGIN;
INSERT INTO users 
    (user_id,email,password,created_at) 
VALUES 
    (24,'sagittis.Nullam@erosnon.ca','DYN67PZB3TH','2020-04-16 12:00:00');
INSERT INTO customers 
    (name,customer_id) 
VALUES 
    ('Alyssa',24);
INSERT INTO cards 
    (card_number,expiry_month,expiry_year,customer_id,name_card) 
VALUES 
    ('6583729940627991',8,2022,24,'Main Card');
COMMIT;

-- customer 25
INSERT INTO users 
    (user_id,email,password,created_at) 
VALUES 
    (25,'rhoncus.id.mollis@at.net','DPU35UHE9LC','2020-04-16 12:00:00');
INSERT INTO customers 
    (name,customer_id) 
VALUES 
    ('Drake',25);
INSERT INTO cards 
    (card_number,expiry_month,expiry_year,customer_id,name_card) 
VALUES 
    ('6590516632507248',5,2022,25,'Main Card');


-- INSERT INTO users (user_id,email,password,created_at) VALUES (51,'iaculis.quis@enimcommodohendrerit.org','IKM28KKA3GM','2020-04-13 12:00:00');
-- INSERT INTO users (user_id,email,password,created_at) VALUES (52,'velit.egestas@arcuAliquam.edu','JCW60NBD7TB','2020-04-13 12:00:00');
-- INSERT INTO users (user_id,email,password,created_at) VALUES (53,'Aenean.massa.Integer@Inmi.ca','UUF01FEY5YL','2020-04-13 12:00:00');
-- INSERT INTO users (user_id,email,password,created_at) VALUES (54,'vestibulum@enim.com','YUX69GAK4EU','2020-04-13 12:00:00');
-- INSERT INTO users (user_id,email,password,created_at) VALUES (55,'nulla.at@elitCurabitur.com','FCX50DKT5KO','2020-04-13 12:00:00');
-- INSERT INTO users (user_id,email,password,created_at) VALUES (56,'tristique.pellentesque@nisidictumaugue.edu','AIT92NGL4DZ','2020-04-13 12:00:00');
-- INSERT INTO users (user_id,email,password,created_at) VALUES (57,'non@eutellus.co.uk','AAF49YKQ2ZE','2020-04-13 12:00:00');
-- INSERT INTO users (user_id,email,password,created_at) VALUES (58,'nec.imperdiet.nec@in.co.uk','RCK22PSL4TQ','2020-04-13 12:00:00');
-- INSERT INTO users (user_id,email,password,created_at) VALUES (59,'Duis@mollisvitaeposuere.co.uk','LCZ05BWV7IA','2020-04-13 12:00:00');
-- INSERT INTO users (user_id,email,password,created_at) VALUES (60,'mi.Duis.risus@nuncnulla.net','QRA65OCJ2ZT','2020-04-13 12:00:00');





-- INSERT INTO customers (name,customer_id) VALUES ('Larissa',26);
-- INSERT INTO customers (name,customer_id) VALUES ('Athena',27);
-- INSERT INTO customers (name,customer_id) VALUES ('Kyle',28);
-- INSERT INTO customers (name,customer_id) VALUES ('Kathleen',29);
-- INSERT INTO customers (name,customer_id) VALUES ('Raven',30);
-- INSERT INTO customers (name,customer_id) VALUES ('Sebastian',31);
-- INSERT INTO customers (name,customer_id) VALUES ('Myra',32);
-- INSERT INTO customers (name,customer_id) VALUES ('Finn',33);
-- INSERT INTO customers (name,customer_id) VALUES ('Lamar',34);
-- INSERT INTO customers (name,customer_id) VALUES ('Alyssa',35);
-- INSERT INTO customers (name,customer_id) VALUES ('Carly',36);
-- INSERT INTO customers (name,customer_id) VALUES ('Felix',37);
-- INSERT INTO customers (name,customer_id) VALUES ('Stephanie',38);
-- INSERT INTO customers (name,customer_id) VALUES ('Guy',39);
-- INSERT INTO customers (name,customer_id) VALUES ('Janna',40);
-- INSERT INTO customers (name,customer_id) VALUES ('Hu',41);
-- INSERT INTO customers (name,customer_id) VALUES ('Allen',42);
-- INSERT INTO customers (name,customer_id) VALUES ('Dacey',43);
-- INSERT INTO customers (name,customer_id) VALUES ('Audra',44);
-- INSERT INTO customers (name,customer_id) VALUES ('Abel',45);
-- INSERT INTO customers (name,customer_id) VALUES ('Constance',46);
-- INSERT INTO customers (name,customer_id) VALUES ('Linus',47);
-- INSERT INTO customers (name,customer_id) VALUES ('Roanna',48);
-- INSERT INTO customers (name,customer_id) VALUES ('Sara',49);
-- INSERT INTO customers (name,customer_id) VALUES ('Channing',50);
-- INSERT INTO customers (name,customer_id) VALUES ('Brandon',51);
-- INSERT INTO customers (name,customer_id) VALUES ('Nasim',52);
-- INSERT INTO customers (name,customer_id) VALUES ('Dahlia',53);
-- INSERT INTO customers (name,customer_id) VALUES ('Fallon',54);
-- INSERT INTO customers (name,customer_id) VALUES ('Sheila',55);
-- INSERT INTO customers (name,customer_id) VALUES ('Dawn',56);
-- INSERT INTO customers (name,customer_id) VALUES ('Vance',57);
-- INSERT INTO customers (name,customer_id) VALUES ('Lucian',58);
-- INSERT INTO customers (name,customer_id) VALUES ('Phoebe',59);
-- INSERT INTO customers (name,customer_id) VALUES ('Zia',60);



-- INSERT INTO cards (card_number,expiry_month,expiry_year,customer_id,name_card) VALUES ('6487669514573170',11,2022,26,'Main Card');
-- INSERT INTO cards (card_number,expiry_month,expiry_year,customer_id,name_card) VALUES ('6501284712565861',6,2022,27,'Main Card');
-- INSERT INTO cards (card_number,expiry_month,expiry_year,customer_id,name_card) VALUES ('6459743553039700',5,2022,28,'Main Card');
-- INSERT INTO cards (card_number,expiry_month,expiry_year,customer_id,name_card) VALUES ('6502581555695559',9,2022,29,'Main Card');
-- INSERT INTO cards (card_number,expiry_month,expiry_year,customer_id,name_card) VALUES ('6461943857911432',12,2022,30,'Main Card');
-- INSERT INTO cards (card_number,expiry_month,expiry_year,customer_id,name_card) VALUES ('6495995252907159',4,2022,31,'Main Card');
-- INSERT INTO cards (card_number,expiry_month,expiry_year,customer_id,name_card) VALUES ('6580338827360388',1,2022,32,'Main Card');
-- INSERT INTO cards (card_number,expiry_month,expiry_year,customer_id,name_card) VALUES ('6583575506311268',6,2022,33,'Main Card');
-- INSERT INTO cards (card_number,expiry_month,expiry_year,customer_id,name_card) VALUES ('6011417011953148',9,2022,34,'Main Card');
-- INSERT INTO cards (card_number,expiry_month,expiry_year,customer_id,name_card) VALUES ('6011592634591655',10,2022,35,'Main Card');
-- INSERT INTO cards (card_number,expiry_month,expiry_year,customer_id,name_card) VALUES ('6445996629778795',2,2022,36,'Main Card');
-- INSERT INTO cards (card_number,expiry_month,expiry_year,customer_id,name_card) VALUES ('6445151101853290',2,2022,37,'Main Card');
-- INSERT INTO cards (card_number,expiry_month,expiry_year,customer_id,name_card) VALUES ('6455132420116640',3,2022,38,'Main Card');
-- INSERT INTO cards (card_number,expiry_month,expiry_year,customer_id,name_card) VALUES ('6442154149676551',10,2022,39,'Main Card');
-- INSERT INTO cards (card_number,expiry_month,expiry_year,customer_id,name_card) VALUES ('6497790180436274',9,2022,40,'Main Card');
-- INSERT INTO cards (card_number,expiry_month,expiry_year,customer_id,name_card) VALUES ('6011364949194389',6,2022,41,'Main Card');
-- INSERT INTO cards (card_number,expiry_month,expiry_year,customer_id,name_card) VALUES ('6475080714600322',12,2022,42,'Main Card');
-- INSERT INTO cards (card_number,expiry_month,expiry_year,customer_id,name_card) VALUES ('6441867921884215',4,2022,43,'Main Card');
-- INSERT INTO cards (card_number,expiry_month,expiry_year,customer_id,name_card) VALUES ('6452249727408141',11,2022,44,'Main Card');
-- INSERT INTO cards (card_number,expiry_month,expiry_year,customer_id,name_card) VALUES ('6455618005569021',8,2022,45,'Main Card');
-- INSERT INTO cards (card_number,expiry_month,expiry_year,customer_id,name_card) VALUES ('6468774121969267',9,2022,46,'Main Card');
-- INSERT INTO cards (card_number,expiry_month,expiry_year,customer_id,name_card) VALUES ('6464139591818564',6,2022,47,'Main Card');
-- INSERT INTO cards (card_number,expiry_month,expiry_year,customer_id,name_card) VALUES ('6517898342960051',12,2022,48,'Main Card');
-- INSERT INTO cards (card_number,expiry_month,expiry_year,customer_id,name_card) VALUES ('6451217611160061',9,2022,49,'Main Card');
-- INSERT INTO cards (card_number,expiry_month,expiry_year,customer_id,name_card) VALUES ('6459987717168026',10,2022,50,'Main Card');
-- INSERT INTO cards (card_number,expiry_month,expiry_year,customer_id,name_card) VALUES ('6499605685674344',7,2022,51,'Main Card');
-- INSERT INTO cards (card_number,expiry_month,expiry_year,customer_id,name_card) VALUES ('6522242938967134',8,2022,52,'Main Card');
-- INSERT INTO cards (card_number,expiry_month,expiry_year,customer_id,name_card) VALUES ('6472799481858721',7,2022,53,'Main Card');
-- INSERT INTO cards (card_number,expiry_month,expiry_year,customer_id,name_card) VALUES ('6516933145916009',5,2022,54,'Main Card');
-- INSERT INTO cards (card_number,expiry_month,expiry_year,customer_id,name_card) VALUES ('6493188529708921',1,2022,55,'Main Card');
-- INSERT INTO cards (card_number,expiry_month,expiry_year,customer_id,name_card) VALUES ('6476596456760627',2,2022,56,'Main Card');
-- INSERT INTO cards (card_number,expiry_month,expiry_year,customer_id,name_card) VALUES ('6011081594153219',9,2022,57,'Main Card');
-- INSERT INTO cards (card_number,expiry_month,expiry_year,customer_id,name_card) VALUES ('6470947596877977',1,2022,58,'Main Card');
-- INSERT INTO cards (card_number,expiry_month,expiry_year,customer_id,name_card) VALUES ('6466712442034637',9,2022,59,'Main Card');
-- INSERT INTO cards (card_number,expiry_month,expiry_year,customer_id,name_card) VALUES ('6441777645284107',2,2022,60,'Main Card');
