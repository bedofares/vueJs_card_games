const dataset = [
    'red',
    'blue',
    'black',
    'red',
    'red',
    'black',
    'black',
    'red',
    'black',
    'red',
    'red',
    'red',
    'red',
    'black',
    'red',
    'blue',
    'red',
    'blue',
    'red',
    'red',
    'blue',
    'red',
    'blue',
    'red',
    'red',
    'red',
    'blue',
    'red',
    'purple',
    'red',
    'red',
];


dataset.forEach(v =>{
    if(acc[currentValue]){
        acc[currentValue]++
    }else{
        acc[currentValue] = 1
    }
})

const reducer = (acc , currentValue) =>{
    console.log(acc,currentValue)
    if(acc[currentValue]){
        acc[currentValue]++
    }else{
        acc[currentValue] = 1
    }
    return acc
}

const result = dataset.reduce(reducer , {})
console.log(result)
dataset.map(v => console.log(v))
