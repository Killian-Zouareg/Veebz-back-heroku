import express from 'express';
import { env } from 'node:process';
import neo4j from 'neo4j-driver';

const app = express();


const url = env.NEO4J__VEEBZ__DATABASE__URL
const password = env.NEO4J__VEEBZ__DATABSE__PASSWORD

const driver: typeof neo4j.Driver = neo4j.driver("neo4j+s://4cd66985.databases.neo4j.io:7687"!, neo4j.auth.basic("neo4j", "GatO5qBwEaoNzOB19g3b5G78wPJDMEm20_jfrvnltjM"))


app.get('/database', async(req: any, res: { send: (arg0: {}[]) => void; }) => {

    const session: typeof neo4j.Session = driver.session()
    

        try{
            const writeQuery = `MATCH (n)
                                RETURN n`

            let all = [{}]
            const writeResult = await session.writeTransaction((tx: { run: (arg0: string) => any; })  => tx.run(writeQuery))
            writeResult.records.forEach((record: { get: (arg0: string) => any; }) => {
                all.push(record.get('n'))
                console.log(all);
            })
            res.send(all)
        } catch(error){
            console.error('Something went wrong:',error)
        } finally{
            await session.close()
        }
})

app.get('/user/:id', async(req: { params: { id: any; }; }, res: { send: (arg0: {}[]) => void; }) => {

    const session: typeof neo4j.Session = driver.session()


    try{
        const writeQuery = `MATCH (n { idSpotify: '${req.params.id}' })
                            RETURN n`

        let all = [{}]
        const writeResult = await session.writeTransaction((tx: { run: (arg0: string) => any; })  => tx.run(writeQuery))
        writeResult.records.forEach((record: { get: (arg0: string) => any; }) => {
            all.push(record.get('n')["properties"])
            console.log(all);
        })
        res.send(all)
    } catch(error){
        console.error('Something went wrong:',error)
    } finally{
        await session.close()
    }
})

app.get('/user/followsLength/:id', async(req: { params: { id: any; }; },res: { send: (arg0: {}[]) => void; }) => {

    const session: typeof neo4j.Session = driver.session()

    try {
        const writeQuery = `MATCH (:USER { idSpotify: '${req.params.id}' }) -[:FOLLOWS]->(followers)
                            RETURN count(followers) as count`
        let all = [{}]
        const writeResult = await session.writeTransaction((tx: { run: (arg0: string) => any;}) => tx.run(writeQuery))
        writeResult.records.forEach((record: { get: (arg0: string) => any;}) => {
            all.push(record.get('count'))
            console.log(all);
        })
        res.send(all)
    } catch (error) {
        console.error('Something went wrong:',error)
    } finally{
        await session.close()
    }
})

app.get('/user/follows/:id', async(req: { params: { id: any; }; },res: { send: (arg0: {}[]) => void; }) => {

    const session: typeof neo4j.Session = driver.session()

    try {
        const writeQuery = `MATCH (:USER { idSpotify: '${req.params.id}' }) -[:FOLLOWS]->(followers)
                            RETURN followers`
        let all = [{}]
        const writeResult = await session.writeTransaction((tx: { run: (arg0: string) => any;}) => tx.run(writeQuery))
        writeResult.records.forEach((record: { get: (arg0: string) => any;}) => {
            all.push(record.get('followers'))
            console.log(all);
        })
        res.send(all)
    } catch (error) {
        console.error('Something went wrong:',error)
    } finally{
        await session.close()
    }
})

app.get('/user/followed/:id', async(req: { params: { id: any; }; },res: { send: (arg0: {}[]) => void; }) => {

    const session: typeof neo4j.Session = driver.session()

    try {
        const writeQuery = `MATCH (:USER { idSpotify: '${req.params.id}' }) <-[:FOLLOWS]-(followers)
                            RETURN followers`
        let all = [{}]
        const writeResult = await session.writeTransaction((tx: { run: (arg0: string) => any;}) => tx.run(writeQuery))
        writeResult.records.forEach((record: { get: (arg0: string) => any;}) => {
            all.push(record.get('followers'))
            console.log(all);
        })
        res.send(all)
    } catch (error) {
        console.error('Something went wrong:',error)
    } finally{
        await session.close()
    }
})

app.get('/user/posts/:id', async(req: { params: { id: any; }; },res: { send: (arg0: {}[]) => void; }) => {

    const session: typeof neo4j.Session = driver.session()

    try {
        const writeQuery = `MATCH (:USER { idSpotify: '${req.params.id}' }) -[:POSTED]->(posts)
                            RETURN posts`
        let all = [{}]
        const writeResult = await session.writeTransaction((tx: { run: (arg0: string) => any;}) => tx.run(writeQuery))
        writeResult.records.forEach((record: { get: (arg0: string) => any;}) => {
            all.push(record.get('posts'))
            console.log(all);
        })
        res.send(all)
    } catch (error) {
        console.error('Something went wrong:',error)
    } finally{
        await session.close()
    }
})

app.get('/user/followedLength/:id', async(req: { params: { id: any; }; },res: { send: (arg0: {}[]) => void; }) => {

    const session: typeof neo4j.Session = driver.session()

    try {
        const writeQuery = `MATCH (:USER { idSpotify: '${req.params.id}' }) <-[:FOLLOWS]-(subscribers)
                            RETURN count(subscribers) as count`
        let all = [{}]
        const writeResult = await session.writeTransaction((tx: { run: (arg0: string) => any;}) => tx.run(writeQuery))
        writeResult.records.forEach((record: { get: (arg0: string) => any;}) => {
            all.push(record.get('count'))
            console.log(all);
        })
        res.send(all)
    } catch (error) {
        console.error('Something went wrong:',error)
    } finally{
        await session.close()
    }
})

app.get('/users', async(req: any, res: { send: (arg0: {}[]) => void; }) => {

    const session: typeof neo4j.Session = driver.session()


    try{
        const writeQuery = `MATCH (n:USER)
                            RETURN n`


        let all = [{}]
        const writeResult = await session.writeTransaction((tx: { run: (arg0: string) => any; })  => tx.run(writeQuery))
        writeResult.records.forEach((record: { get: (arg0: string) => any; }) => {
            all.push(record.get('n'))
            console.log(all);
        })
        res.send(all)
    } catch(error){
        console.error('Something went wrong:',error)
    } finally{
        await session.close()
    }
})



app.listen(5050, () => {
    console.log('The application is listening on port 5050!');
})
