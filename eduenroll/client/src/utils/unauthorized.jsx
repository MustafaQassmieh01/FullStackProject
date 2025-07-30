import React from 'react';

function Unauthorized() {
    return (
        <div className="unauthorized">
            <h1>Unauthorized Access</h1>
            <p>You do not have permission to view this page.</p>
            <p>Please contact your administrator if you believe this is an error.</p>
            <p><a href="/">Go back to Home</a></p>
        </div>
    );
}
export default Unauthorized;