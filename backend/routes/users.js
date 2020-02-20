const db = require("../database");
var express = require("express");
var router = express.Router();

/* GET all users */
router.get("/", db.getUsers);

/* GET user by id*/
router.get("/:id", db.getUserById);
/* POST create user*/
router.post("/", db.createUser);
/* PUT update user*/
router.put("/:id", db.updateUser);
/* DELETE delete user */
router.delete("/:id", db.deleteUser);

module.exports = router;
