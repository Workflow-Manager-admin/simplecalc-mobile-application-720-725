import React, { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  Paper,
  Typography
} from '@mui/material';
import './Calculator.css';

// PUBLIC_INTERFACE
const Calculator = () => {
  const [display, setDisplay] = useState('0');
  const [firstOperand, setFirstOperand] = useState(null);
  const [operator, setOperator] = useState(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState(false);

  /**
   * Handles digit button clicks
   * @param {string} digit - The digit that was clicked
   */
  const inputDigit = (digit) => {
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  /**
   * Handles decimal point button click
   */
  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay('0.');
      setWaitingForSecondOperand(false);
      return;
    }

    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  /**
   * Handles operation button clicks (+, -, *, /)
   * @param {string} nextOperator - The operation to perform
   */
  const handleOperator = (nextOperator) => {
    const inputValue = parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = performCalculation();
      setDisplay(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  /**
   * Performs the calculation based on the current state
   * @returns {number} The result of the calculation
   */
  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (operator === '+') {
      return firstOperand + inputValue;
    } else if (operator === '-') {
      return firstOperand - inputValue;
    } else if (operator === '*') {
      return firstOperand * inputValue;
    } else if (operator === '/') {
      return firstOperand / inputValue;
    }

    return inputValue;
  };

  /**
   * Handles equals button click
   */
  const handleEquals = () => {
    if (firstOperand === null || operator === null) {
      return;
    }

    const result = performCalculation();
    setDisplay(String(result));
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  /**
   * Handles clear button click
   */
  const clearDisplay = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  /**
   * Renders a calculator button with appropriate styling
   * @param {string} content - The button text
   * @param {function} onClick - The click handler
   * @param {string} className - Additional CSS class
   * @returns {JSX.Element} The button component
   */
  const renderButton = (content, onClick, className = '') => {
    return (
      <Button
        variant="contained"
        onClick={onClick}
        className={`calculator-button ${className}`}
        sx={{
          height: '60px',
          fontSize: '1.5rem',
          borderRadius: '4px',
          fontWeight: 'bold',
          backgroundColor: className.includes('operator') ? '#E87A41' : '#333',
          '&:hover': {
            backgroundColor: className.includes('operator') ? '#FF8B4D' : '#444',
          }
        }}
      >
        {content}
      </Button>
    );
  };

  return (
    <Paper 
      elevation={3} 
      className="calculator"
      sx={{
        width: '320px',
        padding: '20px',
        borderRadius: '8px',
        backgroundColor: '#1A1A1A',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <Box 
        className="calculator-display"
        sx={{
          backgroundColor: '#111',
          padding: '15px',
          textAlign: 'right',
          marginBottom: '20px',
          borderRadius: '4px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Typography 
          variant="h4" 
          sx={{ 
            fontFamily: '"Digital", monospace',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {display}
        </Typography>
      </Box>

      <Grid container spacing={1}>
        <Grid item xs={9}>
          <Grid container spacing={1}>
            <Grid item xs={4}>
              {renderButton('7', () => inputDigit('7'))}
            </Grid>
            <Grid item xs={4}>
              {renderButton('8', () => inputDigit('8'))}
            </Grid>
            <Grid item xs={4}>
              {renderButton('9', () => inputDigit('9'))}
            </Grid>
            <Grid item xs={4}>
              {renderButton('4', () => inputDigit('4'))}
            </Grid>
            <Grid item xs={4}>
              {renderButton('5', () => inputDigit('5'))}
            </Grid>
            <Grid item xs={4}>
              {renderButton('6', () => inputDigit('6'))}
            </Grid>
            <Grid item xs={4}>
              {renderButton('1', () => inputDigit('1'))}
            </Grid>
            <Grid item xs={4}>
              {renderButton('2', () => inputDigit('2'))}
            </Grid>
            <Grid item xs={4}>
              {renderButton('3', () => inputDigit('3'))}
            </Grid>
            <Grid item xs={8}>
              {renderButton('0', () => inputDigit('0'))}
            </Grid>
            <Grid item xs={4}>
              {renderButton('.', inputDecimal)}
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={3}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              {renderButton('C', clearDisplay, 'clear-button')}
            </Grid>
            <Grid item xs={12}>
              {renderButton('÷', () => handleOperator('/'), 'operator-button')}
            </Grid>
            <Grid item xs={12}>
              {renderButton('×', () => handleOperator('*'), 'operator-button')}
            </Grid>
            <Grid item xs={12}>
              {renderButton('-', () => handleOperator('-'), 'operator-button')}
            </Grid>
            <Grid item xs={12}>
              {renderButton('+', () => handleOperator('+'), 'operator-button')}
            </Grid>
            <Grid item xs={12}>
              {renderButton('=', handleEquals, 'equals-button operator-button')}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Calculator;