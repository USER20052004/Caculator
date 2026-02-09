import React, { useState } from 'react';

function App() {
  const [expr, setExpr] = useState('');
  const [result, setResult] = useState('');

  const styles = {
    app: {
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f3f4f6',
      fontFamily: 'Inter, Arial, sans-serif',
    },
    calc: {
      width: 360,
      background: '#1f2937',
      padding: 20,
      borderRadius: 12,
      boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
      color: '#fff',
    },
    display: {
      height: 80,
      background: '#111827',
      borderRadius: 8,
      padding: '8px 12px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-end',
      marginBottom: 14,
      overflow: 'hidden',
    },
    small: {
      fontSize: 14,
      color: '#9ca3af',
      alignSelf: 'flex-end',
    },
    large: {
      fontSize: 28,
      color: '#ffffff',
      wordBreak: 'break-all',
    },
    keypad: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 10,
    },
    button: {
      padding: 14,
      fontSize: 18,
      borderRadius: 8,
      border: 'none',
      cursor: 'pointer',
    },
    btnNumber: {
      background: '#111827',
      color: '#fff',
    },
    btnFunction: {
      background: '#6b7280',
      color: '#fff',
    },
    btnOperator: {
      background: '#f59e0b',
      color: '#000',
    },
    btnEquals: {
      background: '#10b981',
      color: '#fff',
    },
  };

  const append = (val) => {
    setExpr((prev) => prev + val);
    setResult('');
  };

  const doClear = () => {
    setExpr('');
    setResult('');
  };

  const doBackspace = () => setExpr((s) => s.slice(0, -1));

  const compute = () => {
    if (!expr) return;
    const sanitized = expr.replace(/×/g, '*').replace(/÷/g, '/');
    if (!/^[0-9+\-*/().\s]+$/.test(sanitized)) {
      setResult('Error');
      return;
    }
    try {
      // eslint-disable-next-line no-eval
      const r = eval(sanitized);
      setResult(String(r));
      setExpr(String(r));
    } catch (e) {
      setResult('Error');
    }
  };

  const buttons = [
    'C', '(', ')', '÷',
    '7', '8', '9', '×',
    '4', '5', '6', '-',
    '1', '2', '3', '+',
    '0', '.', '←', '='
  ];

  return (
    <div style={styles.app}>
      <div style={styles.calc}>
        <div style={styles.display}>
          <div style={styles.small}>{expr || '0'}</div>
          <div style={styles.large}>{result || ''}</div>
        </div>

        <div style={styles.keypad}>
          {buttons.map((b) => {
            const isNumber = /[0-9.]/.test(b);
            const isOperator = ['+', '-', '×', '÷'].includes(b);
            const isFunction = ['C', '←', '(', ')'].includes(b);
            const isEquals = b === '=';

            const btnStyle = Object.assign({}, styles.button,
              isNumber ? styles.btnNumber : {},
              isOperator ? styles.btnOperator : {},
              isFunction ? styles.btnFunction : {},
              isEquals ? styles.btnEquals : {}
            );

            const handleClick = () => {
              if (b === 'C') return doClear();
              if (b === '←') return doBackspace();
              if (b === '=') return compute();
              append(b);
            };

            const extraStyle = (b === '0') ? Object.assign({}, btnStyle, { gridColumn: 'span 2' }) : btnStyle;

            return (
              <button
                key={b}
                onClick={handleClick}
                style={extraStyle}
              >
                {b}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
