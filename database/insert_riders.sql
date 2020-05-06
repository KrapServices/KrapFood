BEGIN;
INSERT INTO users (user_id,email,password,created_at) VALUES (51,'malesuada@Aeneangravidanunc.org','password','2020-03-15 12:00:00');
INSERT INTO users (user_id,email,password,created_at) VALUES (52,'Vivamus@habitantmorbitristique.com','password','2020-03-15 12:00:00');
INSERT INTO users (user_id,email,password,created_at) VALUES (53,'mauris.sapien@lorem.org','password','2020-03-15 12:00:00');
INSERT INTO users (user_id,email,password,created_at) VALUES (54,'Maecenas.ornare.egestas@id.org','password','2020-03-15 12:00:00');
INSERT INTO users (user_id,email,password,created_at) VALUES (55,'quam@vehicula.com','password','2020-03-15 12:00:00');
INSERT INTO users (user_id,email,password,created_at) VALUES (56,'et.pede.Nunc@leo.ca','password','2020-03-15 12:00:00');
INSERT INTO users (user_id,email,password,created_at) VALUES (57,'iaculis@iaculisaliquetdiam.ca','password','2020-03-15 12:00:00');
INSERT INTO users (user_id,email,password,created_at) VALUES (58,'rhoncus.id@interdum.net','password','2020-03-15 12:00:00');
INSERT INTO users (user_id,email,password,created_at) VALUES (59,'vulputate.risus.a@vel.ca','password','2020-03-15 12:00:00');
INSERT INTO users (user_id,email,password,created_at) VALUES (60,'gravida.non@neccursusa.org','password','2020-03-15 12:00:00');
INSERT INTO users (user_id,email,password,created_at) VALUES (61,'felis.Donec@nisl.com','password','2020-03-15 12:00:00');
INSERT INTO users (user_id,email,password,created_at) VALUES (62,'elit.Curabitur@semmollis.edu','password','2020-03-15 12:00:00');
INSERT INTO users (user_id,email,password,created_at) VALUES (63,'molestie.tellus@velitjustonec.ca','password','2020-03-15 12:00:00');
INSERT INTO users (user_id,email,password,created_at) VALUES (64,'aliquet@ullamcorper.edu','password','2020-03-15 12:00:00');
INSERT INTO users (user_id,email,password,created_at) VALUES (65,'Suspendisse.aliquet.molestie@egetmassaSuspendisse.com','password','2020-03-15 12:00:00');
INSERT INTO users (user_id,email,password,created_at) VALUES (66,'eu.tellus.Phasellus@velsapienimperdiet.edu','password','2020-03-15 12:00:00');
INSERT INTO users (user_id,email,password,created_at) VALUES (67,'feugiat.placerat.velit@tristique.ca','password','2020-03-15 12:00:00');
INSERT INTO users (user_id,email,password,created_at) VALUES (68,'magna@Maurismolestie.ca','password','2020-03-15 12:00:00');
INSERT INTO users (user_id,email,password,created_at) VALUES (69,'primis.in@erat.co.uk','password','2020-03-15 12:00:00');
INSERT INTO users (user_id,email,password,created_at) VALUES (70,'pede.Suspendisse@Nunc.org','password','2020-03-15 12:00:00');
INSERT INTO users (user_id,email,password,created_at) VALUES (71,'et.ipsum@etmagna.org','password','2020-03-15 12:00:00');
INSERT INTO users (user_id,email,password,created_at) VALUES (72,'Duis.dignissim@utmolestiein.ca','password','2020-03-15 12:00:00');
INSERT INTO users (user_id,email,password,created_at) VALUES (73,'venenatis.vel@Inatpede.net','password','2020-03-15 12:00:00');
INSERT INTO users (user_id,email,password,created_at) VALUES (74,'ipsum.primis.in@non.org','password','2020-03-15 12:00:00');
INSERT INTO users (user_id,email,password,created_at) VALUES (75,'elit.a.feugiat@elit.org','password','2020-03-15 12:00:00');

INSERT INTO riders (rider_id) VALUES (51);
INSERT INTO riders (rider_id) VALUES (52);
INSERT INTO riders (rider_id) VALUES (53);
INSERT INTO riders (rider_id) VALUES (54);
INSERT INTO riders (rider_id) VALUES (55);
INSERT INTO riders (rider_id) VALUES (56);
INSERT INTO riders (rider_id) VALUES (57);
INSERT INTO riders (rider_id) VALUES (58);
INSERT INTO riders (rider_id) VALUES (59);
INSERT INTO riders (rider_id) VALUES (60);
INSERT INTO riders (rider_id) VALUES (61);
INSERT INTO riders (rider_id) VALUES (62);
INSERT INTO riders (rider_id) VALUES (63);
INSERT INTO riders (rider_id) VALUES (64);
INSERT INTO riders (rider_id) VALUES (65);
INSERT INTO riders (rider_id) VALUES (66);
INSERT INTO riders (rider_id) VALUES (67);
INSERT INTO riders (rider_id) VALUES (68);
INSERT INTO riders (rider_id) VALUES (69);
INSERT INTO riders (rider_id) VALUES (70);
INSERT INTO riders (rider_id) VALUES (71);
INSERT INTO riders (rider_id) VALUES (72);
INSERT INTO riders (rider_id) VALUES (73);
INSERT INTO riders (rider_id) VALUES (74);
INSERT INTO riders (rider_id) VALUES (75);

INSERT INTO full_time_riders (rider_id) VALUES (51);
INSERT INTO full_time_riders (rider_id) VALUES (52);
INSERT INTO full_time_riders (rider_id) VALUES (53);
INSERT INTO full_time_riders (rider_id) VALUES (54);
INSERT INTO full_time_riders (rider_id) VALUES (55);
INSERT INTO full_time_riders (rider_id) VALUES (56);
INSERT INTO full_time_riders (rider_id) VALUES (57);
INSERT INTO full_time_riders (rider_id) VALUES (58);
INSERT INTO full_time_riders (rider_id) VALUES (59);
INSERT INTO full_time_riders (rider_id) VALUES (60);
INSERT INTO full_time_riders (rider_id) VALUES (61);
INSERT INTO full_time_riders (rider_id) VALUES (62);
INSERT INTO full_time_riders (rider_id) VALUES (63);

INSERT INTO part_time_riders (rider_id) VALUES (64);
INSERT INTO part_time_riders (rider_id) VALUES (65);
INSERT INTO part_time_riders (rider_id) VALUES (66);
INSERT INTO part_time_riders (rider_id) VALUES (67);
INSERT INTO part_time_riders (rider_id) VALUES (68);
INSERT INTO part_time_riders (rider_id) VALUES (69);
INSERT INTO part_time_riders (rider_id) VALUES (70);
INSERT INTO part_time_riders (rider_id) VALUES (71);
INSERT INTO part_time_riders (rider_id) VALUES (72);
INSERT INTO part_time_riders (rider_id) VALUES (73);
INSERT INTO part_time_riders (rider_id) VALUES (74);
INSERT INTO part_time_riders (rider_id) VALUES (75);

COMMIT;

BEGIN;

INSERT INTO ft_rider_works (rider_id, mws_id) VALUES (51, 1);
INSERT INTO ft_rider_works (rider_id, mws_id) VALUES (51, 2);

INSERT INTO ft_rider_works (rider_id, mws_id) VALUES (52, 3);
INSERT INTO ft_rider_works (rider_id, mws_id) VALUES (52, 4);

INSERT INTO ft_rider_works (rider_id, mws_id) VALUES (53, 5);
INSERT INTO ft_rider_works (rider_id, mws_id) VALUES (53, 6);

INSERT INTO ft_rider_works (rider_id, mws_id) VALUES (54, 7);
INSERT INTO ft_rider_works (rider_id, mws_id) VALUES (54, 8);

INSERT INTO ft_rider_works (rider_id, mws_id) VALUES (55, 9);
INSERT INTO ft_rider_works (rider_id, mws_id) VALUES (55, 10);

INSERT INTO ft_rider_works (rider_id, mws_id) VALUES (56, 11);
INSERT INTO ft_rider_works (rider_id, mws_id) VALUES (56, 12);

INSERT INTO ft_rider_works (rider_id, mws_id) VALUES (57, 13);
INSERT INTO ft_rider_works (rider_id, mws_id) VALUES (57, 14);

INSERT INTO ft_rider_works (rider_id, mws_id) VALUES (58, 15);
INSERT INTO ft_rider_works (rider_id, mws_id) VALUES (58, 16);

INSERT INTO ft_rider_works (rider_id, mws_id) VALUES (59, 1);
INSERT INTO ft_rider_works (rider_id, mws_id) VALUES (59, 2);

INSERT INTO ft_rider_works (rider_id, mws_id) VALUES (60, 3);
INSERT INTO ft_rider_works (rider_id, mws_id) VALUES (60, 4);

INSERT INTO ft_rider_works (rider_id, mws_id) VALUES (61, 5);
INSERT INTO ft_rider_works (rider_id, mws_id) VALUES (61, 6);

INSERT INTO ft_rider_works (rider_id, mws_id) VALUES (62, 7);
INSERT INTO ft_rider_works (rider_id, mws_id) VALUES (62, 8);

INSERT INTO ft_rider_works (rider_id, mws_id) VALUES (63, 9);
INSERT INTO ft_rider_works (rider_id, mws_id) VALUES (63, 10);


INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (64, 1);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (64, 3);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (64, 5);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (64, 7);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (64, 9);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (64, 11);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (64, 13);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (64, 15);

INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (66, 1);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (66, 3);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (66, 5);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (66, 7);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (66, 9);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (66, 11);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (66, 13);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (66, 15);

INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (68, 1);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (68, 3);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (68, 5);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (68, 7);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (68, 9);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (68, 11);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (68, 13);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (68, 15);

INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (70, 1);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (70, 3);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (70, 5);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (70, 7);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (70, 9);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (70, 11);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (70, 13);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (70, 15);

INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (72, 1);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (72, 3);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (72, 5);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (72, 7);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (72, 9);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (72, 11);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (72, 13);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (72, 15);

INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (74, 1);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (74, 3);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (74, 5);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (74, 7);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (74, 9);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (74, 11);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (74, 13);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (74, 15);

INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (65, 2);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (65, 4);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (65, 6);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (65, 8);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (65, 10);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (65, 12);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (65, 14);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (65, 16);

INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (67, 2);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (67, 4);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (67, 6);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (67, 8);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (67, 10);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (67, 12);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (67, 14);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (67, 16);

INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (69, 2);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (69, 4);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (69, 6);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (69, 8);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (69, 10);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (69, 12);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (69, 14);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (69, 16);

INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (71, 2);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (71, 4);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (71, 6);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (71, 8);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (71, 10);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (71, 12);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (71, 14);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (71, 16);

INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (73, 2);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (73, 4);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (73, 6);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (73, 8);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (73, 10);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (73, 12);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (73, 14);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (73, 16);

INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (75, 2);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (75, 4);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (75, 6);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (75, 8);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (75, 10);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (75, 12);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (75, 14);
INSERT INTO pt_rider_works (rider_id, wws_id) VALUES (75, 16);
COMMIT;
