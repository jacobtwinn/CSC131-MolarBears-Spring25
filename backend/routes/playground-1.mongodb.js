/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('mongodbVSCodePlaygroundDB');

// Insert a few documents into the sales collection.
db.getCollection('Employees').insertMany([
  { 'name': 'Samantha Ellis', 'position': 'Orthodontist', 'salary': 250000 },
  { 'name': 'Marcus Patel', 'position': 'Dental Assistant', 'salary': 103000 },
  { 'name': 'Jenna Lin', 'position': 'Denist (Surgeon)', 'salary': 320000 },
  { 'name': 'Robert Kim', 'position': 'Dentist (Hygiene)', 'salary': 150000 },
  { 'name': 'Natalie Ruiz', 'position': 'Dental Assistant', 'salary': 99000 },
  { 'name': 'David Cohen', 'position': 'Dental Assistant Intern', 'salary': 29000 },
  { 'name': 'Emily Brooks', 'position': 'Orthodontist', 'salary': 260000 },
  { 'name': 'Jason Nguyen', 'position': 'Anesthesiologist', 'salary': 450000 },
  { 'name': ' Isabella Monroe', 'position': 'Dental Assistant Intern', 'salary': 29500 },
  { 'name': 'Kevin Zhang', 'position': 'Orthodontist', 'salary': 255000 },
  { 'name': 'Alisha Thompson', 'position': 'Anesthesiologist', 'salary': 445000 },
  { 'name': 'Michael Grant', 'position': 'Dentist (Hygiene)', 'salary': 155000 },
  { 'name': 'Chloe Rivera', 'position': 'Denist (Surgeon)', 'salary': 335000 },
  { 'name': 'Ethan Wallace', 'position': 'Dentist (Hygiene)', 'salary': 152500 },
  { 'name': 'Priya Desai', 'position': 'Orthodontist', 'salary': 257500 },
  { 'name': 'Bob Martin', 'position': 'Dental Assistant', 'salary': 97000 },
]);
