// only allow the function to be called 'limit' number of times per period 'time'
export function throttle(callback, limit, time) {
    // monitor the count
    var calledCount = 0;

    // refesh the `calledCount` variable after the `time` has been passed
    setInterval(function(){ calledCount = 0 }, time);

    // creating a closure that will be called
    return function(){
        // checking the limit (if limit is exceeded then do not call the passed function
        if (limit > calledCount) {
            // increase the count
            calledCount++;
            callback(...arguments); // call the function
        } 
    };
}
    