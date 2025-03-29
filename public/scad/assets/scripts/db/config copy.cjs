const config = {
    connectionSQL: "Data Source=localhost;Initial Catalog=db_controlMov;Persist Security Info=True;User ID=manuel1;Password=123456789;TrustServerCertificate=True;",
    sqlConfig: {
        user: "",
        user: "sa",
        password: "encuentro@2023",
        database: "db_controlMov",
        server: 'localhost',
        pool: {
          max: 3000,
          min: 2000,
          idleTimeoutMillis: 30000
        },
        options: {
          encrypt: true,
          trustServerCertificate: true 
        }
      }
}

module.exports = config;