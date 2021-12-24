//Color the cyclic path
//delay function
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function graphCycleTracePath(graphComponentMatrix, CycleResponse) {
    //Dependency-> visited,DFsVisted(2D array)
    let [srcRow, srcColum] = CycleResponse;
    let visited = [];
    let dfsvisited = [];
    for (let i = 0; i < rows; i++) {
        let visitedRow = [];
        let dfsvisitedRow = [];
        for (let j = 0; j < column; j++) {
            visitedRow.push(false)
            dfsvisitedRow.push(false);
        }
        visited.push(visitedRow);
        dfsvisited.push(dfsvisitedRow)
    }


    let response = await dfsCycleDetectionTracing(graphComponentMatrix, srcRow, srcColum, visited, dfsvisited);
    if (response)
        return Promise.resolve(true);

    return Promise.resolve(false);
}

//coloring the path

async function dfsCycleDetectionTracing(graphComponentMatrix, srcRow, srcColumn, visited, dfsVisited) {
    visited[srcRow][srcColumn] = true;
    dfsVisited[srcRow][srcColumn] = true;
    let cell = document.querySelector(`.cell[rowid="${srcRow}"][columnid="${srcColumn}"]`)
    cell.style.backgroundColor = "lightblue";
    await sleep(1000);

    for (let children = 0; children < graphComponentMatrix[srcRow][srcColumn].length; children++) {
        let [childRowID, childColumnID] = graphComponentMatrix[srcRow][srcColumn][children];


        if (visited[childRowID][childColumnID] == false) {
            let response = await dfsCycleDetectionTracing(graphComponentMatrix, childRowID, childColumnID, visited, dfsVisited);
            if (response) {
                await sleep(1000);
                cell.style.backgroundColor = "transparent";
                return Promise.resolve(true);
            }
        }
        else if (visited[childRowID][childColumnID] == true && dfsVisited[childRowID][childColumnID] == true) {
            let CyclicCell = document.querySelector(`.cell[rowid="${childRowID}"][columnid="${childColumnID}"]`)
            await sleep(1000);
            CyclicCell.style.backgroundColor = "lightsalmon";
            await sleep(1000);
            CyclicCell.style.backgroundColor = "transparent";
            await sleep(1000);
            //Remember to remove srcRow and srcColumn cell color
            cell.style.backgroundColor="transparent";
            return Promise.resolve(true);
        }
    }
    dfsVisited[srcRow][srcColumn] = false;
    return Promise.resolve(false);
}