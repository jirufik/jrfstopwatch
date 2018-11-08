const JrfStopwatch = require('../jrfstopwatch');

let glObj = {
    countValid: 0,
    countInvalid: 0
};

let readyStopwatch = {
    datetimeStart: null,
    datetimeFinish: null,
    period: null,
    periodPauses: null,
    countPauses: 0,
    pauses: [],
    countRounds: 0,
    rounds: [],
    status: 'READY',
    statusList: {
        READY: 'READY',
        RUNNING: 'RUNNING',
        SUSPENDED: 'SUSPENDED',
        COMPLETED: 'COMPLETED'
    }
};

let startStopwatch = {
    datetimeStart: null,
    datetimeFinish: null,
    period: 0,
    periodPauses: 0,
    countPauses: 0,
    pauses: [],
    countRounds: 0,
    rounds: [],
    status: 'RUNNING',
    statusList:
        {
            READY: 'READY',
            RUNNING: 'RUNNING',
            SUSPENDED: 'SUSPENDED',
            COMPLETED: 'COMPLETED'
        }
};

let firstPauseStart = {
    datetimeStart: null,
    datetimeFinish: null,
    period: 10001,
    periodPauses: 0,
    countPauses: 1,
    pauses:
        [{
            datetimeStart: null,
            datetimeFinish: null,
            period: 0
        }],
    countRounds: 0,
    rounds: [],
    status: 'SUSPENDED',
    statusList:
        {
            READY: 'READY',
            RUNNING: 'RUNNING',
            SUSPENDED: 'SUSPENDED',
            COMPLETED: 'COMPLETED'
        }
};

let firstRound = {
    datetimeStart: null,
    datetimeFinish: null,
    period: 1003,
    periodPauses: 501,
    countPauses: 1,
    pauses:
        [{
            datetimeStart: null,
            datetimeFinish: null,
            period: 0
        }],
    countRounds: 1,
    rounds:
        [{
            datetimeStart: null,
            datetimeFinish: null,
            period: 1003
        }],
    status: 'SUSPENDED',
    statusList:
        {
            READY: 'READY',
            RUNNING: 'RUNNING',
            SUSPENDED: 'SUSPENDED',
            COMPLETED: 'COMPLETED'
        }
};

let firstPauseStop = {
    datetimeStart: null,
    datetimeFinish: null,
    period: 1003,
    periodPauses: 500,
    countPauses: 1,
    pauses:
        [{
            datetimeStart: null,
            datetimeFinish: null,
            period: 500
        }],
    countRounds: 1,
    rounds:
        [{
            datetimeStart: null,
            datetimeFinish: null,
            period: 1003
        }],
    status: 'RUNNING',
    statusList:
        {
            READY: 'READY',
            RUNNING: 'RUNNING',
            SUSPENDED: 'SUSPENDED',
            COMPLETED: 'COMPLETED'
        }
};

let secondPauseStart = {
    datetimeStart: null,
    datetimeFinish: null,
    period: 1202,
    periodPauses: 502,
    countPauses: 2,
    pauses:
        [{
            datetimeStart: null,
            datetimeFinish: null,
            period: 502
        },
            {
                datetimeStart: null,
                datetimeFinish: null,
                period: 0
            }],
    countRounds: 1,
    rounds:
        [{
            datetimeStart: null,
            datetimeFinish: null,
            period: 1002
        }],
    status: 'SUSPENDED',
    statusList:
        {
            READY: 'READY',
            RUNNING: 'RUNNING',
            SUSPENDED: 'SUSPENDED',
            COMPLETED: 'COMPLETED'
        }
};

let secondPauseStop = {
    datetimeStart: null,
    datetimeFinish: null,
    period: 1202,
    periodPauses: 802,
    countPauses: 2,
    pauses:
        [{
            datetimeStart: null,
            datetimeFinish: null,
            period: 501
        },
            {
                datetimeStart: null,
                datetimeFinish: null,
                period: 301
            }],
    countRounds: 1,
    rounds:
        [{
            datetimeStart: null,
            datetimeFinish: null,
            period: 1002
        }],
    status: 'RUNNING',
    statusList:
        {
            READY: 'READY',
            RUNNING: 'RUNNING',
            SUSPENDED: 'SUSPENDED',
            COMPLETED: 'COMPLETED'
        }
};

let stopStopwatch = {
    datetimeStart: null,
    datetimeFinish: null,
    period: 1204,
    periodPauses: 801,
    countPauses: 2,
    pauses:
        [{
            datetimeStart: null,
            datetimeFinish: null,
            period: 501
        },
            {
                datetimeStart: null,
                datetimeFinish: null,
                period: 300
            }],
    countRounds: 2,
    rounds:
        [{
            datetimeStart: null,
            datetimeFinish: null,
            period: 1003
        },
            {
                datetimeStart: null,
                datetimeFinish: null,
                period: 201
            }],
    status: 'COMPLETED',
    statusList:
        {
            READY: 'READY',
            RUNNING: 'RUNNING',
            SUSPENDED: 'SUSPENDED',
            COMPLETED: 'COMPLETED'
        }
};

function wait(mlsecond = 1000) {
    return new Promise(resolve => setTimeout(resolve, mlsecond));
}

let tests = {

    async createStopwatch(key) {

        /// ---- HEAD ----
        let okay = false;
        let stopwatch = new JrfStopwatch();

        /// ---- BODY ----
        let info = await stopwatch.getInfo();
        okay = JSON.stringify(readyStopwatch) === JSON.stringify(info);

        /// ---- FOOTER ----
        if (okay) {
            glObj.countValid++;
            return;
        }

        glObj.countInvalid++;
        console.log(`invalid test ${key}`);

    },

    async notStart(key) {

        /// ---- HEAD ----
        let okay = false;
        let stopwatch = new JrfStopwatch();

        /// ---- BODY ----
        stopwatch.status = stopwatch.statusList.COMPLETED;
        okay = !await stopwatch.start();

        if (okay) {
            stopwatch.status = stopwatch.statusList.RUNNING;
            okay = !await stopwatch.start();
        }

        if (okay) {
            stopwatch.status = stopwatch.statusList.SUSPENDED;
            okay = !await stopwatch.start();
        }

        /// ---- FOOTER ----
        if (okay) {
            glObj.countValid++;
            return;
        }

        glObj.countInvalid++;
        console.log(`invalid test ${key}`);

    },

    async start(key) {

        /// ---- HEAD ----
        let okay = false;
        let stopwatch = new JrfStopwatch();

        /// ---- BODY ----
        okay = await stopwatch.start();

        /// ---- FOOTER ----
        if (okay) {
            glObj.countValid++;
            return;
        }

        glObj.countInvalid++;
        console.log(`invalid test ${key}`);

    },

    async notStop(key) {

        /// ---- HEAD ----
        let okay = false;
        let stopwatch = new JrfStopwatch();

        /// ---- BODY ----
        stopwatch.status = stopwatch.statusList.COMPLETED;
        okay = !await stopwatch.stop();

        if (okay) {
            stopwatch.status = stopwatch.statusList.READY;
            okay = !await stopwatch.stop();
        }

        /// ---- FOOTER ----
        if (okay) {
            glObj.countValid++;
            return;
        }

        glObj.countInvalid++;
        console.log(`invalid test ${key}`);

    },

    async stop(key) {

        /// ---- HEAD ----
        let okay = false;
        let stopwatch = new JrfStopwatch();

        /// ---- BODY ----
        await stopwatch.start();
        let ms = await stopwatch.stop();
        okay = typeof ms === 'number';

        if (okay) {
            await stopwatch.reset();
            await stopwatch.start();
            await stopwatch.pause();
            ms = await stopwatch.stop();
            okay = typeof ms === 'number';
        }

        /// ---- FOOTER ----
        if (okay) {
            glObj.countValid++;
            return;
        }

        glObj.countInvalid++;
        console.log(`invalid test ${key}`);

    },

    async reset(key) {

        /// ---- HEAD ----
        let okay = false;
        let stopwatch = new JrfStopwatch();

        /// ---- BODY ----

        await stopwatch.start();
        let info = await stopwatch.getInfo();
        okay = JSON.stringify(readyStopwatch) !== JSON.stringify(info);

        if (okay) {
            await stopwatch.reset();
            let info = await stopwatch.getInfo();
            okay = JSON.stringify(readyStopwatch) === JSON.stringify(info);
        }

        /// ---- FOOTER ----
        if (okay) {
            glObj.countValid++;
            return;
        }

        glObj.countInvalid++;
        console.log(`invalid test ${key}`);

    },

    async notPause(key) {

        /// ---- HEAD ----
        let okay = false;
        let stopwatch = new JrfStopwatch();

        /// ---- BODY ----
        stopwatch.status = stopwatch.statusList.COMPLETED;
        okay = !await stopwatch.pause();

        if (okay) {
            stopwatch.status = stopwatch.statusList.READY;
            okay = !await stopwatch.pause();
        }

        /// ---- FOOTER ----
        if (okay) {
            glObj.countValid++;
            return;
        }

        glObj.countInvalid++;
        console.log(`invalid test ${key}`);

    },

    async pause(key) {

        /// ---- HEAD ----
        let okay = false;
        let stopwatch = new JrfStopwatch();

        /// ---- BODY ----
        stopwatch.status = stopwatch.statusList.RUNNING;
        okay = await stopwatch.pause();

        if (okay) {
            stopwatch.status = stopwatch.statusList.SUSPENDED;
            okay = await stopwatch.pause();
        }

        /// ---- FOOTER ----
        if (okay) {
            glObj.countValid++;
            return;
        }

        glObj.countInvalid++;
        console.log(`invalid test ${key}`);

    },

    async compareStatus(key) {

        /// ---- HEAD ----
        let okay = false;
        let stopwatch = new JrfStopwatch();

        /// ---- BODY ----
        okay = await stopwatch._compareStatus(stopwatch.statusList.READY);

        /// ---- FOOTER ----
        if (okay) {
            glObj.countValid++;
            return;
        }

        glObj.countInvalid++;
        console.log(`invalid test ${key}`);

    },

    async setStatus(key) {

        /// ---- HEAD ----
        let okay = false;
        let stopwatch = new JrfStopwatch();

        /// ---- BODY ----
        await stopwatch._setStatus(stopwatch.statusList.RUNNING);
        okay = await stopwatch._compareStatus(stopwatch.statusList.RUNNING);

        /// ---- FOOTER ----
        if (okay) {
            glObj.countValid++;
            return;
        }

        glObj.countInvalid++;
        console.log(`invalid test ${key}`);

    },

    async setDatetimeFinishLastRound(key) {

        /// ---- HEAD ----
        let okay = false;
        let stopwatch = new JrfStopwatch();

        /// ---- BODY ----
        let now = new Date();
        stopwatch._setDatetimeFinishLastRound();
        okay = stopwatch._datetimeFinishLastRound;

        if (okay) {
            stopwatch._datetimeFinishLastRound = null;
            stopwatch._setDatetimeFinishLastRound(now);
            okay = stopwatch._datetimeFinishLastRound;
        }

        /// ---- FOOTER ----
        if (okay) {
            glObj.countValid++;
            return;
        }

        glObj.countInvalid++;
        console.log(`invalid test ${key}`);

    },

    async calculatePeriodBetween(key) {

        /// ---- HEAD ----
        let okay = false;
        let stopwatch = new JrfStopwatch();

        /// ---- BODY ----
        let datetimeStart = new Date();
        let datetimeFinish = new Date(datetimeStart.getTime() + 1000);
        let dif = await stopwatch._calculatePeriodBetween(datetimeStart, datetimeFinish);
        okay = dif === 1000;

        if (okay) {
            datetimeStart = new Date();
            await wait(100);
            dif = await stopwatch._calculatePeriodBetween(datetimeStart);
            okay = (dif >= 100 && dif <= 105);
        }

        /// ---- FOOTER ----
        if (okay) {
            glObj.countValid++;
            return;
        }

        glObj.countInvalid++;
        console.log(`invalid test ${key}`);

    },

    async getPausePeriod(key) {

        /// ---- HEAD ----
        let okay = false;
        let stopwatch = new JrfStopwatch();

        /// ---- BODY ----
        let now = new Date();
        let datetimeStart = now;
        let datetimeFinish = new Date(now.getTime() + 5000);

        let pause = {
            datetimeStart: new Date(now.getTime() + 2000),
            datetimeFinish: new Date(now.getTime() + 3000)
        };

        let ms = await stopwatch._getPausePeriod(pause, datetimeStart, datetimeFinish);
        okay = ms === 1000;

        if (okay) {
            pause.datetimeStart = new Date(now.getTime() - 2000);
            pause.datetimeFinish = new Date(now.getTime() + 10000);
            let ms = await stopwatch._getPausePeriod(pause, datetimeStart, datetimeFinish);
            okay = ms === 5000;
        }

        if (okay) {
            pause.datetimeStart = new Date(now.getTime() - 2000);
            pause.datetimeFinish = new Date(now.getTime() + 3000);
            let ms = await stopwatch._getPausePeriod(pause, datetimeStart, datetimeFinish);
            okay = ms === 3000;
        }

        if (okay) {
            pause.datetimeStart = new Date(now.getTime() + 3000);
            pause.datetimeFinish = new Date(now.getTime() + 10000);
            let ms = await stopwatch._getPausePeriod(pause, datetimeStart, datetimeFinish);
            okay = ms === 2000;
        }

        if (okay) {
            pause.datetimeStart = new Date(now.getTime() - 3000);
            pause.datetimeFinish = new Date(now.getTime() - 1000);
            let ms = await stopwatch._getPausePeriod(pause, datetimeStart, datetimeFinish);
            okay = ms === 0;
        }

        if (okay) {
            pause.datetimeStart = new Date(now.getTime() + 10000);
            pause.datetimeFinish = new Date(now.getTime() + 11000);
            let ms = await stopwatch._getPausePeriod(pause, datetimeStart, datetimeFinish);
            okay = ms === 0;
        }

        /// ---- FOOTER ----
        if (okay) {
            glObj.countValid++;
            return;
        }

        glObj.countInvalid++;
        console.log(`invalid test ${key}`);

    },

    async calculatePeriodPausesBetween(key) {

        /// ---- HEAD ----
        let okay = false;
        let stopwatch = new JrfStopwatch();

        /// ---- BODY ----
        let now = new Date();
        let datetimeStart = now;
        let datetimeFinish = new Date(now.getTime() + 5000);

        stopwatch.pauses.push({
            datetimeStart: new Date(now.getTime() + 2000),
            datetimeFinish: new Date(now.getTime() + 3000)
        });

        stopwatch.pauses.push({
            datetimeStart: new Date(now.getTime() - 2000),
            datetimeFinish: new Date(now.getTime() + 10000)
        });

        stopwatch.pauses.push({
            datetimeStart: new Date(now.getTime() - 2000),
            datetimeFinish: new Date(now.getTime() + 3000)
        });

        stopwatch.pauses.push({
            datetimeStart: new Date(now.getTime() + 3000),
            datetimeFinish: new Date(now.getTime() + 10000)
        });

        stopwatch.pauses.push({
            datetimeStart: new Date(now.getTime() - 3000),
            datetimeFinish: new Date(now.getTime() - 1000)
        });

        stopwatch.pauses.push({
            datetimeStart: new Date(now.getTime() + 10000),
            datetimeFinish: new Date(now.getTime() + 11000)
        });

        let ms = await stopwatch._calculatePeriodPausesBetween(datetimeStart, datetimeFinish);
        okay = ms === 11000;

        /// ---- FOOTER ----
        if (okay) {
            glObj.countValid++;
            return;
        }

        glObj.countInvalid++;
        console.log(`invalid test ${key}`);

    },

    async calculatePeriodPauses(key) {

        /// ---- HEAD ----
        let okay = false;
        let stopwatch = new JrfStopwatch();

        /// ---- BODY ----
        let now = new Date();
        let datetimeStart = now;
        let datetimeFinish = new Date(now.getTime() + 5000);

        stopwatch.pauses.push({
            datetimeStart: new Date(now.getTime() + 2000),
            datetimeFinish: new Date(now.getTime() + 3000),
            period: (new Date(now.getTime() + 2000) - new Date(now.getTime() + 3000)) * -1
        });

        stopwatch.pauses.push({
            datetimeStart: new Date(now.getTime() - 2000),
            datetimeFinish: new Date(now.getTime() + 10000),
            period: (new Date(now.getTime() - 2000) - new Date(now.getTime() + 10000)) * -1
        });

        stopwatch.pauses.push({
            datetimeStart: new Date(now.getTime() - 2000),
            datetimeFinish: new Date(now.getTime() + 3000),
            period: (new Date(now.getTime() - 2000) - new Date(now.getTime() + 3000)) * -1
        });

        stopwatch.pauses.push({
            datetimeStart: new Date(now.getTime() + 3000),
            datetimeFinish: new Date(now.getTime() + 10000),
            period: (new Date(now.getTime() + 3000) - new Date(now.getTime() + 10000)) * -1
        });

        stopwatch.pauses.push({
            datetimeStart: new Date(now.getTime() - 3000),
            datetimeFinish: new Date(now.getTime() - 1000),
            period: (new Date(now.getTime() - 3000) - new Date(now.getTime() - 1000)) * -1
        });

        stopwatch.pauses.push({
            datetimeStart: new Date(now.getTime() + 10000),
            datetimeFinish: new Date(now.getTime() + 11000),
            period: (new Date(now.getTime() + 10000) - new Date(now.getTime() + 11000)) * -1
        });

        let ms = await stopwatch._calculatePeriodPauses();
        okay = ms === 28000;

        /// ---- FOOTER ----
        if (okay) {
            glObj.countValid++;
            return;
        }

        glObj.countInvalid++;
        console.log(`invalid test ${key}`);

    },

    async calculatePeriod(key) {

        /// ---- HEAD ----
        let okay = false;
        let stopwatch = new JrfStopwatch();

        /// ---- BODY ----
        let now = new Date();
        let datetimeStart = new Date(now.getTime() - 30000);
        let datetimeFinish = new Date(now.getTime() + 30000);

        stopwatch.datetimeStart = datetimeStart;
        stopwatch.datetimeFinish = datetimeFinish;

        stopwatch.pauses.push({
            datetimeStart: new Date(now.getTime() + 2000),
            datetimeFinish: new Date(now.getTime() + 3000),
            period: (new Date(now.getTime() + 2000) - new Date(now.getTime() + 3000)) * -1
        });

        stopwatch.pauses.push({
            datetimeStart: new Date(now.getTime() - 2000),
            datetimeFinish: new Date(now.getTime() + 10000),
            period: (new Date(now.getTime() - 2000) - new Date(now.getTime() + 10000)) * -1
        });

        stopwatch.pauses.push({
            datetimeStart: new Date(now.getTime() - 2000),
            datetimeFinish: new Date(now.getTime() + 3000),
            period: (new Date(now.getTime() - 2000) - new Date(now.getTime() + 3000)) * -1
        });

        stopwatch.pauses.push({
            datetimeStart: new Date(now.getTime() + 3000),
            datetimeFinish: new Date(now.getTime() + 10000),
            period: (new Date(now.getTime() + 3000) - new Date(now.getTime() + 10000)) * -1
        });

        stopwatch.pauses.push({
            datetimeStart: new Date(now.getTime() - 3000),
            datetimeFinish: new Date(now.getTime() - 1000),
            period: (new Date(now.getTime() - 3000) - new Date(now.getTime() - 1000)) * -1
        });

        stopwatch.pauses.push({
            datetimeStart: new Date(now.getTime() + 10000),
            datetimeFinish: new Date(now.getTime() + 11000),
            period: (new Date(now.getTime() + 10000) - new Date(now.getTime() + 11000)) * -1
        });

        await stopwatch._calculatePeriod();
        let info = await stopwatch.getInfo();

        okay = info.period === 32000;

        if (okay) {
            okay = info.periodPauses === 28000;
        }

        if (okay) {
            okay = info.countPauses === 6;
        }

        /// ---- FOOTER ----
        if (okay) {
            glObj.countValid++;
            return;
        }

        glObj.countInvalid++;
        console.log(`invalid test ${key}`);

    },

    async startPause(key) {

        /// ---- HEAD ----
        let okay = false;
        let stopwatch = new JrfStopwatch();

        /// ---- BODY ----
        await stopwatch._setStatus(stopwatch.statusList.RUNNING);
        await stopwatch._startPause();
        okay = stopwatch.status === stopwatch.statusList.SUSPENDED;

        if (okay) {
            okay = stopwatch.pauses.length === 1;
        }

        let pause = stopwatch.pauses[0];
        if (okay) {
            okay = pause.datetimeStart;
        }

        if (okay) {
            okay = !pause.datetimeFinish;
        }

        if (okay) {
            okay = pause.period === 0;
        }

        /// ---- FOOTER ----
        if (okay) {
            glObj.countValid++;
            return;
        }

        glObj.countInvalid++;
        console.log(`invalid test ${key}`);

    },

    async stopPause(key) {

        /// ---- HEAD ----
        let okay = false;
        let stopwatch = new JrfStopwatch();

        /// ---- BODY ----
        await stopwatch._setStatus(stopwatch.statusList.RUNNING);
        await stopwatch._startPause();
        okay = stopwatch.status === stopwatch.statusList.SUSPENDED;

        if (okay) {
            okay = stopwatch.pauses.length === 1;
        }

        let pause = stopwatch.pauses[0];
        if (okay) {
            okay = pause.datetimeStart;
        }

        if (okay) {
            okay = !pause.datetimeFinish;
        }

        if (okay) {
            okay = pause.period === 0;
        }

        await wait(100);
        await stopwatch._stopPause();
        if (okay) {
            okay = stopwatch.status = stopwatch.statusList.RUNNING;
        }

        if (okay) {
            okay = stopwatch.pauses.length === 1;
        }

        pause = stopwatch.pauses[0];
        if (okay) {
            okay = pause.datetimeStart;
        }

        if (okay) {
            okay = pause.datetimeFinish;
        }

        if (okay) {
            okay = (pause.period >= 100 && pause.period <= 105);
        }

        /// ---- FOOTER ----
        if (okay) {
            glObj.countValid++;
            return;
        }

        glObj.countInvalid++;
        console.log(`invalid test ${key}`);

    },

    async work(key) {

        /// ---- HEAD ----
        let okay = false;
        let stopwatch = new JrfStopwatch();

        /// ---- BODY ----
        let res = await stopwatch.getInfo();
        okay = JSON.stringify(res) === JSON.stringify(readyStopwatch);

        if (okay) {
            res = await stopwatch.start();
            okay = res;
        }

        if (okay) {
            res = await stopwatch.getInfo();
            startStopwatch.datetimeStart = res.datetimeStart;
            okay = JSON.stringify(res) === JSON.stringify(startStopwatch);
            console.log(`startStopwatch ${okay}`);
        }
        await wait(100 * 10);

        if (okay) {
            res = await stopwatch.pause();
            okay = res;
        }

        if (okay) {
            // console.log(await stopwatch.getInfo());
            res = await stopwatch.getInfo();
            firstPauseStart.datetimeStart = res.datetimeStart;
            firstPauseStart.period = res.period;
            firstPauseStart.pauses[0].datetimeStart = res.pauses[0].datetimeStart;
            okay = JSON.stringify(res) === JSON.stringify(firstPauseStart);
            if (okay) {
                okay = (res.period >= 1000 && res.period <= 1010);
            }
            if (!okay) {
                console.log(JSON.stringify(res));
                console.log(JSON.stringify(firstPauseStart));
            }
            console.log(`firstPauseStart ${okay}`);
        }
        await wait(100 * 5);

        if (okay) {
            res = await stopwatch.round();
            okay = (res >= 1000 && res <= 1010);
        }

        if (okay) {
            // console.log(await stopwatch.getInfo());
            res = await stopwatch.getInfo();
            firstRound.datetimeStart = res.datetimeStart;
            firstRound.period = res.period;
            firstRound.periodPauses = res.periodPauses;
            firstRound.pauses[0].datetimeStart = res.pauses[0].datetimeStart;
            firstRound.rounds[0].datetimeStart = res.rounds[0].datetimeStart;
            firstRound.rounds[0].datetimeFinish = res.rounds[0].datetimeFinish;
            firstRound.rounds[0].period = res.rounds[0].period;
            okay = JSON.stringify(res) === JSON.stringify(firstRound);
            if (okay) {
                okay = (res.period >= 1000 && res.period <= 1010);
            }
            if (okay) {
                okay = (res.periodPauses >= 499 && res.periodPauses <= 510);
            }
            if (okay) {
                okay = (res.rounds[0].period >= 999 && res.rounds[0].period <= 1010);
            }
            if (!okay) {
                console.log(JSON.stringify(res));
                console.log(JSON.stringify(firstRound));
            }
            console.log(`firstRound ${okay}`);
        }

        if (okay) {
            res = await stopwatch.pause();
            okay = res;
        }

        if (okay) {
            // console.log(await stopwatch.getInfo());
            res = await stopwatch.getInfo();
            firstPauseStop.datetimeStart = res.datetimeStart;
            firstPauseStop.period = res.period;
            firstPauseStop.periodPauses = res.periodPauses;
            firstPauseStop.pauses[0].datetimeStart = res.pauses[0].datetimeStart;
            firstPauseStop.pauses[0].datetimeFinish = res.pauses[0].datetimeFinish;
            firstPauseStop.pauses[0].period = res.pauses[0].period;
            firstPauseStop.rounds[0].datetimeStart = res.rounds[0].datetimeStart;
            firstPauseStop.rounds[0].datetimeFinish = res.rounds[0].datetimeFinish;
            firstPauseStop.rounds[0].period = res.rounds[0].period;
            okay = JSON.stringify(res) === JSON.stringify(firstPauseStop);
            if (okay) {
                okay = (res.period >= 1000 && res.period <= 1010);
            }
            if (okay) {
                okay = (res.periodPauses >= 499 && res.periodPauses <= 510);
            }
            if (okay) {
                okay = (res.pauses[0].period >= 499 && res.pauses[0].period <= 510);
            }
            if (okay) {
                okay = (res.rounds[0].period >= 999 && res.rounds[0].period <= 1010);
            }
            if (!okay) {
                console.log(JSON.stringify(res));
                console.log(JSON.stringify(firstPauseStop));
            }
            console.log(`firstPauseStop ${okay}`);
        }
        await wait(100 * 2);

        if (okay) {
            res = await stopwatch.pause();
            okay = res;
        }

        if (okay) {
            // console.log(await stopwatch.getInfo());
            res = await stopwatch.getInfo();
            secondPauseStart.datetimeStart = res.datetimeStart;
            secondPauseStart.period = res.period;
            secondPauseStart.periodPauses = res.periodPauses;
            secondPauseStart.pauses[0].datetimeStart = res.pauses[0].datetimeStart;
            secondPauseStart.pauses[0].datetimeFinish = res.pauses[0].datetimeFinish;
            secondPauseStart.pauses[0].period = res.pauses[0].period;
            secondPauseStart.pauses[1].datetimeStart = res.pauses[1].datetimeStart;
            secondPauseStart.pauses[1].datetimeFinish = res.pauses[1].datetimeFinish;
            secondPauseStart.pauses[1].period = res.pauses[1].period;
            secondPauseStart.rounds[0].datetimeStart = res.rounds[0].datetimeStart;
            secondPauseStart.rounds[0].datetimeFinish = res.rounds[0].datetimeFinish;
            secondPauseStart.rounds[0].period = res.rounds[0].period;
            okay = JSON.stringify(res) === JSON.stringify(secondPauseStart);
            if (okay) {
                okay = (res.period >= 1200 && res.period <= 1210);
            }
            if (okay) {
                okay = (res.periodPauses >= 499 && res.periodPauses <= 510);
            }
            if (okay) {
                okay = (res.pauses[0].period >= 499 && res.pauses[0].period <= 510);
            }
            if (okay) {
                okay = (res.rounds[0].period >= 999 && res.rounds[0].period <= 1010);
            }
            if (!okay) {
                console.log(JSON.stringify(res));
                console.log(JSON.stringify(secondPauseStart));
            }
            console.log(`secondPauseStart ${okay}`);
        }
        await wait(100 * 3);

        if (okay) {
            res = await stopwatch.pause();
            okay = res;
        }
        if (okay) {
            // console.log(await stopwatch.getInfo());
            res = await stopwatch.getInfo();
            secondPauseStop.datetimeStart = res.datetimeStart;
            secondPauseStop.period = res.period;
            secondPauseStop.periodPauses = res.periodPauses;
            secondPauseStop.pauses[0].datetimeStart = res.pauses[0].datetimeStart;
            secondPauseStop.pauses[0].datetimeFinish = res.pauses[0].datetimeFinish;
            secondPauseStop.pauses[0].period = res.pauses[0].period;
            secondPauseStop.pauses[1].datetimeStart = res.pauses[1].datetimeStart;
            secondPauseStop.pauses[1].datetimeFinish = res.pauses[1].datetimeFinish;
            secondPauseStop.pauses[1].period = res.pauses[1].period;
            secondPauseStop.rounds[0].datetimeStart = res.rounds[0].datetimeStart;
            secondPauseStop.rounds[0].datetimeFinish = res.rounds[0].datetimeFinish;
            secondPauseStop.rounds[0].period = res.rounds[0].period;
            okay = JSON.stringify(res) === JSON.stringify(secondPauseStop);
            if (okay) {
                okay = (res.period >= 1200 && res.period <= 1210);
            }
            if (okay) {
                okay = (res.periodPauses >= 799 && res.periodPauses <= 810);
            }
            if (okay) {
                okay = (res.pauses[0].period >= 499 && res.pauses[0].period <= 510);
            }
            if (okay) {
                okay = (res.pauses[1].period >= 299 && res.pauses[1].period <= 310);
            }
            if (okay) {
                okay = (res.rounds[0].period >= 999 && res.rounds[0].period <= 1010);
            }
            if (!okay) {
                console.log(JSON.stringify(res));
                console.log(JSON.stringify(secondPauseStop));
            }
            console.log(`secondPauseStop ${okay}`);
        }

        if (okay) {
            res = await stopwatch.stop();
            okay = (res >= 1200 && res <= 1210);
        }

        if (okay) {
            // console.log(await stopwatch.getInfo());
            res = await stopwatch.getInfo();
            stopStopwatch.datetimeStart = res.datetimeStart;
            stopStopwatch.datetimeFinish = res.datetimeFinish;
            stopStopwatch.period = res.period;
            stopStopwatch.periodPauses = res.periodPauses;
            stopStopwatch.pauses[0].datetimeStart = res.pauses[0].datetimeStart;
            stopStopwatch.pauses[0].datetimeFinish = res.pauses[0].datetimeFinish;
            stopStopwatch.pauses[0].period = res.pauses[0].period;
            stopStopwatch.pauses[1].datetimeStart = res.pauses[1].datetimeStart;
            stopStopwatch.pauses[1].datetimeFinish = res.pauses[1].datetimeFinish;
            stopStopwatch.pauses[1].period = res.pauses[1].period;
            stopStopwatch.rounds[0].datetimeStart = res.rounds[0].datetimeStart;
            stopStopwatch.rounds[0].datetimeFinish = res.rounds[0].datetimeFinish;
            stopStopwatch.rounds[0].period = res.rounds[0].period;
            stopStopwatch.rounds[1].datetimeStart = res.rounds[1].datetimeStart;
            stopStopwatch.rounds[1].datetimeFinish = res.rounds[1].datetimeFinish;
            stopStopwatch.rounds[1].period = res.rounds[1].period;
            okay = JSON.stringify(res) === JSON.stringify(stopStopwatch);
            if (okay) {
                okay = (res.period >= 1200 && res.period <= 1210);
            }
            if (okay) {
                okay = (res.periodPauses >= 799 && res.periodPauses <= 810);
            }
            if (okay) {
                okay = (res.pauses[0].period >= 499 && res.pauses[0].period <= 510);
            }
            if (okay) {
                okay = (res.pauses[1].period >= 299 && res.pauses[1].period <= 310);
            }
            if (okay) {
                okay = (res.rounds[0].period >= 999 && res.rounds[0].period <= 1010);
            }
            if (okay) {
                okay = (res.rounds[1].period >= 199 && res.rounds[1].period <= 210);
            }
            if (!okay) {
                console.log(JSON.stringify(res));
                console.log(JSON.stringify(stopStopwatch));
            }
            console.log(`stopStopwatch ${okay}`);
        }

        if (okay) {
            await stopwatch.reset();
            res = await stopwatch.getInfo();
            startStopwatch.datetimeStart = res.datetimeStart;
            okay = JSON.stringify(res) === JSON.stringify(readyStopwatch);
            if (!okay) {
                console.log(JSON.stringify(res));
                console.log(JSON.stringify(readyStopwatch));
            }
            console.log(`reset ${okay}`);
        }

        /// ---- FOOTER ----
        if (okay) {
            glObj.countValid++;
            return;
        }

        glObj.countInvalid++;
        console.log(`invalid test ${key}`);

    }

};

async function runTests() {

    for (let [key, value] of Object.entries(tests)) {
        await value(key);
    }

    console.log(JSON.stringify(glObj, null, 4));
    console.log(`Count valid tests: ${glObj.countValid}`);
    console.log(`Count invalid tests: ${glObj.countInvalid}`);

}

runTests();