const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mysql = require('mysql');

const PORT = process.env.PORT;
const db = mysql.createConnection({
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_NAME,
});

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
	res.send('Welcome to task manager backend');
});

app.get('/get', (req, res) => {
	db.query('SELECT * FROM tasks', (error, results) => {
		if (error) {
			res.status(400).json('Error executing query: ');
		}

		res.status(200).json({ success: true, results });
	});
});

app.post('/post', (req, res) => {
	const { title, description } = req.body;
	db.query(
		'INSERT INTO tasks (title,description,completed) values (\'' +
			title +
			'\',\'' +
			description +
			'\',false)',
		(error, results) => {
			if (error) {
				res.status(400).json(error);
			}
			console.log(title, description);
			res.status(200).json({ success: true, results });
		}
	);
});
app.put('/update/:id', (req, res) => {
	db.query(
		`UPDATE tasks SET completed = true WHERE id = ${req.params.id}`,
		(error, results) => {
			if (error) {
				res.status(400).json('Error executing query: ');
			}

			res.status(200).json({ success: true, results });
		}
	);
});
app.delete('/delete/:id', (req, res) => {
	db.query(
		`DELETE FROM tasks WHERE id = ${req.params.id}`,
		(error, results) => {
			if (error) {
				res.status(400).json('Error executing query: ');
			}

			res.status(200).json({ success: true, results });
		}
	);
});

app.listen(PORT, (req, res) => {
	console.log('listening on port ' + PORT);
});
