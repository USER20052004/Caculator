import React, { useState } from 'react';

function App() {
  const [expr, setExpr] = useState('');
  const [result, setResult] = useState('');
  const [hovered, setHovered] = useState(null);

  const styles = {
    app: {
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      fontFamily: 'Inter, Arial, sans-serif',
    },

    calc: {
      width: 360,
      padding: 25,
      borderRadius: 20,
      background: 'rgba(255,255,255,0.08)',
      backdropFilter: 'blur(20px)',
      boxShadow: '0 15px 40px rgba(0,0,0,0.3)',
      color: '#fff',
      animation: 'float 4s ease-in-out infinite',
    },

    display: {
      height: 90,
      background: 'rgba(0,0,0,0.4)',
      borderRadius: 15,
      padding: '10px 15px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'flex-end',
      marginBottom: 20,
      overflow: 'hidden',
      boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.5)',
    },

    small: {
      fontSize: 16,
      color: '#d1d5db',
    },

    large: {
      fontSize: 32,
      fontWeight: 'bold',
      color: '#fff',
      wordBreak: 'break-all',
    },

    keypad: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 12,
    },

    button: {
      padding: 16,
      fontSize: 18,
      borderRadius: 12,
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s ease',
      boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
    },

    btnNumber: {
      background: 'linear-gradient(145deg, #1f2937, #111827)',
      color: '#fff',
    },

    btnFunction: {
      background: 'linear-gradient(145deg, #6b7280, #4b5563)',
      color: '#fff',
    },

    btnOperator: {
      background: 'linear-gradient(145deg, #f59e0b, #f97316)',
      color: '#000',
      fontWeight: 'bold',
    },

    btnEquals: {
      background: 'linear-gradient(145deg, #10b981, #059669)',
      color: '#fff',
      fontWeight: 'bold',
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
      const r = eval(sanitized);
      setResult(String(r));
      setExpr(String(r));
    } catch {
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
      <style>
        {`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-12px); }
            100% { transform: translateY(0px); }
          }
        `}
      </style>

      <div style={styles.calc}>
        <div style={styles.display}>
          <div style={styles.small}>{expr || '0'}</div>
          <div style={styles.large}>{result || ''}</div>
        </div>

        <div style={styles.keypad}>
          {buttons.map((b, index) => {
            const isNumber = /[0-9.]/.test(b);
            const isOperator = ['+', '-', '×', '÷'].includes(b);
            const isFunction = ['C', '←', '(', ')'].includes(b);
            const isEquals = b === '=';

            const btnStyle = {
              ...styles.button,
              ...(isNumber ? styles.btnNumber : {}),
              ...(isOperator ? styles.btnOperator : {}),
              ...(isFunction ? styles.btnFunction : {}),
              ...(isEquals ? styles.btnEquals : {}),
              transform: hovered === index ? 'scale(1.08)' : 'scale(1)',
              boxShadow:
                hovered === index
                  ? '0 8px 20px rgba(0,0,0,0.5)'
                  : '0 4px 10px rgba(0,0,0,0.3)',
            };

            const handleClick = () => {
              if (b === 'C') return doClear();
              if (b === '←') return doBackspace();
              if (b === '=') return compute();
              append(b);
            };

            return (
              <button
                key={b}
                onClick={handleClick}
                style={b === '0' ? { ...btnStyle, gridColumn: 'span 2' } : btnStyle}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
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
