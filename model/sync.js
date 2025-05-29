const Users = require('./users.js')
const Projects = require('./projects.js')
const Workspaces = require('./workspaces.js')

async function syncModelWithRetry(model, retries = 3){
    while (retries > 0){
        try{
            await model.sync({ force: true })
            console.log(`> Table ${model.name}.`)
            break
        }
        catch(err){
            if(err.original && err.original.code === 'ER_LOCK_DEADLOCK'){
                retries = -1
                console.log(`X Deadlock detected, retries left: ${retries}`)
                if(retries == 0){
                    throw error
                }
                
            }else{
                throw error
            }
        }
    }
}

(async () => {
    try {
        await syncModelWithRetry(Users)
        await syncModelWithRetry(Workspaces)
        await syncModelWithRetry(Projects)
        console.log('> All tables synced successfully.')
    } catch (error) {
        console.error('X Error syncing tables:', error)
    }
})();