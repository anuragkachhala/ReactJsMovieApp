import React from 'react'

const NewItem = (props) => {

    let { title, description, imageUrl, newUrl, author, date, source } = props;
    return (
        <>
            <div className="my-3">
                <div className="card" >
                    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ left: '80%', zIndex: '1' }}>
                        <span className="visually-show">{source}</span>
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

            {/* <div className="card mb-3" style={{  maxWidth : "540px" }}>
                    <div className="row g-0">
                        <div className="col">
                            <img src={imageUrl ? imageUrl : "https://fdn.gsmarena.com/imgroot/news/22/04/android-13-beta-hints-at-spatial-sound/-952x498w6/gsmarena_000.jpg"} className="card-img-top" alt="..." />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{title}...</h5>
                                <p className="card-text">{description}...</p>
                                <p className="card-text"><small className="text-muted">By {author ? author : "UnKnown"} on {new Date(date).toGMTString()}</small></p>
                                <a rel="noreferrer" href={newUrl} target="_blank" className="btn btn-sm btn-primary">Read More</a>

                            </div>
                        </div>
                    </div>
                </div> */}
        </>

    )

}

export default NewItem