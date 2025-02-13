pragma circom 2.0.0;

template CreditScore() {
    signal input loanAmount;
    signal input repaidAmount;
    signal output isValid;

    signal difference;
    difference <== repaidAmount - loanAmount;

    signal isNonNegative;
    isNonNegative <== difference * (1 - difference);

    isValid <== 1 - isNonNegative;
}

component main = CreditScore();
