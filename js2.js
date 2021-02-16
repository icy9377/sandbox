const sortJS = (arr) =>{
// 인자를 하나씩 탐색하면서 위치에 따라 정렬, 먼저 가장 큰 값은 뒤로
  let answer = [];
  let max =0;
  //재귀함수를 통해서 끝에서 뒤로 가면서 위치를 찾아간다.
  const search = (el, i) => {
      if(el > arr[i]){
         answer.splice(i,0,el); 
      }
  }

   arr.forEach((el)=>{
     if(el > max){
       answer.push(el);
       max = el;
     }
})
}