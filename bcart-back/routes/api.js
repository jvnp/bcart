var express = require("express");
var router = express.Router();

const data = require('../data.json');

// Temporary Memory Store; Not recommended in production environment due to memory leakage issue
const authDataMemoryStore = new Map()
const authTokenChecker = (token) => authDataMemoryStore.has(token)

const tokenCheckerMiddleware = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(403).json({ error: 'No credentials sent!' });
  }

  const authHead = req.headers.authorization.split(" ")
  if (!(authHead[0].toUpperCase() == "BEARER" && authTokenChecker(authHead[1]))) {
    return res.status(401).json({ error: 'Unable to authorize the user!' });
  }

  req.user = {
    token: authHead[1],
    username: authDataMemoryStore.get(authHead[1])
  }

  next()
}

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         username:
 *           type: string
 *           description: Username of the user
 *         password:
 *           type: string
 *           description: Password of the user
 *       example:
 *         username: rtripati
 *         password: rtripati@example.com_password
 *     Profile:
 *      type: object
 *      properties:
 *         username:
 *           type: string
 *           description: Username of the user
 *         password:
 *           type: string
 *           description: Password of the user
 *         email:
 *           type: string
 *           description: Email of the user
 */

/**
 * @swagger
 * /api/v1/login:
 *  post:
 *     summary: Login User
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User is logged in with token.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       500:
 *         description: Some server error
 */
router.post('/v1/login', (req, res) => {
    const { username, password } = req.body;
    console.log(req.body, "REQ BODY")
    const users = data.users.filter(x => x.username == username && x.password == password)
    if(users.length !== 0){  
      const token =  (Date.now() * Math.random()).toString()
      authDataMemoryStore.set(token, username)
      res.status(200).json({
        status: 'success',
        token
      });
    } else {
      res.status(401).json({
        status: 'error'
      })
    }
});
  
// Not a necessary API in a security standpoint
// app.get("/api/users", tokenCheckerMiddleware, () => {
//   return res.json(data.users)
// })

/**
 * @swagger
 * /api/v1/profile:
 *  get:
 *      description: Get current user profile
 *      responses:
 *          200:
 *              description: Current logged user profile
 */
router.get("/v1/profile", tokenCheckerMiddleware, (req, res) => {
    return res.json({
      status: "success",
      data: data.users.filter(x => x.username == req.user.username)[0]
    })
});
  
// Responds with all products [TODO: seprate up products that user already has and doesn't has]
/**
 * @swagger
 * /api/v1/products:
 *  get:
 *      description: Get all products
 *      responses:
 *          200:
 *              description: Products of this application.
 */
router.get("/v1/products", tokenCheckerMiddleware, (req, res) => {
    return res.json({ status: "success", data: data.products })
});
  
// responds with [MY] analytics
/**
 * @swagger
 * /api/v1/analytics:
 *  get:
 *      description: Get all charts.
 *      responses:
 *          200:
 *              description: Get charts as per user access.
 */
router.get("/v1/analytics", tokenCheckerMiddleware, (req, res) => {
    return res.json({
        status: "success", 
        data: data.analytics.filter(x => data.users.find(x => x.username === req.user.username).charts.includes(x.chartId))
      })
});

module.exports = router;