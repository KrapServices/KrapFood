const { query, transact } = require('../../database');

// =============================================================================
// MANAGERS
// =============================================================================

// create single user for manager
const managerCreate = async (request, response) => {
    try {
      const { email, password } = request.body;
      const result = await transact(async (query) => {
        const user = (await query(
          "INSERT INTO users (email , password) VALUES ($1,$2) RETURNING user_id",
          [email, password]
        )).rows[0];
        (await query(
          "INSERT INTO managers (manager_id) VALUES ($1) RETURNING manager_id",
          [user["user_id"]]
        ));
        return user;
      });
      response.status(201).send(`user created`);
    } catch (error) {
      console.log(error);
      return response.status(500).send("error occured");
    }
  };
  
  const managerLogin = async (request, response) => {
    try {
      const { email, password } = request.body;
    
        let user = (await query(
          "SELECT manager_id FROM managers where exists( select 1 from users u where email = $1 and password = $2 and manager_id = u.user_id)",
          [email, password]
        )).rows[0];
        //append info to user object
        user["type"] = "manager";
        //user = { ...user, ...manager };
        console.log(user);
      return response.status(200).json({ user: user });
    } catch (error) {
      console.log(error);
      return response.status(500).send("user cannot be found");
    }
  };
  
module.exports = {
    managerLogin,
    managerCreate,
}