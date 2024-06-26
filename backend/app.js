/**
 * @author Emre Deniz
 * @date April, 2024
 */

// HTTP API Server definitions
const express = require('express');
const app = express();
const port = 3000;
app.use(express.json());

// define initial users
var users = [
  { id: 1, name: 'Peter John Doe', email: 'peter@test.com', role: 'Admin', phone: '4376665544', age: 21 },
  { id: 2, name: 'Jane Smith', email: 'jane@test.com', role: 'User', phone: '4372223388', age: 22 },
  { id: 3, name: 'Philip Sharp', email: 'philip@test.com', role: 'Viewer', phone: '4375552299', age: 25 }
];

// GET
app.get('/users', function(req, res) {
  // Log messages
  console.log('> GET users');

  // Return response
  res.send(users);
})

// POST
app.post('/users', function(req, res) {
  // Log messages
  console.log('> POST a new user');

  // Parse user json from the request and push to stored users
  var user = req.body;
  let newUserId = 1;
  if(users.length > 0){
    newUserId = users[users.length-1].id + 1;
  }
  user.id = newUserId;
  users.push(user);

  // Return response
  res.status(201).json({ id: newUserId });
});

// PUT
app.put('/users/:id', function(req, res) {
  // Log messages
  console.log('> PUT update a user');

  // Parse user json from the request and update user
  var id = req.params.id;
  var user = req.body;
  for(var i=0; i<users.length; i++){
    if(users[i].id == id){
      users[i] = user;
    }
  }

  // Return response
  res.status(200).send('PUT SUCCESSFUL');
});

// DELETE
app.delete('/users/:id', function(req, res) {
  // Log messages
  console.log('> DELETE a user');

  // Delete the user
  var id = req.params.id;
  for(var i=0; i<users.length; i++){
    if(users[i].id == id){
      users.splice(i, 1)
    }
  }

  // Return response
  res.status(204).send({ id: id });
});

// Server is listenning
app.listen(port, () => {
  console.log('Server is listening at http://127.0.0.1:' + port);
})
