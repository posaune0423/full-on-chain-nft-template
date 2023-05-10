export const tetoris = `<!DOCTYPE html><html><head><style>body{background: white;}#container{margin: 0 auto;}</style></head><body onload="init()"><div id="container"><canvas id="cvs"></canvas></div><script>const speed=300;const blockSize=30;const boardRow=20;const boardCol=10;const cvs=document.getElementById('cvs');const ctx=cvs.getContext('2d');const canvasW=blockSize * boardCol;const canvasH=blockSize * boardRow;cvs.width=canvasW;cvs.height=canvasH;const container=document.getElementById('container');container.style.width=canvasW + 'px';const tetSize=4;const tetTypes=[[],[[0, 0, 0, 0],[0, 1, 1, 0],[0, 1, 1, 0],[0, 0, 0, 0],],[[0, 0, 0, 0],[0, 1, 0, 0],[1, 1, 1, 0],[0, 0, 0, 0],],[[0, 0, 0, 0],[1, 1, 0, 0],[0, 1, 1, 0],[0, 0, 0, 0],],[[0, 0, 0, 0],[0, 0, 1, 1],[0, 1, 1, 0],[0, 0, 0, 0],],[[0, 0, 0, 0],[1, 1, 1, 1],[0, 0, 0, 0],[0, 0, 0, 0],],[[0, 0, 0, 0],[1, 1, 1, 0],[0, 0, 1, 0],[0, 0, 0, 0],],[[0, 0, 0, 0],[0, 0, 1, 0],[1, 1, 1, 0],[0, 0, 0, 0],],];const tetColors=['','#f6fe85','#07e0e7','#7ced77','#f78ff0','#f94246','#9693fe','#f2b907',];let tet_idx;let tet;let offsetX=0;let offsetY=0;const board=[];let timerId=NaN;let isGameOver=false;const draw=()=>{ctx.fillStyle='#000';ctx.fillRect(0, 0, canvasW, canvasH);for (let y=0; y < boardRow; y++){for (let x=0; x < boardCol; x++){if (board[y][x]){drawBlock(x, y, board[y][x]);}}}for (let y=0; y < tetSize; y++){for (let x=0; x < tetSize; x++){if (tet[y][x]){drawBlock(offsetX + x, offsetY + y, tet_idx);}}}if (isGameOver){const s='GAME OVER';ctx.font="40px 'MS ゴシック'";const w=ctx.measureText(s).width;const x=canvasW / 2 - w / 2;const y=canvasH / 2 - 20;ctx.fillStyle='white';ctx.fillText(s, x, y);}};const drawBlock=(x, y, tet_idx)=>{let px=x * blockSize;let py=y * blockSize;ctx.fillStyle=tetColors[tet_idx];ctx.fillRect(px, py, blockSize, blockSize);ctx.strokeStyle='black';ctx.strokeRect(px, py, blockSize, blockSize);};const canMove=(dx, dy, nowTet=tet)=>{for (let y=0; y < tetSize; y++){for (let x=0; x < tetSize; x++){if (nowTet[y][x]){let nx=offsetX + x + dx;let ny=offsetY + y + dy;if (ny < 0 ||nx < 0 ||ny >=boardRow ||nx >=boardCol ||board[ny][nx]){return false;}}}}return true;};const createRotateTet=()=>{let newTet=[];for (let y=0; y < tetSize; y++){newTet[y]=[];for (let x=0; x < tetSize; x++){newTet[y][x]=tet[tetSize - 1 - x][y];}}return newTet;};document.onkeydown=(e)=>{if (isGameOver) return;switch (e.keyCode){case 37:if (canMove(-1, 0)) offsetX--;break;case 38:if (canMove(0, -1)) offsetY--;break;case 39:if (canMove(1, 0)) offsetX++;break;case 40:if (canMove(0, 1)) offsetY++;break;case 32:let newTet=createRotateTet();if (canMove(0, 0, newTet)){tet=newTet;}}draw();};const fixTet=()=>{for (let y=0; y < tetSize; y++){for (let x=0; x < tetSize; x++){if (tet[y][x]){board[offsetY + y][offsetX + x]=tet_idx;}}}};const clearLine=()=>{for (let y=0; y < boardRow; y++){let isLineOK=true;for (let x=0; x < boardCol; x++){if (board[y][x]===0){isLineOK=false;break;}}if (isLineOK){for (let ny=y; ny > 0; ny--){for (let nx=0; nx < boardCol; nx++){board[ny][nx]=board[ny - 1][nx];}}}}};const dropTet=()=>{if (isGameOver) return;if (canMove(0, 1)){offsetY++;}else{fixTet();clearLine();tet_idx=randomIdx();tet=tetTypes[tet_idx];initStartPos();if (!canMove(0, 0)){isGameOver=true;clearInterval(timerId);}}draw();};const initStartPos=()=>{offsetX=boardCol / 2 - tetSize / 2;offsetY=0;};const randomIdx=()=>{return Math.floor(Math.random() * (tetTypes.length - 1)) + 1;};const init=()=>{for (let y=0; y < boardRow; y++){board[y]=[];for (let x=0; x < boardCol; x++){board[y][x]=0;}}tet_idx=randomIdx();tet=tetTypes[tet_idx];initStartPos();timerId=setInterval(dropTet, speed);draw();};</script></body></html>`;