function solution(map) {
    const n = map.length,
      dx = [0, 0, 1, -1],
      dy = [1, -1, 0, 0],
      rowToColDx = [-1, -1, 0, 0],
      rowToColDy = [0, 1, 0, 1],
      colToRowDx = [0, 1, 0, 1],
      colToRowDy = [0, 0, -1, -1],
      q = [
        [0, 0, 0, 0]
      ],
      visited = [];

    for (let i = 0; i < n; i++) {
      visited.push([]);
      for (let j = 0; j < n; j++) {
        visited[i].push([Infinity, Infinity]);
      }
    }

    visited[0][0][0] = 0;

    let min = Infinity;

    const canGoRight = (x, y, p) => {
      if(p === 0) {
        if(y+2 >= n || map[x][y+1] === 1 || map[x][y+2] === 1)
          return false;
      }else {
        if(y+1 >= n || x+1 >= n || map[x][y+1] === 1 || map[x+1][y+1] === 1)
          return false;
      }
      return true;
    };

    const canGoLeft = (x, y, p) => {
      if(p === 0) {
        if(y-1 < 0 || map[x][y-1] === 1)
          return false;
      }else {
        if(y-1 < 0 || x+1 >= n || map[x][y-1] === 1 || map[x+1][y-1] === 1)
          return false;
      }
      return true;
    };

    const canGoDown = (x, y, p) => {
      if(p === 0) {
        if(x+1 >= n || y+1 >= n || map[x+1][y] === 1 || map[x+1][y+1] === 1)
          return false;
      }else {
        if(x+2 >= n || map[x+1][y] === 1 || map[x+2][y] === 1) {
          return false;
        }
      }
      return true;
    };

    const canGoUp = (x, y, p) => {
      if(p === 0) {
        if(x-1 < 0 || y+1 >= n || map[x-1][y] === 1 || map[x-1][y+1] === 1)
          return false;
      }else {
        if(x-1 < 0 || map[x-1][y] === 1) {
          return false;
        }
      }
      return true;
    };

    const canRotateUp = (x, y) =>
      !(x - 1 < 0 || y + 1 >= n || map[x - 1][y] === 1 || map[x - 1][y + 1] === 1);

    const canRotateDown = (x, y) =>
      !(x + 1 >= n || y + 1 >= n || map[x + 1][y] === 1 || map[x + 1][y + 1] === 1);

    const canRotateRight = (x, y) =>
      !(y + 1 >= n || x + 1 >= n || map[x][y + 1] === 1 || map[x + 1][y + 1] === 1);

    const canRotateLeft = (x, y) =>
      !(y - 1 < 0 || x + 1 >= n || map[x][y - 1] === 1 || map[x + 1][y - 1] === 1);

    const canGoMap = [
      canGoRight,
      canGoLeft,
      canGoDown,
      canGoUp
    ],
      canRotateMap = [
        [
          canRotateUp,
          canRotateUp,
          canRotateDown,
          canRotateDown
        ], [
          canRotateRight,
          canRotateRight,
          canRotateLeft,
          canRotateLeft
        ],
      ],

      deltaMap = [
        [rowToColDx, rowToColDy],
        [colToRowDx, colToRowDy]
      ];

    while (q.length) {
      const [x, y, t, p] = q.shift();

      // 만일 (n,n)에 도착했다면 최소시간을 갱신합니다
      if (
        (x === n - 1 && y === n - 2 && p === 0)
        || (x === n - 2 && y === n - 1 && p === 1)
      ) {
        min = Math.min(min, t);
      }

      // 회전 없이 우좌하상으로 움직일때
      for (let k = 0; k < 4; k++) {
        if (!canGoMap[k](x, y, p)) {
          continue;
        }

        const nx = x + dx[k],
          ny = y + dy[k];

        if (visited[nx][ny][p] > t + 1) {
          visited[nx][ny][p] = t + 1;
          q.push([nx, ny, t + 1, p]);
        }
      }

      for (let k = 0; k < 4; k++) {
        // 가로로 놓인 상황인 경우 세로로 돌려보자
        // 세로로 놓인 상황인 경우 가로로 돌려보자

        if (!canRotateMap[p][k](x, y)) continue;

        const nx = x + deltaMap[p][0][k],
          ny = y + deltaMap[p][1][k],
          _p = p ? 0 : 1;

        if (visited[nx][ny][_p] > t + 1) {
          visited[nx][ny][_p] = t + 1;
          q.push([nx, ny, t + 1, _p]);
        }
      }

    }

    return min;
  }



//   function solution(board) {
//     //로봇의 첫 위치는 board[0][0], board[0][1]
//     let cases = [];
//     let maxX= board[0].length-1;
//     let maxY= board.length-1;
//     // 모든 방향으로 가는 경우의 수에서 걸렸던 시간들을 위 배열에 저장.
//     const moveFunc = (boarding,a,b,c,d,count,form) =>{
    
//       if(board[maxX][maxY] === 1){
//         cases.push(count);
//        }
//     if(a<= maxY && c <= maxY && b <= maxX && d <= maxX){

//     //직진을 하는 경우
    
//       if(boarding[c][d+1] === 0 && form === 'A'){
//         let boardingA = boarding.slice();
//         boardingA[c][d+1] = 1;
//         console.log(boarding)
//         console.log(boardingA)
//         count++;
//         moveFunc(boardingA, a, b+1, c,d+1,count, 'A');
//       }
    
     
//     //하강하는 경우
//       if(b === d && boarding[c+1][d] === 0 && form === 'B'){
//          let boardingB = boarding.slice();
//          boardingB[c+1][d] = 1;
//          count++;
//          moveFunc(boardingB, a+1, b, c+1, d, count, 'B');
//        }
//     //가로모드에서 시계방향으로 아래로 회전
//       if(boarding[a+1][b] === 0 && boarding[c+1][d] === 0 && form === 'A'){
//         let boardingC = boarding.slice();
//         boardingC[a+1][b] = 1;
//         count++;
//         moveFunc(boardingC, a, b, c+1, d-1,count, 'B');
//       }
//    // 가로모드에서 반시계방향으로 아래회전
//     if(boarding[a+1][b] === 0 && boarding[c+1][d] === 0 && form === 'A'){
//         let boardingD = boarding.slice();
//         boardingD[c+1][d] = 1;
//         count++;
//         moveFunc(boardingD, a, b+1, c+1, d,count, 'B');
//       }
//   //세로모드에서 가로모드로 오른쪽
//     if(boarding[a][b+1] === 0 && boarding[c][d+1] === 0 && form === 'B'){
//        let boardingE = boarding.slice();
//        boardingE[c][d+1] = 1;
//        count++;
//        moveFunc(boardingE, a+1, b, c, d+1, count, 'A');
//       }
//      return;
//      }
//     }
//     moveFunc(board,0,0,0,1,0,'A')
  
//     return cases;
// }