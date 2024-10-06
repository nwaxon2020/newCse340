SELECT * FROM account;
INSERT INTO students (account_firstname, account_lastname, account_email, account_password)
VALUES ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');

UPDATE account
SET account_type = 'Admin'
WHERE account_id = 1;

DELETE FROM account
WHERE account_id = 1;

SELECT * FROM inventory;
UPDATE inventory
SET inv_description = REPLACE(inv_description, 'Do you have 6 kids and like to go offroading? The Hummer gives you the small interiors with an engine to get you out of any muddy or rocky situation.', 'Do you have 6 kids and like to go offroading? The Hummer gives you a huge interior with an engine to get you out of any muddy or rocky situation.')
WHERE inv_id = 10;
SELECT * FROM inventory;

SELECT inv_make, inv_model, classification_name
FROM inventory
INNER JOIN public.classification ON inventory.classification_id = public.classification.classification_id
WHERE classification_name = 'Sport';

SELECT * FROM inventory;
UPDATE inventory
SET inv_image = REPLACE(inv_image, '/images/', '/images/vehicles/'),
    inv_thumbnail = REPLACE(inv_thumbnail, '/images/', '/images/vehicles/');