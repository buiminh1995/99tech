var sum_to_n_a = function(n) {
    if (!Number.isInteger(n)) {
        throw new Error("Input must be an integer");
    }
    if (n < 1) {
        throw new Error("Input must be a positive integer");
    }
    let sum = 0;
    for (let i = 1; i <= n; i++) {
        sum += i;
    }
    return sum;
};
//console.log(sum_to_n_a(0)); // Error: Input must be a positive integer
//console.log(sum_to_n_a("hello")); // Error: Input must be an integer
//console.log(sum_to_n_a("5")); // Error: Input must be an integer
console.log(sum_to_n_a(5)); // 15

var sum_to_n_b = function(n) {
    if (!Number.isInteger(n)) {
        throw new Error("Input must be an integer");
    }
    if (n < 1) {
        throw new Error("Input must be a positive integer");
    }
    if (n === 1) {
        return 1;
    } else {
        return sum_to_n_b(n-1) + n;
    }
};

console.log(sum_to_n_b(5)); // 15

var sum_to_n_c = function(n) {
    if (!Number.isInteger(n)) {
        throw new Error("Input must be an integer");
    }
    if (n < 1) {
        throw new Error("Input must be a positive integer");
    }
    return n * (n + 1) / 2;
};

console.log(sum_to_n_c(5)); // 15