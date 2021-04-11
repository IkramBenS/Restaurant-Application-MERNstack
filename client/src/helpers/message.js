import React from 'react';

/*affichage du msg d'erreur : we export this method to be able to import it in Signup */
export const showErrorMsg = (msg) => (
<div className="alert alert-danger" role="alert">
  {msg}
</div>
);

export const showSuccessMsg = (msg) => (
    <div className="alert alert-success" role="alert">
      {msg}
    </div>
    );