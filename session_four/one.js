for (let i = 0; i < 5; i++) {
  console.log(i);
}

console.log(i); // Error: i is not defined

for (var i = 0; i < 5; i++) {
  console.log(i);
}

console.log(i);

{
  let cost;

  cost = 5;

  console.log("Some logic");
}

function add(x) {
  return function (y) {
    return x + y;
  };
}

// n = add(2);

// output:
// function n(y) {
//     return 2 + y;
// };
