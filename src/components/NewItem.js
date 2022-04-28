import React, { Component } from 'react'

export class NewItem extends Component {
    render() {
        let { title, description, imageUrl, newUrl, author, date , source } = this.props;
        return (
            <div className="my-3">
                <div className="card" >
                    <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left : '80%', zIndex : '1' }}>
                        <span class="visually-show">{source}</span>
                    </span>
                    <img src={imageUrl ? imageUrl : "https://fdn.gsmarena.com/imgroot/news/22/04/android-13-beta-hints-at-spatial-sound/-952x498w6/gsmarena_000.jpg"} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small className="text-muted">By {author ? author : "UnKnown"} on {new Date(date).toGMTString()}</small></p>
                        <a rel="noreferrer" href={newUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>

                    </div>
                </div>
            </div>
        )
    }
}

export default NewItem