const search = (arr) => {
    let storage ={};
    arr.forEach((el => {
      if(storage[el] === undefined){
         storage[el] = 1;
      }
      else if(storage[el]){
          storage[el] += 1;
      }
    }))
   
    for(const num in storage ){
       if(storage[num] === 1){
           return num
       }
    }
};