module.exports = fn => {
    return (req, res, next) => {
        fn(req, res, next).catch(next);
    }
}

/*
this function will have a function as a arg and return a funciton and when the synch function passed to this returns a promise it will work just accordingly,
if it rejects the promise then it will be catched by here in the catch() and since next is passed into this, this will then be caught in the global error handling middleware.
so we can remove all the try-catch blocks from the handlers and wrap them all in this catAsync function.
*/