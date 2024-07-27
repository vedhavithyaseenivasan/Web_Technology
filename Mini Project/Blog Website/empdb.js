const http =require('http');
const url = require('url');
const querystring = require('querystring');
const { MongoClient } = require('mongodb');

// MongoDB connection URI
const uri = 'mongodb://localhost:27017'; // Replace 'localhost' and '27017' with your MongoDB server details
const client = new MongoClient(uri);

// Connect to MongoDB
async function connectDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}

connectDB();

async function onRequest(req, res) {
    const path = url.parse(req.url).pathname;
    const query = url.parse(req.url).query;
    const params = querystring.parse(query);
    const name = params["name"];
    const tit = params["tit"];
    const dob = params["dob"];
    const msge = params["msge"];
 

    if (req.url.includes("/insert")) {
        await insertData(req, res,name,tit,dob,msge);
    } else if (req.url.includes("/delete")) {
        await deleteData(req, res,name);
    } else if (req.url.includes("/update")) {
        await updateData(req, res,name,tit);
    } else if (req.url.includes("/display")) {
        await displayTable(req, res);
    }
}

async function insertData(req, res,name,tit,dob,msge) {
    try {
        const database = client.db('exp6'); // Replace 'yourDatabaseName' with your actual database name
        const collection = database.collection('employee');

        const employee = {
            name,
            tit,
            dob,
            msge
        };

        const result = await collection.insertOne(employee);
        console.log(`${result.insertedCount} document inserted`);

        // HTML content for displaying the message in a table
        const htmlResponse = `
            <html>
                <head>
                    <title>Blogs</title>
                    <style>
                        table {
                            font-family: Arial, sans-serif;
                            border-collapse: collapse;
                            width: 50%;
                            margin: 20px auto;
                        }
                        td, th {
                            border: 1px solid #dddddd;
                            text-align: left;
                            padding: 8px;
                        }
                        th {
                            background-color: #f2f2f2;
                        }
                    </style>
                </head>
                <body>
                    <h2>Blog Details</h2>
                    <table>
                        <tr>
                            <th>Field</th>
                            <th>Value</th>
                        </tr>
                        <tr>
                            <td>Author Name</td>
                            <td>${name}</td>
                        </tr>
                        <tr>
                            <td>Blog Title</td>
                            <td>${tit}</td>
                        </tr>
                        <tr>
                            <td>Date</td>
                            <td>${dob}</td>
                        </tr>
                        <tr>
                            <td>Blog Content</td>
                            <td>${msge}</td>
                        </tr>
                    </table>
                    <a href="/display">View Inserted Table</a>
                </body>
            </html>
        `;

        // Write the HTML response
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(htmlResponse);
        res.end();
    } catch (error) {
        console.error('Error inserting data:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    }
}

async function deleteData(req, res,name) {
    try {
        const database = client.db('exp6'); // Replace 'yourDatabaseName' with your actual database name
        const collection = database.collection('employee');

        // Construct the filter based on the employee ID
        const filter = {name:name};

        const result = await collection.deleteOne(filter);
        console.log(`${result.deletedCount} document deleted`);

        // Respond with appropriate message
        if (result.deletedCount === 1) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Document deleted successfully');
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Document not found');
        }
    } catch (error) {
        console.error('Error deleting data:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    }
}

async function updateData(req, res,name,newtit) {
    try {
        const database = client.db('exp6'); // Replace 'yourDatabaseName' with your actual database name
        const collection = database.collection('employee');

        // Construct the filter based on the employee ID
        const filter = { name:name};

        // Construct the update operation to set the new phoneno
        const updateDoc = {
            $set: { tit: newtit } // Assuming 'mobileNo' is the field to update
        };

        const result = await collection.updateOne(filter, updateDoc);
        console.log(`${result.modifiedCount} document updated`);

        // Respond with appropriate message
        if (result.modifiedCount === 1) {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Title updated successfully');
        } else {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Title not found');
        }
    } catch (error) {
        console.error('Error updating data:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    }
}

async function displayTable(req, res) {
    try {
        const database = client.db('exp6'); // Replace 'yourDatabaseName' with your actual database name
        const collection = database.collection('employee');

        const cursor = collection.find({});
        const employees = await cursor.toArray();

        // Generate HTML table dynamically based on retrieved documents
        let tableHtml = `
            <html>
                <head>
                    <title>Blog Details</title>
                    <style>
                        table {
                            font-family: Arial, sans-serif;
                            border-collapse: collapse;
                            width: 100%;
                        }
                        th, td {
                            border: 1px solid #dddddd;
                            text-align: left;
                            padding: 8px;
                        }
                        th {
                            background-color: #f2f2f2;
                        }
                    </style>
                </head>
                <body>
                    <h2>Blog Details</h2>
                    <table>
                        <tr>
                            <th>Author Name</th>
                            <th>Blog Title</th>
                            <th>Date</th>
                            <th>Blog Content</th>
                        </tr>
        `;
        employees.forEach(employee => {
            tableHtml += `
                <tr>
                    <td>${employee.name}</td>
                    <td>${employee.tit}</td>
                    <td>${employee.dob}</td>
                    <td>${employee.msge}</td>
                </tr>
            `;
        });
        tableHtml += `
                    </table>
                </body>
            </html>
        `;

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(tableHtml);
        res.end();
    } catch (error) {
        console.error('Error displaying table:', error);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Internal Server Error');
    }
}

// Create HTTP server
http.createServer(onRequest).listen(7050);
console.log('Server is running...');
