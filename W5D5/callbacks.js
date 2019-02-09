class Clock {
  constructor() {
    // 1. Create a Date object.
    // 2. Store the hours, minutes, and seconds.
    // 3. Call printTime.
    // 4. Schedule the tick at 1 second intervals. 
    let currDate = new Date() 
    this.hour = currDate.getHours()
    this.minute = currDate.getMinutes()
    this.second = currDate.getSeconds()
  }

  printTime() {
    // Format the time in HH:MM:SS
    // Use console.log to print it.
    console.log(`${this.hour}:${this.minute}:${this.second}`)
  }

  _tick() {
    // 1. Increment the time by one second.
    // 2. Call printTime.
    if (this.second === 59) {
      if (this.minute === 59) {
        this.hour++;
        this.minute = 0;
      } else {
        this.minute++;
      }
      this.second = 0;
    } else {
      this.second ++
    }
    // debugger
    
    this.printTime();
  }
}

const readline = require('readline');

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


function addNumbers(sum, numsLeft, completionCallback) { 
  if (numsLeft === 0) {
    completionCallback(sum);
    reader.close();
  }
  else {
    let num;
    reader.question('Enter a number: ', (answer) => {
      num = parseInt(answer);
      sum+=num;
      console.log(sum)
      addNumbers(sum, numsLeft-1, completionCallback)
    });
  }
}

function askIfGreaterThan(el1, el2, callback) {
  // Prompt user to tell us whether el1 > el2; pass true back to the
  // callback if true; else false.
  reader.question(`Is ${el1} larger than ${el2}? `, (answer) => {
    if (answer === 'yes') {
      callback(true);
    } else {
      callback(false);
    }
  });
}
const callback = function(isGreaterThan){
  if (isGreaterThan) {
    [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]; 
    madeAnySwaps = true;
  }
}

function innerBubbleSortLoop(arr, i, madeAnySwaps, outerBubbleSortLoop) {
  // Do an "async loop":
  // 1. If (i == arr.length - 1), call outerBubbleSortLoop, letting it
  //    know whether any swap was made.
  // 2. Else, use `askIfGreaterThan` to compare `arr[i]` and `arr[i +
  //    1]`. Swap if necessary. Call `innerBubbleSortLoop` again to
  //    continue the inner loop. You'll want to increment i for the
  //    next call, and possibly switch madeAnySwaps if you did swap.

  if (i < arr.length - 1) {
    askIfGreaterThan(arr[i], arr[i + 1], function(isGreaterThan){
      if (isGreaterThan) {
        [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]; 
        madeAnySwaps = true;
      }
      innerBubbleSortLoop(arr, i + 1, madeAnySwaps, outerBubbleSortLoop);
    })
  } else {
    outerBubbleSortLoop(madeAnySwaps)
  }
}

function absurdBubbleSort(arr, sortCompletionCallback) {
  function outerBubbleSortLoop(madeAnySwaps) {
    // Begin an inner loop if you made any swaps. Otherwise, call
    // `sortCompletionCallback`.
    if (madeAnySwaps) {
      innerBubbleSortLoop(arr, 0, false, outerBubbleSortLoop);
    } else {
      sortCompletionCallback(arr);
    }
  }
  // Kick the first outer loop off, starting `madeAnySwaps` as true.
  outerBubbleSortLoop(true);
}

Function.prototype.myBind = function(context){
  return () => this.apply(context);
}

const clock = new Clock();
let boundTick = clock._tick.bind(clock); //=> bound version of clock._tick 

// setInterval(boundTick, 1000);

// addNumbers(0, 3, sum => console.log(`Total Sum: ${sum}`));

// absurdBubbleSort([3, 2, 1], function (arr) {
//     console.log("Sorted array: " + JSON.stringify(arr));
//     reader.close();
//   });

// class Lamp {
//   constructor() {
//     this.name = "a lamp";
//   }
// }

// const turnOn = function() {
//    console.log("Turning on " + this.name);
// };

// const lamp = new Lamp();

// turnOn(); // should not work the way we want it to

// const boundTurnOn = turnOn.bind(lamp);
// const myBoundTurnOn = turnOn.myBind(lamp);

// boundTurnOn(); // should say "Turning on a lamp"
// myBoundTurnOn(); // should say "Turning on a lamp"