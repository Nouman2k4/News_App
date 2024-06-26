import React, { Component } from 'react';

export class NewsComp extends Component {
    render() {
        return (
            <div className="card news-card">
                {this.props.urlToImage && <img src={this.props.urlToImage} className="card-img-top" alt="News" style={{ height: "30vh" }} />}
                <div className="card-body">
                    <h5 className="card-title">{this.props.title}...</h5>
                    <p className="card-text">{this.props.description}...</p>
                    <a href={this.props.url} className="btn btn-primary">Read more</a>
                    <p className="card-text"><small className="text-body-secondary">By {this.props.author} on {new Date(this.props.publishedAt).toGMTString()}</small></p>
                </div>
            </div>
        );
    }
}

export default NewsComp;
