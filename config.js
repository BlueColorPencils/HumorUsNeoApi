var config = {}
var env = process.env.NODE_ENV || "development"
if (env === "development") {
  config.neo4j = {url: 'bolt://localhost', username: 'neo4j', password: 'MEOW'}
  require('dotenv').config()
} else if (env === "production") {
  config.neo4j = {url: process.env.NEO4J_URL, username: process.env.NEO4J_USER, password: process.env.NEO4J_PWD}
}

module.exports = config
