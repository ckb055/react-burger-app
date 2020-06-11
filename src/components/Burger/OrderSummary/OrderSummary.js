import React from 'react';

import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return (
            <li>
            {/*the textTransform: capitalize, the inner brackets = javascript object
             outer bracket = JSCode in JSX*/}
                <span style={{textTransform: 'capitalize'}}>
                    {igKey}
                    </span> 
                : {props.ingredients[igKey]}

            </li>)    
        });

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout?</p>
            {/* btnType is props passed into Button.js*/}
            <Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    );
};

export default orderSummary;