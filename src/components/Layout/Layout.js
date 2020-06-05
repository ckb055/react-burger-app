import React from 'react';  

import Aux from '../../hoc/Auxiliary.js';
import classes from './Layout.css';

// do not that layout.js is here because components have no state, are 'dumb'
// do not maintain state.
// containers are components that have state, they use useState() for functional components, etc.

const layout = ( props ) => (
    <Aux>
        <div>Toolbar, SideDrawer, Backdrop</div>
        {/* you will need to replace this div with 3 components later on.*/}
        <main className={classes.Content}>
            {props.children}
        </main>
    </Aux>
);
// how should the jsx for this look like?

export default layout;
