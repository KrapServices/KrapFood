const db = require("../database");
var express = require("express");
var router = express.Router();
console.table(db);

/* GET all users */
router.get("/users", () => db.getUsers);

/* GET user by id*/
router.get("/users/:id", () => db.getUserById);
/* POST create user*/
router.post("/users", () => db.createUser);
/* PUT update user*/
router.put("/users/:id", () => db.updateUser);
/* DELETE delete user */
router.delete("/users/:id", () => db.deleteUser);

module.exports = router;
