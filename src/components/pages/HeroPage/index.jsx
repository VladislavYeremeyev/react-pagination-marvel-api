import React, { Component } from "react";
import axios from "axios";
import styles from "./HeroPage.module.css";

class HeroPage extends Component {
  state = {
    loading: false,
    error: false,
    id: this.props.match.params.number,
  };

  componentDidMount() {
    this.fetch();
  }

  fetch = () => {
    this.setState({
      loading: true,
      error: false,
    });

    axios
      .get(
        `${process.env.REACT_APP_API_URL}/v1/public/characters/${this.state.id}`,
        {
          params: {
            apikey: process.env.REACT_APP_MARVEL_API_KEY,
          },
        }
      )
      .then((response) => {
        this.setState({
          loading: false,
          data: response.data.data.results[0],
        });
      })
      .catch(() => {
        this.setState({
          loading: false,
          error: true,
        });
      });
  };

  render() {
    return (
      <div className="row justify-content-md-center">
        {this.state.loading && "Зарузка..."}
        {!this.state.loading &&
          !this.state.error &&
          this.state.data === undefined &&
          "Пусто"}
        {this.state.error && (
          <div>
            <p>Произошла ошибка при загруке</p>
            <button type="button" onClick={this.fetch}>
              Повторить загрузку
            </button>
          </div>
        )}
        {!this.state.loading &&
          !this.state.error &&
          this.state.data !== undefined && (
            <div className="card text-center center-block">
              <img
                className={"img-thumbnail center-block" + styles.img}
                src={`${this.state.data.thumbnail.path}.${this.state.data.thumbnail.extension}`}
                alt={this.state.data.name}
              />
              <div className="card-body">
                <h1 className="card-title">
                  {this.state.data.name}{" "}
                  <span className="badge badge-secondary">{`#${this.state.data.id}`}</span>
                </h1>
                <div>
                  <span className="badge badge-info">{`Comics: ${this.state.data.comics.available}`}</span>
                </div>
                <p className="card-text">{this.state.data.description}</p>
              </div>
            </div>
          )}
      </div>
    );
  }
}

export default HeroPage;
