import React, { Component } from 'react'
import NewItem from './NewItem';
import PropTypes from 'prop-types'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
    constructor(props) {
        super(props)
        console.log("I am constructor of News class")
        this.state = {
            articals: [],
            loading: true,
            page: 1
        }
        document.title = `Samachar App - ${this.captilizeFirstLater(this.props.category)}`
    }

    static defaultProps = {
        country: 'in',
        category: 'entertainment',
        pageSize: 6,
        totalResults : 0
    }

    static propTypes = {
        country: PropTypes.string,
        category: PropTypes.string,
        pageSize: PropTypes.number

    }

    captilizeFirstLater = (value) => {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }
    async componentDidMount() {
        this.updateNews()
    }

    handlePreviousClick = async () => {
        // let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=80a35269e02c47c0a4fee4558a29ecac&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`
        // this.setState({loading : true})
        // let data = await fetch(url)
        // let parseArticle = await data.json()
        // console.log(parseArticle)
        // this.setState({ articals: parseArticle.articles, page: this.state.page - 1, loading : false })
        // console.log("PreviouseClick")
        await this.setState({ page: this.state.page - 1 })
        this.updateNews();
    }

    handleNextClick = async () => {
        await this.setState({ page: this.state.page + 1 })
        this.updateNews();
        // console.log(this.state.page)
        // if ((this.state.page + 1) > Math.ceil(this.state.totalResults / 20)) {
        // } else {
        //     let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=80a35269e02c47c0a4fee4558a29ecac&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        //     this.setState({loading : true})
        //     let data = await fetch(url)
        //     let parseArticle = await data.json()
        //     console.log(parseArticle)
        //     this.setState({ articals: parseArticle.articles, page: this.state.page + 1 , loading : false})
        //     console.log(this.state.page)
        // }
    }


    async updateNews() {
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=80a35269e02c47c0a4fee4558a29ecac&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true })
        let data = await fetch(url)
        let parseArticle = await data.json()
        console.log(parseArticle)
        this.setState({ articals: parseArticle.articles, totalResults: parseArticle.totalResults, loading: false })
    }


    forceUpdate = async() =>{
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=80a35269e02c47c0a4fee4558a29ecac&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true })
        let data = await fetch(url)
        let parseArticle = await data.json()
        console.log(parseArticle)
        this.setState({ articals: parseArticle.articles, totalResults: parseArticle.totalResults, loading: false })
    }


    fetchMoreData = async() => {
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=80a35269e02c47c0a4fee4558a29ecac&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true })
        let data = await fetch(url)
        let parseArticle = await data.json()
        console.log(parseArticle)
        this.setState({ articals: this.state.articals.concat(parseArticle.articles), totalResults: parseArticle.totalResults, loading: false })
   

    }

    render() {
        return (



            <>
                <h2 className="text-center" style={{ margin: '40px 0px' }} >{`Samachar from top ${this.captilizeFirstLater(this.props.category)} headlines`}  </h2>
                {/* {this.state.loading && <div className=" spinner-grow text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>} */}
                <InfiniteScroll
                    dataLength={this.state.articals.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articals.length!==this.state.totalResults}
                    loader={<Spinner/>}>
                        <div className='container my-3'>
                    <div className="row">
                        {this.state.articals.map((element) => {
                            return <div className='col-md-4' key={element.url}>
                                <NewItem title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newUrl={element.url} author={element.author} date={element.publishedAt}
                                    source={element.source.name} />
                            </div>
                        })}
                    </div>
                    </div>

                </InfiniteScroll>

                {/* <div className="container d-flex justify-content-between">
                    <button disabled={this.state.page <= 1} type="button" className="btn btn-primary" onClick={this.handlePreviousClick}> &larr; Previouse </button>
                    <button disabled={(this.state.page + 1) > Math.ceil(this.state.totalResults / (this.props.pageSize))} type="button" className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}
            </>


        )
    }
}

export default News;
