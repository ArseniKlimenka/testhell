/**
 * Calc
 *
 * Support for general calculation (rounding ...)
 *
 */
module.exports = {

    /**
   * round
   *
   * Rounding numbers
   *
   * @param {number} x number
   * @param {number} dec number of decimals
   */
    round: function (x, dec) {
        const dexp = Math.pow(10, dec);
        return Math.round(Math.max(0, x) * dexp) / dexp;
    },

    /**
   * round to precision
   *
   * Rounding a number to specified precision
   *
   * @param {number} x number
   * @param {number} precision precision
   */
    pRound: function (x, precision = 10) {
        return parseFloat(x.toPrecision(precision));
    },

    /**
   * round array to precision
   *
   * Rounding numbers in an array to specified precision
   *
   * @param {number} x array of numbers
   * @param {number} precision precision
   */
    pRoundA: function (x, precision = 10) {
        return x.map(f => this.pRound(f, precision));
    },

    /**
   * sum
   *
   * sum of number array
   *
   * @param {number} x array of numbers
   */
    sum: function (x) {
        return x.reduce(function (a, b) { return a + b; }, 0);
    },

    /**
   * prod
   *
   * product of number array
   *
   * @param {number} x array of numbers
   */
    prod: function (x) {
        return x.reduce(function (a, b) { return a * b; }, 1);
    },

    /**
   * interpolate
   *
   * Linear approximation
   *
   * @param {number} x1 first number
   * @param {number} x2 second number
   * @param {number} frac Fraction - between 0 and 1
   */
    interpolate: function (x1, x2, frac) {
        return x1 * (1 - frac) + x2 * frac;
    },

    /**
   * seq
   *
   * Returns sequence of numbers in an array
   *
   * @param {number} from first number
   * @param {number} to last number
   * @param {number} (optional) a function to map over the sequence
   */
    seq: function (from, to, fun) {

        const seq = [];
        for (let i = from; i <= to; i++) { seq.push(i); }
        if (fun === undefined) {
            return seq;
        }
        return seq.map(fun);
    },

    sumSeq: function (from, to, fun) {
        return this.sum(this.seq(from, to, fun));
    },

    prodSeq: function (from, to, fun) {
        return this.prod(this.seq(from, to, fun));
    },

    /**
   * cumsum
   *
   * Returns a cumulative sum of x
   *
   * @param {number} x Array of numbers
   */
    cumsum: function (x) {
        return x.reduce(
            function (r, a) {
                if (r.length > 0)
                { a += r[r.length - 1]; }
                r.push(a);
                return r;
            }, []);
    },

    /**
   * cumsumRev
   *
   * Returns a reverse cumulative sum of x
   *
   * @param {number} x Array of numbers
   */
    cumsumRev: function (x) {
        const x2 = x.slice().reverse();
        return this.cumsum(x2).reverse();
    }
};
