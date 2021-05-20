import { Component } from 'react'
import PubSub from 'pubsub-js'
export default class Search extends Component {
    
    search = () => {
        //get input 
        const searchName = this.input.value.trim()
        // alert(searchName)
        if (searchName) {
            //publish(search)
            PubSub.publish('search',searchName)
        }
    }
    render() {
        return (
            <div className="header">
                <h1>Search Github Users</h1>
                <form className="form-inline">
                    <div className="form-group">
                        <label form="exampleInputName2"></label>
                        <input type="text" className="form-control" id="exampleInputName2" placeholder="Jane Doe" ref={input => this.input = input} />
                    </div>
                    <button type="submit" className="btn btn-default" onClick={this.search}>Search</button>
                </form>
            </div>
        )
    }

}