export const config = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "admin1234",
    DB: "test_db",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

export const dialect = "mysql";
