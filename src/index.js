// // console.log('Hello world');
// // Total Experience: 13 Months
// sunil.chaudhary@phonepe.com

// // Question 1:
const input1 = [10, 0, 20, -10, 5, 4, 6, 3, 7, 9, 87, 976];
const input2 = 10;
// [ 0, 10 ]
// [ -10, 20 ]
// [ 6, 4 ]
// [ 7, 3 ]

// //APPROACH 1   : TWO FOR LOOP I = 0 TO N
// // J = I + N
// // O(N2)

// function pairs(input1, input2) {
//   var mp = {}; // Create an empty object to store frequency of elements
//   for (let i = 0; i < input1.length; i++) {
//     let find = input2 - input1[i]; // Calculate the number needed to form a pair with input1[i]

//     if (mp[find]) {
//       // If 'find' is present in the object (indicating it was seen before)
//       console.log([input1[i], find]); // Output the pair
//       mp[input1[i]]++; // Increase the frequency of input1[i] to account for multiple occurrences
//     } else {
//       mp[input1[i]] = 1; // Set frequency of input1[i] to 1, indicating it has been seen once
//     }
//   }
// }

// pairs(input1, input2);

// Question 2:

// tunnelL = mx (5)
// trainL = nx (3) 1, 2, 3
// mx + nx + 1
// '-','-','-','-','-' // t = 0
// '1','-','-','-','-' // t = 1
// '2','1','-','-','-' // t = 2
// '3','2','1','-','-' // t = 3
// '-','3','2','1','-' // t = 4
// '-','-','3','2','1' // t = 5
// '-','-','-','3','2' // t = 6
// '-','-','-','-','3' // t = 7
// '-','-','-','-','-' // t = 8

// // tunnelL = mx (3)
// // trainL = nx (5)
// // mx + nx + 1

// '-','-','-' // t = 0
// '1','-','-' // t = 1
// '2','1','-' // t = 2
// '3','2','1' // t = 3
// '4','3','2' // t = 4
// '5','4','3' // t = 5
// '-','5','4' // t = 6
// '-','-','5' // t = 7
// '-','-','-' // t = 8

// // loop running - mx + nx + 1
// // arr = ['-','-']
// // if last index of arr !== '-'

function entering(arr, index, value) {
  arr.unshift(value); // Add the train number to the beginning of the array
  arr.pop(); // Remove the last element (which is now duplicated at the beginning)
  return arr; // Return the updated tunnel track
}

function exiting(arr) {
  for (let i = arr.length - 1; i >= 0; i--) {
    arr[i] = arr[i - 1]; // Shift elements to the right
    if (arr[i] === undefined) arr[i] = "-"; // Replace undefined element with '-'
  }
  console.log(arr); // Print the updated tunnel track
}

function simulation(tunnelL, trainL) {
  let arr = [];
  for (let i = 0; i < tunnelL; i++) {
    arr[i] = "-"; // Initialize tunnel track with '-'
  }
  console.log(arr); // Print initial tunnel track

  let i = 0; // Initialize tunnel position index
  let boggy = 1; // Initialize train number

  for (let counter = 1; counter < trainL + tunnelL + 1; counter++) {
    if (boggy !== trainL + 1 && arr[i] === "-") {
      // If train is not fully entered and the tunnel position is empty
      arr = entering(arr, i, boggy); // Train enters the tunnel
      boggy++; // Increment train number
      i++; // Move to the next tunnel position
      console.log(arr); // Print updated tunnel track
    } else {
      exiting(arr); // Train exits the tunnel
    }
  }
}

// simulation(5, 5); // Start the simulation with tunnel length 5 and train length 3

// Question 3:
// Solved
const image = [
  ["c1", "c1", "--", "--", "--", "--", "--"],
  ["--", "--", "--", "--", "--", "c2", "c2"],
  ["c1", "--", "--", "--", "--", "--", "--"],
  ["--", "--", "c2", "--", "--", "--", "--"],
  ["--", "--", "--", "c2", "--", "c3", "c3"],
  ["--", "--", "--", "--", "--", "c3", "c3"]
]; // 2d matrix
let m = image.length; // rows
let n = image[0].length; // cols
const colorType = ["c1", "c2", "c3"];

function colorColonies(image, colorType, m, n) {
  // Create a visited array to keep track of visited cells
  let visited = new Array(m);
  for (let i = 0; i < m; i++) {
    // creating 2D array
    visited[i] = new Array(n);
  }
  // Initialize visited array to false for all cells
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      visited[i][j] = false;
    }
  }
  let count = 0; // to count the colonies
  // Iterate through all cells in the image
  for (let i = 0; i < m; ++i) {
    for (let j = 0; j < n; ++j) {
      if (image[i][j] === colorType && !visited[i][j]) {
        // value c1 ie colorTYPE is not
        // visited yet, then new Colony found,
        visitColonies(image, i, j, visited, colorType);
        // after visiting increment the count
        count++;
      }
    }
  }
  return count;
}
function visitColonies(image, row, col, visited, colorType) {
  // Define directions for adjacent cells
  let dirRow = [-1, -1, -1, 0, 0, 1, 1, 1];
  let dirCol = [-1, 0, 1, -1, 1, -1, 0, 1];

  // Mark this cell as visited
  visited[row][col] = true;

  // Recur for all connected neighbours
  for (let k = 0; k < 8; ++k) {
    if (isSafe(image, row + dirRow[k], col + dirCol[k], visited, colorType)) {
      visitColonies(
        image,
        row + dirRow[k],
        col + dirCol[k],
        visited,
        colorType
      );
    }
  }
}
function isSafe(image, row, col, visited, colorType) {
  return (
    row >= 0 &&
    row < m &&
    col >= 0 &&
    col < n &&
    image[row][col] === colorType &&
    !visited[row][col]
  );
}
console.log(colorColonies(image, "c1", m, n)); // 2
// console.log(colorColonies(image, "c2", m, n)); // 2
// console.log(colorColonies(image, "c3", m, n)); // 1
