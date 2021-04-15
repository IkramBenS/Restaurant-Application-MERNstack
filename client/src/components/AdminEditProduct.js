import React from 'react';

const AdminEditProduct = ({ match }) => {
    const productId = match.params.productId;
    console.log(productId);

        
    return <div>Inside AdminEditProduct</div>;
};

export default AdminEditProduct;