const redis = require('redis');
const client = redis.createClient()
const uuid = require('uuid')
module.exports = {
    //  create user /create-user
    async createUser(req, res) {
        try {
            const { name, email, dob, address } = req.body;

            await client.connect()
            let users = await client.get("users")
            users = users ? JSON.parse(users) : {}
            // check if user is already exists with given email
            if (Object.values(users).find((user) => email == user.email)) {
                await client.disconnect()
                throw new Error(`User ${email} already exists`);
            }
            const id = uuid.v4();
            const newUser = { name, email, dob, address, id };
            users[id] = newUser;
            await client.set("users", JSON.stringify(users));
            await client.disconnect()
            return res.status(200).json({ user: newUser, status: 'success' });

        } catch (error) {
            return res.status(400).send({
                error: error.message, status: false
            })
        }
    },
    // get user by id /get-user
    async getUser(req, res) {
        try {
            const { id } = req.body;
            await client.connect()
            let users = await client.get("users")
            users = users ? JSON.parse(users) : {}
            // check if the user not exists with given id
            if (!users[id]) throw new Error(`User with ${id} not found`)
            await client.disconnect()
            return res.status(200).json({ user: users[id], status: 'success' });
        } catch (error) {
            await client.disconnect()
            res.status(400).send({
                error: error.message, status: false
            })
        }
    },
    // get all users /get-all-user
    async getAllUser(req, res) {
        try {
            await client.connect()
            let users = await client.get("users")
            users = users ? JSON.parse(users) : {}
            await client.disconnect()
            return res.status(200).json({ users: Object.values(users), status: 'success' });
        } catch (error) {
            res.status(400).send({
                error: error.message, status: false
            })
        }
    },
    // update user by id /update-user
    async updateUser(req, res) {
        try {
            const { name, email, dob, address, id } = req.body;
            if (!id) throw new Error('Please provide an id')
            await client.connect()
            let users = await client.get("users")
            users = users ? JSON.parse(users) : {}
            // check if the user not exists with given id
            if (users && !users[id]) {
                await client.disconnect()
                throw new Error(`User ${id} not found`)
            }
            let user = users[id];
            users[id] = {
                id,
                name: name ? name : user.name,
                email: email ? email : user.email,
                dob: dob ? dob : user.dob,
                address: address ? address : user.address
            }
            await client.set("users", JSON.stringify(users));
            await client.disconnect()
            return res.status(200).json({ user: users[email], status: 'user updated successfully' });
        } catch (error) {
            res.status(400).send({
                status: false,
                error: error.message
            })
        }
    },
    // delete user by id /delete-user
    async removeUser(req, res) {
        try {
            const { id } = req.body;
            if (!id) throw new Error('Please provide an id')
            await client.connect()
            let users = await client.get("users")
            users = users ? JSON.parse(users) : {}
            // check if the user not exists with given id
            if (users && !users[id]) {
                await client.disconnect()
                throw new Error(`User ${id} not found`)
            }
            delete users[id]
            await client.set("users", JSON.stringify(users));
            await client.disconnect()
            return res.status(200).json({ status: 'user deleted successfully' });
        } catch (error) {
            res.status(400).send({
                status: false,
                error: error.message
            })
        }
    },


}
