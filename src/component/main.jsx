import { Component } from 'react'

import axios from 'axios'
import PubSub from 'pubsub-js'
export default class Main extends Component {

    state = {
        initView: true,
        loading: false,
        users: null,
        errorMsg: null
    }

    componentDidMount(){
        //subscribe(search)
        PubSub.subscribe('search',(msg,searchName)=>{
            this.setState({
                initView: false,
                loading: true
            })
            //send request
            const url = `https://api.github.com/search/users?q=${searchName}`
            axios.get(url)
                .then(response => {//get data
                    const result = response.data
                    console.log(result)
                    const users = result.items.map(item => ({
                        name: item.login,
                        url: item.html_url,
                        avatarUrl: item.avatar_url
                    }))
                    console.log(users);
                    this.setState({
                        loading: false,
                        users
                    })
                    //update state
                }).catch(error => {
                    //update fail
                    this.setState({
                        loading: false,
                        errorMsg: error.message
                    })
    
                })

        })

    }
    render() {
        const { initView, loading, users, errorMsg } = this.state
        const { searchName } = this.props
        console.log({searchName})

        if (initView) {
            return <h2>Please input your message!:{searchName}</h2>
        } else if (loading) {
            return <h2>Loading....</h2>
        } else if (errorMsg) {
            return <h2>{errorMsg}</h2>
        } else {
            return (
                users.map((user, index) => (
                    <div className="content" key={index}>
                        <div className="row">
                            <div className="col-xs-6 col-md-2"><a href={users.url} target="_blank">
                                <img src={users.avatarUrl} style={{ width: 100 }} /></a>
                                <p className="card">{users.name}</p>
                            </div>
                        </div>
                    </div>))

            )
        }
    }
}