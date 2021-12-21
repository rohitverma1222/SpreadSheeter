let graphComponentMatrix = [];

for (let i = 0; i < rows; i++) {
    let row = [];
    for (let j = 0; j < column; j++) {
        row.push([]);
    }
    graphComponentMatrix.push(row);
}

// True ->cyclic ,false->Not cyclic
function isGraphCyclic(graphComponentMatrix) {
    //Dependency-> visited,DFsVisted(2D array)
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

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < column; j++) {
            if (visited[i][j] == false) {
                if (dfsCycleDetection(graphComponentMatrix, i, j, visited, dfsvisited))
                    return true;
            }
        }
    }
    return false;
}

//start -> visited=true and dfsvisted=true
//Cycle detection condition -> if(visited[i][j]==true && dfsvisited[i][j]==true)  -->cycle
// if visited[i][j]==true then this path is already explored
function dfsCycleDetection(graphComponentMatrix, srcRow, srcColumn, visited, dfsVisited) {
    visited[srcRow][srcColumn] = true;
    dfsVisited[srcRow][srcColumn] = true;

    for (let children = 0; children < graphComponentMatrix[srcRow][srcColumn].length; children++) {
        let [childRowID, childColumnID] = graphComponentMatrix[srcRow][srcColumn][children];
        if (visited[childRowID][childColumnID] ==false) {
            let response = dfsCycleDetection(graphComponentMatrix, childRowID, childColumnID, visited, dfsVisited);
            if (response)
                return true;
        }
        else if (visited[childRowID][childColumnID] == true && dfsVisited[childRowID][childColumnID] == true) {
            return true;
        }
    }
    dfsVisited[srcRow][srcColumn] = false;
    return false;
}