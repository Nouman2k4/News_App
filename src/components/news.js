import React, { Component } from 'react';
import NewsComp from './newsComp';
import Spinner from './spinner';
import PropTypes from 'prop-types';


export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 18,
        category: 'general',
    };

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            page: 1,
            loading: false,
            totalResults: 0,
        };
    }

    async fetchNews(page) {
        try {
            let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3c6ded617c134443b2f688e2d02fb04c&page=${page}&pageSize=${this.props.pageSize}`;
            this.setState({ loading: true });
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                articles: parsedData.articles,
                totalResults: parsedData.totalResults,
                loading: false,
            });
        } catch (error) {
            console.error('Error fetching the news:', error);
            this.setState({ loading: false });
        }
    }

    componentDidMount() {
        this.fetchNews(this.state.page);
    }

    handleNextPage = () => {
        if (this.state.page < Math.ceil(this.state.totalResults / this.props.pageSize)) {
            this.setState(
                (prevState) => ({ page: prevState.page + 1 }),
                () => this.fetchNews(this.state.page)
            );
        }
    };

    handlePrevPage = () => {
        if (this.state.page > 1) {
            this.setState(
                (prevState) => ({ page: prevState.page - 1 }),
                () => this.fetchNews(this.state.page)
            );
        }
    };

    render() {
        const fallbackImage = `${process.env.PUBLIC_URL}/newspaper-design-template/18580.png`;

        return (
            <div className="container my-3">
                <div className="d-flex justify-content-start">
                    <h2>Headlines</h2>
                </div>
                {this.state.loading && <Spinner />}
                <div className="row mt-3">
                    {!this.state.loading &&
                        this.state.articles.map((element, index) => (
                            <div className="col-md-4 col-12 mt-3" key={index}>
                                <NewsComp
                                    title={element.title ? element.title.slice(0, 45) : ''}
                                    description={element.description ? element.description.slice(0, 88) : ''}
                                    urlToImage={element.urlToImage ? element.urlToImage : fallbackImage}
                                    url={element.url}
                                    publishedAt={element.publishedAt}
                                    author={!element.author ? "Unknown" : element.author}
                                />
                            </div>
                        ))}
                </div>
                <div className="d-flex justify-content-between my-4">
                    <button
                        type="button"
                        className="btn btn-dark"
                        onClick={this.handlePrevPage}
                        disabled={this.state.page <= 1}
                    >
                        Previous Page
                    </button>
                    <button
                        type="button"
                        className="btn btn-dark"
                        onClick={this.handleNextPage}
                        disabled={this.state.page >= Math.ceil(this.state.totalResults / this.props.pageSize)}
                    >
                        Next Page
                    </button>
                </div>
            </div>
        );
    }
}

export default News;
