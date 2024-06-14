var http = require('http');
var url = require('url');
var querystring = require('querystring');

function onRequest(req, res) {
  var path = url.parse(req.url).pathname;
  console.log('Request for ' + path + ' received');
 
  var query = url.parse(req.url).query;
  console.log(query);
  var params = querystring.parse(query);
  var username = params["username"];
  var id = params["id"];
  var branch = params["branch"];
  var mobileNo = params["phno"];
  var gender = params["gender"];
  var branchadd = params["branchadd"];
  var htmlResponse = `
    <html>
    <head>
    <title>User Details</title>
    <style>
      table {
        font-family: Arial, sans-serif;
        border-collapse: collapse;
        width: 50%;
        margin: 20px auto;
        border: 2px solid #ddd; /* Add border to the table */
      }
      th, td {
        border: 1px solid #ddd;
        padding: 8px;
      }
      th {
        background-color: lightgrey;
      }
      tr:nth-child(even) {
        background-color: #f2f2f2; /* Alternate row background color */
      }
      tr:hover {
        background-color: #ddd; /* Hover effect for rows */
      }
    </style>
    </head>
    <body>
<br><br><br>
    <h2><center>Form Details</h2></center>
    <table>
      <tr>
        <th>Field</th>
        <th>Value</th>
      </tr>
      <tr>
        <td>Username</td>
        <td>${username}</td>
      </tr>
      <tr>
        <td>ID</td>
        <td>${id}</td>
      </tr>
      <tr>
        <td>Branch</td>
        <td>${branch}</td>
      </tr>
      <tr>
        <td>Mobile No</td>
        <td>${mobileNo}</td>
      </tr>
      <tr>
        <td>Gender</td>
        <td>${gender}</td>
      </tr>
      <tr>
        <td>Branch Address</td>
        <td>${branchadd}</td>
      </tr>
    </table>
    </body>
    </html>
  `;
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(htmlResponse);
  res.end();
}

http.createServer(onRequest).listen(8030);
console.log('Server is running...');

