let workspaces = []
let wrkselected = 0

function updateWorkspace(workspaces_id) {
    return apiRequestJson('/listWorkspace')
        .then((info) => {
            workspaces = info
            if (workspaces.length == 0) {
                opencreateWorkspace()
            }
            else if (workspaces_id >= 1) {
                selectWorkspace(workspaces_id)
            }
            else {
                drawWorkspace(workspaces[0].id)
                selectWorkspace(workspaces[0].id)
            }
        })
}
