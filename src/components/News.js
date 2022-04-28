import React, { useEffect, useState } from 'react'
import NewItem from './NewItem';
import PropTypes from 'prop-types'
import Spinner from './Spinner';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

    const [articals, setArticals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalResults, settotaleResult] = useState(0)


    // constructor(props) {
    //     super(props)
    //     console.log("I am constructor of News class")
    //     this.state = {
    //         articals: [],
    //         loading: true,
    //         page: 1,
    //     }
    //     document.title = `Samachar App - ${this.captilizeFirstLater(props.category)}`
    // }

    // static defaultProps = {
    //     country: 'in',
    //     category: 'entertainment',
    //     pageSize: 6,
    //     totalResults: 0,
    //     apiKey: ""
    // }

    // static propTypes = {
    //     country: PropTypes.string,
    //     category: PropTypes.string,
    //     pageSize: PropTypes.number

    // }

    const captilizeFirstLater = (value) => {
        return  value.charAt(0).toUpperCase() + value.slice(1);
    }

    useEffect(() => {
       updateNews()
    }, [])


    // async componentDidMount() {
    //     this.updateNews()
    // }

    const handlePreviousClick = async () => {
        // let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=80a35269e02c47c0a4fee4558a29ecac&page=${this.state.page - 1}&pageSize=${props.pageSize}`
        // this.setState({loading : true})
        // let data = await fetch(url)
        // let parseArticle = await data.json()
        // console.log(parseArticle)
        // this.setState({ articals: parseArticle.articles, page: this.state.page - 1, loading : false })
        // console.log("PreviouseClick")
        await setPage(page - 1)
        updateNews();
    }

    const handleNextClick = async () => {
        await setPage(page + 1)
        updateNews();
        // console.log(this.state.page)
        // if ((this.state.page + 1) > Math.ceil(this.state.totalResults / 20)) {
        // } else {
        //     let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=80a35269e02c47c0a4fee4558a29ecac&page=${this.state.page + 1}&pageSize=${props.pageSize}`;
        //     this.setState({loading : true})
        //     let data = await fetch(url)
        //     let parseArticle = await data.json()
        //     console.log(parseArticle)
        //     this.setState({ articals: parseArticle.articles, page: this.state.page + 1 , loading : false})
        //     console.log(this.state.page)
        // }
    }


    const updateNews = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
        setLoading(true)
        let data = await fetch(url)
        let parseArticle = await data.json()
        console.log(parseArticle)
        setArticals(parseArticle.articles);
        settotaleResult(parseArticle.totalResults);
        setLoading(false)
        //this.setState({ articals: parseArticle.articles, totalResults: parseArticle.totalResults, loading: false })
    }



    const fetchMoreData = async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
        setLoading(true)
        let data = await fetch(url)
        let parseArticle = await data.json()
        console.log(parseArticle)
        setArticals(parseArticle.articles);
        setArticals(props.articals.concat(parseArticle.articles));
        setLoading(false)
        //this.setState({ articals: parseArticle.articles, totalResults: parseArticle.totalResults, loading: false })
    }



    // const fetchMoreData = async () => {
    //     let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`
    //     setLoading(true)
    //     let data = await fetch(url)
    //     let parseArticle = await data.json()
    //     console.log(parseArticle),
    //     setArticals(props.articals.concat(parseArticle.articles),
    //     settotaleResult(parseArticle.totalResults),
    //     setLoading(false)
    //     // this.setState({ articals: this.state.articals.concat(parseArticle.articles), totalResults: parseArticle.totalResults, loading: false })
    // }


    return (



        <>
            <h2 className="text-center" style={{ margin: '40px 0px' }} >{`Samachar from top ${captilizeFirstLater(props.category)} headlines`}  </h2>
            {/* {this.state.loading && <div className=" spinner-grow text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>} */}
            <InfiniteScroll
                dataLength={articals.length}
                next={fetchMoreData}
                hasMore={articals.length !== totalResults}
                loader={<Spinner />}>
                <div className='container my-3'>
                    <div className="row">
                        {articals.map((element) => {
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
                    <button disabled={(this.state.page + 1) > Math.ceil(this.state.totalResults / (props.pageSize))} type="button" className="btn btn-primary" onClick={this.handleNextClick}>Next &rarr;</button>
                </div> */}
        </>


    )

}

export default News;

News.propTypes = {
    country: PropTypes.string,
    category: PropTypes.string,
    pageSize: PropTypes.number
};

News.defaultProps = {
    country: 'in',
    category: 'entertainment',
    pageSize: 6,
    totalResults: 0,
    apiKey: ""
};