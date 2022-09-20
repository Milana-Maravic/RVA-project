--Fakultet podaci

insert into fakultet (id, naziv, sediste)
values (nextval('fakultet_seq'), 'Fakultet tehnickih nauka', 'Novi Sad'),
       (nextval('fakultet_seq'), 'Medicinski fakultet', 'Novi Sad'),
       (nextval('fakultet_seq'), 'Prirodno matematicki fakultet', 'Novi Sad'),
       (nextval('fakultet_seq'), 'Poljoprivredni fakultet', 'Novi Sad'),
       (nextval('fakultet_seq'), 'Ekonomski fakultet', 'Subotica'),
       (nextval('fakultet_seq'), 'Farmaceutski fakultet', 'Beograd'),
       (nextval('fakultet_seq'), 'Fakultet savremenih umetnosti', 'Beograd'),
       (nextval('fakultet_seq'), 'Arhitektonski fakultet', 'Beograd'),
       (nextval('fakultet_seq'), 'Filozofski fakultet', 'Nis');

--Status podaci

insert into status (id, naziv, oznaka)
values (nextval('status_seq'), 'Budzetski student', 'B'),
       (nextval('status_seq'), 'Samofinansirajuci student', 'S');
     

--Departman podaci

insert into departman (id, naziv, oznaka, fakultet)
values (nextval('departman_seq'), 'Departman za industrijsko inzenjerstvo i menadzment', 'DIIM', 1),
       (nextval('departman_seq'), 'Departman za graficko inzenjerstvo i dizajn', 'GRID', 1),
       (nextval('departman_seq'), 'Departman za energetiku, elektroniku i telekomunikacije', 'DEET', 1),
       (nextval('departman_seq'), 'Katedra za biohemiju', 'KB', 2),
       (nextval('departman_seq'), 'Departman za matematiku i informatiku', 'DMI', 3),
       (nextval('departman_seq'), 'Departman za ratarstvo i povrtarstvo', 'DRP', 4),
       (nextval('departman_seq'), 'Departman za menadzment', 'DM', 5),
       (nextval('departman_seq'), 'Katedra za farmaceutsku hemiju', 'KFH', 6),
       (nextval('departman_seq'), 'Katedra za farmakognoziju', 'KZFG', 6),
       (nextval('departman_seq'), 'Departman produkcije umetnosti i medija', 'DPUM', 7),
       (nextval('departman_seq'), 'Departman za arhitektonske tehnologije', 'DAT', 8),      
       (nextval('departman_seq'), 'Departman za istoriju', 'DI', 9),
       (nextval('departman_seq'), 'Departman za psihologiju', 'DP', 9);
    
--Student podaci

insert into student (id, ime, prezime, broj_indeksa, status, departman)
values (nextval('student_seq'), 'Ana', 'Mikic', 'P15/2018', 1, 6),
       (nextval('student_seq'), 'Milan', 'Jovic', 'F2/2019', 1, 9),
       (nextval('student_seq'), 'Maja', 'Savic', 'M9/2019', 1, 4),
       (nextval('student_seq'), 'Sandra', 'Arsic', 'E8/2021', 1, 7),
       (nextval('student_seq'), 'Marija', 'Mitic', 'L16/2018', 1, 13),
       (nextval('student_seq'), 'Jovan', 'Stevanovic', 'PM24/2020', 1, 5),
       (nextval('student_seq'), 'Ognjen', 'Janjic', 'TN17/2021', 1, 1),
       (nextval('student_seq'), 'Jana', 'Kostic', 'A1/2019', 1, 11),
       (nextval('student_seq'), 'Marko', 'Milic', 'RP36/2021', 2, 6),
       (nextval('student_seq'), 'Uros', 'Petrovic', 'GR29/2018', 2, 2),
       (nextval('student_seq'), 'Helena', 'Radulovic', 'SU44/2019', 2, 10),
       (nextval('student_seq'), 'Andjela', 'Bobic', 'EE29/2020', 2, 3),
       (nextval('student_seq'), 'Djordje', 'Nikolic', 'FH34/2021', 2, 8),
       (nextval('student_seq'), 'Jelena', 'Jocic', 'FI67/2018', 2, 12),
       (nextval('student_seq'), 'Luka', 'Vukovic', 'A78/2020', 2, 11);
	   



