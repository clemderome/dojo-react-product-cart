import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    ProductList: [
      { id: 0, name: 'produit 1', price: 50, quantity: 1 },
      { id: 1, name: 'produit 2', price: 75, quantity: 2 },
      { id: 2, name: 'produit 3', price: 20, quantity: 5 }
    ],
    newProduct: {
      id:null,
      name:"",
      price:0,
      quantity: 1
    }
  }

  handleChange = (e, id) => {
    const newValue = this.state.ProductList.slice()
    newValue[id].quantity = e.target.value
    this.setState(({ ProductList: newValue }))
    console.log(e.target.value)
    if (e.target.value === '0') {
      console.log(e.target.value)
      if (window.confirm('Are you sure to delete that ?')) {
        const productListCopy = this.state.ProductList.slice()
        const newProductList = productListCopy.filter((product) => product.quantity !== "0")
        console.log(newProductList)
        this.setState(({ ProductList: newProductList }))
      }
    }
  }

  handleSubmit = (e) => {
    const newId = Math.max(...this.state.ProductList.map(({id}) => id))
    
    this.setState({newProduct: {...this.state.newProduct, id: newId + 1}}, 
      () => this.setState({ProductList: [...this.state.ProductList, this.state.newProduct],newProduct: {...this.state.newProduct, name: "", price:""}}))

    e.preventDefault()
  }

  stateChange = (e) => {
    this.setState({newProduct: {...this.state.newProduct, [e.target.name]: e.target.value}})
  }

  render() {
    console.log("ProductList",this.state.ProductList)
    return (
      <div className='App'>
        <h1>Ma commande</h1>
        <table>
          <thead>
            <tr>
              <td>Produit</td>
              <td>Prix unitaire</td>
              <td>Quantité</td>
              <td>Prix total</td>
            </tr>
          </thead>
          <tbody>
            {this.state.ProductList.map(({ id, name, price, quantity }, index) => (
              <tr key={id}>
                <td className="name">{name}</td>
                <td className="price">{price} €</td>
                <td className="quantity"><input value={quantity} type="number" onChange={(e) => this.handleChange(e, index)}></input></td>
                <td className="total">{price * quantity} €</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="totalPrice">
          Montant total : {this.state.ProductList.map((product) => product.price * product.quantity).reduce((a, b) => a + b)} €
          </p>
          <form>
            <h2>Ajout d'un produit</h2>
            <label className="field">Nom : <input name="name" value={this.state.newProduct.name} type="text" onChange={this.stateChange}></input></label>
            <label className="field">Prix : <input  name="price" value={this.state.newProduct.price} type="number" onChange={this.stateChange}></input></label>
            <input className="button" type="submit" value="Ajouter" onClick={this.handleSubmit}></input>
          </form>
          <p>{this.state.newProduct.name}</p>
            <p>{this.state.newProduct.price}</p>
      </div>
    );
  }
}

export default App;
