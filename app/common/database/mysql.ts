import * as mysql from "mysql";

const env = process.env
const { host, port, user, password, database } = env
const mysqlConfig :mysql.PoolConfig = {
    host,
    user,
    password,
    database,
    port: Number(port)
}

const pool = mysql.createPool(mysqlConfig)

const query = (sql: string) => {
    return new Promise<any>((resolve, reject) => {
      pool.getConnection((error, connection) => {
        if (error) {
          reject(error)
        } else {
          connection.query(sql, (error, results) => {
            if (error) {
              reject(error)
            } else {
              resolve(results)
            }
            connection.release()
          })
        }
      })
    })
  }

export const mysqlConnect = query