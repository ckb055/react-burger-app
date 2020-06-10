import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        // purchasable is for order now
        purchaseable: false,
        // purchasing is for the backdrop
        purchasing: false,
    }

    updatePurchaseState(ingredients) {
        // this one is making a copy of the current ingredients

        // Object.keys returns an array just copying out the keys.

        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey]
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
            this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            // creating a clone of the array
            ...this.state.ingredients
        };
        // console.log accepts any number of params in js
        // spread operator is no different from original?
        // console.log("updatedIngredients: ", updatedIngredients);
        // console.log("this.state.ingredients: ", this.state.ingredients);
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    clearIngredientHandler = (type) => {
        // functionality for clearing all current ingredients (reset to initial state)
        const emptyIngredients = {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        };
        this.setState({totalPrice: 4, ingredients: emptyIngredients});
        this.updatePurchaseState(emptyIngredients);
    }

    purchaseHandler = () => {
        // normal method, should be triggered everytime we click on order now
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        // console.log(this.state.ingredients);
        // console.log("disabledInfo: " + disabledInfo);
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        // console.log(disabledInfo);
        /* disabled Info is something like : {salad: true, bacon: true, cheese: true, meat: true} */
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredients} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    // purchasable is for the ORDER NOW button.
                    purchasable={this.state.purchasable}
                    // if total price = 4 => no ingredients in burger
                    containsIngredients={this.state.totalPrice === 4}
                    ordered={this.purchaseHandler}
                    clearAll={this.clearIngredientHandler}
                    price={this.state.totalPrice} />
            </Aux>
        );
    }
}

export default BurgerBuilder;