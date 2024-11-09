import React from 'react'

export default 
function Alert({ alert }) {
    function capitalize(word) {
        if (!word) return ''; // Ensure word is defined
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
      
    return (
      alert && (
        <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
          <strong>{capitalize(alert.type)}</strong>: {alert.msg}
        </div>
      )
    );
  }
  