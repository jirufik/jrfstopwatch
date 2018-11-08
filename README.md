# jrfstopwatch

**jrfstopwatch** is a simple **async/await** stopwatch.

## Installation
```
$ npm i jrfstopwatch --save
```

## Example
```js
const JrfStopwatch = require('jrfstopwatch');

function wait(mlsecond = 1000) {
    return new Promise(resolve => setTimeout(resolve, mlsecond));
}

async function test() {
    
    let stopwatch = new JrfStopwatch();
    console.log(await stopwatch.getInfo());
    console.log('------------------------------------');
    
    //start stopwatch
    await stopwatch.start();
    console.log(await stopwatch.getInfo());
    console.log('------------------------------------');
    
    await wait(1000 * 10);

    //start first pause
    await stopwatch.pause();
    
    await wait(1000 * 5);
    
    //stop first round
    await stopwatch.round();
    
    //stop first pause
    await stopwatch.pause();
    console.log(await stopwatch.getInfo());
    console.log('------------------------------------');

    await wait(1000 * 2);

    //start second pause
    await stopwatch.pause();
    
    await wait(1000 * 3);
    
    //stop second pause
    await stopwatch.pause();

    //stop stopwatch
    let ms = await stopwatch.stop();
    console.log(ms);
    console.log(await stopwatch.getInfo());
    
    //reset stopwatch
    await stopwatch.reset();
    
}

test();
```
## Methods

| Method | Set status | Allowed with statuses | Description |
|--|--|--|--|
| start | RUNNING | READY | Start the stopwatch. Returns true or false. |
| stop | COMPLETED | RUNNING or SUSPENDED | Stop the stopwatch. All calculations are performed. Returns the period in seconds or false. |
| reset | READY | any | Reset the stopwatch. |
| pause | SUSPENDED / RUNNING | RUNNING or SUSPENDED | Enable pause. Turn off pause. Returns true or false. |
| round | nothing | any | Record lap time. Pause time is deducted. Returns the lap time in ms or false. |
| getCurrentPeriod | nothing | any | Returns the time of the stopwatch in ms from start to stop. If the stopwatch is not stopped, then until the current time. The pause time is deducted. |
| getInfo | nothing | any | Returns an object containing the current stopwatch details. |

## Object from getInfo 

| Properties | Type | Description |
|--|--|--|
| datetimeStart | date | Date start time. |
| datetimeFinish | date | Date stop time. |
| period | number | Returns the time of the stopwatch in ms from start to stop. If the stopwatch is not stopped, then until the current time. The pause time is deducted. |
| periodPauses | number | The total time of all pauses in ms. |
| countPauses | number | Number of pauses. |
| pauses | array | An array of pauses. Each item contains: datetimeStart, datetimeFinish, period |
| countRounds | number | Number of laps. |
| rounds | array | An array of laps. Each item contains: datetimeStart, datetimeFinish, period |
| status | string | Current status. |
| statusList | array | List of statuses. READY, RUNNING, SUSPENDED, COMPLETED. |

**Example object**
```js
{ datetimeStart: 2018-11-08T13:25:09.009Z,
  datetimeFinish: 2018-11-08T13:25:29.013Z,
  period: 12003,
  periodPauses: 8001,
  countPauses: 2,
  pauses:
   [ { datetimeStart: 2018-11-08T13:25:19.010Z,
       datetimeFinish: 2018-11-08T13:25:24.011Z,
       period: 5001 },
     { datetimeStart: 2018-11-08T13:25:26.013Z,
       datetimeFinish: 2018-11-08T13:25:29.013Z,
       period: 3000 } ],
  countRounds: 2,
  rounds:
   [ { datetimeStart: 2018-11-08T13:25:09.009Z,
       datetimeFinish: 2018-11-08T13:25:24.011Z,
       period: 10001 },
     { datetimeStart: 2018-11-08T13:25:24.011Z,
       datetimeFinish: 2018-11-08T13:25:29.013Z,
       period: 2002 } ],
  status: 'COMPLETED',
  statusList:
   { READY: 'READY',
     RUNNING: 'RUNNING',
     SUSPENDED: 'SUSPENDED',
     COMPLETED: 'COMPLETED' } }
```

