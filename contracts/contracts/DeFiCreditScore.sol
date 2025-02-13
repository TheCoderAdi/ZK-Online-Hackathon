// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DeFiCreditScore {
    mapping(address => uint256) public creditScores;

    event CreditScoreUpdated(address indexed user, uint256 score);

    function updateCreditScore(address user, uint256 score) external {
        require(score > 0, "Invalid credit score");
        creditScores[user] = score;
        emit CreditScoreUpdated(user, score);
    }

    function getCreditScore(address user) external view returns (uint256) {
        return creditScores[user];
    }
}
