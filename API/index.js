const db = require('quick.db');
const posts = new db.table('posts');

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');

const app = (module.exports = express());
const server = require('http').Server(app);
const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.enable('verbose errors');

if (app.settings.env === 'production') app.disable('verbose errors');

app.use(morgan('dev'));
app.use(express.json())

function makeid(length) {
	let result = '';
	const characters =
		'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

function listEntries(selector, type) {
	let entries = [];
	selector.forEach(post => {
		// let data = JSON.parse(post.data.replace(/'/gm, ''));
		if (type == 'id') entries.push(`${post.ID}`);
	});
	return entries;
}
function getDataByID(id) {
	let entry = posts.all().findIndex(post => post.ID == id);
	let data = JSON.parse(posts.all()[entry].data.replace(/'/gm, ''));
	return data;
}
function CatchERR(res, req, type, Recognizer) {
    if(type = 0) {
        res.status(400).send({
            error: `No data given at: ${Recognizer}`
        })
    }
}
function serverHost() {
    // URI aproach
	app.post('/C/:cmd/:id/:type/:data', urlencodedParser, async (req, res) => {
		const newid = makeid(6);

		//   db.push("post_ids", `\"${id}\"`);
        let id;
        if (req.params.id.toString() == "NEWID") id = newid; else id = req.params.id;

        if (req.params.cmd.toString().length == 0) return CatchERR(res, req, 0, "/C/:cmd/*/*/*");
		if (req.params.type.toString().length == 0) return CatchERR(res, req, 0, "/C/*/*/:type/*");


        if (req.params.cmd.toString() == "set") {
            if (req.params.data.toString().length == 0) return CatchERR(res, req, 0, "/C/*/*/*/:data");

		    posts.set(`${id}.${req.params.type}`, req.params.data.toString());
            res.send({
                text: `Written data successfully at: ${id}`,
                requestData: {
                    id: id,
                    type: req.params.type.toString(),
                    data: req.params.data.toString()
                } 
            })
        }
        console.log('Got body:', { id: id, post: await posts.get(id) });
    });
	app.post('/C/:cmd/:id/:type', urlencodedParser, async (req, res) => {
		const newid = makeid(6);

		//   db.push("post_ids", `\"${id}\"`);
        let id;
        if (req.params.id.toString() == "NEWID") id = newid; else id = req.params.id;

        if (req.params.cmd.toString().length == 0) return CatchERR(res, req, 0, "/C/:cmd/*/*/*");
		if (req.params.type.toString().length == 0) return CatchERR(res, req, 0, "/C/*/*/:type/*");

        if (req.params.cmd.toString() == "delete") {
		    posts.delete(`${id}.${req.params.type}`);
            res.send({
                text: `Written data successfully at: ${id}`,
                requestData: {
                    id: id,
                    type: req.params.type.toString()
                } 
            })
        }
        if (req.params.cmd.toString() == "get") {
            res.send({
                text: `Written data successfully at: ${id}`,
                requestData: {
                    id: id,
                    response: posts.get(`${id}.${req.params.type}`)
                } 
            })
        }



		console.log('Got body:', { id: id, post: await posts.get(id) });
	});

    // Request body aproach

	app.post('/C/', urlencodedParser, async (req, res) => {
        // res.send({})
        // return;
		const newid = makeid(6);

		//   db.push("post_ids", `\"${id}\"`);

        let id;
        if (req.body.id == "NEWID") id = newid; else id = req.body.id;

		// if (req.body.type.length == 0) return CatchERR(res, req, 0, "/C/*/*/:type/*");
        // if (req.body.cmd.length == 0) return CatchERR(res, req, 0, "/C/:cmd/*/*/*");

        if (req.body.cmd == "set") {
            // if (req.body.data.length == 0) return CatchERR(res, req, 0, "/C/*/*/*/:data");
            // posts.set(id, req.body.id)
		    posts.set(`${id}.${req.body.type}`, req.body.data);
            res.send({
                text: `Written data successfully at: ${id}`,
                requestData: {
                    id: id,
                    type: req.body.type,
                    data: req.body.data
                } 
            })
        }

        if (req.body.cmd == "delete") {
		    posts.delete(`${id}.${req.body.type}`);
            res.send({
                text: `Written data successfully at: ${id}`,
                requestData: {
                    id: id,
                    type: req.body.type
                } 
            })
        }
        if (req.body.cmd == "get") {
            res.send({
                text: `Written data successfully at: ${id}`,
                requestData: {
                    id: id,
                    response: posts.get(`${id}.${req.body.type}`)
                } 
            })
        }



		// console.log('Got body:', { id: id, post: await posts.get(id) });
	});

    // The rest of the API
	console.log(listEntries(posts.all(), 'id'));
	
	app.get('/result/:id', async (req, res) => {
		const id = req.params.id;
		res.send({ id: id, post: posts.get(id) });
	});

	app.get('/tables', async (req, res) => {
		res.send({ ids: listEntries(posts.all(), 'id') });
	});

	app.get('*', async (req, res) => {
		res.status('404').send({text: 'No data on this URI.'});
	});

	var ipaddress = '0.0.0.0';
	var serverport = 3000;
	return server.listen(serverport, ipaddress, async function() {
		await console.log('[DEBUG] Listening on ' + ipaddress + ':' + serverport);
	});
}
module.exports = serverHost();
