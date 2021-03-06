// source https://programmer.ink/think/solidity-test-case-practice.html but i had to modify some places by myself to fix bugs.

// SPDX-License-Identifier: GPL-3.0
pragma solidity >0.7.0 <0.9.0;

contract Background {

    uint[] private values;

    function storeValue(uint _value) public virtual {
        values.push(_value);
    }

    function getValue(uint _index) public view returns (uint) {
        return values[_index];
    } 

    function getNumberOfValue() public view returns (uint) {
        return values.length;
    }
}